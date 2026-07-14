# Permisos por línea de comandos

![Creación y Permisos Base](../doc_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20140504.png)
![Modificación chmod/chown](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20141142.png)
![Permisos Especiales](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20144443.png)

**Traducción de permisos (-rw-rw-r--):**
Indica que el archivo es regular (-). El dueño (user) tiene permisos de lectura y escritura (rw-). El grupo asignado (group) también tiene lectura y escritura (rw-). Cualquier otro usuario (others) solo tiene permiso de lectura (r--).

**chmod numérico vs simbólico:**

- **Numérico (ej. 644):** Utiliza una suma octal donde Lectura (r) = 4, Escritura (w) = 2, Ejecución (x) = 1. Es rápido para establecer todos los permisos de golpe.
- **Simbólico (ej. u+x, go-rwx):** Utiliza letras para Usuario (u), Grupo (g) y Otros (o), añadiendo (+) o quitando (-) permisos específicos (r, w, x). Es ideal para modificar un solo parámetro sin afectar el resto.

**¿Qué hace chown?**
Cambia el propietario (dueño) y/o el grupo al que pertenece un archivo o directorio en el sistema.

**Permisos especiales (setgid y sticky bit):**

- **setgid (letra 's' en el grupo, ej. drwxrwsr-x):** Cuando se aplica a un directorio compartido, obliga a que cualquier archivo nuevo creado dentro de él herede el grupo del directorio, en lugar del grupo principal del usuario que lo creó. Ideal para trabajo colaborativo.
- **sticky bit (letra 't' en otros, ej. en /tmp):** Evita el caos en directorios públicos. Garantiza que solo el propietario de un archivo (o el usuario root) pueda renombrar o eliminar ese archivo, incluso si otros usuarios tienen permisos de escritura totales sobre el directorio contenedor.
