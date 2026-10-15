import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { analyzeContent, countWords } from '../scripts/content-report.mjs';
import { createContent } from '../scripts/new-content.mjs';

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'editorial-'));
  try {
    await mkdir(join(root, 'src'), { recursive: true });
    await cp('src/content', join(root, 'src/content'), { recursive: true });
    await cp('src/assets', join(root, 'src/assets'), { recursive: true });
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
test('informe: las muestras no cuentan para metas ni acreditan vídeos reales', async () => {
  const report = await analyzeContent();
  assert.equal(report.invalid, 0);
  assert.equal(report.counts.realSeries, 0);
  assert.equal(report.counts.placeholderSeries, 5);
  assert.equal(report.counts.definitiveArticles, 0);
  assert.equal(report.counts.verifiedVideos, 0);
  assert.deepEqual(
    report.goals.map((g) => g.target),
    [20, 50, 30],
  );
  assert.equal(
    countWords(
      '<!-- comentario --> ## Hola [mundo](https://example.com) ![no cuenta](x.png)',
    ),
    2,
  );
});
test('CLI permite metas pendientes pero rechaza texto inválido y episodios duplicados', async () =>
  fixture(async (root) => {
    const cli = resolve('scripts/content-report.mjs');
    const run = () =>
      spawnSync(process.execPath, [cli], { cwd: root, encoding: 'utf8' });
    assert.equal(run().status, 0);
    const path = join(root, 'src/content/series/ecos-de-neon.md');
    const original = await readFile(path, 'utf8');
    await writeFile(path, original.replace(/---\n\n[\s\S]*/, '---\n\nBreve.'));
    assert.equal(run().status, 1);
    await writeFile(path, original.replace('number: 2', 'number: 1'));
    assert.equal((await analyzeContent(root)).invalid, 1);
  }));
test('generadores no sobrescriben ni escapan de la carpeta y sus borradores no cuentan', async () =>
  fixture(async (root) => {
    const series = await createContent('series', 'nueva-ficha', root);
    const article = await createContent('article', 'nueva-guia', root);
    assert.match(await readFile(series, 'utf8'), /draft: true/);
    assert.match(await readFile(article, 'utf8'), /placeholder: true/);
    await assert.rejects(createContent('series', 'nueva-ficha', root), {
      code: 'EEXIST',
    });
    await assert.rejects(createContent('series', '../../escape', root));
    const report = await analyzeContent(root);
    assert.equal(report.invalid, 0);
    assert.equal(report.counts.drafts, 2);
    assert.equal(report.counts.placeholderSeries, 5);
  }));
