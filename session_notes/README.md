# Notas de Sesion - K2 Rent

## Objetivo del Proyecto
- Crear una landing page moderna para K2 Rent enfocada en arriendo y leasing flexible de vehiculos.
- Mantener estetica en tonos azules inspirada en Viento Sur Seguros, con estilo tipo SmartyCar.

## Avances Realizados
- `index.html` usa imagenes locales desde `media/` para la flota y hero.
- Se configuraron favicons: data URI embebida en el `<head>` y respaldo `favicon.svg?v=2` para forzar refresco en navegadores/GitHub Pages.
- Hero, flota, planes, empresas y contacto mantienen comportamiento responsive y scroll suave.

## Pendientes / Ideas
- Evaluar reemplazar la imagen de la seccion Empresas por un recurso propio/local para evitar hotlink.
- Conectar el formulario a un servicio (Formspree, webhook o backend propio) y agregar validaciones extra para telefono.
- Externalizar CSS y JS a archivos separados (`css/styles.css`, `js/app.js`) para mantenimiento y cache.
- Ejecutar pruebas de rendimiento/accesibilidad (Lighthouse) y revisar atributos `alt` y contenidos SEO.

## Notas adicionales
- Mantener esta carpeta `session_notes` actualizada en cada sesion para recordar el estado del proyecto.
- Ultima actualizacion: 2025-10-28 00:38
