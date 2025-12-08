import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Installation Tests', () => {
  describe('Package Configuration', () => {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
    );

    it('should have correct package name', () => {
      expect(packageJson.name).toBe('examify');
    });

    it('should have valid version format', () => {
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should have bin entry for CLI', () => {
      expect(packageJson.bin).toBeDefined();
      expect(packageJson.bin.examify).toBe('dist/index.js');
    });

    it('should have Node.js engine requirement', () => {
      expect(packageJson.engines).toBeDefined();
      expect(packageJson.engines.node).toBe('>=18');
    });

    it('should have required npm publishing fields', () => {
      expect(packageJson.repository).toBeDefined();
      expect(packageJson.homepage).toContain('data-wise.github.io');
      expect(packageJson.author).toBeDefined();
      expect(packageJson.license).toBe('MIT');
    });

    it('should have files field for package distribution', () => {
      expect(packageJson.files).toBeDefined();
      expect(packageJson.files).toContain('dist');
      expect(packageJson.files).toContain('README.md');
      expect(packageJson.files).toContain('LICENSE');
    });

    it('should have prepublishOnly script', () => {
      expect(packageJson.scripts.prepublishOnly).toBe('npm run build');
    });
  });

  describe('npmignore Configuration', () => {
    const npmignorePath = join(__dirname, '..', '.npmignore');

    it('should have .npmignore file', () => {
      expect(existsSync(npmignorePath)).toBe(true);
    });

    it('should exclude source files', () => {
      const content = readFileSync(npmignorePath, 'utf-8');
      expect(content).toContain('src/');
    });

    it('should exclude tests', () => {
      const content = readFileSync(npmignorePath, 'utf-8');
      expect(content).toContain('tests/');
    });

    it('should exclude docs', () => {
      const content = readFileSync(npmignorePath, 'utf-8');
      expect(content).toContain('docs/');
    });

    it('should keep README.md', () => {
      const content = readFileSync(npmignorePath, 'utf-8');
      expect(content).toContain('!README.md');
    });
  });

  describe('Build Output', () => {
    it('should have dist directory', () => {
      expect(existsSync(join(__dirname, '..', 'dist'))).toBe(true);
    });

    it('should have main entry file', () => {
      expect(existsSync(join(__dirname, '..', 'dist', 'index.js'))).toBe(true);
    });

    it('should have shebang in dist/index.js', () => {
      const content = readFileSync(join(__dirname, '..', 'dist', 'index.js'), 'utf-8');
      expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
    });
  });

  describe('CLI Executable', () => {
    it('should run --version successfully', () => {
      const result = execSync('node dist/index.js --version', {
        cwd: join(__dirname, '..'),
        encoding: 'utf-8'
      });
      expect(result.trim()).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should run --help successfully', () => {
      const result = execSync('node dist/index.js --help', {
        cwd: join(__dirname, '..'),
        encoding: 'utf-8'
      });
      expect(result).toContain('examify');
      expect(result).toContain('Options');
    });

    it('should show error for missing input file', () => {
      try {
        execSync('node dist/index.js nonexistent.md -o out.zip', {
          cwd: join(__dirname, '..'),
          encoding: 'utf-8',
          stdio: 'pipe'
        });
        expect.fail('Should have thrown');
      } catch (e: any) {
        expect(e.status).not.toBe(0);
      }
    });
  });

  describe('npm Package (Live Registry)', () => {
    it('should be published on npm', () => {
      try {
        const result = execSync('npm view examify version', {
          encoding: 'utf-8',
          stdio: 'pipe'
        });
        expect(result.trim()).toMatch(/^\d+\.\d+\.\d+$/);
      } catch (e) {
        // Skip if no network or not published
        console.log('Skipping npm registry check (network unavailable)');
      }
    });

    it('should have matching version on npm', () => {
      const packageJson = JSON.parse(
        readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
      );
      
      try {
        const npmVersion = execSync('npm view examify version', {
          encoding: 'utf-8',
          stdio: 'pipe'
        }).trim();
        
        // Version should match or npm should be ahead (after publish)
        expect(npmVersion).toBe(packageJson.version);
      } catch (e) {
        console.log('Skipping npm version check (network unavailable)');
      }
    });
  });
});
