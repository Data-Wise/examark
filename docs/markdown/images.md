# Images & Media

Examark automatically bundles images into QTI packages for Canvas import.

---

## Basic Usage

Use standard Markdown image syntax:

```markdown
1. [MC] What does this graph show? [3pts]

![Scatter plot showing positive correlation](assets/scatter.png)

a) No relationship
b) Positive correlation [x]
c) Negative correlation
```

---

## Supported Formats

| Format | Extension | Best For |
|--------|-----------|----------|
| PNG | `.png` | Charts, diagrams, screenshots |
| JPEG | `.jpg`, `.jpeg` | Photos, complex images |
| GIF | `.gif` | Simple animations |
| SVG | `.svg` | Vector graphics, scalable |
| WebP | `.webp` | Modern, smaller files |

!!! tip "Recommended"
    Use **PNG** for charts and diagrams, **JPEG** for photos.

---

## File Organization

### Recommended Structure

```
my-exam/
├── exam.md
└── assets/
    ├── figure1.png
    ├── figure2.png
    └── diagram.svg
```

### Path Requirements

- Use **relative paths** from your Markdown file
- Paths are **case-sensitive**
- Avoid spaces in filenames (use `my-image.png` not `my image.png`)

```markdown
# These work
![Chart](assets/chart.png)
![Chart](./assets/chart.png)
![Chart](../shared/chart.png)

# This doesn't work (absolute path)
![Chart](/Users/me/images/chart.png)
```

---

## Images in Questions

### In Question Stem

```markdown
1. [MC] Based on the histogram below, what is the distribution shape? [2pts]

![Histogram of exam scores](assets/histogram.png)

a) Normal
b) Right-skewed [x]
c) Left-skewed
d) Uniform
```

### In Answer Options

```markdown
1. [MC] Which graph shows a linear relationship? [2pts]

a) ![](assets/graph-a.png)
b) ![](assets/graph-b.png) [x]
c) ![](assets/graph-c.png)
```

### In Matching Questions

```markdown
1. [Match] Match each graph to its description. [4pts]

- ![](assets/normal.png) => Normal distribution
- ![](assets/skewed.png) => Right-skewed distribution
- ![](assets/bimodal.png) => Bimodal distribution
```

---

## Alt Text

Always include descriptive alt text for accessibility:

```markdown
# Good
![Bar chart showing sales by quarter](assets/sales.png)

# Acceptable
![Sales chart](assets/sales.png)

# Avoid
![](assets/sales.png)
![image](assets/sales.png)
```

---

## Image Sizing

### In Markdown

Standard Markdown doesn't support sizing, but you can use HTML:

```html
<img src="assets/diagram.png" alt="Process diagram" width="400">
```

### Best Practices

| Content | Recommended Width |
|---------|-------------------|
| Full-width charts | 600-800px |
| Inline diagrams | 300-400px |
| Icons/symbols | 50-100px |

!!! note "Canvas Display"
    Canvas may resize images. Test your quiz after import.

---

## How Bundling Works

When you run `examark`:

1. **Scans** your Markdown for `![alt](path)` references
2. **Copies** each image to a temporary `images/` folder
3. **Updates** references in the QTI XML
4. **Adds** images to `imsmanifest.xml`
5. **Packages** everything into the `.qti.zip`

```text
quiz.qti.zip
├── quiz.xml           # QTI with <img src="images/...">
├── imsmanifest.xml    # Resource declarations
└── images/
    ├── figure1.png
    └── figure2.png
```

---

## Verifying Images

Check that images are bundled correctly:

```bash
# Validate package
examark verify quiz.qti.zip

# Preview what's bundled
unzip -l quiz.qti.zip | grep images/
```

---

## Troubleshooting

### Image Not Found

```text
Warning: Image not found: assets/chart.png
```

**Solutions:**

1. Check the path is relative to your `.md` file
2. Verify the file exists: `ls assets/chart.png`
3. Check case sensitivity: `Chart.PNG` ≠ `chart.png`

### Image Not Displaying in Canvas

1. **Check file format** — Canvas supports PNG, JPEG, GIF
2. **Check file size** — Very large images may fail
3. **Verify manifest** — Run `examark verify`

### Missing Alt Text Warning

```text
Warning: Image missing alt text: assets/fig1.png
```

Add descriptive alt text:

```markdown
![Description of what the image shows](assets/fig1.png)
```

---

## Quarto Integration

When using Quarto, generated figures are automatically included:

````markdown
```{r}
#| label: fig-scatter
#| fig-cap: "Scatter plot of x vs y"
plot(x, y)
```

1. [MC] Based on @fig-scatter, what is the correlation? [2pts]
````

See [Quarto Extension](../extensions/quarto.md) for details.

---

## See Also

- [Syntax Reference](syntax.md) — Complete syntax guide
- [Question Types](question-types.md) — Examples with images
- [Troubleshooting](../troubleshooting.md) — Common issues
