# Pendientes del equipo

El código conserva anuncios apagados y noindex. Los checks con muestras no cumplen las condiciones editoriales ni externas del plan. Cada entrega requiere revisión de otra persona. Roles sin nombres asignados: completar usuarios y equipos reales, sin inventarlos.

## P1 — Infraestructura y datos

- [ ] Revisar los PR de esta entrega y los de Dependabot #5/#6; comprobar SHA y CI antes de fusionar. Todos los bloques nuevos apuntan a `main`; no fusionar en una rama intermedia.
- [ ] Proteger `main`, exigir `validate` y revisión de otra persona. Invitar a P2/P3 y rellenar/descomentar CODEOWNERS; sus marcadores actuales no asignan revisores.
- [ ] Crear el proyecto **Cloudflare Pages** conectado a GitHub con Node 24, `npm run build`, salida `dist` y producción desde `main`. Ejecutar el procedimiento y guardar las capturas de `docs/lanzamiento.md`.
- [ ] Elegir con P3 nombre y dominio, configurar variables de producción/preview y verificar TLS, canónicas, sitemap, CSP y 404 reales. Mantener `PUBLIC_INDEXING_ENABLED=false` y `PUBLIC_ADS_ENABLED=false`.
- [ ] Desactivar la inyección automática de Web Analytics en Pages; una futura analítica se cargará desde el sitio tras consentimiento. No activar servicios durante el primer despliegue de prueba.
- [ ] Confirmar conexión y condiciones vigentes de Jikan/MyAnimeList y permisos de portadas con obras aportadas por P3. Aplicar los ajustes de red guardados del entorno si siguen pendientes; un 403 de red no es evidencia de datos correctos.
- [ ] Crear o elegir un tablero GitHub Projects y ejecutar primero `npm run project:plan`; revisar las 45 tareas antes de importar con propietario/número reales.
- [ ] Configurar el secreto `CLOUDFLARE_DEPLOY_HOOK` si se quiere publicar la recompilación diaria. No ponerlo en `PUBLIC_`, archivos o capturas.
- [ ] Observar las primeras ejecuciones diaria y semanal reales: restauración de caché, artefactos ocultos, descarga con integridad y creación/actualización de un único issue. Las pruebas del publicador son simuladas.
- [ ] Registrar el sitio en Search Console con P3 y medir PageSpeed Insights sobre el despliegue. La verificación de propiedad y los resultados locales no prueban indexación ni tráfico.

## P2 — Frontend y diseño

- [ ] Revisar las capturas de inicio, catálogo, serie, episodio, artículo y favoritos en 360/768/1280 px y ambos temas. Validar con el equipo nombre, identidad y maquetas compartidas.
- [ ] Comprobar en el dominio real teclado, foco, cookies, lector de pantalla y almacenamiento deshabilitado; probar dispositivos reales además de Chromium emulado.
- [ ] Probar un episodio y una alternativa legal aportados por P3 desde los países/idiomas revisados. El iframe simulado no demuestra incrustación ni disponibilidad de una fuente real.
- [ ] Revisar portadas y hero reales sin perder dimensiones reservadas, legibilidad, movimiento reducido, rendimiento móvil >90 y CLS bajo. Repetir la medición después de integrar proveedores reales.
- [ ] Cuando P3 determine si aplica, seleccionar y configurar una CMP certificada con sus mensajes y señal TCF; adaptar la CSP a sus dominios y verificar rechazo, aceptación y retirada en la cuenta del equipo.
- [ ] Revisar con P3 las páginas legales cada vez que cambien proveedores, almacenamiento o métricas. El banner propio no acredita una CMP certificada.

## P3 — Contenido, SEO y monetización

- [ ] Decidir país, idioma, nombre definitivo, dominio, titular y correo real de contacto/reclamaciones con el equipo. Completar privacidad, jurisdicción, conservación y ejercicio de derechos.
- [ ] Aportar la lista de series en el CSV documentado: título y metadatos comprobados, textos originales de 150–300 palabras, portadas/hero y evidencia de permiso. Usar primero `content:import --dry-run` y revisar cada borrador.
- [ ] Completar un issue manual por episodio: titular/licenciatario, canal y vínculo con el titular, vídeo completo, audio/subtítulos, regiones comprobadas, permiso de incrustación, fecha, revisor y alternativa legal específica.
- [ ] Revisar cada `verified` declarado en el CSV. El importador no consulta fuentes ni transforma una declaración humana en licencia; publicar el borrador necesita otra revisión.
- [ ] Cumplir metas con contenido real: 20 series para fases 0/1; después 50 series y 30 artículos definitivos para fase 2. Las cinco ficciones y cuatro artículos de muestra no cuentan.
- [ ] Asignar quién atiende avisos de derechos y retiradas/correcciones en 24 horas; revisar semanalmente vídeos, enlaces desconocidos y alternativas por región.
- [ ] Preparar publicaciones editoriales y cuentas sociales del plan; revisar búsquedas y tráfico orgánico real con P1. Solicitar indexación mediante una tarea posterior autorizada, tras revisar contenido y acceso público.
- [ ] Para una futura monetización: confirmar requisitos vigentes, solicitar y obtener aprobación de AdSense, cliente/slots y línea exacta de ads.txt; decidir CMP según el público con P2 y actualizar privacidad.
- [ ] Acordar por escrito titular de cobros, reparto de ingresos y hoja mensual de visitas/ingresos. Mantener Auto ads, anclas y viñetas desactivados para respetar los espacios manuales.

## Decisiones de los tres

- [ ] Asignar personas reales a P1/P2/P3, dedicación semanal y revisiones cruzadas.
- [ ] Aprobar evidencia de cada condición de salida del plan antes de declararla completada.
- [ ] La activación de anuncios y la retirada de noindex serán tareas explícitas posteriores. Este TODO no las autoriza ni las ejecuta.
