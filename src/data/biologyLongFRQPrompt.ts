export const BIOLOGY_LONG_FRQ_AI_PROMPT = `Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague, off-topic, or partially correct statements. "Mentioning" a concept is insufficient; the response must demonstrate understanding.

FRQ 1: Protein Transport

A. Describe the function of ribosomes.

1 pt: Must state that ribosomes are the site of protein synthesis/translation. Synonyms like "make proteins" or "assemble amino acids into polypeptides" are acceptable.

B. i. Identify the dependent variable.

1 pt: "Relative amount of Sec62 and SR proteins" or "Protein content." "Amount of protein" is acceptable. "Protein levels" is acceptable.

B. ii. Justify the control (Sec62 siRNA group).

1 pt: Justification must be that it demonstrates the specificity of the siRNA, showing it only reduces its target (Sec62) and does not non-specifically affect other proteins (like SR).

B. iii. Describe the effect on SR production with Sec62 siRNA.

1 pt: Must state that there is no significant effect or that SR production is unchanged. Must reference the data (e.g., "it remains at ~100% of control").

C. i. Identify the independent variable (Fig 2).

1 pt: "Type of siRNA treatment" or "The specific siRNA added to the cells" (Control, Sec62, SR).

C. ii. Identify protein(s) with increased transport with Sec62 siRNA.

1 pt: "Protein 3" only. Must be specific.

C. iii. Calculate the amino acid difference.

1 pt: Calculation: (495 nt - 234 nt) / 3 nt per amino acid = 87 amino acids. Answer must be 87. Points only awarded for the final correct number.

D. i. Support the claim that Protein 1 is post-translation transport.

1 pt: Must state that transport of Protein 1 is only reduced by SR siRNA (which blocks co-translational transport) and is unaffected by Sec62 siRNA (which blocks post-translational transport). This pattern matches the claim.

D. ii. Justify the claim about the amino terminus.

1 pt: Justification must be that the amino-terminal signal sequence is recognized by the SRP (signal recognition particle), which directs the ribosome to the ER channel. The presence/sequence of this initial signal determines if and how the protein is transported.`;

export const BIOLOGY_LONG_FRQ2_AI_PROMPT = `Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague, off-topic, or partially correct statements. "Mentioning" a concept is insufficient; the response must demonstrate understanding.

A. Describe the polarity of the intramembrane receptor portion.

1 pt: Must state it is nonpolar/hydrophobic. "Hydrophobic" is acceptable. "Uncharged" is not sufficient.

B. ii. Determine which activity was affected.

1 pt: Must state that oriented activity was affected. Must be specific. Do not accept "general activity" or "both."

C. i. Identify treatment with >50% oriented activity.

1 pt: "Saline (control) injection" or "Control group."

C. ii. Predict effect of G protein mutation.

1 pt: Must predict a decrease (or absence) of oriented activity. Reasoning must be that the signaling pathway cannot be activated without GTP binding, preventing gene transcription.

D. i. Support the claim linking gene expression to mating likelihood.

1 pt: Evidence: DopEcR expression is low in immature moths (who are not seeking mates) and high in mature moths. The siRNA experiment shows that reducing DopEcR expression significantly reduces oriented movement toward pheromones (which is necessary to find a mate).

D. ii. Explain how a pathway inhibitor could protect crops.

1 pt: Explanation must be that an inhibitor would block the signaling pathway (e.g., by preventing 20E binding or G protein activation). This would prevent the oriented flight behavior, making male moths unable to locate females, reducing mating and thus the next generation of crop-damaging larvae.`;

export const BIOLOGY_SHORT_FRQ1_AI_PROMPT = `General Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague or off-topic statements.

FRQ 3: Buffelgrass Experiment

A. Effect of removing a keystone species.

1 pt: Must state that the ecosystem would change dramatically or collapse. Must include that biodiversity would decrease or the structure/function of the ecosystem would be significantly altered.

B. Identify a control group.

1 pt: Buffelgrass grown alone (without any native grass species), under both watering conditions.

C. State the null hypothesis.

1 pt: Must state that growing buffelgrass with native grass species will have no effect on its height and/or dry weight compared to the control (growing it alone).

D. Justify the claim that wildfires increase buffelgrass abundance.

1 pt: Justification must connect the faster population growth rate of buffelgrass to its ability to outcompete the slower-growing native species for resources (space, nutrients, water) in the open space created by a wildfire.`;

export const BIOLOGY_SHORT_FRQ2_AI_PROMPT = `General Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague or off-topic statements.

A. Genetic evidence for evolution.

1 pt: Must describe a change in allele frequencies in a population over time.

B. Explain how isolation leads to divergent evolution.

1 pt: Explanation must state that separated populations experience different selective pressures (e.g., different water temps, nutrients) and/or undergo genetic drift. Over time, this results in the accumulation of different genetic changes, leading to new species.

C. Predict effect on resource availability for S. American species.

1 pt: Must predict a decrease in resource availability.

D. Justify the prediction from part C.

1 pt: Justification must state that the migration of North American species into South America increases competition for limited resources (food, space, mates, etc.) that the native South American species also require.`;

export const BIOLOGY_SHORT_FRQ3_AI_PROMPT = `General Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague or off-topic statements.

A. Characteristic of an active site.

1 pt: Must describe specificity. Answer must indicate the active site's shape/chemical properties are complementary to (or only bind with) its specific substrate.

B. Explain regulation of enzyme 1.

1 pt: Explanation must state that amino acid B acts as an inhibitor (noncompetitive/allosteric implied) of enzyme 1. It binds to enzyme 1 (not at the active site) and changes its shape, preventing it from catalyzing the reaction from A to X.

C. Identify product of enzyme 2.

1 pt: Intermediate Y. Must be specific.

D. Explain pH effect on enzyme 3.

1 pt: Explanation must state that a change in pH can denature enzyme 3 (alter its 3D shape/active site), preventing it from converting Y to B.`;

export const BIOLOGY_SHORT_FRQ4_AI_PROMPT = `General Instructions: Grade strictly. Award points only for responses that are precise, use correct terminology, and directly answer the question. Do not infer meaning or award points for vague or off-topic statements.

A. Identify genotype with ~12% filaments.

1 pt: *ald1/del*. Must be specific.

B. Describe ALD protein difference.

1 pt: Must state that *ald3/ald23* cells produce more ALD protein than *ald23/del* cells. (Reference to band thickness is acceptable).

C. Support the hypothesis (half protein, normal filaments).

1 pt: Support must compare WT/del to WT/WT. WT/del produces ~half the protein (Fig 1B) but has a similar (wild-type) percentage of cells with filaments (Fig 1A).

D. Explain differing phenotypes despite equal protein.

1 pt: Explanation must state that the ald1 mutation produces a non-functional (or defective) protein, while the wild-type (WT) allele produces a functional protein. Therefore, *ald1/del* has no functional protein, but WT/del has half the normal amount of functional protein.`;
