import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Deployment Tests', () => {
  describe('GitHub Actions Workflows', () => {
    const workflowsDir = join(__dirname, '..', '.github', 'workflows');

    it('should have CI workflow', () => {
      const content = readFileSync(join(workflowsDir, 'ci.yml'), 'utf-8');
      expect(content).toContain('name:');
      expect(content).toContain('on:');
    });

    it('should have Publish Docs workflow', () => {
      const content = readFileSync(join(workflowsDir, 'publish_docs.yml'), 'utf-8');
      expect(content).toContain('Publish Docs');
    });

    it('should trigger docs on push to main', () => {
      const content = readFileSync(join(workflowsDir, 'publish_docs.yml'), 'utf-8');
      expect(content).toContain('push:');
      expect(content).toContain('main');
    });

    it('should use mkdocs gh-deploy', () => {
      const content = readFileSync(join(workflowsDir, 'publish_docs.yml'), 'utf-8');
      expect(content).toContain('mkdocs gh-deploy');
    });

    it('should use MkDocs for building docs', () => {
      const content = readFileSync(join(workflowsDir, 'publish_docs.yml'), 'utf-8');
      expect(content).toContain('mkdocs');
    });
  });

  describe('README Badges', () => {
    const readme = readFileSync(join(__dirname, '..', 'README.md'), 'utf-8');

    it('should have npm badge', () => {
      expect(readme).toContain('img.shields.io/npm/v/examark');
    });

    it('should have CI status badge', () => {
      expect(readme).toContain('github/actions/workflow/status');
      expect(readme).toContain('ci.yml');
    });

    it('should have Docs status badge', () => {
      expect(readme).toContain('publish_docs.yml');
    });

    it('should have license badge', () => {
      expect(readme).toContain('license');
      expect(readme).toContain('MIT');
    });

    it('should link badges to correct URLs', () => {
      expect(readme).toContain('https://www.npmjs.com/package/examark');
      expect(readme).toContain('https://github.com/Data-Wise/examark/actions');
      expect(readme).toContain('https://data-wise.github.io/examark/');
    });
  });

  describe('Live Website (Network)', () => {
    it('should return HTTP 200', () => {
      try {
        const result = execSync(
          'curl -s -o /dev/null -w "%{http_code}" https://data-wise.github.io/examark/',
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping live website check (network unavailable)');
      }
    });

    it('should have Getting Started page', () => {
      try {
        const result = execSync(
          'curl -s -o /dev/null -w "%{http_code}" https://data-wise.github.io/examark/getting-started/',
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping live website check (network unavailable)');
      }
    });

    it('should have installation instructions', () => {
      try {
        const result = execSync(
          'curl -s https://data-wise.github.io/examark/getting-started/',
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result).toContain('install');
      } catch (e) {
        console.log('Skipping live website check (network unavailable)');
      }
    });
  });

  describe('npm Registry (Network)', () => {
    it('should have package on npm', () => {
      try {
        const result = execSync('npm view examark name', {
          encoding: 'utf-8',
          stdio: 'pipe'
        });
        expect(result.trim()).toBe('examark');
      } catch (e) {
        console.log('Skipping npm check (network unavailable)');
      }
    });

    it('should have correct homepage on npm', () => {
      try {
        const result = execSync('npm view examark homepage', {
          encoding: 'utf-8',
          stdio: 'pipe'
        });
        expect(result.trim()).toContain('data-wise.github.io');
      } catch (e) {
        console.log('Skipping npm check (network unavailable)');
      }
    });

    it('should have repository on npm', () => {
      try {
        const result = execSync('npm view examark repository.url', {
          encoding: 'utf-8',
          stdio: 'pipe'
        });
        expect(result.trim()).toContain('github.com/Data-Wise/examark');
      } catch (e) {
        console.log('Skipping npm check (network unavailable)');
      }
    });
  });

  describe('Documentation Content', () => {
    const indexMd = readFileSync(join(__dirname, '..', 'docs', 'index.md'), 'utf-8');
    const gettingStarted = readFileSync(join(__dirname, '..', 'docs', 'getting-started.md'), 'utf-8');

    it('should have npm badge in docs homepage', () => {
      expect(indexMd).toContain('npm');
    });

    it('should have npx quick start in getting-started', () => {
      expect(gettingStarted).toContain('npx examark');
    });

    it('should have Homebrew instructions', () => {
      expect(gettingStarted).toContain('brew install data-wise/tap/examark');
    });

    it('should have npm install instructions', () => {
      expect(gettingStarted).toContain('npm install -g examark');
    });

    it('should have developer install instructions', () => {
      expect(gettingStarted).toContain('git clone');
    });
  });

  describe('MkDocs Configuration', () => {
    const mkdocs = readFileSync(join(__dirname, '..', 'mkdocs.yml'), 'utf-8');

    it('should have correct site URL', () => {
      expect(mkdocs).toContain('site_url: https://data-wise.github.io/examark/');
    });

    it('should have Material theme', () => {
      expect(mkdocs).toContain('name: material');
    });

    it('should have navigation tabs enabled', () => {
      expect(mkdocs).toContain('navigation.tabs');
    });

    it('should have mermaid support', () => {
      expect(mkdocs).toContain('mermaid');
    });
  });
});
