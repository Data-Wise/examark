# STAT 545 — Practice Questions for Exam 1

## Section 1: Experimental Design Fundamentals (Weeks 1–2)

1. [MC] Which of the following is the primary purpose of randomization in experimental design? [2pts]
a) To increase the sample size
b) To eliminate all confounding variables
c) To ensure that treatment assignment is unbiased and that systematic differences among units are distributed evenly across treatments [x]
d) To guarantee that all treatment groups have equal variances

2. [MC] A researcher wants to test whether a new fertilizer increases crop yield. She selects 30 plots from a single farm, randomly assigns 15 to the new fertilizer and 15 to a control. What is the experimental unit? [2pts]
a) The farm
b) An individual plant within a plot
c) A plot of land [x]
d) The fertilizer type

3. [TF] In a completely randomized design (CRD), blocking is used to reduce the error variance. [2pts]
a) True
b) False [x]

> CRDs do not use blocking. Blocking is a feature of RCBD and other designs.

4. [MC] In the one-way ANOVA model $Y_{ij} = \mu + \tau_i + \varepsilon_{ij}$, what does $\tau_i$ represent? [2pts]
a) The overall mean response
b) The random error for observation $j$ in treatment $i$
c) The effect of treatment $i$ relative to the overall mean [x]
d) The variance of the $i$th treatment group

5. [TF] Replication allows us to estimate the experimental error variance. [2pts]
a) True [x]
b) False

> Without replication, we cannot separate treatment effects from random error.

6. [MC] Which of the following is NOT an assumption of one-way ANOVA? [2pts]
a) Independence of observations
b) Normality of residuals
c) Equal sample sizes across groups [x]
d) Homogeneity of variances

> ANOVA does not require equal sample sizes, though balanced designs are more robust.

7. [MC] A CRD has $k = 4$ treatment groups with $n = 8$ observations per group. What are the error degrees of freedom? [2pts]
a) 24
b) 28 [x]
c) 31
d) 32

> $df_E = N - k = 32 - 4 = 28$

8. [MC] A study reports $F(3, 36) = 4.52$, $p = 0.0089$, $s = 6.8$ bits. Using the s-value calibration, how would you describe the strength of evidence against $H_0$? [2pts]
a) Weak evidence — roughly equivalent to 2–3 consecutive coin flips
b) Moderate evidence — roughly equivalent to 4–5 consecutive coin flips
c) Strong evidence — roughly equivalent to 6–7 consecutive coin flips [x]
d) Very strong evidence — roughly equivalent to 10+ consecutive coin flips

> An s-value of 6.8 bits means the data are as surprising as getting ~7 consecutive heads — strong evidence against $H_0$.

9. [TF] The phrase "statistically significant" should be used when reporting ANOVA results in this course. [1pt]
a) True
b) False [x]

> The ASA (2019) recommends against using "statistically significant" as a binary threshold. We use evidence-based language instead.

10. [MC] In a CRD, if $\text{SS}_{Trt} = 120$, $\text{SS}_E = 480$, and $\text{SS}_{Total} = 600$, what is $\hat{\eta}^2$ (eta-squared)? [2pts]
a) 0.80
b) 0.25
c) 0.20 [x]
d) 0.50

> $\hat{\eta}^2 = \text{SS}_{Trt} / \text{SS}_{Total} = 120 / 600 = 0.20$

## Section 2: Multiple Comparisons and Contrasts (Week 3)

11. [MC] A researcher conducts an experiment with 5 treatment groups and, after finding evidence of treatment effects in the omnibus F-test, decides to compare all pairs of means. Which procedure is most appropriate? [2pts]
a) Fisher's LSD without protection
b) Bonferroni correction
c) Tukey's HSD [x]
d) Planned orthogonal contrasts

> Tukey's HSD is designed specifically for all pairwise comparisons and controls the FWER exactly.

12. [MC] For a set of contrast coefficients $\{c_1, c_2, \ldots, c_k\}$ to define a valid contrast, which condition must hold? [2pts]
a) All coefficients must be positive
b) The coefficients must sum to zero [x]
c) Each coefficient must be either $+1$ or $-1$
d) The number of positive coefficients must equal the number of negative coefficients

13. [TF] Two contrasts are orthogonal if the sum of the products of their corresponding coefficients equals zero (i.e., $\sum c_{1i} \cdot c_{2i} = 0$). [2pts]
a) True [x]
b) False

