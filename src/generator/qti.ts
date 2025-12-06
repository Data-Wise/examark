/**
 * QTI XML Generator for Canvas
 */

import type { ParsedQuiz, Question, AnswerOption } from '../parser/types.js';
import { slugify } from '../parser/types.js';

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Map internal question type to Canvas QTI type
 */
function getCanvasQuestionType(type: string): string {
  const typeMap: Record<string, string> = {
    'multiple_choice': 'multiple_choice_question',
    'true_false': 'true_false_question',
    'essay': 'essay_question',
    'short_answer': 'short_answer_question',
    'fill_in_blank': 'fill_in_blank_question',
  };
  return typeMap[type] || 'multiple_choice_question';
}

/**
 * Generate answer options XML
 */
function generateOptionsXml(options: AnswerOption[]): string {
  return options.map(opt => `
              <response_label ident="${escapeXml(opt.id)}">
                <material>
                  <mattext texttype="text/html">${escapeXml(opt.text)}</mattext>
                </material>
              </response_label>`).join('');
}

/**
 * Generate response processing XML for correct answer
 */
function generateResprocessing(question: Question): string {
  if (question.type === 'essay' || question.type === 'short_answer') {
    return `
        <resprocessing>
          <outcomes>
            <decvar varname="SCORE" vartype="Decimal" defaultval="0" maxvalue="${question.points}"/>
          </outcomes>
        </resprocessing>`;
  }

  const correctOption = question.options.find(o => o.isCorrect);
  if (!correctOption) return '';

  return `
        <resprocessing>
          <outcomes>
            <decvar varname="SCORE" vartype="Decimal" defaultval="0" maxvalue="${question.points}"/>
          </outcomes>
          <respcondition continue="No">
            <conditionvar>
              <varequal respident="response1">${escapeXml(correctOption.id)}</varequal>
            </conditionvar>
            <setvar action="Set" varname="SCORE">${question.points}</setvar>
          </respcondition>
        </resprocessing>`;
}

/**
 * Generate a single question item XML
 */
function generateQuestionXml(question: Question): string {
  const qType = getCanvasQuestionType(question.type);
  const ident = `q${question.id}`;
  
  let presentationContent: string;
  
  if (question.type === 'essay' || question.type === 'short_answer') {
    presentationContent = `
          <material>
            <mattext texttype="text/html">${escapeXml(question.stem)}</mattext>
          </material>
          <response_str ident="response1" rcardinality="Single">
            <render_fib>
              <response_label ident="answer1"/>
            </render_fib>
          </response_str>`;
  } else {
    presentationContent = `
          <material>
            <mattext texttype="text/html">${escapeXml(question.stem)}</mattext>
          </material>
          <response_lid ident="response1" rcardinality="Single">
            <render_choice>${generateOptionsXml(question.options)}
            </render_choice>
          </response_lid>`;
  }
  
  return `
      <item ident="${ident}" title="Question ${question.id}">
        <itemmetadata>
          <qtimetadata>
            <qtimetadatafield>
              <fieldlabel>question_type</fieldlabel>
              <fieldentry>${qType}</fieldentry>
            </qtimetadatafield>
            <qtimetadatafield>
              <fieldlabel>points_possible</fieldlabel>
              <fieldentry>${question.points}</fieldentry>
            </qtimetadatafield>
          </qtimetadata>
        </itemmetadata>
        <presentation>${presentationContent}
        </presentation>${generateResprocessing(question)}
      </item>`;
}

/**
 * Generate complete QTI XML from parsed quiz
 */
export function generateQTI(quiz: ParsedQuiz): string {
  const assessmentIdent = slugify(quiz.title);
  
  // Group questions by section
  const sectionedQuestions: string[] = [];
  
  if (quiz.sections.length > 0) {
    for (const section of quiz.sections) {
      const sectionQuestions = quiz.questions
        .filter(q => section.questionIds.includes(q.id))
        .map(q => generateQuestionXml(q))
        .join('');
      
      sectionedQuestions.push(`
    <section ident="${section.id}" title="${escapeXml(section.title)}">
      ${section.instructions ? `<rubric><material><mattext>${escapeXml(section.instructions)}</mattext></material></rubric>` : ''}${sectionQuestions}
    </section>`);
    }
  } else {
    // No sections, put all questions in root
    const allQuestions = quiz.questions.map(q => generateQuestionXml(q)).join('');
    sectionedQuestions.push(`
    <section ident="main" title="Questions">${allQuestions}
    </section>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">
  <assessment ident="${assessmentIdent}" title="${escapeXml(quiz.title)}">${sectionedQuestions.join('')}
  </assessment>
</questestinterop>`;
}
