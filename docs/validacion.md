# Validación de la implementación

Validación local de la versión de demostración: cinco series ficticias, diez episodios sin vídeo y cuatro artículos. El plan original permanece intacto. Los bloques anteriores están en main (`f8fe88c`); esta entrega usa cuatro PR separados con base directa main y no los fusiona. Los resultados por bloque se detallan al final.

## Comprobaciones realizadas

- Instalación repetible con `npm ci`: correcta.
- ESLint y Prettier: correctos.
- TypeScript/Astro: cero errores, advertencias o hints.
- Build estático: correcto, imágenes WebP, sitemap y cabeceras CSP generados.
- Pruebas unitarias/de integración de contenido, caché, enlaces, lanzamiento y mantenimiento: **15 aprobadas en pulido; 21 con el importador del PR #7**. Incluyen descarga simulada de una portada Jikan, reutilización de caché y rechazo de caché de más de siete días sin API.
- Pruebas de navegador: **39 aprobadas**, anchos de 360, 768 y 1280 px. Búsqueda, géneros, favoritos, historial, temas, almacenamiento bloqueado, navegación, SEO y carga del iframe solo al pulsar, con fuente simulada.
- Pruebas de anuncios: **15 aprobadas**, en los tres tamaños. Consentimiento, rechazo, revocación, señal TCF, carga diferida, cambio de viewport durante la carga, reserva de tamaños y separación del reproductor. Proveedores y IDs simulados en un build aislado.
- Axe: sin incidencias A/AA en doce páginas representativas, ambos temas y anchos de 360, 768 y 1280 px. Se generaron 36 capturas de seis vistas y se inspeccionaron muestras de inicio, catálogo, serie, episodio, artículo, favoritos y privacidad.
- Verificador de vídeos: **0 verificados, 0 fallidos, 0 desconocidos, 10 omitidos** por ser placeholders sin vídeo.
- Servidor de desarrollo: inicio, catálogo y episodio responden HTTP 200 con el contenido esperado.

## Lighthouse móvil local

Build de producción, anuncios desactivados, servidor local con CSP. Puntuaciones sobre 100; CLS es el desplazamiento acumulado del diseño.

| Ruta                          | Rendimiento | Accesibilidad | CLS |
| ----------------------------- | ----------: | ------------: | --: |
| /                             |          99 |           100 |   0 |
| /catalogo/                    |         100 |           100 |   0 |
| /series/ecos-de-neon/         |          99 |           100 |   0 |
| /episodios/ecos-de-neon/1/    |         100 |           100 |   0 |
| /articulos/por-donde-empezar/ |         100 |           100 |   0 |

Informes completos de las cinco rutas en `.cache/performance/`; se regeneran con `npm run perf`. La comprobación adicional puntual de favoritos vacío obtuvo rendimiento 100, accesibilidad 100 y CLS 0 (`favoritos-extra.json`); no forma parte de las cinco rutas del script. Estos resultados no son PageSpeed Insights sobre Cloudflare ni una medición con proveedores reales activos.

## Publicación y conexiones externas

La petición real a Jikan recibió un rechazo HTTP 403 del proxy de salida. Se guardaron en el borrador del entorno los dominios `api.jikan.moe`, `cdn.myanimelist.net` y `www.youtube.com`, junto con `install_script` y `start_skill`. Hace falta aplicar y publicar esos ajustes para comprobar la conexión real; las muestras funcionan sin API.

La publicación en Cloudflare Pages, indexación en Google, fuentes de vídeo reales, aprobación de AdSense y configuración de una CMP certificada pertenecen al lanzamiento descrito en el README. Los workflows de mantenimiento ya están en main; corresponde al equipo observar sus ejecuciones programadas. Los PR nuevos siguen separados y sus checks se revisan por rama. No se ha realizado un despliegue de Cloudflare en esta entrega. Los objetivos editoriales de veinte/cincuenta series legales y treinta artículos definitivos siguen pendientes.

## Bloque 1: preparación editorial

`content:report` informa 0 series reales, 5 muestras, 0 artículos definitivos, 4 muestras editoriales y 0 vídeos verificados. Las series tienen entre 208 y 221 palabras con el contador editorial. Las metas 20/50/30 están pendientes y el comando termina correctamente.

