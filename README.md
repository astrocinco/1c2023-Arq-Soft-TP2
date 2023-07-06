# TP 2 de Arquitectura de Software (75.73) del 1er cuatrimestre de 2023

## Contexto

Este repositorio contiene la aplicación para tomar las mediciones analizadas en _Informe-TP2.pdf_ para la materia Arquitectura del Software de la Facultad de Ingeniería de la Universidad de Buenos Aires.
El trabajo práctico fue realizado por @mrti259, @astrocinco, @tlofano y @sotlucas.

## Introducción 

Para este Trabajo, implementaremos sobre Azure un servicio similar al que realizamos en el TP 1. Será una app hecha en Node que consumirá las mismas APIs del TP 1, y agregará un GUID a cada respuesta. Este GUID será provisto por un servicio que se ejecutará en un container, también deployado en la nube.

Creando una sola instancia de la app en Node, deben ejecutar corridas que muestren el comportamiento de la aplicación, recolectando métricas (propias como en el TP 1 y tomadas automáticamente) que serán enviadas a Datadog. Luego, deberán escalar a 3 instancias y ejecutar nuevamente.

Cuando hayan finalizado el paso anterior, deben repetir introduciendo cache con Redis utilizando el servicio apropiado de Azure. No es necesario probar Redis con ambas configuraciones de la app Node (sin escalar y escalando horizontalmente), basta con que lo usen en _una_ configuración y aclaren de cuál se trata.

En cada caso, deberán analizar y explicar qué está ocurriendo según lo que visualizan. Si encuentran algún cuello de botella o limitación, deben proponer y probar alguna táctica superadora, siempre que tenga sentido dentro del caso analizado.

Tanto para escalar horizontalmente como para agregar una instancia de Redis, cada grupo deberá modificar/agregar archivos de Terraform como sea necesario.

- Para escalar en un Virtual Machine Scaling Set (VMSS), ajustar el parámetro _instances_ según lo deseado.
- Para crear una instancia de Redis en Azure, mirar el [recurso azurerm_redis_cache de Terraform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_cache).

Para la administración de las instancias del VMSS se utilizará un [jumpbox](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/cloud-scale-analytics/architectures/connect-to-environments-privately)

