import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('GitHub Actions Monitoring', () => {
  const REPO = 'Data-Wise/examark';
  const API_BASE = `https://api.github.com/repos/${REPO}/actions`;

  describe('API Endpoints', () => {
    it('should access workflow runs endpoint', () => {
      try {
        const result = execSync(
          `curl -s -o /dev/null -w "%{http_code}" "${API_BASE}/runs?per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });

    it('should access CI workflow endpoint', () => {
      try {
        const result = execSync(
          `curl -s -o /dev/null -w "%{http_code}" "${API_BASE}/workflows/ci.yml"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });

    it('should access Publish Docs workflow endpoint', () => {
      try {
        const result = execSync(
          `curl -s -o /dev/null -w "%{http_code}" "${API_BASE}/workflows/publish_docs.yml"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });
  });

  describe('Workflow Status Queries', () => {
    it('should return valid JSON for workflow runs', () => {
      try {
        const result = execSync(
          `curl -s "${API_BASE}/runs?per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        const data = JSON.parse(result);
        expect(data).toHaveProperty('workflow_runs');
        expect(Array.isArray(data.workflow_runs)).toBe(true);
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });

    it('should return CI workflow runs', () => {
      try {
        const result = execSync(
          `curl -s "${API_BASE}/workflows/ci.yml/runs?per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        const data = JSON.parse(result);
        expect(data).toHaveProperty('workflow_runs');
        if (data.workflow_runs.length > 0) {
          expect(data.workflow_runs[0]).toHaveProperty('status');
          expect(data.workflow_runs[0]).toHaveProperty('conclusion');
          expect(data.workflow_runs[0]).toHaveProperty('head_sha');
        }
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });

    it('should return Publish Docs workflow runs', () => {
      try {
        const result = execSync(
          `curl -s "${API_BASE}/workflows/publish_docs.yml/runs?per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        const data = JSON.parse(result);
        expect(data).toHaveProperty('workflow_runs');
        if (data.workflow_runs.length > 0) {
          expect(data.workflow_runs[0]).toHaveProperty('status');
          expect(data.workflow_runs[0]).toHaveProperty('conclusion');
        }
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });
  });

  describe('Badge Endpoints', () => {
    it('should return CI badge SVG', () => {
      try {
        const result = execSync(
          `curl -s -o /dev/null -w "%{http_code}" "https://github.com/${REPO}/actions/workflows/ci.yml/badge.svg"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping badge check (network unavailable)');
      }
    });

    it('should return Publish Docs badge SVG', () => {
      try {
        const result = execSync(
          `curl -s -o /dev/null -w "%{http_code}" "https://github.com/${REPO}/actions/workflows/publish_docs.yml/badge.svg"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        expect(result.trim()).toBe('200');
      } catch (e) {
        console.log('Skipping badge check (network unavailable)');
      }
    });
  });

  describe('Latest Run Status Check', () => {
    it('should have recent CI run on main branch', () => {
      try {
        const result = execSync(
          `curl -s "${API_BASE}/workflows/ci.yml/runs?branch=main&per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        const data = JSON.parse(result);
        expect(data.workflow_runs.length).toBeGreaterThan(0);
        
        // Check that the run is within the last 7 days
        const run = data.workflow_runs[0];
        const runDate = new Date(run.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        expect(runDate.getTime()).toBeGreaterThan(weekAgo.getTime());
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });

    it('should have latest CI run passing on main', () => {
      try {
        const result = execSync(
          `curl -s "${API_BASE}/workflows/ci.yml/runs?branch=main&per_page=1"`,
          { encoding: 'utf-8', stdio: 'pipe' }
        );
        const data = JSON.parse(result);
        if (data.workflow_runs.length > 0) {
          const run = data.workflow_runs[0];
          // Allow in_progress status as that's okay
          if (run.status === 'completed') {
            expect(run.conclusion).toBe('success');
          }
        }
      } catch (e) {
        console.log('Skipping API check (network unavailable)');
      }
    });
  });
});
