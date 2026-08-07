# Bitácora de Bandas Oligoclonales — Hematología

Aplicación web de escritorio de alto rendimiento y grado clínico para la gestión, registro y emisión de reportes físicos de corridas de bandas oligoclonales en el Laboratorio Clínico (Caja Costarricense de Seguro Social).

## Características Principales

- **Diseño de Escritorio Clínico**: Interfaz optimizada para estaciones de trabajo y monitores de laboratorio (1366x768, 1080p, 1440p+), con alta densidad informativa y sin dependencias externas de fuentes o CDNs.
- **Identidad Institucional CCSS**: Incorpora logotipo oficial de la CCSS en la interfaz principal y en las cabeceras de los reportes impresos.
- **Reportes A4 Listos para Impresión Física**:
  - Formato estandarizado A4 vertical con márgenes técnicos.
  - Inclusión de tabla completa de datos de pacientes (Par, Carriles Suero/LCR, Cédula, ID, Procedencia, Interpretación y Notas).
  - Zona rectangular limpia delimitada para la adhesión/fijación física del gel de electroforesis tras el proceso técnico.
- **Operación 100% Sin Conexión (Offline-First)**:
  - Funciona de forma autónoma mediante Service Worker y almacenamiento local (`localStorage`).
  - Capacidad PWA instalable en navegadores de escritorio (Chrome, Edge, Safari, Firefox).
  - Exportación e importación de copias de seguridad en formato JSON estructurado.
- **Compatibilidad con GitHub Pages y Aplicación de Escritorio**:
  - Rutas relativas compatibles con despliegues en raíz y subcarpetas (`/BANDASOLIGOCLONALES/`).
  - Compatible con empaquetado de escritorio mediante Electron.

## Despliegue en GitHub Pages

1. Suba los archivos de esta carpeta a la rama `main` de su repositorio.
2. En GitHub, diríjase a **Settings → Pages**.
3. En **Build and deployment**, elija **Deploy from a branch**, rama **main** y carpeta `/(root)`.
4. Acceda a la URL generada por GitHub Pages.

## Instalación en Estaciones de Trabajo

Abra la URL de la aplicación en Google Chrome o Microsoft Edge y seleccione **Instalar aplicación** en la barra de direcciones para tener un acceso directo independiente en el escritorio del sistema operativo.
