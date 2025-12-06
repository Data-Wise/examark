/**
 * Markdown parser for quiz questions
 */

import type { ParsedQuiz, Question, Section, AnswerOption, QuestionType } from './types.js';
import { slugify } from './types.js';

/**
 * Parse question type from inline tag or section context
 */
function parseQuestionType(text: string, sectionTitle?: string): { type: QuestionType; points?: number; cleanText: string } {
  // Check for inline tags like [Essay, 10pts] or [TF] or [Short]
  const tagMatch = text.match(/^\s*\[([^\]]+)\]\s*/);
  
  if (tagMatch) {
    const tag = tagMatch[1].toLowerCase();
    const cleanText = text.replace(tagMatch[0], '').trim();
    
    // Parse points if present
    const pointsMatch = tag.match(/(\d+)\s*pts?/i);
    const points = pointsMatch ? parseInt(pointsMatch[1], 10) : undefined;
    
    if (tag.includes('essay')) return { type: 'essay', points, cleanText };
    if (tag.includes('tf') || tag.includes('true')) return { type: 'true_false', points, cleanText };
    if (tag.includes('short')) return { type: 'short_answer', points, cleanText };
    if (tag.includes('fill')) return { type: 'fill_in_blank', points, cleanText };
  }
  
  // Check section title for hints
  if (sectionTitle) {
    const lower = sectionTitle.toLowerCase();
    if (lower.includes('essay')) return { type: 'essay', cleanText: text };
    if (lower.includes('true') || lower.includes('false')) return { type: 'true_false', cleanText: text };
    if (lower.includes('short')) return { type: 'short_answer', cleanText: text };
  }
  
  return { type: 'multiple_choice', cleanText: text };
}

/**
 * Parse answer options from sub-items
 */
function parseOptions(lines: string[]): AnswerOption[] {
  const options: AnswerOption[] = [];
  
  for (const line of lines) {
    // Match patterns like: *a) Answer, a) Answer, - *Answer, - Answer
    const match = line.match(/^\s*(\*?)([a-e])\)\s*(.+)$/i) ||
                  line.match(/^\s*-\s*(\*?)(.+)$/);
    
    if (match) {
      const isCorrect = match[1] === '*';
      const id = match[2].length === 1 ? match[2].toLowerCase() : String.fromCharCode(97 + options.length);
      const text = match[3] || match[2];
      
      // Clean up asterisks that might be in text
      const cleanText = text.replace(/^\*|\*$/g, '').trim();
      
      options.push({ id, text: cleanText, isCorrect });
    }
  }
  
  // Check for True/False pattern
  if (options.length === 0) {
    for (const line of lines) {
      const tfMatch = line.match(/^\s*(\*?)(True|False)\s*$/i);
      if (tfMatch) {
        options.push({
          id: tfMatch[2].toLowerCase() === 'true' ? 'true' : 'false',
          text: tfMatch[2],
          isCorrect: tfMatch[1] === '*'
        });
      }
    }
  }
  
  return options;
}

/**
 * Detect if options indicate True/False question
 */
function isTrueFalse(options: AnswerOption[]): boolean {
  if (options.length !== 2) return false;
  const texts = options.map(o => o.text.toLowerCase());
  return texts.includes('true') && texts.includes('false');
}

/**
 * Parse full markdown content into structured quiz
 */
export function parseMarkdown(content: string): ParsedQuiz {
  const lines = content.split('\n');
  
  let title = 'Quiz';
  let defaultPoints = 1;
  const sections: Section[] = [];
  const questions: Question[] = [];
  
  let currentSection: Section | null = null;
  let currentQuestion: Partial<Question> | null = null;
  let currentOptionLines: string[] = [];
  let sectionInstructions = '';
  let questionId = 0;
  
  const finalizeQuestion = () => {
    if (currentQuestion && currentQuestion.stem) {
      const options = parseOptions(currentOptionLines);
      
      // Detect question type if not already set
      let type = currentQuestion.type || 'multiple_choice';
      if (options.length > 0 && isTrueFalse(options)) {
        type = 'true_false';
      } else if (options.length === 0 && type === 'multiple_choice') {
        type = 'short_answer';
      }
      
      const question: Question = {
        id: currentQuestion.id!,
        type,
        stem: currentQuestion.stem,
        options,
        points: currentQuestion.points || defaultPoints,
        section: currentSection?.id,
      };
      
      questions.push(question);
      
      if (currentSection) {
        currentSection.questionIds.push(question.id);
      }
    }
    currentQuestion = null;
    currentOptionLines = [];
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Pool title: # Pool: Name
    if (trimmed.match(/^#\s+Pool:\s*(.+)/)) {
      title = trimmed.replace(/^#\s+Pool:\s*/, '');
      continue;
    }
    
    // Default points: Points: N
    if (trimmed.match(/^Points:\s*(\d+)/)) {
      defaultPoints = parseInt(trimmed.replace(/^Points:\s*/, ''), 10);
      continue;
    }
    
    // Section: ## Section: Name
    if (trimmed.match(/^##\s+Section:\s*(.+)/)) {
      finalizeQuestion();
      const sectionTitle = trimmed.replace(/^##\s+Section:\s*/, '');
      currentSection = {
        id: slugify(sectionTitle),
        title: sectionTitle,
        questionIds: [],
      };
      sections.push(currentSection);
      sectionInstructions = '';
      continue;
    }
    
    // Horizontal rule (separator)
    if (trimmed === '---') {
      continue;
    }
    
    // Numbered question: 1. Question text
    const questionMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (questionMatch) {
      finalizeQuestion();
      questionId = parseInt(questionMatch[1], 10);
      
      const { type, points, cleanText } = parseQuestionType(questionMatch[2], currentSection?.title);
      
      currentQuestion = {
        id: questionId,
        type,
        stem: cleanText,
        points: points || defaultPoints,
      };
      continue;
    }
    
    // Answer option (indented with letter or dash)
    if (currentQuestion && (line.match(/^\s+[*]?[a-e]\)/) || line.match(/^\s+-\s/))) {
      currentOptionLines.push(line);
      continue;
    }
    
    // Continuation of question stem or section instructions
    if (currentQuestion && trimmed && !line.match(/^\s/)) {
      currentQuestion.stem += ' ' + trimmed;
    } else if (currentSection && trimmed && !currentQuestion) {
      // Section-level instructions (text after section header, before questions)
      if (!currentSection.instructions) {
        currentSection.instructions = trimmed;
      }
    }
  }
  
  // Finalize last question
  finalizeQuestion();
  
  return { title, defaultPoints, sections, questions };
}
