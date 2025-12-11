import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { QtiValidator } from '../src/diagnostic/validator';
import { parseMarkdown } from '../src/parser/markdown';

describe('Quarto GFM Torture Tests (Integration)', () => {
  const outputDir = join(__dirname, 'torture_out');
  const fixturePath = join(__dirname, 'fixtures', 'torture-quarto.md');
  const outputPath = join(outputDir, 'torture-quarto.qti.zip');

  beforeAll(() => {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Keep output for inspection: rmSync(outputDir, { recursive: true, force: true });
  });

  it('should parse all 30 questions from Quarto torture markdown', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    expect(parsed.questions).toHaveLength(30);
    expect(parsed.title).toBe('Quarto GFM Torture Test');

    // Verify question types distribution
    const questionTypes = parsed.questions.map(q => q.type);
    expect(questionTypes).toContain('multiple_choice');
    expect(questionTypes).toContain('multiple_answers');
    expect(questionTypes).toContain('true_false');
    expect(questionTypes).toContain('essay');
    expect(questionTypes).toContain('matching');
    expect(questionTypes).toContain('fill_in_multiple_blanks');
  });

  it('should generate QTI package from Quarto torture markdown', () => {
    try {
      execSync(`node dist/index.js "${fixturePath}" -o "${outputPath}"`, { stdio: 'pipe' });
    } catch (e: any) {
      console.error('STDOUT:', e.stdout?.toString());
      console.error('STDERR:', e.stderr?.toString());
      throw e;
    }

    expect(existsSync(outputPath)).toBe(true);
  });

  it('should pass validation with Quarto GFM features detected', async () => {
    const validator = new QtiValidator();
    const report = await validator.validatePackage(outputPath);

    // Should be valid (no XSS or critical errors)
    expect(report.isValid).toBe(true);

    // Should have detected Quarto GFM features
    const quartoWarnings = report.warnings.filter(w =>
      w.includes('Quarto GFM') ||
      w.includes('inline code') ||
      w.includes('LaTeX math') ||
      w.includes('comparison operators')
    );

    expect(quartoWarnings.length).toBeGreaterThan(0);

    // Check for specific feature detection
    const warningText = quartoWarnings.join(' ');

    // Should detect inline code (Questions 1-5, 10, 23-26, 28-30 = ~15+ items)
    expect(warningText).toMatch(/inline code/i);

    // Should detect LaTeX math (Questions 6-10, 23, 26-27, 29-30 = ~10+ items)
    expect(warningText).toMatch(/LaTeX math/i);

    // Should detect comparison operators (Questions 11-15, 17, 23, 27, 30 = ~10+ items)
    expect(warningText).toMatch(/comparison operators/i);
  });

  it('should preserve inline code with special characters', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 3: Code with special chars: x < 5 && y > 10
    const q3 = parsed.questions.find(q => q.stem.includes('x < 5 && y > 10'));
    expect(q3).toBeDefined();
    expect(q3?.stem).toContain('`x < 5 && y > 10`');
  });

  it('should preserve LaTeX math delimiters', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 6: Inline math with mean formula
    const q6 = parsed.questions.find(q => q.stem.includes('\\bar{x}'));
    expect(q6).toBeDefined();
    expect(q6?.stem).toMatch(/\\bar\{x\}/);
  });

  it('should handle negative numbers without treating as list items', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 16: Model output with negative coefficients
    const q16 = parsed.questions.find(q => q.stem.includes('Age = -0.45'));
    expect(q16).toBeDefined();
    expect(q16?.stem).toContain('-0.45');
    expect(q16?.stem).toContain('-2.3');
    expect(q16?.stem).toContain('-3.75');

    // Question 17: Correlation with negative r
    const q17 = parsed.questions.find(q => q.stem.includes('r = -0.82'));
    expect(q17).toBeDefined();
    expect(q17?.stem).toContain('[-0.89, -0.71]');
  });

  it('should preserve comparison operators in question stems', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 11: p < 0.05
    const q11 = parsed.questions.find(q => q.stem.includes('p < 0.05'));
    expect(q11).toBeDefined();

    // Question 12: x > 100 and y <= 50
    const q12 = parsed.questions.find(q => q.stem.includes('x > 100'));
    expect(q12).toBeDefined();
    expect(q12?.stem).toContain('y <= 50');

    // Question 13: Range with inequality
    const q13 = parsed.questions.find(q => q.stem.includes('5 < x < 10'));
    expect(q13).toBeDefined();
  });

  it('should handle multi-line HTML image tags', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 20: Multi-line HTML figure
    const q20 = parsed.questions.find(q => q.stem.includes('fig-example'));
    expect(q20).toBeDefined();
    expect(q20?.stem).toContain('<div id="fig-example"');
    expect(q20?.stem).toContain('<img src="plot.png"');
  });

  it('should handle complex combinations (kitchen sink question)', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 23: Kitchen sink with code, math, operators
    const q23 = parsed.questions.find(q => q.stem.includes('lm(y ~ x1 + x2)'));
    expect(q23).toBeDefined();
    expect(q23?.stem).toContain('`lm(y ~ x1 + x2)`'); // inline code
    expect(q23?.stem).toMatch(/R\^2/); // LaTeX math
    expect(q23?.stem).toContain('p < 0.001'); // comparison operator
    expect(q23?.stem).toContain('-0.67'); // negative number
    expect(q23?.stem).toContain('x1 > 10'); // inequality
    expect(q23?.points).toBe(3);
  });

  it('should preserve feedback with technical content', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 26: Feedback with inline code
    const q26 = parsed.questions.find(q => q.stem.includes('mean(c(1, 2, NA))'));
    expect(q26).toBeDefined();
    expect(q26?.options?.some(opt => opt.feedback?.includes('`mean()`'))).toBe(true);
    expect(q26?.generalFeedback).toContain('`mean()`');
    expect(q26?.generalFeedback).toContain('`na.rm = TRUE`');
  });

  it('should handle matching questions with code', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 28: Match R functions
    const q28 = parsed.questions.find(q => q.stem.includes('Match R function to output'));
    expect(q28).toBeDefined();
    expect(q28?.type).toBe('matching');
    expect(q28?.matchPairs).toBeDefined();
    expect(q28?.matchPairs?.length).toBe(4);
    expect(q28?.matchPairs?.some(p => p.left.includes('`lm()`'))).toBe(true);
  });

  it('should handle fill-in-multiple-blanks with code', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 29: FMB with code and math
    const q29 = parsed.questions.find(q => q.stem.includes('fit a linear model'));
    expect(q29).toBeDefined();
    expect(q29?.type).toBe('fill_in_multiple_blanks');
    expect(q29?.blanks).toBeDefined();
    expect(q29?.blanks?.length).toBe(3);
    expect(q29?.stem).toMatch(/R\^2/); // LaTeX in stem
  });

  it('should handle ultimate torture question (all features)', () => {
    const content = readFileSync(fixturePath, 'utf-8');
    const parsed = parseMarkdown(content);

    // Question 30: Ultimate torture with everything
    const q30 = parsed.questions.find(q => q.stem.includes('lm(yield ~ fertilizer + water'));
    expect(q30).toBeDefined();
    expect(q30?.stem).toContain('```r'); // code block
    expect(q30?.stem).toMatch(/R\^2/); // LaTeX
    expect(q30?.stem).toContain('-0.82'); // negative numbers
    expect(q30?.stem).toContain('p < 0.001'); // comparison
    expect(q30?.stem).toContain('fertilizer > 50'); // inequality
    expect(q30?.stem).toContain('water <= 20'); // another inequality
    expect(q30?.generalFeedback).toBeDefined();
    expect(q30?.generalFeedback).toMatch(/\\\(/); // LaTeX in feedback
    expect(q30?.points).toBe(5);
  });

  it('should have no critical Canvas import errors', async () => {
    const validator = new QtiValidator();
    const report = await validator.validatePackage(outputPath);

    // Check for Canvas blockers
    const canvasBlockers = report.errors.filter(e =>
      e.includes('No correct answer') ||
      e.includes('Unsupported Canvas') ||
      e.includes('Mismatch: Cardinality')
    );

    expect(canvasBlockers).toHaveLength(0);

    // Should have items
    expect(report.details.itemCount).toBe(30);
  });
});
