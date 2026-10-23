import { text as t, option as o, type Chapter } from './course-types.ts';
import { chapter, question as q } from './course-types.ts';

export const aiAdvanced: Chapter[] = [
  chapter('machine-learning', t('5 · Machine Learning und Evaluation', '5 · Machine learning and evaluation'), 'vertiefung',
    [t('Modelle vergleichen, Daten korrekt trennen und Fehlerkosten berücksichtigen.', 'Compare models, split data correctly and account for error costs.')], [
      { title: t('Modell und Pipeline', 'Model and pipeline'), paragraphs: [
        t('Lineare Regression liefert numerische Werte. Logistische Regression wandelt einen linearen Score in eine binäre Wahrscheinlichkeit um. Entscheidungsbäume teilen den Merkmalsraum mit Regeln; Ensembles kombinieren mehrere Modelle. Wähle nach Validierungsfehler, Datenmenge, Interpretierbarkeit und Rechenbudget, nicht nach der Zahl der Schichten.', 'Linear regression produces numerical values. Logistic regression maps a linear score to a binary probability. Decision trees partition feature space with rules; ensembles combine multiple models. Choose based on validation error, data volume, interpretability and compute budget, not layer count.'),
        t('Trenne Daten vor lernender Vorverarbeitung. Passe Skalierung, Imputation und Merkmalsauswahl ausschließlich auf Training an. In einer Kreuzvalidierung geschieht dies erneut innerhalb jeder Trainingsfalte. Für Zeitreihen sind chronologische, für wiederholte Personenmessungen gruppenweise Aufteilungen sinnvoll. Testdaten bleiben bis zur abschließenden Bewertung unangetastet.', 'Split data before learned preprocessing. Fit scaling, imputation and feature selection only on training data. In cross-validation, repeat this inside each training fold. Chronological splits suit time series; group splits suit repeated measurements of people. Leave test data untouched until final evaluation.')
      ] },
      { title: t('Mehr als Accuracy', 'Beyond accuracy'), paragraphs: [
        t('Bei 99 % negativen Fällen erreicht ein immer-negatives Modell 99 % Accuracy, entdeckt aber keinen positiven Fall. Precision fragt nach dem richtigen Anteil positiver Vorhersagen; Recall nach dem gefundenen Anteil tatsächlicher positiver Fälle. Schwellenwerte wählst du auf Validierungsdaten anhand der Fehlerkosten.', 'With 99% negative cases, an always-negative model reaches 99% accuracy but detects no positive case. Precision measures the correct fraction of positive predictions; recall the detected fraction of actual positive cases. Choose thresholds on validation data according to error costs.'),
        t('TP bezeichnet richtig positive, FP falsch positive, FN falsch negative und TN richtig negative Entscheidungen. Ein F1-Wert verdichtet Precision und Recall, ersetzt aber keine Betrachtung der einzelnen Fehler. Berichte zusätzlich Fallzahlen und Streuung über mehrere passende Aufteilungen.', 'TP means true positive, FP false positive, FN false negative and TN true negative decisions. F1 summarises precision and recall but does not replace examining individual error types. Also report sample counts and variability across suitable splits.')
      ], formula: String.raw`P=\frac{TP}{TP+FP},\quad R=\frac{TP}{TP+FN},\quad F_1=\frac{2TP}{2TP+FP+FN}` }
    ], t('Berechne bei TP=12, FP=3, FN=8, TN=77 Precision, Recall und Accuracy.', 'Calculate precision, recall and accuracy for TP=12, FP=3, FN=8, TN=77.'),
    t('Precision=0,8; Recall=0,6; Accuracy=0,89. Trotz hoher Accuracy werden 40 % der positiven Fälle verpasst. Ob das akzeptabel ist, hängt von den Fehlerkosten ab.', 'Precision=0.8; recall=0.6; accuracy=0.89. Despite high accuracy, 40% of positive cases are missed. Acceptability depends on error costs.'), ['mlPipeline', 'mlEvaluation', 'mlValidation', 'aiMlp'], [
      q(t('Wann wird ein Scaler für die Validierung angepasst?', 'When is a scaler used for validation fitted?'), 'mlPipeline', 1, [o('Auf allen Daten vor der Teilung', 'On all data before splitting', 'Das lässt Validierungsdaten ins Training einfließen.', 'This leaks validation data into training.'), o('Nur auf den jeweiligen Trainingsdaten', 'Only on the respective training data', 'Die gelernte Transformation wird unverändert auf Validierung angewandt.', 'The learned transformation is applied unchanged to validation.'), o('Neu auf der Validierungsmenge', 'Again on the validation set', 'Das erzeugt eine andere Transformation.', 'This produces a different transformation.')]),
      q(t('Warum dürfen Hyperparameter nicht wiederholt am Testfehler ausgerichtet werden?', 'Why should hyperparameters not be repeatedly tuned to test error?'), 'mlValidation', 2, [o('Weil sonst keine Gradienten entstehen', 'Because gradients would disappear', 'Das ist nicht das Problem der Testnutzung.', 'That is not the problem with test use.'), o('Weil Testdaten nie Labels haben dürfen', 'Because test data must never have labels', 'Labels werden zur abschließenden Bewertung benötigt.', 'Labels are needed for final evaluation.'), o('Weil der Test dann Teil der Modellwahl wird', 'Because the test becomes part of model selection', 'Das Ergebnis schätzt unabhängige Verallgemeinerung dann zu optimistisch.', 'The result then estimates independent generalisation too optimistically.')])
    ]),
  chapter('mehrschichtige-netze', t('6 · Mehrschichtige Netze', '6 · Multilayer networks'), 'vertiefung',
    [t('Nichtlinearität begründen und ein MLP konstruieren.', 'Explain nonlinearity and construct an MLP.')], [
      { title: t('Warum Aktivierungen nötig sind', 'Why activations matter'), paragraphs: [
        t('Zwei affine Schichten ohne nichtlineare Aktivierung lassen sich zusammenfassen: (XW₁+b₁)W₂+b₂=X(W₁W₂)+(b₁W₂+b₂). Erst eine Nichtlinearität erweitert diese Funktionsklasse. Beim XOR-Problem liegen die positiven Beispiele an gegenüberliegenden Ecken; eine einzelne Gerade kann sie nicht von den negativen trennen.', 'Two affine layers without nonlinear activation collapse into one: (XW₁+b₁)W₂+b₂=X(W₁W₂)+(b₁W₂+b₂). A nonlinearity expands this function class. In XOR, positive examples occupy opposite corners; one straight line cannot separate them from negatives.'),
        t('ReLU(x)=max(0,x). Sigmoid bildet nach (0,1), Tanh nach (−1,1) ab; in gesättigten Bereichen können ihre Ableitungen klein sein. Die letzte Schicht muss zur Verlustfunktion passen: CrossEntropyLoss bekommt rohe Scores. Mehr Kapazität erleichtert Anpassung, aber auch Überanpassung.', 'ReLU(x)=max(0,x). Sigmoid maps to (0,1), tanh to (−1,1); derivatives can be small in saturated regions. The last layer must match the loss: CrossEntropyLoss receives raw scores. More capacity helps fitting but also overfitting.')
      ] },
      { title: t('Ein vollständiger Formtest mit PyTorch', 'A complete shape test with PyTorch'), paragraphs: [t('Python mit installiertem torch genügt für dieses eigenständige Programm. Vier Beispiele mit je zwei Merkmalen erhalten je zwei Klassenscores. Dies ist nur ein Vorwärtslauf: zufällig initialisierte Gewichte sind noch kein gelerntes XOR-Modell.', 'Python with torch installed is sufficient for this standalone program. Four examples with two features each receive two class scores each. This is only a forward pass: randomly initialised weights are not a trained XOR model.')], language: 'Python', code: `import torch
from torch import nn

torch.manual_seed(7)
model = nn.Sequential(nn.Linear(2, 8), nn.ReLU(), nn.Linear(8, 2))
x = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])
logits = model(x)
assert logits.shape == (4, 2)
assert sum(p.numel() for p in model.parameters()) == 42
print(logits.shape)` }
    ], t('Erkläre die 42 Parameter und berechne die Anzahl bei versteckter Breite 4.', 'Explain the 42 parameters and calculate the count for hidden width 4.'),
    t('2·8+8+8·2+2=42. Mit Breite 4: 2·4+4+4·2+2=22. ReLU selbst hat keine trainierbaren Parameter.', '2·8+8+8·2+2=42. With width 4: 2·4+4+4·2+2=22. ReLU itself has no trainable parameters.'), ['aiMlp', 'pytorch', 'aiTraining'], [
      q(t('Was bewirken mehrere affine Schichten ohne Aktivierung?', 'What do several affine layers without activation produce?'), 'aiMlp', 0, [o('Insgesamt wieder eine affine Funktion', 'Another affine function overall', 'Matrizen und Biaswerte lassen sich zusammenfassen.', 'Matrices and biases can be combined.'), o('Automatisch eine nichtlineare Funktion', 'Automatically a nonlinear function', 'Ohne Nichtlinearität entsteht keine.', 'No nonlinearity is introduced without one.'), o('Ein Modell ohne Parameter', 'A model without parameters', 'Die Gewichte bleiben trainierbar.', 'The weights remain trainable.')]),
      q(t('Was ist ReLU(−2)?', 'What is ReLU(−2)?'), 'aiMlp', 1, [o('−2', '−2', 'Negative Werte werden nicht durchgereicht.', 'Negative values do not pass through.'), o('0', '0', 'max(0,−2)=0.', 'max(0,−2)=0.'), o('2', '2', 'ReLU ist keine Betragsfunktion.', 'ReLU is not the absolute-value function.')])
    ]),
  chapter('training', t('7 · Ein vollständiger Trainingslauf', '7 · A complete training run'), 'vertiefung',
    [t('Training, Validierung und unabhängigen Test in einem lauffähigen Beispiel verbinden.', 'Combine training, validation and an independent test in a runnable example.')], [
      { title: t('Daten und Ablauf', 'Data and procedure'), paragraphs: [
        t('Wir erzeugen 600 unabhängige zweidimensionale Punkte. Das Ziel ist 1, wenn beide Koordinaten dasselbe Vorzeichen haben, sonst 0. Das ergibt eine nichtlineare Grenze. Die feste Aufteilung nutzt 400 Trainings-, 100 Validierungs- und 100 Testpunkte; es werden keine externen Datensätze geladen.', 'We generate 600 independent two-dimensional points. The target is 1 when both coordinates have the same sign, otherwise 0. This creates a nonlinear boundary. The fixed split uses 400 training, 100 validation and 100 test points; no external dataset is downloaded.'),
        t('Pro Batch: alte Gradienten löschen, Vorhersage und Verlust berechnen, rückwärts ableiten, Parameter aktualisieren. Eine Epoche verarbeitet den Trainingssatz einmal. model.eval() verändert das Verhalten bestimmter Schichten, no_grad() schaltet die Gradientenaufzeichnung ab; beides erfüllt unterschiedliche Aufgaben.', 'For each batch: clear old gradients, compute prediction and loss, backpropagate, update parameters. An epoch processes the training set once. model.eval() changes certain layers’ behaviour; no_grad() disables gradient recording. They serve different purposes.')
      ] },
      { title: t('Python-Datei mit torch ausführen', 'Run a Python file with torch'), paragraphs: [t('Speichere den vollständigen Code als train.py und starte ihn mit python train.py in deiner Python-Umgebung. Der beste Validierungszustand wird kopiert und erst am Schluss am Test gemessen. Das CPU-Beispiel demonstriert den Ablauf; die synthetischen Daten belegen keine Qualität für reale Anwendungen.', 'Save the complete code as train.py and run python train.py in your Python environment. The best validation state is copied and tested only at the end. This CPU example demonstrates the procedure; synthetic data establish no quality for real applications.')], language: 'Python', code: `import copy
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

torch.manual_seed(7)
torch.set_num_threads(1)
x = torch.randn(600, 2)
y = (x[:, 0] * x[:, 1] > 0).long()
train = DataLoader(TensorDataset(x[:400], y[:400]), batch_size=32, shuffle=True)
model = nn.Sequential(nn.Linear(2, 16), nn.ReLU(), nn.Linear(16, 2))
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=0.01, weight_decay=0.01)
best_loss = float("inf")
best_state = copy.deepcopy(model.state_dict())

for epoch in range(60):
    model.train()
    for features, targets in train:
        optimizer.zero_grad(set_to_none=True)
        loss = loss_fn(model(features), targets)
        loss.backward()
        optimizer.step()
    model.eval()
    with torch.no_grad():
        validation_loss = loss_fn(model(x[400:500]), y[400:500]).item()
    if validation_loss < best_loss:
        best_loss = validation_loss
        best_state = copy.deepcopy(model.state_dict())

model.load_state_dict(best_state)
model.eval()
with torch.no_grad():
    accuracy = (model(x[500:]).argmax(1) == y[500:]).float().mean().item()
print(f"validation loss: {best_loss:.4f}; test accuracy: {accuracy:.3f}")` }
    ], t('Entferne in einem getrennten Experiment zero_grad und beobachte die Wirkung. Warum ist best_state = model.state_dict() ohne Kopie problematisch?', 'In a separate experiment, remove zero_grad and observe the effect. Why is best_state = model.state_dict() without a copy problematic?'),
    t('Gradienten sammeln sich standardmäßig über backward-Aufrufe an; ohne bewusstes Akkumulationsschema ändert das das Update. state_dict enthält Referenzen auf Tensoren. Ohne Kopie können spätere Trainingsschritte den vermeintlich gespeicherten Bestzustand verändern.', 'Gradients accumulate across backward calls by default; without a deliberate accumulation scheme this changes the update. state_dict contains tensor references. Without a copy, later training steps can modify the supposedly saved best state.'), ['aiTraining', 'mlPipeline', 'adamwPaper'], [
      q(t('Welche Reihenfolge ist für einen normalen Batch korrekt?', 'Which order is correct for an ordinary batch?'), 'aiTraining', 2, [o('step → backward → zero_grad', 'step → backward → zero_grad', 'Das Update verwendet dabei nicht die neuen Gradienten.', 'The update would not use the new gradients.'), o('backward → zero_grad → step', 'backward → zero_grad → step', 'Die gerade berechneten Gradienten würden gelöscht.', 'The gradients just computed would be cleared.'), o('zero_grad → forward/loss → backward → step', 'zero_grad → forward/loss → backward → step', 'So wird der aktuelle Batchgradient genau für dieses Update verwendet.', 'This uses the current batch gradient for this update.')]),
      q(t('Schaltet model.eval() die Gradientenaufzeichnung ab?', 'Does model.eval() disable gradient recording?'), 'aiTraining', 0, [o('Nein, dafür dient hier torch.no_grad().', 'No; torch.no_grad() serves that purpose here.', 'Eval-Modus und Autograd-Modus sind getrennte Mechanismen.', 'Evaluation mode and autograd mode are separate mechanisms.'), o('Ja, immer.', 'Yes, always.', 'eval verändert das Schichtverhalten, nicht den Autograd-Modus.', 'eval changes layer behaviour, not autograd mode.'), o('Nur bei zwei Klassen.', 'Only with two classes.', 'Die Klassenanzahl ist dafür unerheblich.', 'The number of classes is irrelevant.')])
    ]),
  chapter('optimierung', t('8 · Optimierung und Generalisierung', '8 · Optimisation and generalisation'), 'vertiefung',
    [t('SGD, Adam und AdamW unterscheiden; Überanpassung diagnostizieren.', 'Distinguish SGD, Adam and AdamW; diagnose overfitting.')], [
      { title: t('Wie ein Update entsteht', 'How an update is formed'), paragraphs: [
        t('SGD verwendet einen Batchgradienten. Momentum glättet vergangene Gradienten in einer Bewegungsrichtung. Adam führt gleitende Mittel erster und zweiter Gradientenmomente und korrigiert deren anfänglichen Null-Bias. Die adaptive Skalierung ersetzt keine sorgfältige Lernratenwahl.', 'SGD uses a batch gradient. Momentum smooths past gradients into a direction of motion. Adam maintains moving averages of first and second gradient moments and corrects their initial zero bias. Adaptive scaling does not replace careful learning-rate selection.'),
        t('AdamW entkoppelt Gewichtszerfall vom adaptiven Gradientenschritt. Bei Adam ist eine L2-Strafe im Verlust nicht allgemein identisch mit diesem entkoppelten Zerfall. Lernratenschedules verändern die Schrittweite über die Zeit; Gradient Clipping begrenzt große Gradienten, heilt aber kein fehlerhaftes Lernziel.', 'AdamW decouples weight decay from the adaptive gradient step. With Adam, an L2 penalty in the loss is not generally identical to this decoupled decay. Learning-rate schedules change step size over time; gradient clipping limits large gradients but does not repair a faulty objective.')
      ], formula: String.raw`m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\quad v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2,\quad\hat m_t=\frac{m_t}{1-\beta_1^t},\quad\hat v_t=\frac{v_t}{1-\beta_2^t}` },
      { title: t('Trainingskurven lesen', 'Reading learning curves'), paragraphs: [
        t('Sinkender Trainingsverlust bei steigendem Validierungsverlust spricht für Überanpassung an die Trainingsstichprobe. Vergleiche geringere Kapazität, Gewichtszerfall, mehr passende Daten oder früheres Stoppen. Dropout blendet beim Training zufällig Aktivierungen aus; im üblichen Evaluationsmodus entfällt dieses Ausblenden.', 'Falling training loss with rising validation loss suggests overfitting the training sample. Compare lower capacity, weight decay, more suitable data or earlier stopping. Dropout randomly removes activations during training; ordinary evaluation mode disables this removal.'),
        t('Ein belastbarer Vergleich ändert zunächst nur einen Faktor, hält Aufteilung und Budget fest und wiederholt mehrere Seeds. Ein Seed erleichtert Reproduktion, garantiert aber keine identischen Ergebnisse über Hardware und Bibliotheksversionen. Mixed Precision kann Speicher und Rechenzeit sparen, verlangt jedoch Kontrolle numerischer Stabilität; kleine Gradienten können besondere Skalierung benötigen.', 'A defensible comparison initially changes one factor, fixes splits and budget, and repeats several seeds. A seed helps reproduction but does not guarantee identical results across hardware and library versions. Mixed precision can save memory and compute but requires numerical-stability checks; small gradients may need special scaling.')
      ] }
    ], t('Im ersten Adam-Schritt sei g=2, β₁=0,9, β₂=0,999. Berechne m, v und beide bias-korrigierten Momente. Entwirf einen Vergleich SGD gegen AdamW.', 'On the first Adam step let g=2, β₁=0.9, β₂=0.999. Calculate m, v and both bias-corrected moments. Design an SGD versus AdamW comparison.'),
    t('m=0,2, v=0,004; m̂=2, v̂=4. Vergleiche beide Optimierer mit getrennt abgestimmten Lernraten, identischen Daten und Budget; berichte mehrere Seeds und nutze den Test erst nach der Auswahl.', 'm=0.2, v=0.004; m̂=2, v̂=4. Compare optimisers with separately tuned learning rates, identical data and budget; report multiple seeds and use the test only after selection.'), ['aiAdam', 'adamwPaper', 'mlValidation', 'aiTraining', 'torchRepro', 'torchAmp', 'torchDropout'], [
      q(t('Warum korrigiert Adam die ersten Momente?', 'Why does Adam correct the initial moment estimates?'), 'aiAdam', 1, [o('Um alle Gradienten auf null zu setzen', 'To set all gradients to zero', 'Die Gradienteninformation wird weiterhin gebraucht.', 'Gradient information is still needed.'), o('Wegen der Initialisierung der Mittelwerte mit null', 'Because the moving averages start at zero', 'Die Korrektur kompensiert deren anfängliche Verzerrung.', 'The correction compensates their initial bias.'), o('Um den Testsatz einzubeziehen', 'To include the test set', 'Der Testsatz gehört nicht in Updates.', 'The test set does not belong in updates.')]),
      q(t('Welche Aussage zu AdamW stimmt?', 'Which statement about AdamW is correct?'), 'adamwPaper', 2, [o('L2 im Verlust ist bei Adam immer identisch.', 'L2 in the loss is always identical with Adam.', 'Die adaptive Skalierung macht diese Gleichsetzung im Allgemeinen falsch.', 'Adaptive scaling makes this equivalence generally false.'), o('AdamW benötigt keine Lernrate.', 'AdamW needs no learning rate.', 'Auch AdamW hat eine Schrittweite.', 'AdamW also has a step size.'), o('Gewichtszerfall ist vom adaptiven Schritt entkoppelt.', 'Weight decay is decoupled from the adaptive step.', 'Das ist der wesentliche Unterschied der Methode.', 'This is the method’s essential distinction.')])
    ]),
];

