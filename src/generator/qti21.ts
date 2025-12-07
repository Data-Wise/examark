/**
 * QTI 2.1 Generator for Canvas LMS
 * Creates Canvas-compatible QTI 2.1 packages with proper folder structure
 * Based on official IMS QTI 2.1 specification and Canvas import requirements
 */

import type { ParsedQuiz, Question, Section } from '../parser/types.js';
import { createHash } from 'crypto';

/**
 * Generate a unique identifier
 */
function generateId(seed: string): string {
  return createHash('sha256').update(seed + Date.now() + Math.random()).digest('hex').substring(0, 16);
}

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
 * Convert LaTeX delimiters from Quarto format to Canvas-compatible format
 * Canvas supports \(...\) for inline and \[...\] for display math
 */
function convertLaTeX(text: string): string {
  return text
    // Convert display math: $$...$$ → \[...\]
    .replace(/\$\$([\s\S]*?)\$\$/g, '\\[$1\\]')
    // Convert inline math: $...$ → \(...\)
    .replace(/(?<!\\)\$([^\$\n]+?)\$/g, '\\($1\\)');
}

/**
 * Map question type to QTI 2.1 interaction type for manifest metadata
 */
function getInteractionTypeName(type: string): string {
  switch (type) {
    case 'multiple_choice':
    case 'multiple_answers':
    case 'true_false':
      return 'choiceInteraction';
    case 'short_answer':
    case 'fill_in_blank':
      return 'textEntryInteraction';
    case 'essay':
      return 'extendedTextInteraction';
    default:
      return 'choiceInteraction';
  }
}

/**
 * Generate a single assessmentItem XML for a question
 */
export function generateItem(question: Question, quizTitle: string): string {
  const itemId = `item_${question.id}`;
  const sanitizedStem = escapeXml(convertLaTeX(question.stem));
  
  // Find correct answer(s)
  const correctOptions = question.options.filter(o => o.isCorrect);
  const cardinality = question.type === 'multiple_answers' ? 'multiple' : 'single';
  
  let responseDeclaration = '';
  let itemBody = '';
  let responseProcessing = '';
  
  if (question.type === 'multiple_choice' || question.type === 'true_false' || question.type === 'multiple_answers') {
    // Multiple choice / True-False / Multiple Answers
    // Find indices of correct options to map to generated A, B, C... identifiers
    const correctIndices = question.options
      .map((opt, index) => opt.isCorrect ? index : -1)
      .filter(index => index !== -1);

    const correctValues = correctIndices.length > 0 
      ? correctIndices.map(index => `      <value>${String.fromCharCode(65 + index)}</value>`).join('\n')
      : '      <value>A</value>'; // Default if no correct answer marked
    
    responseDeclaration = `
  <responseDeclaration identifier="RESPONSE" cardinality="${cardinality}" baseType="identifier">
    <correctResponse>
${correctValues}
    </correctResponse>
  </responseDeclaration>`;
    
    const choicesXml = question.options.map((opt, i) => {
      const choiceId = String.fromCharCode(65 + i); // A, B, C, D...
      return `      <simpleChoice identifier="${choiceId}">${escapeXml(convertLaTeX(opt.text))}</simpleChoice>`;
    }).join('\n');
    
    const maxChoices = question.type === 'multiple_answers' ? '0' : '1';
    
    itemBody = `
  <itemBody>
    <p>${sanitizedStem}</p>
    <choiceInteraction responseIdentifier="RESPONSE" shuffle="false" maxChoices="${maxChoices}">
${choicesXml}
    </choiceInteraction>
  </itemBody>`;
    
    responseProcessing = `
  <responseProcessing template="http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct"/>`;
    
  } else if (question.type === 'short_answer' || question.type === 'fill_in_blank' || question.type === 'numerical') {
    // Short answer / Fill in blank / Numerical
    responseDeclaration = `
  <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="string"/>`;
    
    itemBody = `
  <itemBody>
    <p>${sanitizedStem}</p>
    <textEntryInteraction responseIdentifier="RESPONSE" expectedLength="50"/>
  </itemBody>`;
    
    responseProcessing = '';
    
  } else {
    // Essay
    responseDeclaration = `
  <responseDeclaration identifier="RESPONSE" cardinality="single" baseType="string"/>`;
    
    itemBody = `
  <itemBody>
    <p>${sanitizedStem}</p>
    <extendedTextInteraction responseIdentifier="RESPONSE" expectedLines="10"/>
  </itemBody>`;
    
    responseProcessing = '';
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1 
                                    http://www.imsglobal.org/xsd/imsqti_v2p1.xsd"
                identifier="${itemId}"
                title="Question ${question.id}"
                adaptive="false"
                timeDependent="false">${responseDeclaration}

  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float">
    <defaultValue>
      <value>${question.points}</value>
    </defaultValue>
  </outcomeDeclaration>${itemBody}${responseProcessing}
</assessmentItem>`;
}

/**
 * Generate assessmentTest XML for the QTI package
 * Binds items together into a test structure
 */
export function generateTest(quiz: ParsedQuiz): string {
  const testId = `test_${generateId(quiz.title)}`;
  
  // Create item references
  const itemRefs = quiz.questions.map(q => {
    return `    <assessmentItemRef identifier="itemref_${q.id}" href="items/item_${q.id}.xml" fixed="false"/>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1
                                    http://www.imsglobal.org/xsd/imsqti_v2p1.xsd"
                identifier="${testId}"
                title="${escapeXml(quiz.title)}">
  <testPart identifier="part_1" navigationMode="linear" submissionMode="individual">
    <assessmentSection identifier="section_1" title="Main Section" visible="true">
${itemRefs}
    </assessmentSection>
  </testPart>
</assessmentTest>`;
}

/**
 * Generate imsmanifest.xml for the QTI package
 * Following exact Canvas-compatible format
 */
export function generateManifest21(quiz: ParsedQuiz): string {
  const manifestId = `MANIFEST_${generateId(quiz.title)}`;
  
  // Generate resource entries for each item with proper metadata
  const itemResources = quiz.questions.map(q => {
    const interactionType = getInteractionTypeName(q.type);
    return `    <resource identifier="res_item_${q.id}" 
              type="imsqti_item_xmlv2p1" 
              href="items/item_${q.id}.xml">
      <metadata>
        <imsqti:qtiMetadata>
          <imsqti:interactionType>${interactionType}</imsqti:interactionType>
        </imsqti:qtiMetadata>
      </metadata>
      <file href="items/item_${q.id}.xml"/>
${q.images ? q.images.map(img => `      <file href="items/${img}"/>`).join('\n') : ''}
    </resource>`;
  }).join('\n\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${manifestId}" 
          xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
          xmlns:imsqti="http://www.imsglobal.org/xsd/imsqti_v2p1"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 
                              http://www.imsglobal.org/xsd/imscp_v1p1.xsd
                              http://www.imsglobal.org/xsd/imsqti_v2p1 
                              http://www.imsglobal.org/xsd/imsqti_v2p1.xsd">
  
  <metadata>
    <schema>QTI Package</schema>
    <schemaversion>2.1</schemaversion>
  </metadata>
  
  <organizations/>
  
  <resources>
    <resource identifier="test_resource" type="imsqti_test_xmlv2p1" href="tests/test.xml">
      <file href="tests/test.xml"/>
${quiz.questions.map(q => `      <dependency identifierref="res_item_${q.id}"/>`).join('\n')}
    </resource>

${itemResources}
  </resources>
</manifest>`;
}