Se añadieron pruebas del informe, rechazo de textos cortos y episodios duplicados, creación de borradores, exclusión de metas y prevención de sobrescritura/escape de rutas. La comprobación humana se prepara con un issue específico y un CSV sin datos reales inventados.

## Bloque 2: calidad

Se amplió axe a doce rutas, en ambos temas y en anchos exactos de 360 y 1280 px. Se añadieron recorridos con teclado, foco del iframe simulado, respeto a movimiento reducido, ausencia de desbordamiento y capturas de las cinco plantillas principales. Se corrigió la vuelta del foco desde el último control de preferencias, el foco recortado de portadas y el contraste transitorio al cambiar de tema (el color de los botones cambia sin interpolación), y se reorganizaron los CTA de fichas en móvil.

El comprobador de enlaces recorrió 29 páginas: 682 referencias internas accesibles, cero fallos y cuatro destinos externos con estado desconocido por fallo de red. No se contaron como éxitos. Las pruebas cubren rutas/anclas inexistentes, HEAD frente a GET, 404/410, 403/429/5xx, timeout y bloqueo de destinos privados/redirecciones.

En el bloque anterior, la suite ampliada completó 26 pruebas de navegador aprobadas y nueve pruebas unitarias/de integración; los contadores actuales figuran arriba. Lighthouse móvil local tras el pulido mantiene 99–100 en rendimiento, 100 en accesibilidad y CLS 0 en cinco rutas.

## Bloque 3: lanzamiento

Se probó `preflight` con configuración ausente, datos sintéticos aislados, ads.txt incompatible y CMP obligatoria. El modo normal avisa sin cambiar archivos ni variables; el modo estricto falla si falta configuración. No se han activado anuncios ni quitado noindex.

El tablero contiene las 45 tareas de las fases 0–3, con los tres roles y condiciones de salida del plan. Se verificaron identificadores únicos y exclusión de duplicados al reimportar. Se validó la vista previa; no se importó un tablero remoto ni se inventaron responsables. Las capturas de `lanzamiento.md` describen evidencia esperada en cuentas del equipo, no resultados externos obtenidos aquí.

Se compiló una variante aislada con un origen distinto de example.com y `PUBLIC_INDEXING_ENABLED=false`: inicio conserva `noindex,follow` y robots conserva `Disallow: /`. Esto separa la preparación de dominio de una futura autorización de indexación.

## Bloque 4: mantenimiento

Se añadieron Dependabot y un workflow semanal con jobs separados para diagnóstico y publicación de issues. Actionlint validó los workflows; el binario de validación se descargó del release oficial y se comprobó su SHA-256. El publicador se probó con una API simulada: crea un issue por semana, actualiza su bloque generado al repetir, conserva notas humanas y no cambia el estado de un issue cerrado. No se abrió un issue semanal real durante esta tarea.

Las pruebas distinguen 404/410, autor cambiado, fallos de acceso/red, informes ausentes y resultados antiguos. El workflow usa la hora de inicio de cada ejecución y conserva fallos de los comandos. Los informes se suben explícitamente aunque estén en `.cache`; el job de publicación no instala dependencias. Las pruebas editoriales usan fixtures aisladas para que incorporar series reales no falle por un contador fijo de cinco muestras.

Estado editorial actual: cinco muestras, cero series reales, cero artículos definitivos y diez episodios omitidos. Las metas del plan siguen siendo trabajo del equipo. Anuncios apagados e indexación desactivada por defecto.

Verificación final: las 29 páginas HTML del build conservan noindex y `adsEnabled=false`; robots permanece bloqueado. Los bloques 1–4 anteriores quedaron integrados y validados en main. La entrega actual mantiene esas condiciones y añade los resultados siguientes.

## Entrega actual: revisión de Dependabot e importación

Dependabot #5 y #6 siguen abiertos. Se revisaron notas oficiales y cambios incompatibles de cada major; los SHA comprobados y riesgos están en el informe del PR #8 (`docs/revision-dependabot.md`). En worktrees separados, ambos pasaron npm ci, lint, check, test:unit (15), build, test (26) y perf. Lighthouse móvil obtuvo 99–100, accesibilidad 100 y CLS 0 en las cinco rutas. Los comentarios recomiendan revisión/fusión humana y no ejecutan una fusión. Las acciones exclusivas de la recompilación diaria o publicación semanal todavía requieren observación real después de una eventual actualización.

