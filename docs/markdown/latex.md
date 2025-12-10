# LaTeX Math

Examark supports LaTeX math notation, automatically converting it for Canvas compatibility.

---

## Basic Syntax

### Inline Math

Use single dollar signs for inline math:

```markdown
The sample mean is $\bar{x}$ and variance is $s^2$.
```

Renders as: The sample mean is $\bar{x}$ and variance is $s^2$.

### Display Math

Use double dollar signs for centered equations:

```markdown
$$\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}$$
```

Renders as a centered block equation.

---

## Canvas Conversion

Examark automatically converts LaTeX for Canvas:

| Markdown | Canvas (MathJax) |
|----------|------------------|
| `$...$` | `\(...\)` |
| `$$...$$` | `\[...\]` |

No manual conversion needed!

---

## Common Formulas

### Statistics

```markdown
# Mean
$$\bar{x} = \frac{\sum x_i}{n}$$

# Variance
$$s^2 = \frac{\sum(x_i - \bar{x})^2}{n-1}$$

# Standard Deviation
$$s = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n-1}}$$

# Z-score
$$z = \frac{x - \mu}{\sigma}$$

# Correlation
$$r = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2 \sum(y_i - \bar{y})^2}}$$
```

### Probability

```markdown
# Binomial
$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

# Normal Distribution
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

# Bayes' Theorem
$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$
```

### Calculus

```markdown
# Derivative
$$\frac{d}{dx}[x^n] = nx^{n-1}$$

# Integral
$$\int_a^b f(x)\,dx = F(b) - F(a)$$

# Limit
$$\lim_{x \to \infty} \frac{1}{x} = 0$$
```

---

## Math in Questions

### In Question Stems

```markdown
1. [MC] What is $\frac{d}{dx}[x^3]$? [2pts]
a) $x^2$
b) $3x^2$ [x]
c) $3x^3$
d) $x^3$
```

### In Answer Options

```markdown
1. [MC] Which formula calculates sample variance? [3pts]
a) $\bar{x} = \frac{\sum x}{n}$
b) $s^2 = \frac{\sum(x-\bar{x})^2}{n-1}$ [x]
c) $s = \sqrt{s^2}$
d) $z = \frac{x-\mu}{\sigma}$
```

### In Matching Questions

```markdown
1. [Match] Match formulas to names. [4pts]
- $\bar{x}$ => Sample Mean
- $s^2$ => Sample Variance
- $\sigma$ => Population Standard Deviation
- $\mu$ => Population Mean
```

### In Fill-in-Blanks

```markdown
1. [FMB] Complete the formula. [2pts]

The z-score formula is $z = \frac{x - [blank1]}{[blank2]}$

[blank1]: μ, mu
[blank2]: σ, sigma
```

---

## Greek Letters

| Symbol | LaTeX | Symbol | LaTeX |
|--------|-------|--------|-------|
| α | `\alpha` | ν | `\nu` |
| β | `\beta` | ξ | `\xi` |
| γ | `\gamma` | π | `\pi` |
| δ | `\delta` | ρ | `\rho` |
| ε | `\epsilon` | σ | `\sigma` |
| ζ | `\zeta` | τ | `\tau` |
| η | `\eta` | υ | `\upsilon` |
| θ | `\theta` | φ | `\phi` |
| ι | `\iota` | χ | `\chi` |
| κ | `\kappa` | ψ | `\psi` |
| λ | `\lambda` | ω | `\omega` |
| μ | `\mu` | Σ | `\Sigma` |

---

## Common Symbols

| Symbol | LaTeX | Description |
|--------|-------|-------------|
| ≠ | `\neq` | Not equal |
| ≤ | `\leq` | Less than or equal |
| ≥ | `\geq` | Greater than or equal |
| ≈ | `\approx` | Approximately |
| ± | `\pm` | Plus or minus |
| × | `\times` | Multiplication |
| ÷ | `\div` | Division |
| √ | `\sqrt{}` | Square root |
| ∞ | `\infty` | Infinity |
| ∑ | `\sum` | Summation |
| ∏ | `\prod` | Product |
| ∫ | `\int` | Integral |

---

## Formatting

### Fractions

```markdown
$\frac{numerator}{denominator}$
$\frac{a+b}{c+d}$
```

### Subscripts and Superscripts

```markdown
$x_i$           # Subscript
$x^2$           # Superscript
$x_i^2$         # Both
$x_{i+1}$       # Multi-char subscript
$e^{-x^2}$      # Nested
```

### Brackets

```markdown
$(a+b)$         # Parentheses
$[a+b]$         # Brackets
$\{a+b\}$       # Braces
$\left(\frac{a}{b}\right)$  # Auto-sized
```

### Accents

```markdown
$\bar{x}$       # Bar (mean)
$\hat{p}$       # Hat (estimate)
$\tilde{x}$     # Tilde
$\vec{v}$       # Vector arrow
$\dot{x}$       # Dot (derivative)
```

---

## Troubleshooting

### Math Not Rendering

1. **Check dollar signs** — Ensure no spaces inside: `$ x $` → `$x$`
2. **Escape underscores** in non-math text: `p_value` → `p\_value`
3. **Verify Canvas MathJax** is enabled in your course

### Complex Equations

For very complex equations, consider:

1. Breaking into multiple lines
2. Using `\begin{aligned}` environment
3. Including an image as fallback

### Preview Your Math

Use `--preview` to check parsing:

```bash
examark quiz.md --preview
```

---

## See Also

- [Syntax Reference](syntax.md) — Complete syntax guide
- [Question Types](question-types.md) — Examples with math
- [Images & Media](images.md) — Include equation images
