# Exam Generation Skill (Claude Desktop)

When generating educational assessments (quizzes, exams, tests), follow these principles:

## Question Types to Use

1. **Multiple Choice [MC]** - Single correct answer (3-5 options)
2. **True/False [TF]** - Binary choice
3. **Multiple Answer [MA]** - Select all that apply
4. **Short Answer [Short]** - Brief text response
5. **Numerical [Num]** - Numeric answer with tolerance
6. **Essay** - Long-form response
7. **Matching [Match]** - Pair items from two lists
8. **Fill-in-Multiple-Blanks [FMB]** - Multiple blanks with specific answers

## Format Rules

### Question Header Format
```
1. [MC] Question text here [2pts]
```
- Number (1, 2, 3...)
- Type marker in brackets: `[MC]`, `[TF]`, `[Essay]`, etc.
- Question text
- Points in brackets: `[2pts]` or `[1pt]`

### Answer Options
```
a) Wrong answer
b) Correct answer [x]
c) Wrong answer
d) Wrong answer
```
- Use lowercase letters: a), b), c), d)
- Mark correct answers with `[x]` (NEVER use **bold**)
- Use `✓` or `[correct]` as alternatives to `[x]`

### Points Notation
- `[1pt]` or `[2pts]` - inline with question
- `[Essay, 10pts]` - combined with type marker
- Or set default in document header

## Subject-Specific Patterns

### Statistics Exams
```markdown
1. [MC] Which measure of center is most resistant to outliers? [1pt]
a) Mean
b) Median [x]
c) Mode
d) Range

2. [Num] Calculate the mean of 2, 4, 6, 8. [2pts]
Answer: 5 ± 0

3. [MC] The sample variance formula is: [2pts]
a) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n}$
b) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$ [x]
c) $s = \sqrt{s^2}$
```

### Conceptual Questions
```markdown
4. [MA] Which are assumptions of a t-test? [3pts]
a) Random sampling [x]
b) Normal distribution or large sample [x]
c) Known population variance
d) Independence [x]

5. [TF] A p-value < 0.05 proves the null hypothesis is false. → False [1pt]
```

### Math/LaTeX
```markdown
6. [MC] What is $\frac{d}{dx}(x^2)$? [2pts]
a) $x$
b) $2x$ [x]
c) $x^2$
d) $\frac{x^3}{3}$
```

## Critical Rules

### ✅ DO:
- Always use `[x]` to mark correct answers
- Use explicit type markers: `[MC]`, `[TF]`, `[Essay]`
- Include points: `[2pts]` or set document default
- Use LaTeX for math: `$x^2$` or `$$\frac{a}{b}$$`
- Provide feedback when helpful

### ❌ DON'T:
- Use `**bold**` for correct answers (conflicts with LaTeX!)
- Forget to mark correct answers
- Mix type markers (pick one: MC, MultiChoice, Multiple Choice)
- Use vague point values

## Feedback Options

### Inline (after //)
```markdown
a) Wrong [x] // This is correct because...
b) Right // This is wrong because...
```

### Blockquote (line after option)
```markdown
a) Option A
> Detailed feedback explaining why this is wrong.
b) Option B [x]
> Detailed feedback explaining why this is correct.
```

### General (after all options)
```markdown
> [feedback] This concept is important because...
```

## Complete Example

```markdown
# Statistics Quiz

1. [MC] What is the mean of 2, 4, 6? [2pts]
a) Three
b) Four [x]
c) Five

2. [TF] Variance can be negative. → False [1pt]

3. [MA] Select all even numbers. [3pts]
a) 2 [x]
b) 3
c) 4 [x]
d) 5

4. [Short] The middle value in ordered data is the _____. [1pt]
Answer: median

5. [Num] If mean = 50 and SD = 10, what is variance? [2pts]
Answer: 100 ± 0

6. [Match] Match the statistic to its formula. [4pts]
- Mean => Σx/n
- Variance => Σ(x-μ)²/n
- SD => √Variance

7. [Essay, 10pts] Explain the Central Limit Theorem.
Provide examples and discuss assumptions.
```

## Quality Checklist

Before finalizing:
- [ ] All questions have type markers
- [ ] All questions have points
- [ ] All MC/MA/TF questions have correct answers marked with `[x]`
- [ ] No `**bold**` markers used (use `[x]` instead)
- [ ] LaTeX formulas use `$...$` notation
- [ ] Appropriate difficulty mix (easy, medium, hard)
- [ ] Clear, unambiguous wording
- [ ] Realistic answer options (plausible distractors)

## When to Use This Skill

Apply these rules when:
- Creating new exams, quizzes, or assessments
- Converting existing tests to examark format
- Reviewing exam syntax for errors
- Generating practice questions
- Building question banks

**Target format**: Examark (for Canvas LMS via QTI export)
**Primary users**: Instructors, TAs, course developers
