import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

describe('Documentation Website Tests', () => {
  const docsDir = join(__dirname, '..', 'docs');
  const siteDir = join(__dirname, '..', 'site');

  // Build the site before running tests
  beforeAll(() => {
    try {
      execSync('mkdocs build', { 
        cwd: join(__dirname, '..'),
        stdio: 'pipe' 
      });
    } catch (e: any) {
      console.error('MkDocs build failed:', e.stderr?.toString());
      throw e;
    }
  });

  describe('MkDocs Configuration', () => {
    const mkdocsPath = join(__dirname, '..', 'mkdocs.yml');

    it('should have mkdocs.yml config file', () => {
      expect(existsSync(mkdocsPath)).toBe(true);
    });

    it('should have correct site name', () => {
      const config = readFileSync(mkdocsPath, 'utf-8');
      expect(config).toContain('site_name: Examark');
    });

    it('should have header tabs enabled', () => {
      const config = readFileSync(mkdocsPath, 'utf-8');
      expect(config).toContain('navigation.tabs');
    });

    it('should have Material theme configured', () => {
      const config = readFileSync(mkdocsPath, 'utf-8');
      expect(config).toContain('name: material');
    });
  });

  describe('Documentation Source Files', () => {
    it('should have index.md homepage', () => {
      expect(existsSync(join(docsDir, 'index.md'))).toBe(true);
    });

    it('should have getting-started.md', () => {
      expect(existsSync(join(docsDir, 'getting-started.md'))).toBe(true);
    });

    it('should have formats.md input guide', () => {
      expect(existsSync(join(docsDir, 'formats.md'))).toBe(true);
    });

    it('should have reference.md commands reference', () => {
      expect(existsSync(join(docsDir, 'reference.md'))).toBe(true);
    });

    it('should have emulator.md', () => {
      expect(existsSync(join(docsDir, 'emulator.md'))).toBe(true);
    });

    it('should have troubleshooting.md', () => {
      expect(existsSync(join(docsDir, 'troubleshooting.md'))).toBe(true);
    });

    it('should have contributing.md', () => {
      expect(existsSync(join(docsDir, 'contributing.md'))).toBe(true);
    });

    it('should have tutorials directory', () => {
      expect(existsSync(join(docsDir, 'tutorials'))).toBe(true);
    });

    it('should have extensions directory', () => {
      expect(existsSync(join(docsDir, 'extensions'))).toBe(true);
    });
  });

  describe('Tutorial Pages', () => {
    const tutorialsDir = join(docsDir, 'tutorials');

    it('should have tutorials index', () => {
      expect(existsSync(join(tutorialsDir, 'index.md'))).toBe(true);
    });

    it('should have quarto tutorial', () => {
      expect(existsSync(join(tutorialsDir, 'quarto.md'))).toBe(true);
    });

    it('should have dynamic-exams tutorial', () => {
      expect(existsSync(join(tutorialsDir, 'dynamic-exams.md'))).toBe(true);
    });

    it('should have vscode-snippets tutorial', () => {
      expect(existsSync(join(tutorialsDir, 'vscode-snippets.md'))).toBe(true);
    });
  });

  describe('Extension Documentation', () => {
    const extensionsDir = join(docsDir, 'extensions');

    it('should have quarto extension docs', () => {
      expect(existsSync(join(extensionsDir, 'quarto.md'))).toBe(true);
    });

    it('should document all output formats', () => {
      const content = readFileSync(join(extensionsDir, 'quarto.md'), 'utf-8');
      expect(content).toContain('exam-gfm');
      expect(content).toContain('exam-html');
      expect(content).toContain('exam-pdf');
    });
  });

  describe('Homepage Content', () => {
    it('should have features section', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('Features');
    });

    it('should have quick start section', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('Quick Start');
    });

    it('should have npm badge', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('img.shields.io/npm/v/examark');
    });

    it('should have CI status badge', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('ci.yml');
    });

    it('should have workflow diagram', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('mermaid');
    });

    it('should have templates section', () => {
      const content = readFileSync(join(docsDir, 'index.md'), 'utf-8');
      expect(content).toContain('Templates');
      expect(content).toContain('starter-exam-md.md');
    });
  });

  describe('Formats Guide Content', () => {
    it('should document all question types', () => {
      const content = readFileSync(join(docsDir, 'formats.md'), 'utf-8');
      expect(content).toContain('Multiple Choice');
      expect(content).toContain('True / False');
      expect(content).toContain('Multiple Answers');
      expect(content).toContain('Short Answer');
      expect(content).toContain('Essay');
    });

    it('should have answer marker documentation', () => {
      const content = readFileSync(join(docsDir, 'formats.md'), 'utf-8');
      expect(content).toContain('**Bold**');
      expect(content).toContain('[correct]');
    });

    it('should document LaTeX math', () => {
      const content = readFileSync(join(docsDir, 'formats.md'), 'utf-8');
      expect(content).toContain('LaTeX');
      expect(content).toContain('$...$');
    });

    it('should document image handling', () => {
      const content = readFileSync(join(docsDir, 'formats.md'), 'utf-8');
      expect(content).toContain('Images');
      expect(content).toContain('bundled');
    });
  });

  describe('Built Site Structure', () => {
    it('should build site directory', () => {
      expect(existsSync(siteDir)).toBe(true);
    });

    it('should generate index.html', () => {
      expect(existsSync(join(siteDir, 'index.html'))).toBe(true);
    });

    it('should generate getting-started page', () => {
      expect(existsSync(join(siteDir, 'getting-started', 'index.html'))).toBe(true);
    });

    it('should generate formats page', () => {
      expect(existsSync(join(siteDir, 'formats', 'index.html'))).toBe(true);
    });

    it('should generate tutorials section', () => {
      expect(existsSync(join(siteDir, 'tutorials', 'index.html'))).toBe(true);
    });

    it('should generate quarto extension page', () => {
      expect(existsSync(join(siteDir, 'extensions', 'quarto', 'index.html'))).toBe(true);
    });

    it('should include stylesheets', () => {
      expect(existsSync(join(siteDir, 'stylesheets'))).toBe(true);
    });
  });

  describe('Navigation Structure', () => {
    it('should have Guide section in nav', () => {
      const config = readFileSync(join(__dirname, '..', 'mkdocs.yml'), 'utf-8');
      expect(config).toContain('Guide:');
    });

    it('should have Tutorials section in nav', () => {
      const config = readFileSync(join(__dirname, '..', 'mkdocs.yml'), 'utf-8');
      expect(config).toContain('Tutorials:');
    });

    it('should have Quarto Extension in nav', () => {
      const config = readFileSync(join(__dirname, '..', 'mkdocs.yml'), 'utf-8');
      expect(config).toContain('Quarto Extension:');
    });
  });
});
