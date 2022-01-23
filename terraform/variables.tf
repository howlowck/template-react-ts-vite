variable "environment" {
  type    = string
  default = "prod"
}

variable "azure_pubsub_connection_string" {
  type      = string
  sensitive = true
}
