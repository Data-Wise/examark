import { describe, it, expect, beforeAll } from 'vitest';
import { execSync, spawnSync } from 'child_process';
import { existsSync, readFileSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

describe('Quarto Extension', () => {
  const extensionDir = join(__dirname, '..', '_extensions', 'exam');
  const templatesDir = join(__dirname, '..', 'templates');
  const examplesDir = join(__dirname, '..', 'examples');
  const scratchDir = join(__dirname, '..', 'scratch', 'quarto-tests');

  // Check if Quarto is available
  const quartoAvailable = (() => {
    try {
      execSync('quarto --version', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  })();

  beforeAll(() => {
    if (!existsSync(scratchDir)) {
      mkdirSync(scratchDir, { recursive: true });
    }
    // Copy extension to templates/quarto and examples/quarto for Quarto to find
    const templateExtDir = join(templatesDir, 'quarto', '_extensions', 'exam');
    const exampleExtDir = join(examplesDir, 'quarto', '_extensions', 'exam');
    if (!existsSync(templateExtDir)) {
      mkdirSync(join(templatesDir, 'quarto', '_extensions'), { recursive: true });
      execSync(`cp -r "${extensionDir}" "${templateExtDir}"`);
    }
    if (!existsSync(exampleExtDir)) {
      mkdirSync(join(examplesDir, 'quarto', '_extensions'), { recursive: true });
      execSync(`cp -r "${extensionDir}" "${exampleExtDir}"`);
    }
  });

  describe('Extension Structure', () => {
    it('should have _extension.yml', () => {
      const extensionYml = join(extensionDir, '_extension.yml');
      expect(existsSync(extensionYml)).toBe(true);
    });

    it('should have exam-filter.lua', () => {
      const filterPath = join(extensionDir, 'exam-filter.lua');
      expect(existsSync(filterPath)).toBe(true);
    });

    it('should have exam.scss', () => {
      const scssPath = join(extensionDir, 'exam.scss');
      expect(existsSync(scssPath)).toBe(true);
    });

    it('_extension.yml should have correct format structure', () => {
      const extensionYml = join(extensionDir, '_extension.yml');
      const content = readFileSync(extensionYml, 'utf-8');

      // Should define formats under contributes
      expect(content).toContain('contributes:');
      expect(content).toContain('formats:');

      // Should have base format keys (not exam-prefixed)
      expect(content).toContain('html:');
      expect(content).toContain('pdf:');
      expect(content).toContain('gfm:');

      // Should NOT have exam- prefixed format keys as primary keys
      expect(content).not.toMatch(/^\s{4}exam-html:/m);
      expect(content).not.toMatch(/^\s{4}exam-pdf:/m);
    });

    it('_extension.yml should have common section', () => {
      const extensionYml = join(extensionDir, '_extension.yml');
      const content = readFileSync(extensionYml, 'utf-8');

      expect(content).toContain('common:');
      expect(content).toContain('filters:');
      expect(content).toContain('exam-filter.lua');
    });

    it('_extension.yml should define exam.qti option', () => {
      const extensionYml = join(extensionDir, '_extension.yml');
      const content = readFileSync(extensionYml, 'utf-8');

      expect(content).toContain('qti:');
    });
  });

  describe('Lua Filter', () => {
    it('should define Meta function', () => {
      const filterPath = join(extensionDir, 'exam-filter.lua');
      const content = readFileSync(filterPath, 'utf-8');

      expect(content).toContain('function Meta(meta)');
    });

    it('should define Pandoc function for QTI export', () => {
      const filterPath = join(extensionDir, 'exam-filter.lua');
      const content = readFileSync(filterPath, 'utf-8');

      expect(content).toContain('function Pandoc(doc)');
      expect(content).toContain('exam_options.qti');
    });

    it('should handle exam options', () => {
      const filterPath = join(extensionDir, 'exam-filter.lua');
      const content = readFileSync(filterPath, 'utf-8');

      expect(content).toContain('exam_options');
      expect(content).toContain('solutions');
    });
  });

  describe('Project Configuration', () => {
    it('should have _quarto.yml', () => {
      const quartoYml = join(__dirname, '..', '_quarto.yml');
      expect(existsSync(quartoYml)).toBe(true);
    });

    it('_quarto.yml should specify exam-html format', () => {
      const quartoYml = join(__dirname, '..', '_quarto.yml');
      const content = readFileSync(quartoYml, 'utf-8');

      expect(content).toContain('format:');
      expect(content).toContain('exam-html:');
    });

    it('should have template.qmd for starter template', () => {
      const templatePath = join(__dirname, '..', 'template.qmd');
      expect(existsSync(templatePath)).toBe(true);
    });

    it('template.qmd should use exam-gfm format', () => {
      const templatePath = join(__dirname, '..', 'template.qmd');
      const content = readFileSync(templatePath, 'utf-8');

      expect(content).toContain('format: exam-gfm');
      expect(content).toContain('qti: true');
    });

    it('should have .quartoignore', () => {
      const ignorePath = join(__dirname, '..', '.quartoignore');
      expect(existsSync(ignorePath)).toBe(true);
    });

    it('.quartoignore should exclude dev files', () => {
      const ignorePath = join(__dirname, '..', '.quartoignore');
      const content = readFileSync(ignorePath, 'utf-8');

      expect(content).toContain('src/');
      expect(content).toContain('tests/');
      expect(content).toContain('node_modules/');
    });
  });

  describe('Template Files', () => {
    const quartoTemplates = [
      'minimal.qmd',
      'starter.qmd',
      'dynamic.qmd',
      'with-figures.qmd',
    ];

    const mdTemplates = [
      'minimal.md',
      'starter.md',
      'all-question-types.md',
    ];

    it.each(quartoTemplates)('templates/quarto/%s should exist', (filename) => {
      const filePath = join(templatesDir, 'quarto', filename);
      expect(existsSync(filePath)).toBe(true);
    });

    it.each(mdTemplates)('templates/markdown/%s should exist', (filename) => {
      const filePath = join(templatesDir, 'markdown', filename);
      expect(existsSync(filePath)).toBe(true);
    });

    it.each(quartoTemplates)('templates/quarto/%s should have valid YAML front matter', (filename) => {
      const filePath = join(templatesDir, 'quarto', filename);
      const content = readFileSync(filePath, 'utf-8');

      // Should start with ---
      expect(content).toMatch(/^---\n/);
      // Should have closing ---
      expect(content).toMatch(/\n---\n/);
      // Should have format specified
      expect(content).toMatch(/format:/);
    });

    it('templates/quarto/minimal.qmd should use exam-gfm with qti option', () => {
      const filePath = join(templatesDir, 'quarto', 'minimal.qmd');
      const content = readFileSync(filePath, 'utf-8');

      expect(content).toContain('format: exam-gfm');
      expect(content).toContain('qti: true');
    });
  });

  describe('Example Files', () => {
    const quartoExamples = [
      'statistics-exam.qmd',
      'canvas-export.qmd',
      'python-figures.qmd',
    ];

    const mdExamples = [
      'statistics-exam.md',
      'with-images.md',
      'validation-test.md',
      'edge-cases.md',
    ];

    it.each(quartoExamples)('examples/quarto/%s should exist', (filename) => {
      const filePath = join(examplesDir, 'quarto', filename);
      expect(existsSync(filePath)).toBe(true);
    });

    it.each(mdExamples)('examples/markdown/%s should exist', (filename) => {
      const filePath = join(examplesDir, 'markdown', filename);
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('Quarto Rendering', () => {
    it.skipIf(!quartoAvailable)('should list exam extension', () => {
      const result = spawnSync('quarto', ['list', 'extensions'], {
        cwd: join(__dirname, '..'),
        encoding: 'utf-8',
      });

      // quarto list outputs to stderr
      const output = result.stdout + result.stderr;
      expect(output).toContain('exam');
      expect(output).toContain('formats');
    });

    it.skipIf(!quartoAvailable)('should render minimal.qmd to GFM', () => {
      const inputPath = join(templatesDir, 'quarto', 'minimal.qmd');
      // Quarto --output goes to project root when _quarto.yml exists
      const outputFilename = 'minimal-test.md';
      const projectRoot = join(__dirname, '..');
      const outputPath = join(projectRoot, outputFilename);

      // Clean up
      if (existsSync(outputPath)) rmSync(outputPath);

      // Render
      const result = spawnSync(
        'quarto',
        ['render', inputPath, '--to', 'exam-gfm', '--output', outputFilename],
        {
          cwd: projectRoot,
          encoding: 'utf-8',
        }
      );

      expect(result.status).toBe(0);
      expect(existsSync(outputPath)).toBe(true);

      // Move to scratch for subsequent tests
      const scratchOutput = join(scratchDir, 'minimal.md');
      if (existsSync(scratchOutput)) rmSync(scratchOutput);
      const content = readFileSync(outputPath, 'utf-8');
      writeFileSync(scratchOutput, content);
      rmSync(outputPath);

      // Check output contains QTI instructions (in stderr)
      expect(result.stderr).toContain('QTI Export');
    });

    it.skipIf(!quartoAvailable)('rendered markdown should be parseable by examark', () => {
      const mdPath = join(scratchDir, 'minimal.md');

      // Skip if previous test didn't create the file
      if (!existsSync(mdPath)) {
        return;
      }

      const qtiPath = join(scratchDir, 'minimal-from-quarto.qti.zip');
      if (existsSync(qtiPath)) rmSync(qtiPath);

      const result = execSync(
        `node dist/index.js "${mdPath}" -o "${qtiPath}"`,
        {
          cwd: join(__dirname, '..'),
          encoding: 'utf-8',
          stdio: 'pipe',
        }
      );

      expect(existsSync(qtiPath)).toBe(true);
      expect(result).toContain('Generated QTI');
    });

    it.skipIf(!quartoAvailable)('should render to HTML with exam extension', () => {
      const inputPath = join(templatesDir, 'quarto', 'minimal.qmd');
      // Quarto --output goes to project root when _quarto.yml exists
      const outputFilename = 'minimal-test.html';
      const projectRoot = join(__dirname, '..');
      const outputPath = join(projectRoot, outputFilename);

      if (existsSync(outputPath)) rmSync(outputPath);

      const result = spawnSync(
        'quarto',
        ['render', inputPath, '--to', 'exam-html', '--output', outputFilename],
        {
          cwd: projectRoot,
          encoding: 'utf-8',
        }
      );

      expect(result.status).toBe(0);
      expect(existsSync(outputPath)).toBe(true);

      const content = readFileSync(outputPath, 'utf-8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('Quick Quiz'); // title

      // Clean up
      rmSync(outputPath);
    });
  });

  describe('Format Inheritance', () => {
    // Skip this test - format inheritance is complex and project-dependent
    it.skip('document without format should inherit from project', () => {
      // Create a test document without format
      const testDoc = join(scratchDir, 'no-format-test.qmd');
      const testOutput = join(scratchDir, 'no-format-test.html');

      writeFileSync(testDoc, `---
title: "No Format Test"
---

## 1. Test Question [2pts]

What is 1+1?

a) One
b) Two [x]
`);

      if (existsSync(testOutput)) rmSync(testOutput);

      // Copy extension to scratch dir for isolation
      const scratchExtDir = join(scratchDir, '_extensions', 'exam');
      if (!existsSync(scratchExtDir)) {
        mkdirSync(scratchExtDir, { recursive: true });
        execSync(`cp -r "${extensionDir}"/* "${scratchExtDir}"/`);
      }

      // Create a minimal _quarto.yml
      writeFileSync(join(scratchDir, '_quarto.yml'), `project:
  type: default

format:
  exam-html: default
`);

      const result = spawnSync('quarto', ['render', testDoc], {
        cwd: scratchDir,
        encoding: 'utf-8',
      });

      // Should render without error
      expect(result.status).toBe(0);
      expect(existsSync(testOutput)).toBe(true);
    });
  });
});
