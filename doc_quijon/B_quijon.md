# Bloque B · Instalación y configuración básica

![Hardware VM](../doc_quijon/img_quijon/205843.png)
![Reenvío de Puertos NAT](../doc_quijon/img_quijon/205903.png)
![Hostname](../doc_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20140021.png)
![IP a](../doc_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20140049.png)
![Apt Update](../doc_quijon//img_quijon/Captura%20de%20pantalla%202026-07-06%20210426.png)
![UFW Status](../doc_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20210441.png)

**¿Qué es NAT?**
NAT (Network Address Translation) es un mecanismo que permite a los dispositivos de una red privada (como nuestra VM) salir a Internet enmascarando sus direcciones IP internas detrás de una única dirección IP pública compartida por el router (o el anfitrión, en este caso).

**¿Para qué sirve el reenvío de puertos (Port Forwarding)?**
Como la VM está "oculta" detrás del NAT, desde el exterior no se puede iniciar una conexión hacia ella. El reenvío de puertos soluciona esto mapeando un puerto específico del anfitrión (ej. 8080) y redirigiendo todo su tráfico hacia un puerto específico del servidor invitado (ej. 80), permitiendo el acceso a servicios internos como SSH o HTTP.

**DHCP vs IP Fija:**

- **DHCP:** Protocolo que asigna direcciones IP, máscaras de red y puertas de enlace de forma automática y dinámica cada vez que el equipo se conecta.
- **IP Fija (Estática):** Es una dirección configurada manualmente que nunca cambia. Es **fundamental para servidores** (como Nginx), ya que garantiza que los clientes y servicios DNS siempre encuentren el servidor en la misma ruta lógica, evitando caídas de servicio por caducidad de la concesión DHCP.
