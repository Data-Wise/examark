#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { parseMarkdown } from './parser/markdown.js';
import { generateQTI } from './generator/qti.js';

const program = new Command();

program
  .name('qti-convert')
  .description('Convert Markdown/Text questions to Canvas QTI format')
  .version('0.1.0')
  .argument('<input>', 'Input file (markdown or text)')
  .option('-o, --output <file>', 'Output QTI file')
  .option('-v, --validate', 'Validate output structure')
  .option('--preview', 'Preview parsed questions without generating file')
  .action(async (input: string, options: { output?: string; validate?: boolean; preview?: boolean }) => {
    try {
      const content = readFileSync(input, 'utf-8');
      const parsed = parseMarkdown(content);
      
      if (options.preview) {
        console.log('Parsed Questions:');
        console.log(JSON.stringify(parsed, null, 2));
        return;
      }

      const qti = generateQTI(parsed);
      const outputFile = options.output || input.replace(/\.(md|txt)$/, '.qti.xml');
      
      writeFileSync(outputFile, qti);
      console.log(`✓ Generated: ${outputFile}`);
      console.log(`  • ${parsed.questions.length} questions`);
      console.log(`  • ${parsed.sections.length} sections`);
      
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