14. [MC] A researcher planned a single contrast before collecting data, comparing a control group to the average of three treatment groups. Does this contrast require a multiple comparison adjustment? [2pts]
a) Yes, Bonferroni correction is always needed
b) Yes, Tukey's HSD should be applied
c) No, a single pre-planned contrast does not inflate the FWER [x]
d) No, but only if the contrast is orthogonal to all other contrasts

> A single a priori contrast is tested at $\alpha$ without adjustment because there is no family of tests to protect.

15. [MA] Which of the following are valid reasons to prefer planned contrasts over post-hoc pairwise comparisons? Select ALL that apply. [3pts]
a) They test specific, scientifically motivated hypotheses [x]
b) They have more statistical power [x]
c) They guarantee orthogonality
d) They do not require an adjustment for multiplicity when testing a small number of pre-planned comparisons [x]

16. [MC] With $k = 4$ groups in a one-way ANOVA, what is the maximum number of mutually orthogonal contrasts? [2pts]
a) 2
b) 3 [x]
c) 4
d) 6

> The maximum number of orthogonal contrasts is $k - 1 = 3$.

17. [MC] A researcher uses Scheffé's method for post-hoc comparisons. Compared to Tukey's HSD, Scheffé's method is: [2pts]
a) More powerful for pairwise comparisons
b) Equally powerful for all comparison types
c) More conservative for pairwise comparisons but protects all possible contrasts [x]
d) Less conservative because it accounts for the number of groups

## Section 3: Model Diagnostics (Week 4)

18. [MC] A residuals-vs-fitted plot shows a clear funnel shape (variance increasing with fitted values). Which assumption is primarily violated? [2pts]
a) Independence
b) Normality
c) Homoscedasticity (equal variances) [x]
d) Linearity

19. [MC] A Levene's test yields $F(3, 36) = 1.42$, $p = 0.25$, $s = 2.0$ bits, and the variance ratio is $s^2_{\max}/s^2_{\min} = 2.3$. What is the best interpretation? [2pts]
a) The data provide strong evidence of unequal variances; use Welch's ANOVA
b) The data provide weak evidence against equal variances; the variance ratio and Levene's test both suggest the assumption is reasonably met [x]
c) The variance ratio exceeds 2, so the assumption is violated
d) The Levene's test is "not significant," so variances are exactly equal

20. [TF] A Shapiro-Wilk test with $p > 0.05$ proves that the residuals are normally distributed. [1pt]
a) True
b) False [x]

> Failing to reject $H_0$ does not prove $H_0$. A non-small p-value means we lack evidence against normality, not that normality holds.

21. [MC] Which diagnostic tool should you examine FIRST when checking ANOVA assumptions? [2pts]
a) Shapiro-Wilk test
b) Levene's test
c) Diagnostic plots (residuals vs. fitted, Q-Q plot) [x]
d) Box-Cox transformation

> Plots provide visual evidence of the nature and severity of violations. Formal tests are supplementary.

22. [MC] The Box-Cox procedure suggests $\lambda \approx 0.5$. What transformation does this correspond to? [2pts]
a) No transformation ($Y$)
b) Log transformation ($\ln Y$)
c) Square root transformation ($\sqrt{Y}$) [x]
d) Reciprocal transformation ($1/Y$)

23. [MA] Which of the following are appropriate responses to detecting unequal variances in a one-way ANOVA? Select ALL that apply. [3pts]
a) Apply a variance-stabilizing transformation (e.g., log, square root) [x]
b) Use Welch's ANOVA, which does not assume equal variances [x]
c) Remove outliers until variances become equal
d) Report the standard ANOVA with a note about the assumption violation [x]

> Removing outliers to satisfy assumptions is generally inappropriate. Transformations, robust methods, or noting the violation are valid approaches.

24. [TF] ANOVA is more robust to violations of normality than to violations of equal variances, especially with balanced designs. [2pts]
a) True [x]
b) False

> The Central Limit Theorem helps with normality for moderate $n$. Unequal variances more directly affect the F-test's validity.

25. [MC] A researcher has $k = 5$ groups with sample variances $s_1^2 = 12$, $s_2^2 = 15$, $s_3^2 = 18$, $s_4^2 = 14$, $s_5^2 = 11$. What is the variance ratio? [2pts]
a) $18/11 \approx 1.64$ [x]
b) $18/12 = 1.50$
c) $15/11 \approx 1.36$
d) $18/14 \approx 1.29$

> Variance ratio = $s^2_{\max}/s^2_{\min} = 18/11 \approx 1.64$. This is well below 3, suggesting no concern.

## Section 4: Two-Factor Factorial Designs (Week 5)

