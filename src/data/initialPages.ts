export interface InitialWikiPage {
  slug: string;
  title: string;
  content: string;
}

export const INITIAL_PAGES: InitialWikiPage[] = [
  // Páginas de contenido del laboratorio Linux Server
  {
    slug: "inicio",
    title: "Inicio",
    content: `# Laboratorio Unidad 3 - Administración de Linux Server

**Asignatura:** Sistemas Operativos (TI3V35)
**Docente:** Rubén Schnettler
**Estudiante:** Jonathan Quiroz Mondaca
**Código de Identificación:** quijon
**Repositorio GitHub:** [https://github.com/jQuirozMondaca/wikilnx_quijon](https://github.com/jQuirozMondaca/wikilnx_quijon)
**URL del sitio en Vercel:** [https://wikilnx-quijon.vercel.app/](https://wikilnx-quijon.vercel.app/)

Esta wiki reúne los contenidos de la unidad 3 sobre administración de Linux Server en un formato navegable y temático inspirado en Matrix.`,
  },
  {
    slug: "licencias",
    title: "Software libre y licencias (3.1.1)",
    content: `# Software libre y licencias

![Licencias](/img_quijon/222723.png)
![Preámbulo GPL](/img_quijon/222819.png)

**¿Qué es el Software Libre?**
Es aquel software que garantiza a los usuarios las cuatro libertades fundamentales: la libertad de ejecutar el programa para cualquier propósito, estudiar cómo funciona y modificarlo, redistribuir copias y distribuir versiones modificadas a terceros. No se refiere necesariamente a precio (gratis), sino a la libertad sobre el código fuente.

**Diferencia entre Copyleft (GPL), Permisivas (MIT/BSD/Apache) y Propietario:**

- **Copyleft (GPL):** Garantiza que cualquier trabajo derivado u obra modificada deba distribuirse obligatoriamente bajo los mismos términos de libertad. Impide que el código se cierre en futuros proyectos.
- **Permisivas (MIT/BSD/Apache):** Otorgan libertades similares para usar y modificar, pero no obligan a que las obras derivadas mantengan la misma licencia. Permiten integrar código libre dentro de software propietario de código cerrado.
- **Propietario:** El código fuente es cerrado, privativo y pertenece exclusivamente a su autor o empresa. Se imponen severas restricciones legales sobre su uso, copia y modificación.

**¿Bajo qué tipo de licencia está Ubuntu?**
Ubuntu es un sistema operativo GNU/Linux, lo que significa que es un agregado de miles de paquetes de software. Su componente central (el kernel de Linux) está bajo licencia copyleft estricta **GPLv2**. Sin embargo, la distribución en sí contiene una mezcla de software bajo licencias GPL, permisivas e incluso algunos controladores propietarios necesarios para el hardware.`,
  },
  {
    slug: "instalacion",
    title: "Instalación y configuración básica (3.1.2)",
    content: `# Instalación y configuración básica

![Hardware VM](/img_quijon/205843.png)
![Reenvío de Puertos NAT](/img_quijon/205903.png)
![Hostname](/img_quijon/Captura-de-pantalla-2026-07-07-140021.png)
![IP a](/img_quijon/Captura-de-pantalla-2026-07-07-140049.png)
![Apt Update](/img_quijon/Captura-de-pantalla-2026-07-06-210426.png)
![UFW Status](/img_quijon/Captura-de-pantalla-2026-07-07-210441.png)

**¿Qué es NAT?**
NAT (Network Address Translation) es un mecanismo que permite a los dispositivos de una red privada (como nuestra VM) salir a Internet enmascarando sus direcciones IP internas detrás de una única dirección IP pública compartida por el router (o el anfitrión, en este caso).

**¿Para qué sirve el reenvío de puertos (Port Forwarding)?**
Como la VM está "oculta" detrás del NAT, desde el exterior no se puede iniciar una conexión hacia ella. El reenvío de puertos soluciona esto mapeando un puerto específico del anfitrión (ej. 8080) y redirigiendo todo su tráfico hacia un puerto específico del servidor invitado (ej. 80), permitiendo el acceso a servicios internos como SSH o HTTP.

**DHCP vs IP Fija:**

- **DHCP:** Protocolo que asigna direcciones IP, máscaras de red y puertas de enlace de forma automática y dinámica cada vez que el equipo se conecta.
- **IP Fija (Estática):** Es una dirección configurada manualmente que nunca cambia. Es **fundamental para servidores** (como Nginx), ya que garantiza que los clientes y servicios DNS siempre encuentren el servidor en la misma ruta lógica, evitando caídas de servicio por caducidad de la concesión DHCP.`,
  },
  {
    slug: "permisos",
    title: "Permisos por línea de comandos (3.1.3)",
    content: `# Permisos por línea de comandos

![Creación y Permisos Base](/img_quijon/Captura-de-pantalla-2026-07-07-140504.png)
![Modificación chmod/chown](/img_quijon/Captura-de-pantalla-2026-07-07-141142.png)
![Permisos Especiales](/img_quijon/Captura-de-pantalla-2026-07-07-144443.png)

**Traducción de permisos (-rw-rw-r--):**
Indica que el archivo es regular (-). El dueño (user) tiene permisos de lectura y escritura (rw-). El grupo asignado (group) también tiene lectura y escritura (rw-). Cualquier otro usuario (others) solo tiene permiso de lectura (r--).

**chmod numérico vs simbólico:**

- **Numérico (ej. 644):** Utiliza una suma octal donde Lectura (r) = 4, Escritura (w) = 2, Ejecución (x) = 1. Es rápido para establecer todos los permisos de golpe.
- **Simbólico (ej. u+x, go-rwx):** Utiliza letras para Usuario (u), Grupo (g) y Otros (o), añadiendo (+) o quitando (-) permisos específicos (r, w, x). Es ideal para modificar un solo parámetro sin afectar el resto.

**¿Qué hace chown?**
Cambia el propietario (dueño) y/o el grupo al que pertenece un archivo o directorio en el sistema.

**Permisos especiales (setgid y sticky bit):**

- **setgid (letra 's' en el grupo, ej. drwxrwsr-x):** Cuando se aplica a un directorio compartido, obliga a que cualquier archivo nuevo creado dentro de él herede el grupo del directorio, en lugar del grupo principal del usuario que lo creó. Ideal para trabajo colaborativo.
- **sticky bit (letra 't' en otros, ej. en /tmp):** Evita el caos en directorios públicos. Garantiza que solo el propietario de un archivo (o el usuario root) pueda renombrar o eliminar ese archivo, incluso si otros usuarios tienen permisos de escritura totales sobre el directorio contenedor.`,
  },
  {
    slug: "paquetes",
    title: "Gestores de paquetes (apt) (3.1.4)",
    content: `# Gestores de paquetes (apt)

![Apt Search](/img_quijon/Captura-de-pantalla-2026-07-07-144726.png)
![Apt Show](/img_quijon/Captura-de-pantalla-2026-07-07-145314.png)
![Apt Install](/img_quijon/Captura-de-pantalla-2026-07-07-145740.png)
![Systemctl Nginx](/img_quijon/Captura-de-pantalla-2026-07-07-205916.png)

**Flujo de gestión (update -> search -> show -> install):**

1. **update:** Sincroniza la lista local del sistema con los repositorios remotos para conocer las últimas versiones disponibles.
2. **search:** Permite buscar un paquete o herramienta específica por su nombre o descripción dentro del catálogo actualizado.
3. **show:** Muestra los metadatos técnicos del paquete antes de instalarlo (versión, tamaño, dependencias). Fundamental para la factibilidad.
4. **install:** Descarga los binarios, resuelve e instala automáticamente las dependencias necesarias y configura el software en el sistema.

**Criterio de factibilidad:**
Ante la necesidad de monitorear procesos, evaluamos alternativas como top (nativo) y htop (interactivo). Tras usar apt show htop, confirmamos que su peso de descarga es mínimo (aprox 177 kB) y sus dependencias son librerías estándar. Por su excelente relación costo/beneficio operativo, htop resulta la alternativa más factible.`,
  },
  {
    slug: "nginx",
    title: "nginx y despliegue de tu sitio (3.1.4)",
    content: `# nginx y despliegue de tu sitio

![Instalación Node/Git](/img_quijon/Captura-de-pantalla-2026-07-07-153540.png)
![Clonación Repositorio](/img_quijon/Captura-de-pantalla-2026-07-07-211115.png)
![Nginx Funcionando](/img_quijon/Captura-de-pantalla-2026-07-07-221533.png)

_(Añadir aquí la captura de \`sudo nginx -t\` con nombre test_nginx.png cuando la tengas)_
_(Añadir aquí la captura de tu sitio web cargando en el navegador con nombre sitio_react.png cuando la tengas)_`,
  },
  {
    slug: "prompts",
    title: "Bitácora de uso de IA (Transversal)",
    content: `# Bitácora de uso de IA

**Herramienta utilizada:** Gemini

**Propósito:**

Esta wiki fue creada para organizar el contenido de laboratorio de manera clara y navegable.

**Prompts utilizados:**

1. Se solicitó un desarrollador senior con 20 años de experiencia para:
   - Desarrollar un sitio con tecnologías React y Vite
   - Aplicar temática y paleta de colores de Matrix
   - Crear una aplicación wiki que muestre la información ubicada en la carpeta docs_quijon

2. Se pidió explicación completa y detallada de todos los comandos plasmados en la guía para mayor comprensión.

3. Se solicitó corrección de faltas ortográficas y tono técnico en el informe.`,
  },
];