El PR #7 incorpora seis pruebas nuevas del importador: CSV con BOM/comillas/CRLF/multilínea, límites editoriales, canal/ID/regiones, declaración de verified, modo seco, borradores, publicación bloqueada de vídeos pendientes, duplicados, rutas maliciosas, sobrescritura y destinos simbólicos. Los datos sintéticos están aislados en directorios temporales; no se incorporan a producción ni se consultan fuentes con ellos. Sus 21 pruebas unitarias/de integración, build y CI remota están aprobados. Las metas editoriales siguen sin cumplirse y no hacen fallar el informe.

## Entrega actual: primer artefacto Pages

El PR #9 añade `node scripts/test-pages-build.mjs` y lo ejecuta en CI. Se compiló exclusivamente a `.cache/pages-build` con origen **ficticio** `https://sitio-anime-prueba.pages.dev`: 29 páginas con noindex, anuncios/analítica desactivados, dos hashes CSP ejecutables exactos y sitemap con ocho URL públicas del mismo origen. Se verificaron permisos de YouTube/AdSense en CSP, Open Graph/canónicas, exclusión de muestras/borradores/favoritos y robots bloqueado.

El servidor local aplicó `_headers` y devolvió 200 en rutas existentes y 404 en una ruta inexistente. Astro genera el documento de error como `404.html` con canónica interna `/404/`, sin indexación. En copias temporales del build se alteraron por separado robots, hash CSP, canónica, noindex y adsEnabled: las cinco alteraciones fueron rechazadas. La CI del PR #9 está aprobada.

Los campos del panel Pages se contrastaron con su guía oficial de Astro; `docs/lanzamiento.md` separa los resultados locales de las capturas y comandos que faltan en la cuenta real. No se creó proyecto, dominio, despliegue, propiedad Search Console ni aprobación publicitaria.

## Entrega actual: diseño y páginas legales

El pulido conserva las dimensiones de portadas/reproductor y las reservas publicitarias. Añade acentos por tarjeta, etiquetas de muestra más legibles, nota editorial en el héroe y un estado vacío de favoritos ilustrado con CSS. La lista se revela después de leer el almacenamiento, con espacio reservado; eliminar un favorito devuelve el foco al siguiente control disponible o a explorar. El icono de salida forma parte del enlace legal del reproductor, para que no quede huérfano en móvil. No requiere imágenes externas ni animaciones nuevas.

Se generaron **36 capturas nuevas** (seis vistas × dos temas × tres tamaños) en `.cache/visual`. Las 39 pruebas de navegador pasan, incluyendo axe A/AA en doce rutas para los tres tamaños, foco, almacenamiento bloqueado y movimiento reducido. Las 15 pruebas publicitarias usan proveedores simulados en `.cache/ads-build`; no activan anuncios de producción. Lint, Prettier, Astro/TypeScript y build pasan. Las cinco rutas Lighthouse mantienen 99–100, accesibilidad 100 y CLS 0; favoritos vacío también obtiene 100/100 y CLS 0 en una medición adicional.

Privacidad se cotejó con `storage.ts`, `client.ts`, `services.ts` y `cmp.ts`: persistencia local y renovación del consentimiento a 180 días; YouTube tras clic separado; analítica por su categoría; CMP después de aceptar anuncios cuando se exige; AdSense además sujeto a TCF. Se aclaran datos técnicos de terceros, límites de revocación y ausencia de formulario en contacto. El aviso de estado usa la configuración del build. Derechos exige revisión de titular, idioma, incrustación y regiones sin atribuir esa función al verificador automático. El equipo debe completar identidad, correo, jurisdicción, conservación y proveedor real, y controlar cualquier inyección del alojamiento.

`TODO.md` recoge el trabajo de P1/P2/P3: revisiones, cuentas, primer despliegue real, dominio/variables/contacto, permisos y contenido, maquetas, vídeos por región, CMP y monetización futura. El código y las pruebas no sustituyen esas decisiones ni habilitan anuncios o indexación.