26. [MC] In a $3 \times 4$ factorial design with $r = 5$ replicates per cell, what are the degrees of freedom for the interaction effect? [2pts]
a) 7
b) 12
c) 6 [x]
d) 2

> $df_{AB} = (a-1)(b-1) = (3-1)(4-1) = 6$

27. [MC] An interaction plot shows two non-parallel lines that cross. This is an example of a: [2pts]
a) No interaction
b) Quantitative (ordinal) interaction
c) Qualitative (disordinal/crossover) interaction [x]
d) Main effect without interaction

> Crossing lines indicate a qualitative interaction: the direction of one factor's effect reverses across levels of the other.

28. [TF] When a strong interaction is present, interpreting main effects in isolation can be misleading. [2pts]
a) True [x]
b) False

> Main effects average over levels of the other factor. When effects change direction across levels (qualitative interaction), the average is meaningless.

29. [MC] In a two-way ANOVA, the total sum of squares is partitioned as: [2pts]
a) $\text{SS}_{Total} = \text{SS}_A + \text{SS}_B + \text{SS}_E$
b) $\text{SS}_{Total} = \text{SS}_A + \text{SS}_B + \text{SS}_{AB} + \text{SS}_E$ [x]
c) $\text{SS}_{Total} = \text{SS}_A + \text{SS}_{AB} + \text{SS}_E$
d) $\text{SS}_{Total} = \text{SS}_{Trt} + \text{SS}_E$

30. [MC] In an unbalanced two-factor factorial design, which type of sums of squares is generally recommended? [2pts]
a) Type I (sequential)
b) Type II (adjusted for main effects only)
c) Type III (adjusted for all other terms) [x]
d) Type IV (partial)

> Type III SS are invariant to the order of terms in the model and test each effect adjusted for all others — recommended for unbalanced designs.

31. [MC] In a $2 \times 3$ factorial CRD with $r = 4$ replicates per cell, what is the total number of observations ($N$)? [2pts]
a) 12
b) 18
c) 24 [x]
d) 30

> $N = a \times b \times r = 2 \times 3 \times 4 = 24$

32. [MC] A two-factor ANOVA shows: Factor A ($p = 0.002$), Factor B ($p = 0.34$), and AB interaction ($p = 0.0001$). A colleague says "Factor B has no effect." What is wrong with this conclusion? [2pts]
a) Nothing — the large p-value confirms no effect
b) The strong interaction means B's effect depends on the level of A; the main effect p-value averages over this, hiding the real pattern [x]
c) Factor B should be removed from the model
d) The p-value should be adjusted with Bonferroni correction

33. [MC] What is the partial eta-squared ($\hat{\eta}^2_p$) for an effect with $\text{SS}_{effect} = 200$ and $\text{SS}_E = 300$? [2pts]
a) 0.40 [x]
b) 0.67
c) 0.60
d) 0.33

> $\hat{\eta}^2_p = \text{SS}_{effect}/(\text{SS}_{effect} + \text{SS}_E) = 200/(200 + 300) = 0.40$

34. [Short] What is the name of the analysis that examines the effect of one factor at each fixed level of another factor? [2pts]
= simple effects
= simple effect analysis
= simple effects analysis

## Section 5: Higher-Order Factorial Designs (Week 6)

35. [MC] In a three-factor ANOVA, the $ABC$ interaction has how many degrees of freedom if $a = 2$, $b = 3$, $c = 2$? [2pts]
a) 12
b) 6
c) 2 [x]
d) 4

> $df_{ABC} = (a-1)(b-1)(c-1) = (1)(2)(1) = 2$

36. [MC] The hierarchy (marginality) principle states that: [2pts]
a) Higher-order interactions are always more important than main effects
b) If a higher-order interaction is included in the model, all lower-order terms involving those factors should also be included [x]
c) Main effects should always be tested before interactions
d) Insignificant main effects should be removed before testing interactions

37. [TF] In an unreplicated factorial design (one observation per cell), the highest-order interaction can be used as an estimate of error. [2pts]
a) True [x]
b) False

> With $r = 1$, there are no within-cell degrees of freedom. Higher-order interactions (assumed negligible) are pooled into the error term.

38. [MC] A normal probability plot of effects is a diagnostic tool for: [2pts]
a) Checking normality of residuals
b) Identifying which effects in an unreplicated $2^k$ design are likely real vs. noise [x]
c) Testing for interaction effects in any factorial design
d) Checking homogeneity of variance

> In an unreplicated $2^k$ design, each effect has 1 df. Plotting effects on a normal probability plot reveals active effects as points deviating from the line.

