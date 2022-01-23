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

#Create Resource Group
resource "azurerm_resource_group" "buzzure" {
  name     = "rg-buzzure-${var.environment}"
  location = "eastus2"
}

resource "azurerm_service_plan" "buzzure" {
  name                = "buzzure-${var.environment}"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_resource_group.buzzure.location
  os_type             = "Linux"
  sku_name            = "B2"
}

resource "azurerm_linux_web_app" "buzzure" {
  name                = "buzzure-${var.environment}"
  resource_group_name = azurerm_resource_group.buzzure.name
  location            = azurerm_service_plan.buzzure.location
  service_plan_id     = azurerm_service_plan.buzzure.id

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
    "AZ_STORAGE_ACCOUNT_NAME"       = azurerm_storage_account.buzzure.name
    "AZ_STORAGE_TABLE_NAME"         = azurerm_storage_table.buzzure.name
    "AZ_STORAGE_ACCOUNT_ACCESS_KEY" = format("@Microsoft.KeyVault(VaultName=%s;SecretName=%s)", azurerm_key_vault.buzzure.name, azurerm_key_vault_secret.st_access_key_secret.name)
    "AZ_PUBSUB_CONNECTION_STRING"   = format("@Microsoft.KeyVault(VaultName=%s;SecretName=%s)", azurerm_key_vault.buzzure.name, azurerm_key_vault_secret.pubsub_connection_string_secret.name)
  }
}

resource "azurerm_storage_account" "buzzure" {
  name                     = "sabuzzure${var.environment}"
  resource_group_name      = azurerm_resource_group.buzzure.name
  location                 = azurerm_resource_group.buzzure.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_table" "buzzure" {
  name                 = "buzzuretable${var.environment}"
  storage_account_name = azurerm_storage_account.buzzure.name
}

resource "azurerm_storage_table" "buzzure_haodev" {
  name                 = "buzzuretablehaodev"
  storage_account_name = azurerm_storage_account.buzzure.name
}

resource "azurerm_key_vault" "buzzure" {
  name                       = "kvbuzzure${var.environment}"
  location                   = azurerm_resource_group.buzzure.location
  resource_group_name        = azurerm_resource_group.buzzure.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  sku_name = "standard"
}

resource "azurerm_key_vault_access_policy" "pipeline_client" {
  key_vault_id            = azurerm_key_vault.buzzure.id
  tenant_id               = data.azurerm_client_config.current.tenant_id
  object_id               = data.azurerm_client_config.current.object_id
  key_permissions         = ["Create", "Update", "Get"]
  secret_permissions      = ["Set", "Get", "Delete", "Purge"]
  storage_permissions     = null
  certificate_permissions = null
}

resource "azurerm_key_vault_access_policy" "buzzure" {
  key_vault_id            = azurerm_key_vault.buzzure.id
  tenant_id               = azurerm_linux_web_app.buzzure.identity[0].tenant_id
  object_id               = azurerm_linux_web_app.buzzure.identity[0].principal_id
  key_permissions         = ["Get", "List"]
  secret_permissions      = ["Get", "List"]
  storage_permissions     = null
  certificate_permissions = null
}

resource "azurerm_key_vault_secret" "st_access_key_secret" {
  key_vault_id = azurerm_key_vault.buzzure.id
  name         = "storage-account-access-key"
  value        = azurerm_storage_account.buzzure.primary_access_key
  depends_on = [
    azurerm_key_vault_access_policy.pipeline_client
  ]
}

resource "azurerm_key_vault_secret" "pubsub_connection_string_secret" {
  key_vault_id = azurerm_key_vault.buzzure.id
  name         = "pubsub-connection-string"
  value        = var.azure_pubsub_connection_string
}
