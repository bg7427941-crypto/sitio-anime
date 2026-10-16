# Revisión de Dependabot: PR 5 y 6

Revisión del 15 de octubre de 2026 (Chicago). Base comprobada: `main` en `f8fe88c`, árbol limpio y bloques anteriores integrados. **No se fusiona ningún PR**. Los resultados corresponden a los SHA indicados; una actualización posterior requiere revisar el diff y su CI otra vez.

## PR 5: htmlparser2 10.1.0 → 12.0.0

[PR 5](https://github.com/bg7427941-crypto/sitio-anime/pull/5), SHA `dc261f4`. Riesgo **medio**, por dos versiones mayores en la herramienta de comprobación de enlaces.

- [v11](https://github.com/fb55/htmlparser2/releases/tag/v11.0.0): solo ESM, Node mínimo 20.19, retirada de `parseDOM` y nuevas versiones mayores de domhandler/domutils/entities. El sitio usa Node 24 e `import { Parser }`, sin `require`, `parseDOM` ni acceso a esas estructuras internas.
- [v12](https://github.com/fb55/htmlparser2/releases/tag/v12.0.0): ajusta el análisis HTML a WHATWG. Cambia raw-text/RCDATA, textarea, comentarios, SVG/MathML y cierres implícitos. Estos cambios pueden variar qué enlaces descubre una herramienta; las pruebas y las 682 referencias del build actual pasan. No se afirma compatibilidad con cualquier HTML futuro.
- La actualización directa es de desarrollo: no modifica el código del navegador ni autoriza contenido, vídeo o derechos. El saneamiento de Markdown conserva sus propias dependencias del lockfile.

**Recomendación:** apto para que otra persona apruebe y fusione, si el SHA y los checks siguen vigentes. No hizo falta corregir la rama.

## PR 6: grupo de GitHub Actions

[PR 6](https://github.com/bg7427941-crypto/sitio-anime/pull/6), SHA `e632bbb`. Riesgo **medio**, por seis acciones con cambios mayores y efectos en CI, caché y el informe semanal.

| Actualización y fuentes oficiales                                                                                                                                                                                                       | Incompatibilidad o riesgo revisado                                                                                                                                                            | Aplicación al repositorio                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkout 4→7](https://github.com/actions/checkout/releases/tag/v7.0.0), [migración 6](https://github.com/actions/checkout/releases/tag/v6.0.0), [requisitos](https://github.com/actions/checkout/tree/v7#whats-new)                    | Node 24; runner ≥2.327.1. Credenciales en RUNNER_TEMP; Git autenticado desde una acción Docker necesita ≥2.329.0. v7 bloquea código de forks en pull_request_target/workflow_run por defecto. | Ubuntu alojado, sin esas combinaciones de Docker ni triggers privilegiados. Los dos jobs semanales conservan persist-credentials:false; no se habilita allow-unsafe-pr-checkout. |
| [setup-node 4→7](https://github.com/actions/setup-node/releases/tag/v7.0.0), [5](https://github.com/actions/setup-node/releases/tag/v5.0.0), [6](https://github.com/actions/setup-node/releases/tag/v6.0.0)                             | Node 24, ESM, detección automática de caché y retirada de NODE_AUTH_TOKEN ficticio.                                                                                                           | Node 24 en .nvmrc, cache:npm explícito y sin publicación npm ni dependencia de ese token.                                                                                        |
| [cache 4→6](https://github.com/actions/cache/releases/tag/v6.0.0), [5](https://github.com/actions/cache/releases/tag/v5.0.0)                                                                                                            | Node 24 y ESM; runner ≥2.327.1.                                                                                                                                                               | Se conservan las rutas y claves de metadatos; no cambia el ámbito de los triggers.                                                                                               |
| [upload-artifact 4→7](https://github.com/actions/upload-artifact/releases/tag/v7.0.0), [6](https://github.com/actions/upload-artifact/releases/tag/v6.0.0)                                                                              | Node 24 y ESM; archive:false limita subidas directas a un archivo y cambia su nombre.                                                                                                         | No se configura archive:false: siguen los ZIP, nombres y include-hidden-files:true explícito.                                                                                    |
| [download-artifact 4→8](https://github.com/actions/download-artifact/releases/tag/v8.0.0), [5](https://github.com/actions/download-artifact/releases/tag/v5.0.0), [7](https://github.com/actions/download-artifact/releases/tag/v7.0.0) | Cambio de rutas para un único artifact-id; Node 24, ESM y fallo ante digest incorrecto.                                                                                                       | Se descarga por nombre a reports/, por lo que no aplica el cambio por ID. Se conserva la comprobación estricta de integridad.                                                    |
| [github-script 7→9](https://github.com/actions/github-script/releases/tag/v9.0.0), [8](https://github.com/actions/github-script/releases/tag/v8.0.0)                                                                                    | Node 24; require('@actions/github') deja de funcionar; getOctokit es ahora un parámetro inyectado.                                                                                            | El script usa require de node:fs/promises, import dinámico local y el cliente github inyectado. No importa @actions/github ni declara getOctokit.                                |

**Recomendación:** apto para revisión y fusión humana, con los checks vigentes. El CI remoto del propio PR ya ejecutó checkout/setup-node/upload actualizados correctamente. No hizo falta modificar la rama. Los caminos exclusivos de ejecución diaria/semanal (caché, descarga y publicación real) requieren observar su primera ejecución después de fusionar; no se lanzó el workflow semanal ni se abrió un issue de mantenimiento como prueba. Las pruebas locales del publicador usan una API simulada y no sustituyen esa evidencia operativa.

## Comandos y resultados por actualización

Cada PR se probó por separado en un worktree con `npm ci` y su propio lockfile:

```sh
npm run lint
npm run check
npm run test:unit
npm run build
npm test
npm run check:links -- --internal-only
npm run perf
```

Los seis comandos solicitados pasan en **ambos** PR: Astro/TypeScript sin diagnósticos, 15 pruebas unitarias/de integración, 26 de navegador (360/1280 px y temas claro/oscuro), build de 29 páginas y 682 referencias internas correctas. La comprobación adicional de enlaces no consulta destinos externos; sus cuatro destinos se registran como omitidos, no como verificados. Los ensayos Lighthouse se ejecutaron por separado para evitar competencia de CPU.

| Ruta                          | Rendimiento PR 5 | Rendimiento PR 6 | Accesibilidad ambos | CLS ambos |
| ----------------------------- | ---------------: | ---------------: | ------------------: | --------: |
| /                             |               99 |               99 |                 100 |         0 |
| /catalogo/                    |              100 |              100 |                 100 |         0 |
| /series/ecos-de-neon/         |              100 |               99 |                 100 |         0 |
| /episodios/ecos-de-neon/1/    |              100 |              100 |                 100 |         0 |
| /articulos/por-donde-empezar/ |              100 |              100 |                 100 |         0 |

Son mediciones móviles locales con muestras ficticias, sin anuncios ni proveedores de vídeo activos; no equivalen a PageSpeed Insights desplegado. No se añadieron obras, canales, licencias o regiones a producción. Anuncios e indexación conservan su configuración desactivada.
