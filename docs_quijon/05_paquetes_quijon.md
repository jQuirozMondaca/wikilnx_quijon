# Gestores de paquetes (apt)

![Apt Search](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20144726.png)
![Apt Show](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20145314.png)
![Apt Install](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20145740.png)
![Systemctl Nginx](../docs_quijon/img_quijon/Captura%20de%20pantalla%202026-07-07%20205916.png)

**Flujo de gestión (update -> search -> show -> install):**

1. **update:** Sincroniza la lista local del sistema con los repositorios remotos para conocer las últimas versiones disponibles.
2. **search:** Permite buscar un paquete o herramienta específica por su nombre o descripción dentro del catálogo actualizado.
3. **show:** Muestra los metadatos técnicos del paquete antes de instalarlo (versión, tamaño, dependencias). Fundamental para la factibilidad.
4. **install:** Descarga los binarios, resuelve e instala automáticamente las dependencias necesarias y configura el software en el sistema.

**Criterio de factibilidad:**
Ante la necesidad de monitorear procesos, evaluamos alternativas como top (nativo) y htop (interactivo). Tras usar apt show htop, confirmamos que su peso de descarga es mínimo (aprox 177 kB) y sus dependencias son librerías estándar. Por su excelente relación costo/beneficio operativo, htop resulta la alternativa más factible.