39. [TF] A normal probability plot of effects can be used for $3^k$ factorial designs the same way it is used for $2^k$ designs. [2pts]
a) True
b) False [x]

> In $3^k$ designs, each effect has 2+ df and cannot be reduced to a single coefficient. The normal probability plot requires single-df effects (as in $2^k$).

40. [MC] A three-way interaction ($ABC$) being present means: [2pts]
a) All three factors have strong main effects
b) The $AB$ interaction pattern changes across levels of factor $C$ [x]
c) Factors $A$, $B$, and $C$ are all correlated
d) The main effects of $A$, $B$, and $C$ cancel each other out

## Section 6: Comprehensive / Cross-Topic Questions

41. [MC] A researcher runs a $2 \times 2$ factorial CRD with $r = 10$ per cell and obtains the following ANOVA results: Factor A ($F = 8.4$, $p = 0.006$, $s = 7.4$ bits), Factor B ($F = 2.1$, $p = 0.156$, $s = 2.7$ bits), AB interaction ($F = 15.2$, $p = 0.0004$, $s = 11.3$ bits). Which effect has the strongest evidence against its null hypothesis? [2pts]
a) Factor A
b) Factor B
c) The AB interaction [x]
d) Cannot determine without effect sizes

> The AB interaction has the largest s-value (11.3 bits), indicating the strongest evidence.

42. [MC] A researcher conducts a CRD with $k = 3$ groups ($n = 10$ each). The omnibus $F$-test yields $F(2, 27) = 5.41$, $p = 0.011$, $s = 6.5$ bits. Which of the following is the most appropriate results statement? [3pts]
a) "The treatment effect was statistically significant ($p < 0.05$), so we reject $H_0$."
b) "The data provide strong evidence of differences among the treatment means ($F(2, 27) = 5.41$, $p = 0.011$, $s = 6.5$ bits)." [x]
c) "The data are not significant because $p > 0.01$."
d) "We fail to reject $H_0$ since the effect size is unknown."

43. [TF] In this course, we interpret p-values on a continuum of evidence strength, calibrated using s-values (Shannon information), rather than as binary reject/fail-to-reject decisions. [1pt]
a) True [x]
b) False

44. [MC] Which design principle is addressed by using multiple clinics (rather than a single clinic) when testing a new therapy? [2pts]
a) Replication
b) Randomization
c) Blocking [x]
d) Factorial crossing

> Using multiple clinics addresses blocking — grouping patients by clinic to account for clinic-to-clinic variability.

45. [MC] An experiment measures each patient's blood pressure at 4 time points after taking a medication. Are these 4 measurements replicates of the treatment effect? [2pts]
a) Yes, they are independent replicates
b) No, they are repeated measures on the same experimental unit and are not independent [x]
c) Yes, as long as the time points are equally spaced
d) No, but they can be treated as replicates if the correlation is small

> Repeated measurements on the same unit are correlated and do not constitute independent replication.

46. [MC] Calculate the s-value (in bits) for $p = 0.03125$. [3pts]
a) 3.2 bits
b) 4.0 bits
c) 5.0 bits [x]
d) 6.4 bits

> $s = -\log_2(0.03125) = -\log_2(1/32) = 5.0$ bits

47. [Short] In a residuals-vs-fitted plot, what pattern indicates a violation of the equal-variance assumption? [2pts]
= funnel
= funnel shape
= fan shape
= fan
= megaphone

48. [MC] Which R function from the `emmeans` package is used to perform pairwise comparisons of estimated marginal means? [2pts]
a) `pairwise()`
b) `contrast(emm, method = "pairwise")` [x]
c) `TukeyHSD()`
d) `anova()`

49. [MC] In a one-way ANOVA with $k = 3$ groups and $n_i = 8$ per group, what is the value of $\text{SS}_E$ if $s_1^2 = 36$, $s_2^2 = 49$, and $s_3^2 = 25$? [3pts]
a) 110
b) 330
c) 770 [x]
d) 880

> $\text{SS}_E = \sum (n_i - 1)s_i^2 = 7(36) + 7(49) + 7(25) = 252 + 343 + 175 = 770$

50. [MC] In the reporting framework for this course, a complete results statement for an ANOVA F-test should include: [2pts]
a) Only the p-value and whether it is "significant"
b) The F-statistic with degrees of freedom, exact p-value, s-value, and effect size with interpretation [x]
c) Only the F-statistic and degrees of freedom
d) The p-value, confidence interval, and sample size
