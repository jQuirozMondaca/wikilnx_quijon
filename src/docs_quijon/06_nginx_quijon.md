# nginx y despliegue de tu sitio

![Instalación Node/Git](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20153540.png)
![Clonación Repositorio](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20211115.png)
![Nginx Funcionando](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20221533.png)
![test_nginx](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-09%20201117.png)
![Despliege Sitio react](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-09%20201213.png)

**Construcción y Despliegue del Sitio:**
Para lograr servir el sitio web desde el servidor Linux, fue necesario instalar primero herramientas clave: `nodejs`, `npm` y `git`. Estas dependencias nos permitieron clonar el repositorio del proyecto y ejecutar el comando `npm run build`, el cual compila la aplicación de React y genera los archivos estáticos finales dentro de la carpeta `dist/`.

**Configuración de Nginx:**
Una vez instalados los paquetes y construida la web, configuramos el bloque del servidor editando el archivo `/etc/nginx/sites-available/wiki`. La directiva fundamental aplicada fue indicar el puerto de escucha (`listen 80`) y la ruta raíz (`root /var/www/wiki`), que es donde ubicamos nuestros archivos compilados asegurándonos de asignar la propiedad al usuario `www-data` para evitar errores de permisos ("Permission denied").

Finalmente, se habilitó el sitio creando un enlace simbólico hacia `sites-enabled`, se testeó la sintaxis con `nginx -t` y se recargó el servicio. Gracias a las reglas de NAT y firewall previamente configuradas, el sitio web es accesible desde el equipo anfitrión en el puerto `8080`.
