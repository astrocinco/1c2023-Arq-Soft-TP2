resource "random_string" "redis_name" {
  length  = 25
  lower   = true
  upper   = false
  special = false
  numeric = false
}

resource "azurerm_redis_cache" "tp2_redis" {
  name                = random_string.redis_name.result
  location            = azurerm_resource_group.tp2_resource_group.location
  resource_group_name = azurerm_resource_group.tp2_resource_group.name
  sku_name            = "Basic" # Opciones: Basic, Standard
  family              = "C"
  capacity            = 0 # Opciones: 0 (250MB), 1 (1GB), 2 (2,5 GB), 3 (6GB), 4 (13GB), 5 (26GB), 6 (53GB)
  enable_non_ssl_port = true
  
  provisioner "local-exec" {
    command = "echo \"redis://$USER:$PASS@$HOST:$PORT/\" > ansible/redis_url"

    environment = {
      HOST = azurerm_redis_cache.tp2_redis.hostname
      PORT = azurerm_redis_cache.tp2_redis.port
      PASS = azurerm_redis_cache.tp2_redis.primary_access_key
      USER = "default"
    }
  }
}
