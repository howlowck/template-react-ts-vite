terraform {
  backend "azurerm" {}
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.90.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}

data "azurerm_client_config" "current" {}

locals {
  app = "tplreact"
}

#Create Resource Group
resource "azurerm_resource_group" "tplreact" {
  name     = "rg-${local.app}-${var.environment}"
  location = "eastus2"
}

resource "azurerm_service_plan" "tplreact" {
  name                = "${local.app}-${var.environment}"
  resource_group_name = azurerm_resource_group.tplreact.name
  location            = azurerm_resource_group.tplreact.location
  os_type             = "Linux"
  sku_name            = "B2"
}

resource "azurerm_linux_web_app" "tplreact" {
  name                = "${local.app}-${var.environment}"
  resource_group_name = azurerm_resource_group.tplreact.name
  location            = azurerm_service_plan.tplreact.location
  service_plan_id     = azurerm_service_plan.tplreact.id

  identity {
    type = "SystemAssigned"
  }

  site_config {
    application_stack {
      node_version = "14-lts"
    }
  }

  app_settings = {
    "NODE_ENV"                      = "prod"
    "AZ_STORAGE_ACCOUNT_NAME"       = azurerm_storage_account.tplreact.name
    "AZ_STORAGE_TABLE_NAME"         = azurerm_storage_table.tplreact.name
    "AZ_STORAGE_ACCOUNT_ACCESS_KEY" = format("@Microsoft.KeyVault(VaultName=%s;SecretName=%s)", azurerm_key_vault.tplreact.name, azurerm_key_vault_secret.st_access_key_secret.name)
    "AZ_PUBSUB_CONNECTION_STRING"   = format("@Microsoft.KeyVault(VaultName=%s;SecretName=%s)", azurerm_key_vault.tplreact.name, azurerm_key_vault_secret.pubsub_connection_string_secret.name)
  }
}

resource "azurerm_storage_account" "tplreact" {
  name                     = "sa${local.app}${var.environment}"
  resource_group_name      = azurerm_resource_group.tplreact.name
  location                 = azurerm_resource_group.tplreact.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_table" "tplreact" {
  name                 = "${local.app}table${var.environment}"
  storage_account_name = azurerm_storage_account.tplreact.name
}

resource "azurerm_storage_table" "tplreact_haodev" {
  name                 = "${local.app}tablehaodev"
  storage_account_name = azurerm_storage_account.tplreact.name
}

resource "azurerm_key_vault" "tplreact" {
  name                       = "kv${local.app}${var.environment}"
  location                   = azurerm_resource_group.tplreact.location
  resource_group_name        = azurerm_resource_group.tplreact.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  sku_name = "standard"
}

resource "azurerm_key_vault_access_policy" "pipeline_client" {
  key_vault_id            = azurerm_key_vault.tplreact.id
  tenant_id               = data.azurerm_client_config.current.tenant_id
  object_id               = data.azurerm_client_config.current.object_id
  key_permissions         = ["Create", "Update", "Get"]
  secret_permissions      = ["Set", "Get", "Delete", "Purge"]
  storage_permissions     = null
  certificate_permissions = null
}

resource "azurerm_key_vault_access_policy" "tplreact" {
  key_vault_id            = azurerm_key_vault.tplreact.id
  tenant_id               = azurerm_linux_web_app.tplreact.identity[0].tenant_id
  object_id               = azurerm_linux_web_app.tplreact.identity[0].principal_id
  key_permissions         = ["Get", "List"]
  secret_permissions      = ["Get", "List"]
  storage_permissions     = null
  certificate_permissions = null
}

resource "azurerm_key_vault_secret" "st_access_key_secret" {
  key_vault_id = azurerm_key_vault.tplreact.id
  name         = "storage-account-access-key"
  value        = azurerm_storage_account.tplreact.primary_access_key
  depends_on = [
    azurerm_key_vault_access_policy.pipeline_client
  ]
}
