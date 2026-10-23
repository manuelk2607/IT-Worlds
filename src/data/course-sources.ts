import type { Source } from './content.ts';

const read = '2026-10-23';
const latexCommit = 'b254d6ea14b8f97f55ef7bd1edc592526e96f560';
const d2lCommit = '23d7a5aecceee57d1292c56e90cce307f183bb0a';
function latex(lesson: string, section: string): Source {
  return { title: `Learn LaTeX · ${section}`, publisher: 'Learn LaTeX / LaTeX Project contributors',
    url: `https://www.learnlatex.org/en/lesson-${lesson}`, evidenceUrl: `https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/${latexCommit}/en/lesson-${lesson}.md`,
    version: `Commit ${latexCommit}`, section, reviewedAt: read, description: section };
}
function d2l(path: string, section: string): Source {
  return { title: `Dive into Deep Learning · ${section}`, publisher: 'Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola',
    url: `https://d2l.ai/${path}.html`, evidenceUrl: `https://raw.githubusercontent.com/d2l-ai/d2l-en/${d2lCommit}/${path}.md`,
    version: `Commit ${d2lCommit}`, section, reviewedAt: read, description: section };
}
function paper(id: string, title: string, publisher: string, section: string): Source {
  return { title, publisher, url: `https://arxiv.org/abs/${id}`, evidenceUrl: `https://arxiv.org/html/${id}`,
    version: `arXiv:${id}`, section, reviewedAt: read, description: title };
}
function doc(url: string, title: string, publisher: string, version: string, section: string): Source {
  return { url, evidenceUrl: url, title, publisher, version, section, reviewedAt: read, description: section };
}
export const courseSources = {
  aiIntroduction: d2l('chapter_introduction/index', 'Supervised, unsupervised, self-supervised and reinforcement learning'),
  mlEvaluation: doc('https://scikit-learn.org/stable/modules/model_evaluation.html', 'Metrics and scoring', 'scikit-learn developers', '1.9.1 · accessed 2026-10-23', 'Classification metrics; precision, recall, F-measures'),
  mlValidation: doc('https://scikit-learn.org/stable/modules/cross_validation.html', 'Cross-validation', 'scikit-learn developers', '1.9.1 · accessed 2026-10-23', 'Train/validation/test; cross-validation'),
  torchConv: doc('https://docs.pytorch.org/docs/2.14/generated/torch.nn.Conv2d.html', 'Conv2d', 'PyTorch', '2.14', 'Shape; parameters'),
  torchLstm: doc('https://docs.pytorch.org/docs/2.14/generated/torch.nn.LSTM.html', 'LSTM', 'PyTorch', '2.14', 'Gates; inputs and outputs'),
  torchRepro: doc('https://docs.pytorch.org/docs/2.14/notes/randomness.html', 'Reproducibility', 'PyTorch', '2.14', 'Reproducibility; controlling sources of randomness'),
  torchAmp: doc('https://docs.pytorch.org/docs/2.14/amp.html', 'Automatic Mixed Precision', 'PyTorch', '2.14', 'Autocasting; gradient scaling'),
  torchDropout: doc('https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html', 'Dropout', 'PyTorch', '2.14', 'Training and evaluation behaviour'),
  torchTransfer: doc('https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', 'Transfer Learning for Computer Vision', 'PyTorch · Sasank Chilamkurthy', 'Tutorial updated 2025-01-27', 'Fine-tuning; fixed feature extractor'),
  resnetPaper: paper('1512.03385v1', 'Deep Residual Learning for Image Recognition', 'He et al. · arXiv', '3.2 · Identity mapping by shortcuts'),
  llmTraining: doc('https://huggingface.co/learn/llm-course/chapter11/1', 'Supervised Fine-Tuning', 'Hugging Face', 'Living course · accessed 2026-10-23', 'Supervised Fine-Tuning'),
  llmPreferences: { ...paper('2305.18290v3', 'Direct Preference Optimization', 'Rafailov et al. · arXiv', 'Abstract'), evidenceUrl: 'https://arxiv.org/abs/2305.18290v3' },
  owaspLlm: doc('https://genai.owasp.org/llmrisk/llm01-prompt-injection/', 'LLM01:2025 Prompt Injection', 'OWASP Gen AI Security Project', '2025 edition', 'Prevention and mitigation strategies'),
  amsmathGuide: doc('https://www.latex-project.org/help/documentation/amsldoc.pdf', 'User’s Guide for the amsmath Package', 'American Mathematical Society / LaTeX Project', 'Guide 2.1 · revised 2020-02-18', '3.7 · Alignment building blocks; 5 · Operator names'),
  latexMacros: { ...latex('06', 'More definitions; optional arguments'), url: 'https://www.learnlatex.org/en/more-06', evidenceUrl: `https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/${latexCommit}/en/more-06.md` },
  latexLongtable: doc('https://ctan.org/pkg/longtable', 'longtable', 'LaTeX Project / CTAN', '4.27 · 2026-01-28', 'Tables across page boundaries'),
  hyperrefGuide: doc('https://tug.ctan.org/macros/latex/contrib/hyperref/doc/hyperref-doc.html', 'Hypertext marks in LaTeX', 'LaTeX3 Project', '7.01s · 2026-10-09', 'Implicit behavior; package loading order'),
  latexAccessibility: doc('https://latex3.github.io/tagging-project/', 'The LaTeX Tagged PDF Project', 'LaTeX Project', 'Project status accessed 2026-10-23', 'Guidelines for accessible PDF; package compatibility'),
  latexSetup: latex('02', 'Working with LaTeX'),
  latexSyntax: latex('03', 'Document structure'),
  latexStructure: latex('04', 'Logical structure'),
  latexPackages: latex('06', 'Extending LaTeX; defining commands'),
  latexGraphics: latex('07', 'Using graphics; floating figures'),
  latexTables: latex('08', 'Tables; column types; booktabs'),
  latexReferences: latex('09', 'Cross-referencing; label and ref'),
  latexMath: latex('10', 'Mathematics; amsmath; fonts'),
  latexBibliography: latex('12', 'Citations and references; biblatex and Biber'),
  latexProjects: latex('13', 'Structuring longer documents; input and include'),
  latexFonts: latex('14', 'Fonts and Unicode engines'),
  latexErrors: latex('15', 'Dealing with errors'),
  aiAlgebra: d2l('chapter_preliminaries/linear-algebra', 'Scalars, vectors, matrices; dot products; matrix multiplication'),
  aiCalculus: d2l('chapter_preliminaries/calculus', 'Gradients; chain rule'),
  aiProbability: d2l('chapter_preliminaries/probability', 'Conditional probability; Bayes; expectations'),
  aiRegression: d2l('chapter_linear-regression/linear-regression', 'Linear regression; loss; stochastic gradient descent'),
  aiMlp: d2l('chapter_multilayer-perceptrons/mlp', 'Hidden layers; activation functions'),
  aiBackprop: d2l('chapter_multilayer-perceptrons/backprop', 'Forward and backward propagation; computational graphs'),
  aiCnn: d2l('chapter_convolutional-neural-networks/conv-layer', 'Cross-correlation; learning a kernel'),
  aiRnn: d2l('chapter_recurrent-neural-networks/rnn', 'Recurrent neural networks with hidden states'),
  aiAdam: d2l('chapter_optimization/adam', 'Adam algorithm; moment estimates and bias correction'),
  aiTraining: { title: 'Optimizing Model Parameters', publisher: 'PyTorch', url: 'https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html', evidenceUrl: 'https://raw.githubusercontent.com/pytorch/tutorials/c8ccbbf7fcb8cb71adda1b957bd6bab50e29c2e6/beginner_source/basics/optimization_tutorial.py', version: 'Commit c8ccbbf7fcb8cb71adda1b957bd6bab50e29c2e6', section: 'Hyperparameters; loss; optimizer; full implementation', reviewedAt: read, description: 'Training and evaluation loops.' },
  mlPipeline: { title: 'Common pitfalls and recommended practices', publisher: 'scikit-learn developers', url: 'https://scikit-learn.org/stable/common_pitfalls.html', evidenceUrl: 'https://raw.githubusercontent.com/scikit-learn/scikit-learn/289c4d5cfa1b5c74c2c03420ed809c499ddf7287/doc/common_pitfalls.rst', version: 'Commit 289c4d5cfa1b5c74c2c03420ed809c499ddf7287', section: 'Inconsistent preprocessing; data leakage; randomness', reviewedAt: read, description: 'Train-only fitting and reproducible evaluation.' },
  transformerPaper: paper('1706.03762v7', 'Attention Is All You Need', 'Vaswani et al. · arXiv', '3 · Model architecture; scaled dot-product attention; masks'),
  adamwPaper: { ...paper('1711.05101v3', 'Decoupled Weight Decay Regularization', 'Loshchilov & Hutter · arXiv', 'Abstract'), evidenceUrl: 'https://arxiv.org/abs/1711.05101v3' },
  loraPaper: { ...paper('2106.09685v2', 'LoRA: Low-Rank Adaptation of Large Language Models', 'Hu et al. · arXiv', 'Abstract'), evidenceUrl: 'https://arxiv.org/abs/2106.09685v2' },
  ragPaper: { ...paper('2005.11401v4', 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', 'Lewis et al. · arXiv', 'Abstract'), evidenceUrl: 'https://arxiv.org/abs/2005.11401v4' },
  vaePaper: paper('1312.6114v11', 'Auto-Encoding Variational Bayes', 'Kingma & Welling · arXiv', '2–3 · Variational bound; reparameterization'),
  ganPaper: { ...paper('1406.2661v1', 'Generative Adversarial Networks', 'Goodfellow et al. · arXiv', 'Abstract'), evidenceUrl: 'https://arxiv.org/abs/1406.2661v1' },
  diffusionPaper: paper('2006.11239v2', 'Denoising Diffusion Probabilistic Models', 'Ho, Jain & Abbeel · arXiv', '2–3 · Forward and reverse process; noise prediction'),
  llmInference: { title: 'Text Generation Inference with LLMs', publisher: 'Hugging Face', url: 'https://huggingface.co/learn/llm-course/chapter1/8', evidenceUrl: 'https://huggingface.co/learn/llm-course/chapter1/8', version: 'Living course · accessed 2026-10-23', section: 'Prefill; decode; sampling; performance metrics', reviewedAt: read, description: 'Autoregressive text generation and inference.' },
  llmLimits: { title: 'Bias and limitations', publisher: 'Hugging Face', url: 'https://huggingface.co/learn/llm-course/chapter1/9', evidenceUrl: 'https://huggingface.co/learn/llm-course/chapter1/9', version: 'Living course · accessed 2026-10-23', section: 'Bias and limitations', reviewedAt: read, description: 'Training-data bias and limitations of fine-tuning.' },
} satisfies Record<string, Source>;
