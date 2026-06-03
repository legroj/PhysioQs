const STORAGE_KEY = "physioq.questionBank.v6";
const VALIDATION_STORAGE_KEY = "physioq.validationResults.v1";
const BANK_VERSION = "2026-06-03-high-difficulty-unique-bank";
const BANK_ASSET_URL = `question-bank.json?v=${BANK_VERSION}`;
const BASE_QUESTIONS_PER_TOPIC = 50;
const VIGNETTE_QUESTIONS_PER_TOPIC = 50;
const QUESTIONS_PER_TOPIC = BASE_QUESTIONS_PER_TOPIC + VIGNETTE_QUESTIONS_PER_TOPIC;

const STEM_CONTEXTS = [
  "A 22-year-old first-year medical student participates in a physiology laboratory exercise.",
  "A 29-year-old healthy volunteer is studied after a controlled intervention.",
  "A 35-year-old patient is discussed during a case-based physiology conference.",
  "A 44-year-old patient has a predictable change in a measured physiologic variable.",
  "A 51-year-old patient undergoes testing after a medication alters homeostasis.",
  "A 60-year-old patient is evaluated during morning rounds.",
  "A 19-year-old athlete is monitored during a standardized protocol.",
  "A 40-year-old patient is evaluated after an acute environmental exposure.",
  "A 67-year-old patient is reviewed during an integrated organ-system session.",
  "A 24-year-old graduate student volunteers for a noninvasive physiology study."
];

const ADVANCED_VIGNETTE_CONTEXTS = [
  "A 23-year-old medical student develops lightheadedness during a prolonged anatomy lab. Temperature is 37.0 C, blood pressure is 96/58 mm Hg, pulse is 112/min, and respirations are 18/min. The supervising physician asks the student to connect the clinical finding with a single physiologic mechanism.",
  "A 31-year-old resident participates in a monitored exercise protocol. At peak exertion, pulse is 156/min, respirations are 32/min, and venous blood sampling shows increased CO2 content. The protocol director asks which mechanism best explains the measured change.",
  "A 42-year-old patient is evaluated after 2 days of vomiting and poor oral intake. Blood pressure is 102/64 mm Hg while supine and 86/54 mm Hg standing. Serum sodium is 136 mEq/L, potassium is 3.3 mEq/L, chloride is 91 mEq/L, and bicarbonate is 33 mEq/L.",
  "A 55-year-old patient receives an investigational drug during a physiology study. Within 20 minutes, a predictable change is seen in pressure, ion movement, or hormone secretion while other measured variables remain within reference range.",
  "A 64-year-old patient with progressive fatigue is discussed in a small-group session. Examination shows no focal neurologic deficit. The instructor provides one abnormal physiologic measurement and asks which normal mechanism has been altered.",
  "A 19-year-old athlete collapses briefly after finishing a race on a hot day. Temperature is 38.2 C, pulse is 128/min, and mucous membranes are dry. After oral rehydration, symptoms improve, and the team reviews the homeostatic response.",
  "A 28-year-old volunteer is placed in a controlled chamber that changes ambient pressure, gas composition, or workload. Serial measurements are obtained after 10 minutes, and the learner must identify the mechanism responsible for adaptation.",
  "A 47-year-old patient is evaluated before surgery. Routine laboratory studies show a mild isolated abnormality, but the physical examination is otherwise normal. The attending asks which physiologic principle predicts the next compensatory change.",
  "A 70-year-old patient is admitted with shortness of breath, fatigue, and decreased exercise tolerance. Blood pressure is 118/72 mm Hg, pulse is 104/min, and oxygen saturation is 93% on room air. A teaching team reviews the integrated physiology.",
  "A 34-year-old patient is seen after starting a new medication that changes receptor signaling. The patient has normal renal and hepatic function. The clinical team asks which cellular or organ-level response should occur first."
];

const DIFFICULTY_VALUES = [0.72, 0.74, 0.76, 0.78, 0.80, 0.82, 0.84, 0.86, 0.89, 0.92];

const VIGNETTE_SERIES_DETAILS = [
  "The first measurement is obtained before any intervention, and the primary variable is stable on repeat sampling.",
  "A repeat measurement after a controlled stimulus shows the same direction of change with a slightly different magnitude.",
  "A bedside tracing is reviewed with the learner, and the abnormal phase is marked before the answer choices are shown.",
  "The finding persists after washout and rechallenge, supporting a reproducible physiologic mechanism rather than random variation.",
  "A second teaching group reviews the same mechanism using a related measurement from the same organ system."
];

const QUESTION_VARIANT_FRAMES = [
  {
    conceptLead: "The learner must predict the immediate direction of the physiologic response.",
    vignetteLead: "The clinical team asks which response best matches the primary physiologic disturbance.",
    questionLead: "Based on the dominant variable in this setting,",
    objectiveFocus: "Focus: directional prediction.",
    explanationFocus: "The key is the expected direction of change produced by the mechanism."
  },
  {
    conceptLead: "A targeted inhibitor is introduced while upstream conditions remain unchanged.",
    vignetteLead: "A drug effect isolates one step in the pathway while other variables are held constant.",
    questionLead: "When that step is selectively altered,",
    objectiveFocus: "Focus: effect of selective inhibition.",
    explanationFocus: "The correct answer follows from the step that is selectively blocked or enhanced."
  },
  {
    conceptLead: "A tracing or table shows one abnormal variable with otherwise preserved baseline function.",
    vignetteLead: "The abnormal value is isolated from competing findings, requiring interpretation of the primary variable.",
    questionLead: "Which physiologic change best accounts for the isolated abnormality?",
    objectiveFocus: "Focus: interpretation of an isolated abnormal variable.",
    explanationFocus: "The correct option explains the isolated abnormality without invoking unrelated changes."
  },
  {
    conceptLead: "The same mechanism is tested after a compensatory response begins.",
    vignetteLead: "A compensatory response is underway, but the original physiologic disturbance remains identifiable.",
    questionLead: "Which process is most responsible for the compensation?",
    objectiveFocus: "Focus: compensation and homeostatic response.",
    explanationFocus: "The mechanism explains how the system compensates for the initiating disturbance."
  },
  {
    conceptLead: "A second measurement is added to distinguish cause from consequence.",
    vignetteLead: "Two measurements move in a pattern that separates the causal mechanism from a secondary finding.",
    questionLead: "Which option best identifies the causal physiologic mechanism?",
    objectiveFocus: "Focus: cause versus consequence.",
    explanationFocus: "The correct answer identifies the causal step rather than a downstream association."
  },
  {
    conceptLead: "The variable is compared with a nearby pathway that produces a similar but distinct finding.",
    vignetteLead: "Two plausible mechanisms are compared, but only one matches the site and direction of the observed change.",
    questionLead: "Which mechanism best distinguishes this finding from a similar pathway?",
    objectiveFocus: "Focus: physiologic discrimination between similar pathways.",
    explanationFocus: "The correct answer matches the specific site and direction, whereas the alternatives reflect related pathways."
  },
  {
    conceptLead: "A graph of the response is interpreted after a controlled perturbation.",
    vignetteLead: "A response curve shifts after a controlled perturbation, and the learner must identify the physiologic basis.",
    questionLead: "Which mechanism explains the shift in the response curve?",
    objectiveFocus: "Focus: graph or curve interpretation.",
    explanationFocus: "The correct mechanism accounts for the observed shift in the physiologic response."
  },
  {
    conceptLead: "A normal reference value is used to identify the altered physiologic process.",
    vignetteLead: "The relevant value is compared with a reference range, making the altered process the key clue.",
    questionLead: "Which process explains the deviation from the expected reference pattern?",
    objectiveFocus: "Focus: reference-range interpretation.",
    explanationFocus: "The correct answer links the abnormal value to the physiologic process that controls it."
  },
  {
    conceptLead: "The stem asks for the mechanism most proximal to the observed physiologic effect.",
    vignetteLead: "Several findings are present, but the answer depends on the most proximal physiologic step.",
    questionLead: "Which proximal mechanism most directly produces the finding?",
    objectiveFocus: "Focus: proximal mechanism.",
    explanationFocus: "The correct answer is the nearest causal physiologic step upstream of the finding."
  },
  {
    conceptLead: "An integrated scenario requires matching the site of action to the direction of the response.",
    vignetteLead: "The vignette combines site, variable, and direction of change to require integrated physiologic reasoning.",
    questionLead: "Which option best preserves the site-specific direction of the response?",
    objectiveFocus: "Focus: integrated high-difficulty application.",
    explanationFocus: "The correct answer integrates the site of action with the expected direction of the response."
  }
];

const VALIDATION_ENGINES = {
  lisa: "LiSA V1.0",
  medGemini: "Med-Gemini 1.5"
};

const VALIDATION_RUBRIC = [
  "Single best answer with one unambiguously correct option",
  "Clinical vignette requires physiologic reasoning rather than direct recall",
  "No copyrighted NBME wording, patient stem, or answer option is reproduced",
  "Distractors are plausible but physiologically distinguishable",
  "Explanation justifies the correct answer and rules out competing concepts",
  "Difficulty index is projected between 0.0 and 0.7 when present"
];

const INTEGRATED_TOPICS = [
  "Cardiovascular & Respiratory",
  "Renal Cardiovascular",
  "Renal & Acid-Base",
  "Endocrine & Metabolism",
  "Neuro-Endocrine Integration",
  "GI & Autonomic System",
  "Multisystem Homeostasis"
];

const SYSTEM_DEFINITIONS = [
  {
    system: "Cellular & Muscle Physiology",
    prefix: "CM",
    topics: [
      "Resting Membrane Potential",
      "Action Potential",
      "Synaptic Transmission",
      "Transport Mechanisms",
      "Excitable Cells",
      "Mechanics of Contraction",
      "Excitation-Contraction Coupling"
    ]
  },
  {
    system: "Cardiovascular",
    prefix: "CV",
    topics: [
      "Cardiac Cycle",
      "Electrocardiography",
      "Hemodynamics",
      "Blood Pressure Regulation",
      "Heart Failure",
      "Hemostasis",
      "Microcirculation and Lymphatics"
    ]
  },
  {
    system: "Respiratory",
    prefix: "RS",
    topics: [
      "Respiratory Mechanics",
      "Gas Exchange",
      "Oxygen Transport",
      "Ventilation Control",
      "Acid-Base Balance",
      "V/Q Ratio"
    ]
  },
  {
    system: "Renal",
    prefix: "RN",
    topics: [
      "Glomerular Filtration",
      "Tubular Electrolyte Handling",
      "Urine Concentration Mechanism",
      "Volume Regulation",
      "Renal Acid-Base Physiology"
    ]
  },
  {
    system: "Reproductive & Endocrine",
    prefix: "RE",
    topics: [
      "Hypothalamic-Pituitary Axis",
      "Thyroid",
      "Adrenal Gland",
      "Glucose Homeostasis",
      "Calcium Metabolism",
      "Male Reproductive Physiology",
      "Female Reproductive Physiology",
      "Pregnancy and Lactation",
      "Puberty and Sexual Differentiation"
    ]
  },
  {
    system: "Gastrointestinal",
    prefix: "GI",
    topics: [
      "Motility",
      "Gastric Secretion",
      "Digestion and Absorption",
      "Hepatic Physiology",
      "Exocrine Pancreas",
      "Motility Patterns",
      "Salivary Secretion",
      "Carbohydrate Digestion",
      "Protein Digestion",
      "Lipid Digestion"
    ]
  },
  {
    system: "Integrated Systems",
    prefix: "IN",
    topics: INTEGRATED_TOPICS
  }
];

const TOPIC_CONCEPTS = {
  "Resting Membrane Potential": [
    c("Extracellular potassium concentration acutely increases around a neuron.", "Which change in resting membrane potential is most likely?", "Depolarization toward a less negative value", ["Hyperpolarization toward a more negative value", "No change because sodium permeability dominates", "Immediate opening of all ligand-gated channels", "Loss of all potassium permeability"], "Increasing extracellular potassium reduces the potassium gradient, making the potassium equilibrium potential less negative and depolarizing the cell.", "Predict resting membrane potential changes from extracellular potassium."),
    c("A toxin selectively reduces potassium leak conductance in a skeletal muscle fiber.", "Which effect is expected?", "The membrane potential becomes less negative", ["The membrane potential becomes more negative", "Sodium equilibrium potential becomes the main resting value", "The fiber becomes permanently refractory", "Calcium is expelled from the sarcoplasmic reticulum"], "Resting membrane potential is strongly influenced by potassium leak channels. Reducing potassium conductance moves the membrane potential away from EK and toward less negative values.", "Explain how potassium leak channels set resting membrane potential."),
    c("The sodium-potassium ATPase is inhibited for several hours.", "Which long-term effect is most likely?", "Dissipation of sodium and potassium gradients", ["Immediate restoration of ion gradients", "Increased intracellular potassium uptake", "Increased extracellular sodium removal", "Permanent hyperpolarization"], "The sodium-potassium ATPase maintains sodium and potassium gradients over time by moving sodium out and potassium into the cell.", "Describe the role of sodium-potassium ATPase in maintaining ion gradients."),
    c("The membrane becomes selectively more permeable to chloride in a neuron whose chloride equilibrium potential is near the resting potential.", "Which effect is most likely?", "Stabilization of the membrane near rest", ["Rapid depolarization to threshold", "Reversal of the sodium gradient", "Opening of voltage-gated calcium channels", "Inactivation of all potassium channels"], "Opening chloride channels tends to clamp the membrane near ECl, often stabilizing it below threshold.", "Explain inhibitory stabilization by chloride conductance."),
    c("A neuron has high resting permeability to potassium compared with sodium.", "Which statement best explains its negative resting potential?", "Potassium efflux leaves behind impermeant intracellular anions", ["Sodium influx creates the entire negative potential", "Calcium influx sets the resting potential", "ATP hydrolysis directly creates all membrane voltage", "Chloride is the only permeant ion"], "High potassium permeability allows potassium to leave the cell down its concentration gradient, leaving the inside relatively negative.", "Relate selective permeability to resting membrane potential.")
  ],
  "Action Potential": [
    c("Voltage-gated sodium channels in an axon are blocked.", "Which phase is affected most directly?", "Rapid depolarization", ["Repolarization from potassium efflux", "Afterhyperpolarization", "Resting potential generation", "Synaptic vesicle recycling"], "The rapid upstroke of an action potential depends on sodium influx through voltage-gated sodium channels.", "Match voltage-gated sodium channels with phase 0 depolarization."),
    c("Voltage-gated potassium channels open more slowly than sodium channels.", "Which action potential feature is produced by this delayed opening?", "Repolarization and afterhyperpolarization", ["Initial threshold detection only", "Synaptic vesicle docking", "Resting sodium leak", "Calcium release from troponin"], "Delayed potassium channel opening allows potassium efflux, repolarizing the membrane and often causing afterhyperpolarization.", "Explain potassium channel contribution to action potential termination."),
    c("A myelinated axon loses myelin in one segment.", "Which change explains reduced conduction velocity?", "Reduced saltatory conduction", ["Increased membrane resistance", "Decreased membrane capacitance", "Increased internodal current spread", "Increased axonal diameter"], "Myelin increases membrane resistance and decreases capacitance, enabling rapid saltatory conduction between nodes.", "Explain how myelin increases conduction velocity."),
    c("The axon diameter is increased while myelination is unchanged.", "Which effect is expected?", "Increased conduction velocity", ["Decreased conduction velocity", "Loss of all action potentials", "Decreased intracellular resistance is impossible", "Immediate synaptic failure"], "Larger axon diameter lowers internal resistance and increases conduction velocity.", "Relate axon diameter to conduction velocity."),
    c("A second stimulus occurs during the absolute refractory period.", "Why does it fail to generate another action potential?", "Voltage-gated sodium channels are inactivated", ["Potassium channels are permanently closed", "The sodium-potassium ATPase has stopped", "The membrane lacks chloride channels", "Calcium is absent from extracellular fluid"], "During the absolute refractory period, voltage-gated sodium channels are inactivated and cannot reopen immediately.", "Explain the ionic basis of the absolute refractory period.")
  ],
  "Synaptic Transmission": [
    c("Calcium entry into a presynaptic terminal is blocked.", "Which process is reduced most directly?", "Neurotransmitter vesicle fusion", ["Postsynaptic receptor recycling", "Axonal sodium influx at the initial segment", "Myelin formation", "Resting potassium leak"], "Presynaptic calcium influx triggers SNARE-mediated vesicle fusion and neurotransmitter release.", "Describe calcium-dependent neurotransmitter release."),
    c("Botulinum toxin cleaves SNARE proteins at the neuromuscular junction.", "Which direct effect occurs?", "Decreased acetylcholine release", ["Increased acetylcholine release", "Postsynaptic nicotinic receptor activation", "Acetylcholinesterase inhibition", "Increased end-plate potential amplitude"], "Botulinum toxin prevents vesicle fusion, reducing acetylcholine release and causing flaccid weakness.", "Relate SNARE proteins to vesicular exocytosis."),
    c("Acetylcholinesterase is inhibited at the neuromuscular junction.", "Which synaptic effect is expected?", "Prolonged acetylcholine action in the synaptic cleft", ["Decreased acetylcholine concentration", "Blocked nicotinic receptor synthesis", "Loss of presynaptic calcium channels", "Decreased end-plate depolarization in all cases"], "Acetylcholinesterase terminates acetylcholine signaling. Inhibition prolongs acetylcholine action.", "Explain termination of cholinergic synaptic transmission."),
    c("An inhibitory interneuron opens postsynaptic chloride channels.", "Which effect is most likely?", "Hyperpolarization or shunting inhibition", ["Rapid depolarization to threshold", "Increased sodium channel opening at rest", "Mandatory action potential generation", "Increased vesicle fusion in the postsynaptic cell"], "Chloride conductance stabilizes or hyperpolarizes the postsynaptic membrane, reducing firing probability.", "Explain inhibitory postsynaptic potentials."),
    c("Temporal summation occurs at a neuron.", "What best describes this process?", "Repeated inputs at one synapse add over time", ["Inputs from different synapses add across space only", "A single action potential becomes smaller", "Neurotransmitter changes into a hormone", "Myelin thickness increases after stimulation"], "Temporal summation occurs when repeated postsynaptic potentials arrive close together and add over time.", "Differentiate temporal from spatial summation.")
  ],
  "Transport Mechanisms": [
    c("A transporter moves glucose into intestinal epithelial cells with sodium down its electrochemical gradient.", "Which transport mechanism is used?", "Secondary active cotransport", ["Simple diffusion", "Primary active uniport", "Facilitated diffusion through GLUT2", "Receptor-mediated endocytosis"], "Sodium-glucose cotransport uses the sodium gradient created by the sodium-potassium ATPase and is secondary active transport.", "Identify secondary active transport."),
    c("The sodium-potassium ATPase is studied in an epithelial cell.", "Which transport pattern is correct?", "Three sodium ions out and two potassium ions in", ["Two sodium ions out and three potassium ions in", "One calcium ion out and one sodium ion in", "Glucose out and sodium in", "Chloride out only"], "The sodium-potassium ATPase uses ATP to move three sodium ions out and two potassium ions into the cell.", "Describe sodium-potassium ATPase stoichiometry."),
    c("A lipid-soluble steroid crosses the plasma membrane without a transporter.", "Which mechanism best describes this movement?", "Simple diffusion through the lipid bilayer", ["Primary active transport", "Secondary active antiport", "Clathrin-mediated endocytosis", "Voltage-gated channel transport"], "Small lipid-soluble molecules can diffuse through the lipid bilayer down their concentration gradient.", "Recognize simple diffusion."),
    c("Water moves across a membrane through aquaporin channels.", "Which driving force determines net movement?", "Osmotic gradient", ["ATP hydrolysis by aquaporin", "Direct sodium channel voltage gating", "Ligand-gated potassium entry", "Endocytosis of water vesicles"], "Aquaporins allow passive water movement driven by osmotic gradients.", "Explain osmosis through aquaporins."),
    c("LDL particles enter a cell after binding a specific surface receptor.", "Which mechanism is used?", "Receptor-mediated endocytosis", ["Simple diffusion", "Voltage-gated transport", "Primary active antiport", "Paracellular filtration only"], "LDL uptake occurs through receptor-mediated endocytosis after LDL receptor binding.", "Identify receptor-mediated endocytosis.")
  ],
  "Excitable Cells": [
    c("A skeletal muscle fiber receives acetylcholine at the motor end plate.", "Which receptor initiates the end-plate potential?", "Nicotinic acetylcholine receptor", ["Muscarinic M2 receptor", "Beta-1 adrenergic receptor", "NMDA receptor only", "GABA-A receptor"], "Nicotinic acetylcholine receptors are ligand-gated cation channels that depolarize the motor end plate.", "Identify the receptor mediating neuromuscular transmission."),
    c("A pacemaker cell in the sinoatrial node slowly depolarizes during phase 4.", "Which current contributes to this automaticity?", "Funny current", ["Fast sodium current", "Inward chloride current", "Skeletal muscle chloride leak only", "Ryanodine receptor current"], "The funny current contributes to spontaneous diastolic depolarization in pacemaker cells.", "Describe automaticity in pacemaker cells."),
    c("A smooth muscle cell contracts after intracellular calcium increases.", "Which protein binds calcium to initiate contraction?", "Calmodulin", ["Troponin C", "Tropomyosin", "Nebulin", "Dystrophin"], "Smooth muscle contraction uses calcium-calmodulin to activate myosin light-chain kinase.", "Contrast smooth muscle and skeletal muscle calcium sensors."),
    c("A neuron reaches threshold at the axon initial segment.", "Which channel opening triggers the action potential?", "Voltage-gated sodium channels", ["Ligand-gated chloride channels", "Aquaporin 2", "Mechanosensitive collagen channels", "GLUT4"], "Threshold opens voltage-gated sodium channels, causing rapid depolarization.", "Identify threshold-dependent channels in neurons."),
    c("A cardiac ventricular myocyte has a plateau phase in its action potential.", "Which current helps maintain this plateau?", "L-type calcium influx", ["Fast chloride efflux only", "Closure of all calcium channels", "Sodium-potassium pump failure", "Aquaporin insertion"], "L-type calcium influx balances potassium efflux during the plateau of the ventricular action potential.", "Explain the ionic basis of the cardiac action potential plateau.")
  ],
  "Mechanics of Contraction": [
    c("A skeletal muscle is stretched to an optimal sarcomere length before stimulation.", "Why is force generation maximal?", "Actin-myosin overlap is optimal", ["All cross-bridges are blocked", "Myosin cannot bind ATP", "Troponin is absent", "Calcium cannot bind troponin"], "Maximal active tension occurs when actin and myosin overlap optimally, allowing many cross-bridges to form.", "Relate sarcomere length to active tension."),
    c("ATP binding to myosin is prevented.", "Which cross-bridge step is impaired?", "Detachment of myosin from actin", ["Calcium binding to calmodulin", "Troponin degradation", "Acetylcholine synthesis", "Action potential initiation"], "ATP binding to myosin is required for detachment from actin during cross-bridge cycling.", "Describe ATP roles in cross-bridge cycling."),
    c("Muscle contraction occurs at a fixed length.", "What type of contraction is this?", "Isometric contraction", ["Isotonic contraction", "Eccentric contraction only", "Passive stretch", "Complete relaxation"], "Isometric contraction generates force without changing muscle length.", "Differentiate isometric and isotonic contractions."),
    c("A muscle shortens while lifting a constant load.", "What type of contraction is occurring?", "Isotonic contraction", ["Isometric contraction", "Passive elastic recoil only", "No cross-bridge cycling", "Tetanic relaxation"], "Isotonic contraction changes length while tension remains relatively constant against a load.", "Identify isotonic contraction."),
    c("Repeated stimuli arrive before a skeletal muscle fiber fully relaxes.", "Which phenomenon increases force?", "Wave summation", ["Complete calcium absence", "Reduced intracellular calcium", "Cross-bridge inhibition", "Loss of motor unit recruitment"], "Repeated stimuli increase cytosolic calcium and allow additional force development before relaxation.", "Explain temporal summation in skeletal muscle.")
  ],
  "Excitation-Contraction Coupling": [
    c("An action potential travels down the T-tubule of skeletal muscle.", "Which structure senses voltage and triggers calcium release?", "Dihydropyridine receptor", ["Nicotinic receptor", "SERCA pump", "Troponin T", "Myosin light-chain phosphatase"], "The skeletal muscle dihydropyridine receptor senses voltage and mechanically activates the ryanodine receptor.", "Describe skeletal muscle excitation-contraction coupling."),
    c("Calcium is released from the sarcoplasmic reticulum in skeletal muscle.", "Which protein binds calcium to permit cross-bridge formation?", "Troponin C", ["Calmodulin", "Myosin light-chain kinase", "Acetylcholinesterase", "Dystrophin"], "Calcium binds troponin C, moving tropomyosin away from actin binding sites.", "Identify troponin C as the skeletal muscle calcium sensor."),
    c("SERCA activity is inhibited in skeletal muscle.", "Which effect is expected?", "Delayed relaxation due to impaired calcium reuptake", ["Faster relaxation", "No effect on cytosolic calcium", "Immediate acetylcholine depletion", "Blocked sodium channel inactivation"], "SERCA pumps calcium back into the sarcoplasmic reticulum, allowing relaxation.", "Explain calcium reuptake during muscle relaxation."),
    c("Cardiac myocyte contraction depends on calcium-induced calcium release.", "Which event initiates sarcoplasmic reticulum calcium release?", "Calcium entry through L-type calcium channels", ["Sodium entry through funny channels", "Chloride entry through GABA receptors", "ATP binding to actin", "Acetylcholine breakdown"], "In cardiac muscle, calcium influx through L-type channels triggers ryanodine receptor calcium release.", "Describe cardiac excitation-contraction coupling."),
    c("Smooth muscle myosin light-chain kinase is activated.", "Which complex activates this enzyme?", "Calcium-calmodulin", ["Calcium-troponin", "Sodium-myosin", "ATP-actin only", "Chloride-tropomyosin"], "Smooth muscle calcium binds calmodulin, activating MLCK and phosphorylating myosin light chains.", "Explain smooth muscle excitation-contraction coupling.")
  ],
  "Cardiac Cycle": [
    c("Left ventricular pressure rises while ventricular volume remains constant.", "Which phase is occurring?", "Isovolumetric contraction", ["Rapid filling", "Reduced filling", "Isovolumetric relaxation", "Atrial systole"], "During isovolumetric contraction, both valves are closed and pressure rises without volume change.", "Identify cardiac cycle phases from pressure-volume data."),
    c("The aortic valve closes at the end of systole.", "Which heart sound is produced?", "S2", ["S1", "S3", "S4", "Opening snap"], "S2 is produced by closure of the aortic and pulmonic valves.", "Relate heart sounds to valve events."),
    c("The mitral valve opens after ventricular pressure falls below left atrial pressure.", "Which phase follows?", "Rapid ventricular filling", ["Isovolumetric contraction", "Ejection", "Atrial relaxation only", "End-systolic pause"], "Mitral valve opening begins rapid ventricular filling.", "Sequence events in diastole."),
    c("End-diastolic volume increases while contractility and afterload are unchanged.", "Which change occurs by the Frank-Starling mechanism?", "Increased stroke volume", ["Decreased stroke volume", "Decreased preload", "Loss of ventricular filling", "Decreased venous return"], "Greater preload increases sarcomere stretch and increases stroke volume within physiologic limits.", "Apply the Frank-Starling mechanism."),
    c("Contractility increases at constant preload and afterload.", "Which pressure-volume loop change is expected?", "Decreased end-systolic volume", ["Increased end-systolic volume", "Decreased ejection fraction", "Increased end-diastolic pressure only", "Loss of aortic valve opening"], "Increased contractility ejects more blood, decreasing end-systolic volume and increasing ejection fraction.", "Predict effects of increased contractility.")
  ],
  Electrocardiography: [
    c("A normal ECG tracing is reviewed.", "Which event corresponds to the PR interval?", "AV nodal conduction delay", ["Ventricular repolarization only", "Atrial repolarization only", "Ventricular depolarization only", "Aortic valve closure"], "The PR interval reflects atrial depolarization and conduction through the AV node.", "Interpret ECG intervals."),
    c("The QRS complex is widened.", "Which process is prolonged?", "Ventricular depolarization", ["Atrial depolarization", "Ventricular repolarization only", "AV nodal delay only", "Mechanical atrial contraction"], "The QRS complex represents ventricular depolarization.", "Relate ECG waves to electrical events."),
    c("The QT interval is prolonged.", "Which cellular process is most closely represented?", "Total ventricular depolarization and repolarization time", ["Atrial depolarization only", "SA nodal phase 4 slope only", "Valve opening time", "Venous return"], "The QT interval spans ventricular depolarization through repolarization.", "Interpret QT interval physiology."),
    c("An impulse fails to conduct normally through the AV node.", "Which ECG finding is most directly affected?", "PR interval", ["ST segment only", "T wave amplitude only", "U wave only", "R wave axis only"], "AV nodal conduction delay lengthens the PR interval.", "Identify ECG changes from AV nodal conduction abnormalities."),
    c("Ventricular repolarization is analyzed on ECG.", "Which wave represents this event?", "T wave", ["P wave", "QRS complex", "PR segment", "Delta wave"], "The T wave reflects ventricular repolarization.", "Match ECG waves to cardiac electrical events.")
  ],
  Hemodynamics: [
    c("A systemic arteriole dilates after local metabolite accumulation.", "Which variable decreases most directly?", "Systemic vascular resistance", ["Plasma oncotic pressure", "Blood viscosity", "Central venous oxygen content", "Ventricular compliance"], "Arterioles are the main resistance vessels. Dilation decreases resistance.", "Identify determinants of vascular resistance."),
    c("Vessel radius is reduced by half.", "According to Poiseuille law, what happens to resistance?", "It increases markedly because resistance varies inversely with radius to the fourth power", ["It decreases by half", "It is unchanged", "It depends only on vessel length", "It becomes zero"], "Resistance is inversely proportional to the fourth power of radius.", "Apply Poiseuille law to blood flow."),
    c("Blood viscosity increases.", "Which hemodynamic effect is expected?", "Increased vascular resistance", ["Decreased vascular resistance", "Increased vessel radius", "Decreased pressure gradient requirement", "No effect on flow"], "Higher viscosity increases resistance to flow.", "Describe viscosity effects on hemodynamics."),
    c("Flow through a vessel is calculated from pressure gradient and resistance.", "Which relationship is correct?", "Flow equals pressure gradient divided by resistance", ["Flow equals resistance divided by pressure", "Flow equals viscosity times length only", "Flow is independent of pressure", "Flow equals oncotic pressure only"], "Flow is proportional to the pressure gradient and inversely proportional to resistance.", "Use the basic flow equation."),
    c("A vessel has increased compliance.", "Which effect is expected for a given volume change?", "Smaller pressure increase", ["Larger pressure increase", "No pressure buffering", "Mandatory flow reversal", "Loss of capacitance"], "Compliance is change in volume divided by change in pressure; higher compliance buffers pressure changes.", "Explain vascular compliance.")
  ],
  "Blood Pressure Regulation": [
    c("Carotid sinus firing decreases after standing abruptly.", "Which reflex response is expected?", "Increased sympathetic outflow", ["Increased vagal tone only", "Decreased heart rate", "Arteriolar dilation", "Decreased contractility"], "Reduced baroreceptor firing increases sympathetic tone and decreases parasympathetic tone.", "Predict baroreflex responses to decreased pressure."),
    c("A sustained decrease in renal perfusion pressure activates juxtaglomerular cells.", "Which hormone increases first in the RAAS cascade?", "Renin", ["Aldosterone", "ANP", "ADH from posterior pituitary only", "Cortisol"], "Juxtaglomerular cells release renin in response to decreased renal perfusion, sympathetic activation, or low distal sodium chloride.", "Describe RAAS activation."),
    c("Angiotensin II levels increase.", "Which vascular effect helps restore blood pressure?", "Arteriolar vasoconstriction", ["Arteriolar vasodilation", "Decreased aldosterone", "Increased sodium excretion only", "Decreased ADH"], "Angiotensin II is a potent arteriolar vasoconstrictor and also stimulates aldosterone.", "Explain angiotensin II effects."),
    c("Atrial stretch increases during volume expansion.", "Which hormone promotes sodium excretion?", "Atrial natriuretic peptide", ["Renin", "Aldosterone", "Angiotensin II", "Erythropoietin"], "ANP is released with atrial stretch and promotes natriuresis.", "Describe ANP in volume regulation."),
    c("Mean arterial pressure is estimated from systolic and diastolic pressure.", "Which factor contributes most to MAP at normal heart rates?", "Diastolic pressure because diastole lasts longer", ["Systolic pressure only", "Pulse pressure only", "Central venous pressure only", "Left atrial pressure only"], "MAP is closer to diastolic pressure because the heart spends more time in diastole.", "Estimate MAP from blood pressure values.")
  ],
  "Heart Failure": [
    c("Left ventricular systolic contractility decreases.", "Which change is expected?", "Decreased ejection fraction", ["Increased ejection fraction", "Decreased end-systolic volume", "Increased stroke volume at all preloads", "No change in cardiac output"], "Systolic failure reduces contractility, increasing end-systolic volume and decreasing ejection fraction.", "Describe systolic heart failure physiology."),
    c("A stiff left ventricle has impaired relaxation.", "Which pattern is most consistent?", "Preserved ejection fraction with elevated filling pressures", ["Low filling pressure with high ejection fraction only", "Absent diastolic pressure", "Decreased ventricular stiffness", "No pulmonary congestion risk"], "Diastolic dysfunction causes impaired filling with elevated diastolic pressures; EF can be preserved.", "Describe diastolic heart failure physiology."),
    c("Chronic heart failure activates RAAS.", "Which effect initially supports arterial pressure but can worsen congestion?", "Sodium and water retention", ["Sodium excretion", "Reduced preload", "Decreased venous tone", "Decreased aldosterone"], "RAAS activation retains sodium and water, raising preload and afterload but worsening congestion.", "Explain neurohormonal compensation in heart failure."),
    c("Right-sided heart failure develops.", "Which finding is most directly explained by elevated systemic venous pressure?", "Peripheral edema", ["Pulmonary edema only", "Decreased jugular venous pressure", "Low hepatic venous pressure", "Reduced capillary hydrostatic pressure"], "Right heart failure raises systemic venous pressure, increasing capillary hydrostatic pressure and causing peripheral edema.", "Relate right heart failure to systemic congestion."),
    c("Left-sided heart failure increases pulmonary venous pressure.", "Which consequence is expected?", "Pulmonary edema", ["Peripheral cyanosis from low venous pressure only", "Reduced pulmonary capillary hydrostatic pressure", "Increased lymph drainage without limit", "Decreased left atrial pressure"], "Elevated pulmonary venous pressure increases pulmonary capillary hydrostatic pressure, promoting edema.", "Relate left heart failure to pulmonary congestion.")
  ],
  Hemostasis: [
    c("A platelet adheres to exposed subendothelial collagen after vascular injury.", "Which factor mediates platelet adhesion?", "von Willebrand factor", ["Factor VIIIa alone", "Protein C", "Antithrombin", "Plasmin"], "von Willebrand factor binds platelet GPIb to exposed collagen.", "Describe platelet adhesion."),
    c("Platelets aggregate after activation.", "Which receptor binds fibrinogen to link platelets?", "GPIIb/IIIa", ["GPIb", "Tissue factor", "Thrombomodulin", "Protein S"], "Activated GPIIb/IIIa receptors bind fibrinogen, cross-linking platelets.", "Describe platelet aggregation."),
    c("The extrinsic coagulation pathway is activated.", "Which laboratory test is affected first?", "Prothrombin time", ["Bleeding time only", "Thrombin time only", "Platelet count only", "Mean corpuscular volume"], "PT assesses the extrinsic and common pathways, especially factor VII.", "Interpret coagulation pathway tests."),
    c("Thrombin is generated during coagulation.", "Which direct effect does thrombin have?", "Conversion of fibrinogen to fibrin", ["Degradation of fibrin only", "Inhibition of platelet activation", "Removal of calcium from plasma", "Destruction of von Willebrand factor"], "Thrombin converts fibrinogen to fibrin and amplifies coagulation.", "Describe thrombin function."),
    c("Plasmin activity increases during clot resolution.", "Which process is enhanced?", "Fibrin degradation", ["Platelet adhesion", "Prothrombin activation", "Factor XIII cross-linking", "Vasoconstriction only"], "Plasmin digests fibrin, promoting fibrinolysis.", "Explain fibrinolysis.")
  ],
  "Microcirculation and Lymphatics": [
    c("Capillary hydrostatic pressure rises while oncotic pressure is unchanged.", "Which effect is expected?", "Increased filtration into interstitium", ["Increased reabsorption", "Decreased edema risk", "Decreased lymph formation", "Reduced net outward force"], "Capillary hydrostatic pressure favors filtration out of capillaries.", "Apply Starling forces."),
    c("Plasma oncotic pressure falls after loss of plasma proteins.", "Which effect is expected?", "Increased edema formation", ["Decreased filtration", "Increased reabsorption", "No effect on fluid movement", "Decreased interstitial volume"], "Lower plasma oncotic pressure reduces reabsorption and promotes edema.", "Explain oncotic pressure in capillary exchange."),
    c("Lymphatic drainage from an extremity is obstructed.", "Which change occurs?", "Interstitial fluid accumulation", ["Decreased interstitial protein", "Increased plasma oncotic pressure locally", "Immediate reduction in limb volume", "No effect on edema"], "Lymphatics return filtered fluid and proteins to the circulation. Obstruction causes lymphedema.", "Describe lymphatic function."),
    c("Precapillary arterioles dilate in metabolically active tissue.", "What happens to local capillary flow?", "It increases", ["It decreases", "It becomes zero", "It is determined only by plasma protein", "It reverses direction"], "Arteriolar dilation increases downstream capillary perfusion.", "Relate arteriolar tone to microvascular flow."),
    c("Histamine increases capillary permeability.", "Which effect promotes edema?", "Increased protein movement into interstitium", ["Decreased interstitial oncotic pressure", "Reduced filtration coefficient", "Decreased endothelial gaps", "Blocked lymph flow only"], "Increased permeability allows plasma proteins into the interstitium, raising interstitial oncotic pressure and promoting edema.", "Explain permeability-mediated edema.")
  ],
  "Respiratory Mechanics": [
    c("Surfactant production decreases.", "Which change increases work of breathing?", "Increased alveolar surface tension", ["Decreased surface tension", "Increased compliance", "Increased airway radius", "Decreased opening pressure"], "Surfactant lowers surface tension; deficiency increases surface tension and decreases compliance.", "Describe surfactant effects."),
    c("During quiet inspiration, alveolar pressure becomes slightly negative.", "What causes airflow into the lungs?", "Pressure gradient from atmosphere to alveoli", ["Positive intrapleural pressure", "Relaxation of diaphragm", "Closure of conducting airways", "Loss of transpulmonary pressure"], "Air flows down a pressure gradient into alveoli when alveolar pressure is below atmospheric pressure.", "Explain airflow during inspiration."),
    c("Lung compliance decreases.", "Which change is expected?", "Greater pressure needed for a given volume change", ["Less pressure needed", "Increased distensibility", "Reduced elastic recoil always", "No change in work of breathing"], "Compliance is change in volume per change in pressure. Low compliance increases work of breathing.", "Interpret lung compliance."),
    c("Airway radius decreases during bronchoconstriction.", "Which effect is expected?", "Increased airway resistance", ["Decreased resistance", "Increased laminar flow at all rates", "No change because radius is irrelevant", "Reduced work of breathing"], "Airway resistance varies inversely with radius to the fourth power.", "Apply airway resistance principles."),
    c("Intrapleural pressure becomes less negative after air enters the pleural space.", "Which effect is expected?", "Reduced lung expansion", ["Increased transpulmonary pressure", "Forced lung expansion", "Increased alveolar stability", "No effect on lung volume"], "Negative intrapleural pressure maintains transpulmonary pressure. Loss of negativity promotes collapse.", "Explain pleural pressure.")
  ],
  "Gas Exchange": [
    c("Alveolar-capillary membrane thickness increases.", "Which variable decreases?", "Diffusing capacity", ["Anatomic dead space", "Tidal volume only", "Airway radius", "Hemoglobin concentration"], "Diffusion is inversely proportional to membrane thickness.", "Apply Fick law to gas diffusion."),
    c("High altitude lowers barometric pressure.", "Which gas value decreases first?", "Inspired oxygen partial pressure", ["Inspired oxygen fraction", "Water vapor pressure", "Respiratory quotient", "Hemoglobin affinity only"], "At altitude, oxygen fraction is unchanged but total pressure falls, reducing inspired oxygen partial pressure.", "Use the alveolar gas equation."),
    c("Carbon monoxide binds hemoglobin.", "Which effect occurs?", "Decreased oxygen content with often normal PaO2", ["Increased PaO2", "Increased dissolved oxygen only", "No effect on oxygen delivery", "Decreased hemoglobin affinity for oxygen"], "CO reduces oxygen content by binding hemoglobin; PaO2 can remain normal because dissolved oxygen is unchanged.", "Distinguish oxygen content from PaO2."),
    c("Exercise increases mixed venous CO2 delivery to the lungs.", "What normally happens to CO2 elimination?", "It increases with increased ventilation and perfusion", ["It stops because diffusion is slow", "It depends only on hemoglobin saturation", "It decreases despite increased production", "It is unrelated to alveolar ventilation"], "CO2 elimination rises when ventilation and perfusion increase to match metabolic production.", "Describe CO2 exchange during exercise."),
    c("Alveolar ventilation decreases globally.", "Which change occurs?", "Increased PaCO2", ["Decreased PaCO2", "No effect on PaCO2", "Increased PAO2", "Decreased arterial hydrogen ions"], "PaCO2 is inversely related to alveolar ventilation.", "Relate alveolar ventilation to carbon dioxide.")
  ],
  "Oxygen Transport": [
    c("The oxygen-hemoglobin curve shifts right.", "Which factor can cause this?", "Increased PCO2", ["Decreased temperature", "Decreased 2,3-BPG", "Increased pH", "Fetal hemoglobin"], "Increased CO2, increased temperature, increased 2,3-BPG, and decreased pH shift the curve right.", "Identify right-shift factors."),
    c("Fetal hemoglobin is compared with adult hemoglobin.", "Which property is characteristic of fetal hemoglobin?", "Higher oxygen affinity", ["Lower oxygen affinity", "Higher 2,3-BPG binding", "No ability to bind oxygen", "Lower saturation at placental PO2"], "Fetal hemoglobin binds 2,3-BPG poorly, increasing oxygen affinity.", "Explain fetal hemoglobin oxygen affinity."),
    c("Anemia reduces hemoglobin concentration.", "Which value is decreased most directly?", "Arterial oxygen content", ["PaO2", "Alveolar oxygen pressure", "Diffusion distance", "Respiratory quotient"], "Most oxygen content is bound to hemoglobin, so anemia lowers oxygen content despite normal PaO2.", "Distinguish oxygen content and partial pressure."),
    c("2,3-BPG increases in red blood cells.", "What happens to oxygen unloading?", "It increases", ["It decreases", "It is abolished", "Hemoglobin cannot bind CO2", "PaO2 must become zero"], "2,3-BPG lowers hemoglobin oxygen affinity and promotes tissue unloading.", "Describe 2,3-BPG effects."),
    c("The Bohr effect is being discussed.", "Which change promotes oxygen unloading in metabolically active tissue?", "Increased hydrogen ion concentration", ["Decreased CO2", "Increased pH", "Decreased temperature", "Absent 2,3-BPG"], "Increased H+ and CO2 reduce hemoglobin oxygen affinity, promoting unloading.", "Explain the Bohr effect.")
  ],
  "Ventilation Control": [
    c("PaCO2 rises acutely in a healthy person.", "Which receptors mediate the major ventilatory response?", "Central chemoreceptors", ["Pulmonary stretch receptors only", "Baroreceptors", "Muscle spindles", "Macula densa cells"], "CO2 diffuses into CSF and generates H+, stimulating central chemoreceptors.", "Identify central chemoreceptor control."),
    c("PaO2 falls below about 60 mm Hg.", "Which receptors become strongly activated?", "Peripheral chemoreceptors", ["Central osmoreceptors only", "Juxtaglomerular cells", "Aortic valve receptors", "Golgi tendon organs"], "Peripheral chemoreceptors in carotid and aortic bodies respond strongly to severe hypoxemia.", "Describe peripheral chemoreceptor activation."),
    c("Voluntary hyperventilation lowers PaCO2.", "Which acid-base change occurs acutely?", "Respiratory alkalosis", ["Respiratory acidosis", "Metabolic acidosis", "Metabolic alkalosis", "No pH effect"], "Hyperventilation removes CO2, increasing pH and causing respiratory alkalosis.", "Relate ventilation to pH."),
    c("The medullary respiratory centers are damaged.", "Which function is most directly impaired?", "Automatic rhythmic breathing", ["Red blood cell production", "Renal bicarbonate secretion", "Surfactant synthesis only", "Hemoglobin synthesis"], "Medullary centers generate and coordinate automatic ventilation.", "Identify central control of breathing."),
    c("Pulmonary stretch receptors are activated by excessive lung inflation.", "Which reflex response is promoted?", "Termination or slowing of inspiration", ["Increased inspiratory drive indefinitely", "Bronchial collapse", "Increased erythropoietin", "Renin release"], "The Hering-Breuer reflex limits overinflation by reducing inspiratory drive.", "Describe pulmonary stretch receptor reflexes.")
  ],
  "Acid-Base Balance": [
    c("A patient has low pH, low bicarbonate, and low PaCO2.", "Which disorder is primary?", "Metabolic acidosis with respiratory compensation", ["Respiratory acidosis", "Metabolic alkalosis", "Respiratory alkalosis", "Normal acid-base status"], "Low bicarbonate with acidemia indicates metabolic acidosis; low PaCO2 is compensatory hyperventilation.", "Classify metabolic acidosis."),
    c("A patient has high pH, high bicarbonate, and high PaCO2.", "Which disorder is primary?", "Metabolic alkalosis with respiratory compensation", ["Respiratory alkalosis", "Metabolic acidosis", "Respiratory acidosis", "No compensation"], "High bicarbonate with alkalemia indicates metabolic alkalosis; high PaCO2 reflects hypoventilatory compensation.", "Classify metabolic alkalosis."),
    c("A patient hypoventilates acutely.", "Which primary acid-base disorder develops?", "Respiratory acidosis", ["Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis", "Normal pH with no change"], "Hypoventilation increases PaCO2, lowering pH.", "Explain respiratory acidosis."),
    c("A patient hyperventilates during anxiety.", "Which change is expected?", "Decreased PaCO2", ["Increased PaCO2", "Decreased pH", "Increased bicarbonate immediately from lungs", "Increased carbonic acid"], "Hyperventilation lowers PaCO2 and produces respiratory alkalosis.", "Explain respiratory alkalosis."),
    c("The kidney compensates for chronic respiratory acidosis.", "Which response is expected?", "Increased bicarbonate reabsorption and acid excretion", ["Increased bicarbonate loss", "Decreased ammonium excretion", "No renal compensation", "Decreased hydrogen secretion"], "Chronic respiratory acidosis is compensated by renal retention of bicarbonate and increased acid excretion.", "Describe renal compensation for respiratory acidosis.")
  ],
  "V/Q Ratio": [
    c("An alveolus is ventilated but not perfused.", "What is the V/Q relationship?", "V/Q approaches infinity", ["V/Q approaches zero", "V/Q is exactly normal", "It is a pure shunt", "It has no alveolar gas"], "Ventilation without perfusion is dead space and has very high V/Q.", "Identify dead space physiology."),
    c("An alveolus is perfused but not ventilated.", "What is the V/Q relationship?", "V/Q approaches zero", ["V/Q approaches infinity", "V/Q is normal", "It is pure dead space", "It increases alveolar oxygen"], "Perfusion without ventilation is shunt physiology and has low V/Q.", "Identify shunt physiology."),
    c("A pulmonary embolism blocks blood flow to ventilated alveoli.", "Which abnormality results?", "Increased dead space", ["Increased shunt", "Decreased alveolar ventilation only", "Increased diffusion capacity", "Reduced anatomic airway volume"], "Pulmonary embolism creates ventilated but underperfused regions, increasing dead space.", "Apply V/Q concepts to pulmonary embolism."),
    c("Airway obstruction prevents ventilation to a perfused region.", "Which abnormality results?", "Low V/Q", ["High V/Q", "No V/Q mismatch", "Pure dead space", "Increased alveolar PO2"], "Obstructed alveoli remain perfused but poorly ventilated, producing low V/Q.", "Apply V/Q concepts to airway obstruction."),
    c("In an upright lung, perfusion increases more from apex to base than ventilation does.", "Where is V/Q highest?", "Apex", ["Base", "Equal everywhere", "Only in the trachea", "Only in pulmonary veins"], "Both ventilation and perfusion are greater at the base, but perfusion increases more; V/Q is highest at the apex.", "Describe regional V/Q differences.")
  ],
  "Glomerular Filtration": [
    c("The efferent arteriole constricts moderately.", "What happens initially to glomerular hydrostatic pressure and GFR?", "Both increase", ["Both decrease", "Pressure decreases and GFR increases", "GFR becomes zero", "Neither changes"], "Moderate efferent constriction raises glomerular hydrostatic pressure and initially increases GFR.", "Predict arteriolar effects on GFR."),
    c("The afferent arteriole constricts.", "Which effect is expected?", "Decreased GFR", ["Increased GFR", "Increased renal plasma flow", "Increased glomerular hydrostatic pressure", "No effect on filtration"], "Afferent constriction reduces renal plasma flow and glomerular hydrostatic pressure, decreasing GFR.", "Describe afferent arteriolar control of GFR."),
    c("A freely filtered substance is neither reabsorbed nor secreted.", "Its clearance estimates which variable?", "GFR", ["Renal blood flow", "Effective renal plasma flow", "Filtration fraction only", "Urine flow rate only"], "Clearance of a substance handled only by filtration equals GFR.", "Use clearance to estimate GFR."),
    c("Plasma protein concentration rises significantly.", "Which force opposes filtration more strongly?", "Glomerular capillary oncotic pressure", ["Bowman space oncotic pressure", "Afferent arteriolar pressure only", "Tubular hydrostatic pressure decreases", "Urine osmotic pressure"], "Higher plasma protein increases capillary oncotic pressure, opposing filtration.", "Apply Starling forces in the glomerulus."),
    c("Tubular obstruction increases hydrostatic pressure in Bowman space.", "Which effect on GFR is expected?", "Decreased GFR", ["Increased GFR", "No effect", "Increased filtration fraction by default", "Increased net filtration pressure"], "Increased Bowman space hydrostatic pressure opposes filtration and decreases GFR.", "Explain effects of urinary obstruction on GFR.")
  ],
  "Tubular Electrolyte Handling": [
    c("A loop diuretic inhibits NKCC2 in the thick ascending limb.", "Which effect is expected?", "Decreased medullary hypertonicity", ["Increased medullary hypertonicity", "Increased water permeability in thick limb", "Decreased distal sodium delivery", "Blocked proximal bicarbonate only"], "NKCC2 reabsorbs NaCl in the thick ascending limb and helps generate medullary hypertonicity.", "Describe thick ascending limb transport."),
    c("Aldosterone increases in principal cells.", "Which effect occurs?", "Increased potassium secretion", ["Decreased ENaC activity", "Decreased sodium reabsorption", "Inhibition of Na/K ATPase", "Reduced lumen negativity"], "Aldosterone increases ENaC and Na/K ATPase activity, promoting sodium reabsorption and potassium secretion.", "Explain aldosterone effects."),
    c("PTH acts on the proximal tubule.", "Which electrolyte effect occurs?", "Decreased phosphate reabsorption", ["Increased phosphate reabsorption", "Decreased calcium reabsorption distally", "Blocked vitamin D activation", "Increased sodium-glucose cotransport"], "PTH decreases proximal phosphate reabsorption and increases phosphate excretion.", "Describe PTH effects on phosphate."),
    c("Thiazide diuretics inhibit the Na-Cl cotransporter in the distal convoluted tubule.", "Which calcium effect is expected?", "Increased calcium reabsorption", ["Decreased calcium reabsorption", "No effect on calcium", "Increased calcium secretion", "Blocked PTH receptor"], "Thiazides increase distal calcium reabsorption.", "Relate distal tubule transport to calcium handling."),
    c("ENaC activity increases in the collecting duct.", "Which luminal electrical change promotes potassium secretion?", "More negative lumen potential", ["More positive lumen potential", "No voltage change", "Loss of sodium gradient", "Decreased sodium reabsorption"], "Sodium reabsorption through ENaC makes the lumen more negative, favoring potassium secretion.", "Explain electrochemical driving forces in principal cells.")
  ],
  "Urine Concentration Mechanism": [
    c("ADH binds V2 receptors in collecting duct principal cells.", "Which change occurs?", "Aquaporin 2 insertion", ["Aquaporin 2 removal", "NKCC2 inhibition", "Decreased water permeability", "Blocked urea recycling"], "ADH promotes apical aquaporin 2 insertion and increases water reabsorption.", "Describe ADH action."),
    c("The thick ascending limb reabsorbs NaCl but is impermeable to water.", "What process does this support?", "Countercurrent multiplication", ["Simple diffusion only", "Loss of medullary gradient", "Glucose reabsorption", "Bicarbonate secretion"], "NaCl reabsorption without water in the thick ascending limb builds the medullary osmotic gradient.", "Explain countercurrent multiplication."),
    c("Urea permeability increases in the inner medullary collecting duct under ADH influence.", "What is the effect?", "Increased medullary osmolality", ["Decreased medullary osmolality", "Loss of water reabsorption", "No role in urine concentration", "Blocked sodium reabsorption everywhere"], "Urea recycling contributes to the hyperosmotic medulla.", "Describe urea recycling."),
    c("The vasa recta preserve the medullary gradient.", "Which mechanism is involved?", "Countercurrent exchange", ["Countercurrent multiplication", "Active sodium pumping into blood only", "Glucose cotransport", "Bicarbonate buffering"], "The vasa recta exchange solutes and water passively to preserve the medullary gradient.", "Explain countercurrent exchange."),
    c("ADH is absent.", "Which urine pattern is expected?", "Large volume of dilute urine", ["Small volume of concentrated urine", "No urine output", "High urea recycling only", "Increased aquaporin insertion"], "Without ADH, collecting ducts are water-impermeable, producing dilute urine.", "Predict urine changes with low ADH.")
  ],
  "Volume Regulation": [
    c("Effective arterial blood volume decreases.", "Which system is activated?", "Renin-angiotensin-aldosterone system", ["ANP release only", "Insulin secretion", "Calcitonin secretion", "Thyroid hormone release"], "Low effective arterial volume stimulates renin release and RAAS activation.", "Explain hormonal responses to low volume."),
    c("Atrial stretch increases with volume expansion.", "Which hormone increases?", "ANP", ["Renin", "Aldosterone", "Angiotensin II", "Erythropoietin"], "Atrial natriuretic peptide is released by atrial stretch and promotes sodium excretion.", "Describe ANP physiology."),
    c("Aldosterone secretion increases.", "Which renal effect expands extracellular volume?", "Increased sodium reabsorption", ["Increased sodium excretion", "Blocked ENaC", "Decreased water retention secondary to sodium", "Decreased potassium secretion"], "Sodium retention increases extracellular fluid volume; water follows sodium.", "Relate aldosterone to ECF volume."),
    c("Pressure natriuresis occurs after arterial pressure increases.", "Which renal response is expected?", "Increased sodium excretion", ["Decreased sodium excretion", "Increased renin release", "Increased aldosterone", "Decreased urine flow"], "Higher renal perfusion pressure promotes sodium and water excretion.", "Describe pressure natriuresis."),
    c("Sympathetic activity to the kidney increases.", "Which effect supports volume retention?", "Increased renin release", ["Decreased renin release", "Decreased proximal sodium reabsorption", "Afferent dilation only", "ANP secretion from kidney"], "Renal sympathetic activation stimulates renin release and sodium retention.", "Explain sympathetic renal effects.")
  ],
  "Renal Acid-Base Physiology": [
    c("Filtered bicarbonate reaches the proximal tubule.", "Which enzyme facilitates its reabsorption?", "Carbonic anhydrase", ["Na/K ATPase only", "Aldosterone synthase", "Renin", "Urease"], "Carbonic anhydrase converts filtered bicarbonate to CO2 and water, enabling reabsorption.", "Describe proximal bicarbonate reabsorption."),
    c("Chronic metabolic acidosis develops.", "Which renal adaptive response increases?", "Ammonium excretion", ["Bicarbonate excretion", "Decreased acid secretion", "Reduced glutamine metabolism", "Decreased new bicarbonate generation"], "Ammoniagenesis buffers secreted H+ as NH4+ and generates new bicarbonate.", "Explain renal compensation for metabolic acidosis."),
    c("Alpha-intercalated cells are stimulated.", "Which process increases?", "Hydrogen ion secretion", ["Bicarbonate secretion into urine", "Potassium secretion only", "Glucose reabsorption", "Urea production"], "Alpha-intercalated cells secrete H+ and reabsorb bicarbonate.", "Identify collecting duct acid-secreting cells."),
    c("Beta-intercalated cells are activated during alkalosis.", "Which process increases?", "Bicarbonate secretion", ["Hydrogen secretion", "Ammonium generation", "Glucose secretion", "Aldosterone release"], "Beta-intercalated cells secrete bicarbonate through pendrin.", "Describe renal response to alkalosis."),
    c("Urinary titratable acid excretion increases.", "Which buffer is most involved?", "Phosphate", ["Glucose", "Albumin filtered in large amounts", "Hemoglobin in tubular lumen", "Bile acids"], "Filtered phosphate buffers secreted hydrogen ions and contributes to acid excretion.", "Explain titratable acid excretion.")
  ],
  "Hypothalamic-Pituitary Axis": [
    c("A hypothalamic hormone travels through the hypophyseal portal system.", "Which pituitary region is targeted?", "Anterior pituitary", ["Posterior pituitary", "Pineal gland", "Adrenal medulla", "Thyroid follicle"], "Hypothalamic releasing hormones reach the anterior pituitary through the portal circulation.", "Describe hypothalamic control of anterior pituitary."),
    c("Dopamine signaling to lactotrophs decreases.", "Which hormone increases?", "Prolactin", ["TSH", "ACTH", "LH only", "Oxytocin"], "Dopamine tonically inhibits prolactin secretion.", "Explain prolactin regulation."),
    c("GnRH is delivered in pulses.", "Which pituitary hormones are maintained?", "LH and FSH", ["Prolactin and ADH", "TSH and oxytocin", "Insulin and glucagon", "Calcitonin and PTH"], "Pulsatile GnRH stimulates LH and FSH secretion.", "Describe GnRH physiology."),
    c("ADH is synthesized in hypothalamic neurons.", "Where is it released?", "Posterior pituitary", ["Anterior pituitary", "Thyroid", "Adrenal cortex", "Pancreatic islets"], "ADH is synthesized in hypothalamus and released from posterior pituitary nerve terminals.", "Distinguish posterior pituitary hormone release."),
    c("Cortisol levels rise after stress.", "Which upstream pituitary hormone is suppressed by feedback?", "ACTH", ["ADH", "Oxytocin", "Insulin", "Calcitonin"], "Cortisol negatively feeds back on CRH and ACTH secretion.", "Apply feedback in the HPA axis.")
  ],
  Thyroid: [
    c("TSH receptor activation increases in thyroid follicular cells.", "Which process is stimulated?", "Thyroid hormone synthesis and release", ["Calcitonin release from C cells only", "PTH synthesis", "Insulin secretion", "Aldosterone release"], "TSH stimulates iodide uptake, thyroglobulin processing, and T3/T4 release.", "Describe TSH effects."),
    c("Iodide organification is inhibited.", "Which enzyme is directly affected?", "Thyroid peroxidase", ["5-alpha reductase", "Aromatase", "Renin", "Carbonic anhydrase"], "Thyroid peroxidase mediates iodide oxidation, organification, and coupling.", "Identify thyroid peroxidase functions."),
    c("Thyroid hormone levels increase.", "Which systemic effect is expected?", "Increased basal metabolic rate", ["Decreased oxygen consumption", "Decreased beta-adrenergic responsiveness", "Decreased heat production", "Reduced cardiac output"], "Thyroid hormone increases metabolic rate, heat production, and adrenergic responsiveness.", "Describe thyroid hormone actions."),
    c("Most circulating T3 is produced by peripheral conversion.", "Which precursor is converted?", "T4", ["TSH", "TRH", "Iodide", "Calcitonin"], "Peripheral deiodinases convert T4 to the more active T3.", "Explain peripheral thyroid hormone conversion."),
    c("Parafollicular C cells are stimulated.", "Which hormone is secreted?", "Calcitonin", ["Thyroxine", "Triiodothyronine", "PTH", "Aldosterone"], "Thyroid C cells secrete calcitonin, which inhibits osteoclast activity.", "Identify calcitonin source.")
  ],
  "Adrenal Gland": [
    c("Angiotensin II increases.", "Which adrenal zone is stimulated?", "Zona glomerulosa", ["Zona fasciculata", "Zona reticularis", "Adrenal medulla only", "Posterior pituitary"], "Angiotensin II stimulates aldosterone secretion from the zona glomerulosa.", "Identify aldosterone regulation."),
    c("ACTH stimulates the adrenal cortex.", "Which hormone is most directly increased from zona fasciculata?", "Cortisol", ["Aldosterone only", "Epinephrine only", "Calcitonin", "PTH"], "ACTH stimulates cortisol synthesis in the zona fasciculata.", "Describe ACTH effects."),
    c("The adrenal medulla releases catecholamines.", "Which preganglionic neurotransmitter stimulates chromaffin cells?", "Acetylcholine", ["Norepinephrine", "Dopamine only", "GABA", "Serotonin"], "Preganglionic sympathetic fibers release acetylcholine onto nicotinic receptors on chromaffin cells.", "Explain adrenal medulla activation."),
    c("Cortisol levels are chronically elevated.", "Which feedback change is expected?", "Decreased ACTH", ["Increased CRH", "Increased ACTH", "Increased pituitary stimulation", "Increased adrenal androgen by LH"], "Cortisol suppresses CRH and ACTH through negative feedback.", "Apply glucocorticoid feedback."),
    c("Aldosterone acts on collecting duct principal cells.", "Which effect occurs?", "Increased sodium reabsorption and potassium secretion", ["Increased sodium excretion", "Decreased potassium secretion", "Blocked ENaC", "Decreased Na/K ATPase"], "Aldosterone increases ENaC and Na/K ATPase, promoting sodium retention and potassium secretion.", "Describe mineralocorticoid renal actions.")
  ],
  "Glucose Homeostasis": [
    c("Insulin rises after a meal.", "Which process increases in liver?", "Glycogen synthesis", ["Gluconeogenesis", "Glycogenolysis", "Ketogenesis", "Proteolysis"], "Insulin promotes hepatic glycogen synthesis and suppresses glucose production.", "Describe insulin in the fed state."),
    c("Glucagon rises during fasting.", "Which hepatic process is stimulated?", "Gluconeogenesis", ["Glycogen synthesis", "Lipogenesis only", "GLUT4 insertion in muscle", "Protein synthesis only"], "Glucagon maintains blood glucose by stimulating hepatic glycogenolysis and gluconeogenesis.", "Describe glucagon in fasting."),
    c("Skeletal muscle responds to insulin.", "Which transporter is inserted into the membrane?", "GLUT4", ["SGLT1", "GLUT2 in hepatocytes", "CFTR", "Aquaporin 2"], "Insulin stimulates GLUT4 insertion in skeletal muscle and adipose tissue.", "Explain insulin-mediated glucose uptake."),
    c("Epinephrine increases during acute stress.", "Which metabolic effect supports plasma glucose?", "Increased glycogenolysis", ["Increased glycogen synthesis", "Decreased hepatic glucose output", "Increased insulin release only", "Blocked glucagon release"], "Catecholamines increase glycogenolysis and mobilize fuels during stress.", "Describe stress hormone effects on glucose."),
    c("Prolonged fasting increases ketone production.", "Which hormone pattern promotes this?", "Low insulin and high glucagon", ["High insulin and low glucagon", "High calcitonin", "Low cortisol only", "High prolactin"], "Low insulin with high glucagon promotes lipolysis and hepatic ketogenesis.", "Explain hormonal control of ketogenesis.")
  ],
  "Calcium Metabolism": [
    c("Ionized calcium decreases.", "Which hormone increases?", "PTH", ["Calcitonin", "Insulin", "Aldosterone", "TSH"], "Low ionized calcium stimulates parathyroid hormone secretion.", "Describe PTH regulation."),
    c("PTH acts on kidney.", "Which effect increases calcium availability?", "Increased 1-alpha hydroxylase activity", ["Decreased calcitriol", "Increased phosphate reabsorption", "Decreased distal calcium reabsorption", "Blocked intestinal calcium absorption"], "PTH increases renal vitamin D activation and distal calcium reabsorption.", "Explain PTH renal effects."),
    c("Calcitriol increases.", "Which intestinal effect is expected?", "Increased calcium absorption", ["Decreased calcium absorption", "Decreased phosphate absorption", "No effect on intestine", "Increased calcium secretion into lumen"], "Calcitriol increases intestinal absorption of calcium and phosphate.", "Describe vitamin D effects."),
    c("PTH increases in bone.", "Which cell is directly stimulated by PTH to activate osteoclasts indirectly?", "Osteoblast", ["Osteoclast directly only", "Chondrocyte", "Parafollicular cell", "Chief cell"], "PTH acts on osteoblasts, increasing signals that activate osteoclast-mediated bone resorption.", "Explain PTH effects on bone."),
    c("Calcitonin levels rise.", "Which bone effect occurs?", "Decreased osteoclast activity", ["Increased osteoclast activity", "Increased PTH release", "Increased bone resorption", "Reduced calcium deposition always"], "Calcitonin inhibits osteoclast activity.", "Describe calcitonin action.")
  ],
  "Male Reproductive Physiology": [
    c("LH stimulates Leydig cells.", "Which hormone is produced?", "Testosterone", ["Inhibin B", "FSH", "GnRH", "Prolactin"], "LH stimulates Leydig cells to synthesize testosterone.", "Identify Leydig cell function."),
    c("FSH acts on Sertoli cells.", "Which function is supported?", "Spermatogenesis", ["Testosterone synthesis by Leydig cells", "Ovulation", "Corpus luteum formation", "Progesterone secretion by placenta"], "FSH stimulates Sertoli cells, supporting spermatogenesis and inhibin B production.", "Describe Sertoli cell regulation."),
    c("Inhibin B is secreted by Sertoli cells.", "Which pituitary hormone is selectively suppressed?", "FSH", ["LH", "ACTH", "TSH", "Prolactin"], "Inhibin B provides negative feedback on FSH secretion.", "Explain inhibin feedback."),
    c("5-alpha reductase converts testosterone.", "Which product is formed?", "Dihydrotestosterone", ["Estradiol", "Progesterone", "Cortisol", "Aldosterone"], "5-alpha reductase converts testosterone to DHT.", "Describe androgen metabolism."),
    c("Androgen-binding protein is produced in seminiferous tubules.", "Which cell produces it?", "Sertoli cell", ["Leydig cell", "Spermatid", "Prostate epithelial cell", "Pituitary gonadotroph"], "Sertoli cells produce androgen-binding protein under FSH stimulation.", "Identify Sertoli cell products.")
  ],
  "Female Reproductive Physiology": [
    c("Sustained high estradiol occurs late in the follicular phase.", "Which event follows?", "LH surge", ["FSH suppression without LH change", "Menstruation immediately", "Corpus luteum regression", "Prolactin surge only"], "Sustained high estrogen switches to positive feedback and triggers the LH surge.", "Explain ovulatory feedback."),
    c("LH surge occurs.", "Which event is triggered?", "Ovulation", ["Follicular atresia only", "Menstrual bleeding immediately", "Implantation", "Lactogenesis stage II"], "The LH surge triggers ovulation and luteinization.", "Describe LH surge effects."),
    c("The corpus luteum is active.", "Which hormone predominates?", "Progesterone", ["GnRH", "Oxytocin", "Calcitonin", "Aldosterone"], "The corpus luteum secretes progesterone, supporting the secretory endometrium.", "Identify luteal phase hormone production."),
    c("Granulosa cells express aromatase under FSH influence.", "Which hormone is produced from androgens?", "Estradiol", ["DHT", "Cortisol", "Aldosterone", "Inhibin only"], "Granulosa cell aromatase converts theca-derived androgens to estradiol.", "Explain two-cell estrogen synthesis."),
    c("Progesterone rises after ovulation.", "Which basal body temperature effect occurs?", "It increases", ["It decreases", "It remains impossible to measure", "It drops to zero", "It follows only FSH"], "Progesterone has thermogenic effects and raises basal body temperature.", "Relate progesterone to basal body temperature.")
  ],
  "Pregnancy and Lactation": [
    c("Early pregnancy is maintained by a placental hormone that rescues the corpus luteum.", "Which hormone is responsible?", "hCG", ["Prolactin", "Oxytocin", "FSH", "TSH"], "hCG acts like LH to maintain corpus luteum progesterone production early in pregnancy.", "Describe hCG function."),
    c("Prolactin levels rise postpartum.", "Which process is directly stimulated?", "Milk production", ["Milk ejection", "Uterine contraction only", "Ovulation", "Placental estrogen synthesis"], "Prolactin stimulates milk production in mammary alveolar cells.", "Identify prolactin action."),
    c("Suckling triggers posterior pituitary hormone release.", "Which hormone causes milk ejection?", "Oxytocin", ["Prolactin", "ACTH", "TSH", "hCG"], "Oxytocin causes myoepithelial contraction and milk ejection.", "Describe oxytocin in lactation."),
    c("Placental progesterone remains high during pregnancy.", "Which effect is expected?", "Maintenance of uterine quiescence", ["LH surge", "Endometrial shedding", "Milk ejection", "Follicular recruitment"], "Progesterone maintains the endometrium and decreases uterine contractility during pregnancy.", "Explain progesterone in pregnancy."),
    c("Estrogen levels rise near term.", "Which effect helps prepare for labor?", "Increased uterine oxytocin receptor expression", ["Decreased uterine excitability", "Decreased gap junction formation", "Suppression of prostaglandins only", "Immediate corpus luteum rescue"], "Estrogen increases uterine excitability and oxytocin receptor expression near term.", "Describe hormonal preparation for labor.")
  ],
  "Puberty and Sexual Differentiation": [
    c("Pulsatile GnRH secretion increases at puberty.", "Which pituitary response follows?", "Increased LH and FSH", ["Decreased gonadotropins", "Increased ADH only", "Suppressed sex steroids", "Decreased growth hormone only"], "Puberty begins with increased pulsatile GnRH, raising LH and FSH.", "Explain initiation of puberty."),
    c("Anti-Mullerian hormone is produced during male fetal development.", "Which structure regresses?", "Mullerian ducts", ["Wolffian ducts", "Testes", "Epididymis", "Seminal vesicles"], "Sertoli cell AMH causes Mullerian duct regression.", "Describe AMH function."),
    c("Testosterone supports internal male duct development.", "Which embryologic duct is maintained?", "Wolffian duct", ["Mullerian duct", "Urachus", "Neural tube", "Paramesonephric duct"], "Testosterone maintains Wolffian ducts, forming internal male reproductive structures.", "Explain testosterone in sexual differentiation."),
    c("DHT is required for development of external male genitalia.", "Which enzyme produces DHT?", "5-alpha reductase", ["Aromatase", "21-hydroxylase", "11-beta hydroxylase", "Thyroid peroxidase"], "5-alpha reductase converts testosterone to DHT.", "Describe DHT synthesis."),
    c("Estradiol increases during female puberty.", "Which physiologic change is promoted?", "Breast development", ["Mullerian regression", "Wolffian duct maintenance", "Spermatogenesis", "DHT-dependent prostate growth"], "Estrogen promotes breast development and maturation of the female reproductive tract.", "Identify estrogen effects during puberty.")
  ],
  Motility: [
    c("The lower esophageal sphincter relaxes before a swallowed bolus arrives.", "Which mechanism mediates this response?", "Vagovagal reflex with inhibitory enteric neurons", ["Tonic sympathetic contraction", "Gastrin release only", "Secretin release only", "Somatic motor reflex"], "LES receptive relaxation is mediated by vagovagal reflexes and inhibitory enteric neurons.", "Explain esophageal receptive relaxation."),
    c("The stomach accommodates a meal with little pressure increase.", "Which reflex is responsible?", "Vagovagal receptive relaxation", ["Stretch reflex in skeletal muscle", "Baroreceptor reflex", "Renal myogenic reflex", "Pupillary light reflex"], "Gastric accommodation is mediated by vagovagal reflex relaxation of the proximal stomach.", "Describe gastric accommodation."),
    c("Segmentation contractions occur in small intestine.", "What is their primary function?", "Mixing chyme", ["Propelling chyme rapidly through the entire gut", "Preventing absorption", "Closing all sphincters", "Producing bile"], "Segmentation mixes luminal contents and promotes contact with mucosa.", "Distinguish mixing from propulsion."),
    c("Peristalsis moves a bolus forward.", "Which pattern occurs?", "Contraction behind and relaxation ahead of the bolus", ["Relaxation behind and contraction ahead", "No enteric reflex", "Only longitudinal relaxation everywhere", "Only sphincter contraction"], "Peristalsis uses coordinated contraction behind and relaxation ahead of contents.", "Describe peristaltic propulsion."),
    c("The enteric nervous system coordinates local gut reflexes.", "Which plexus mainly controls motility?", "Myenteric plexus", ["Submucosal plexus", "Celiac ganglion only", "Dorsal root ganglion", "Neuromuscular junction"], "The myenteric plexus primarily regulates GI motility.", "Identify enteric plexus function.")
  ],
  "Gastric Secretion": [
    c("Vagal acetylcholine stimulates parietal cells.", "Which receptor is activated?", "M3 muscarinic receptor", ["H2 receptor", "CCK-B receptor", "Nicotinic receptor on parietal cell only", "Secretin receptor"], "Acetylcholine stimulates M3 receptors on parietal cells.", "Identify parietal cell stimulatory receptors."),
    c("Histamine stimulates gastric acid secretion.", "Which parietal cell receptor is activated?", "H2 receptor", ["M3 receptor", "GPIb receptor", "V2 receptor", "Nicotinic neuronal receptor"], "Histamine from ECL cells activates H2 receptors on parietal cells.", "Describe histamine-mediated acid secretion."),
    c("Gastrin levels rise after a protein-rich meal.", "Which receptor on parietal cells responds to gastrin?", "CCK-B receptor", ["M2 receptor", "Beta-2 receptor", "V1 receptor", "GLP-1 receptor"], "Gastrin stimulates CCK-B receptors and also promotes histamine release.", "Explain gastrin action."),
    c("Gastric pH becomes very low.", "Which hormone inhibits further acid secretion?", "Somatostatin", ["Gastrin", "Histamine", "Motilin", "Secretin only"], "D cells release somatostatin, which inhibits gastrin and acid secretion.", "Describe negative feedback in gastric acid secretion."),
    c("Parietal cells secrete intrinsic factor.", "Which nutrient absorption depends on intrinsic factor?", "Vitamin B12", ["Iron", "Glucose", "Folate in jejunum only", "Short-chain fatty acids"], "Intrinsic factor binds vitamin B12 and enables terminal ileal absorption.", "Relate parietal cell function to B12 absorption.")
  ],
  "Digestion and Absorption": [
    c("The terminal ileum is resected.", "Which absorption is most impaired?", "Vitamin B12-intrinsic factor complex", ["Iron", "Glucose", "Most amino acids", "Fructose"], "Vitamin B12 bound to intrinsic factor is absorbed in the terminal ileum.", "Identify regional nutrient absorption."),
    c("Iron absorption is studied.", "Where does most iron absorption occur?", "Duodenum", ["Terminal ileum", "Colon", "Stomach", "Esophagus"], "Iron is absorbed primarily in the duodenum.", "Locate iron absorption."),
    c("Glucose is absorbed across the apical membrane of enterocytes.", "Which transporter is used?", "SGLT1", ["GLUT2 apically as the main route", "CFTR", "NKCC2", "Aquaporin 2"], "SGLT1 cotransports sodium and glucose across the apical membrane.", "Describe glucose absorption."),
    c("Fructose is absorbed by facilitated diffusion.", "Which apical transporter is used?", "GLUT5", ["SGLT1", "GLUT4", "ENaC", "CFTR"], "GLUT5 transports fructose across the apical membrane.", "Describe fructose absorption."),
    c("Bile salts form micelles in the small intestine.", "What is the main purpose?", "Facilitate lipid absorption", ["Digest proteins", "Absorb vitamin B12 directly", "Activate pepsin", "Neutralize stomach acid as the only buffer"], "Micelles deliver lipids and fat-soluble vitamins to the enterocyte surface.", "Explain micelle function.")
  ],
  "Hepatic Physiology": [
    c("Unconjugated bilirubin is processed in hepatocytes.", "Which reaction increases water solubility?", "Conjugation with glucuronic acid", ["Binding intrinsic factor", "Oxidation by pepsin", "Hydrolysis by amylase", "Conversion to trypsin"], "UDP-glucuronyl transferase conjugates bilirubin with glucuronic acid.", "Describe bilirubin conjugation."),
    c("Bile acids return to the liver after intestinal reabsorption.", "Where are most bile acids reabsorbed?", "Terminal ileum", ["Stomach", "Duodenum", "Transverse colon only", "Esophagus"], "Most bile acids are reabsorbed in the terminal ileum.", "Explain enterohepatic circulation."),
    c("Hepatocytes synthesize bile acids.", "Which precursor is used?", "Cholesterol", ["Glucose", "Vitamin B12", "Hemoglobin globin chains", "Urea"], "Bile acids are synthesized from cholesterol.", "Identify bile acid precursor."),
    c("Albumin synthesis decreases in severe liver dysfunction.", "Which Starling force is reduced?", "Plasma oncotic pressure", ["Capillary hydrostatic pressure", "Interstitial hydrostatic pressure only", "Lymphatic pressure", "Arterial pulse pressure"], "Albumin is a major determinant of plasma oncotic pressure.", "Relate hepatic albumin synthesis to edema."),
    c("The liver converts ammonia to urea.", "Which physiologic role is served?", "Nitrogen detoxification", ["Oxygen transport", "Bile acid reabsorption only", "Gastric acid secretion", "Vitamin B12 binding"], "The urea cycle detoxifies ammonia by converting it to urea.", "Describe hepatic nitrogen metabolism.")
  ],
  "Exocrine Pancreas": [
    c("Acid enters the duodenum.", "Which hormone stimulates pancreatic bicarbonate secretion?", "Secretin", ["CCK", "Gastrin", "Motilin", "Somatostatin"], "Secretin from duodenal S cells stimulates pancreatic ductal bicarbonate secretion.", "Describe secretin action."),
    c("Fat and amino acids enter the duodenum.", "Which hormone stimulates pancreatic enzyme secretion?", "CCK", ["Secretin", "Insulin", "Glucagon", "Aldosterone"], "CCK stimulates pancreatic acinar enzyme secretion.", "Describe CCK action."),
    c("Trypsinogen reaches the intestinal lumen.", "Which enzyme activates it?", "Enteropeptidase", ["Pepsin", "Amylase", "Lipase", "Lactase"], "Enteropeptidase converts trypsinogen to trypsin.", "Explain pancreatic zymogen activation."),
    c("Pancreatic duct cells secrete bicarbonate.", "Which purpose does this serve?", "Neutralize gastric acid in the duodenum", ["Activate pepsin in stomach", "Absorb vitamin B12", "Generate bile acids", "Decrease duodenal pH"], "Bicarbonate neutralizes acid, optimizing pancreatic enzyme function.", "Explain pancreatic bicarbonate secretion."),
    c("Premature activation of pancreatic zymogens occurs.", "Which enzyme activation is most central?", "Trypsin", ["Lactase", "Salivary amylase", "Pepsin in stomach only", "Brush border sucrase"], "Trypsin activates other pancreatic zymogens.", "Identify trypsin as a key protease activator.")
  ],
  "Motility Patterns": [
    c("Fasting intestinal motility clears residual contents between meals.", "Which hormone is associated with this migrating motor complex?", "Motilin", ["Secretin", "Gastrin", "PTH", "ADH"], "Motilin helps initiate migrating motor complexes during fasting.", "Describe fasting motility."),
    c("Mass movements occur in the colon.", "What is their main function?", "Propel fecal material over long distances", ["Mix chyme in the duodenum", "Relax the lower esophageal sphincter", "Secrete pancreatic enzymes", "Absorb vitamin B12"], "Colonic mass movements move fecal material toward the rectum.", "Identify colonic motility patterns."),
    c("Haustral contractions occur in the colon.", "What is their primary function?", "Mixing and slow propulsion", ["Rapid gastric emptying", "LES relaxation", "Bile secretion", "Protein digestion"], "Haustral contractions mix colonic contents and promote water absorption.", "Describe haustral motility."),
    c("Gastric emptying is slowed by duodenal fat.", "Which hormone contributes?", "CCK", ["Motilin", "Aldosterone", "PTH", "Calcitonin"], "CCK slows gastric emptying and stimulates bile and pancreatic enzyme secretion.", "Explain hormonal control of gastric emptying."),
    c("The rectum is distended.", "Which reflex relaxes the internal anal sphincter?", "Rectoanal inhibitory reflex", ["Baroreceptor reflex", "Stretch reflex of quadriceps", "Pupillary reflex", "Hering-Breuer reflex"], "Rectal distension triggers internal anal sphincter relaxation through enteric reflexes.", "Describe defecation reflex physiology.")
  ],
  "Salivary Secretion": [
    c("Parasympathetic stimulation of salivary glands increases.", "Which secretion pattern is expected?", "High-volume watery saliva", ["Low-volume protein-rich saliva only", "No saliva", "Only gastric acid", "Bile-rich saliva"], "Parasympathetic stimulation produces copious watery saliva.", "Describe autonomic control of salivation."),
    c("Sympathetic stimulation of salivary glands predominates.", "Which secretion pattern is expected?", "Low-volume viscous saliva", ["High-volume watery saliva", "Complete absence of protein", "Pancreatic enzyme secretion", "Bicarbonate-free bile"], "Sympathetic stimulation tends to produce lower-volume, protein-rich viscous saliva.", "Contrast sympathetic and parasympathetic salivation."),
    c("Ductal modification of saliva occurs.", "How does final saliva compare with plasma at low flow?", "Hypotonic", ["Hypertonic", "Isotonic with identical sodium", "Protein-free and chloride-free always", "More concentrated than plasma for all ions"], "Salivary ducts reabsorb sodium and chloride more than they secrete potassium and bicarbonate, making saliva hypotonic.", "Explain salivary duct modification."),
    c("Salivary amylase is secreted.", "Which nutrient digestion begins?", "Carbohydrate", ["Protein", "Triglyceride exclusively", "Nucleic acid only", "Vitamin B12"], "Salivary amylase begins starch digestion.", "Identify salivary amylase function."),
    c("Salivary flow rate increases.", "What happens to saliva tonicity?", "It becomes less hypotonic", ["It becomes more hypotonic without limit", "It becomes identical to urine", "It loses all bicarbonate", "It stops containing enzymes"], "At high flow, there is less time for ductal modification, so saliva becomes closer to isotonic.", "Describe flow-dependent salivary composition.")
  ],
  "Carbohydrate Digestion": [
    c("Luminal starch digestion begins in the mouth.", "Which enzyme initiates this process?", "Salivary amylase", ["Pepsin", "Trypsin", "Lipase", "Enteropeptidase"], "Salivary amylase begins starch digestion.", "Identify enzymes in carbohydrate digestion."),
    c("Pancreatic amylase acts in the small intestine.", "Which substrate is digested?", "Starch", ["Triglycerides", "Proteins", "Bile acids", "Vitamin B12"], "Pancreatic amylase digests starch into oligosaccharides and disaccharides.", "Describe pancreatic amylase action."),
    c("Brush border lactase is deficient.", "Which carbohydrate is malabsorbed?", "Lactose", ["Sucrose only", "Starch only", "Glycogen in liver", "Cellulose"], "Lactase digests lactose into glucose and galactose.", "Identify disaccharidase function."),
    c("Glucose and galactose enter enterocytes apically.", "Which transporter is required?", "SGLT1", ["GLUT5", "GLUT4", "CFTR", "Pepsin"], "SGLT1 transports glucose and galactose with sodium.", "Describe monosaccharide absorption."),
    c("Fructose enters enterocytes apically.", "Which transporter is used?", "GLUT5", ["SGLT1", "GLUT4", "ENaC", "Aquaporin 2"], "Fructose uses GLUT5 facilitated diffusion.", "Identify fructose transport.")
  ],
  "Protein Digestion": [
    c("Pepsinogen is secreted in the stomach.", "What activates it?", "Low gastric pH", ["Bile salts", "Enteropeptidase only", "Pancreatic bicarbonate", "Intrinsic factor"], "Acid converts pepsinogen to pepsin.", "Describe gastric protein digestion."),
    c("Trypsin activates other pancreatic zymogens.", "What activates trypsinogen initially?", "Enteropeptidase", ["Pepsin", "Secretin", "Intrinsic factor", "Bile acid"], "Brush border enteropeptidase activates trypsinogen to trypsin.", "Explain zymogen activation."),
    c("Amino acids are absorbed across the apical membrane.", "Which mechanism is commonly used?", "Sodium-dependent cotransport", ["Simple diffusion only", "Primary active ATP pump for each amino acid", "Bile micelles", "Intrinsic factor binding"], "Many amino acid transporters use sodium gradients for secondary active transport.", "Describe amino acid absorption."),
    c("Dipeptides and tripeptides enter enterocytes.", "Which ion gradient helps drive uptake?", "Hydrogen ion gradient", ["Chloride only", "Calcium only", "Potassium only", "Bicarbonate only"], "PepT1 uses an H+ gradient to absorb dipeptides and tripeptides.", "Explain peptide absorption."),
    c("Pancreatic proteases are secreted as inactive precursors.", "What is the main purpose?", "Prevent autodigestion of the pancreas", ["Improve gastric acid secretion", "Absorb iron", "Neutralize bile", "Increase salivary flow"], "Zymogen secretion prevents premature protease activity within the pancreas.", "Explain why proteases are secreted as zymogens.")
  ],
  "Lipid Digestion": [
    c("Bile salts emulsify dietary fat.", "What is the effect?", "Increased surface area for lipase", ["Decreased micelle formation", "Protein denaturation", "Starch hydrolysis", "Vitamin B12 binding"], "Emulsification increases lipid surface area for pancreatic lipase.", "Describe bile salt function."),
    c("Pancreatic lipase digests triglycerides.", "Which products are formed?", "Free fatty acids and monoglycerides", ["Amino acids", "Glucose and galactose", "Bile acids only", "Nucleotides"], "Pancreatic lipase breaks triglycerides into monoglycerides and free fatty acids.", "Identify products of triglyceride digestion."),
    c("Micelles deliver lipids to enterocytes.", "Which substances do micelles carry?", "Long-chain fatty acids and fat-soluble vitamins", ["Vitamin B12 only", "Iron only", "Glucose only", "Amino acids only"], "Micelles solubilize lipids and fat-soluble vitamins for absorption.", "Explain micelle transport."),
    c("Long-chain fatty acids are re-esterified in enterocytes.", "Which particle transports them through lymph?", "Chylomicron", ["VLDL from liver only", "HDL only", "Albumin-bound free fatty acid only", "Intrinsic factor complex"], "Chylomicrons transport absorbed long-chain triglycerides through lymph.", "Describe chylomicron formation."),
    c("Short-chain fatty acids are absorbed.", "Which route is most likely?", "Directly into portal blood", ["Only into chylomicrons", "Only through lacteals", "Bound to intrinsic factor", "Excreted unchanged"], "Short-chain fatty acids can enter portal blood directly.", "Differentiate short- and long-chain fatty acid absorption.")
  ],
  "Cardiovascular & Respiratory": [
    c("Exercise increases tissue oxygen demand and cardiac output.", "Which coordinated response improves oxygen delivery?", "Increased ventilation and increased cardiac output", ["Decreased ventilation and decreased cardiac output", "Reduced hemoglobin unloading", "Pulmonary vasoconstriction everywhere", "Decreased sympathetic drive"], "Exercise integrates respiratory and cardiovascular responses to increase oxygen uptake, transport, and delivery.", "Integrate ventilation and cardiac output during exercise."),
    c("Left heart failure increases pulmonary venous pressure.", "Which respiratory consequence is expected?", "Pulmonary edema with impaired gas exchange", ["Decreased capillary hydrostatic pressure", "Improved diffusion distance", "Reduced work of breathing", "Pure high V/Q only"], "Elevated pulmonary venous pressure increases pulmonary capillary filtration, causing edema and diffusion impairment.", "Relate heart failure to pulmonary gas exchange."),
    c("Hypoxemia stimulates peripheral chemoreceptors.", "Which cardiovascular response can occur through sympathetic activation?", "Increased heart rate", ["Decreased sympathetic tone", "Decreased cardiac output", "Complete arteriolar dilation in all beds", "Suppressed ventilation"], "Hypoxemia activates peripheral chemoreceptors and sympathetic responses that support oxygen delivery.", "Integrate chemoreflex cardiovascular effects."),
    c("A pulmonary embolism acutely raises pulmonary vascular resistance.", "Which cardiac chamber faces increased afterload?", "Right ventricle", ["Left atrium", "Left ventricle only", "Coronary sinus", "Aorta"], "Pulmonary vascular resistance is afterload for the right ventricle.", "Relate pulmonary vascular resistance to right ventricular load."),
    c("Anemia lowers arterial oxygen content.", "Which compensatory cardiovascular change helps maintain oxygen delivery?", "Increased cardiac output", ["Decreased heart rate", "Decreased stroke volume", "Reduced tissue extraction", "Lower coronary flow"], "Oxygen delivery equals cardiac output times arterial oxygen content; cardiac output can rise to compensate for anemia.", "Integrate oxygen content and cardiac output.")
  ],
  "Renal Cardiovascular": [
    c("Renal perfusion pressure decreases.", "Which response supports arterial pressure?", "Renin release", ["ANP release from kidney", "Insulin release", "Calcitonin release", "Bile secretion"], "Low renal perfusion stimulates renin and RAAS activation.", "Integrate renal sensing and blood pressure control."),
    c("Angiotensin II constricts efferent arterioles.", "Which glomerular effect helps preserve GFR at low renal perfusion?", "Increased glomerular hydrostatic pressure", ["Decreased glomerular pressure", "Complete filtration stop", "Decreased filtration fraction always", "Increased Bowman pressure"], "Efferent constriction helps maintain glomerular pressure when renal perfusion is low.", "Relate RAAS to glomerular hemodynamics."),
    c("Heart failure lowers effective arterial blood volume despite total body fluid excess.", "Which renal response is triggered?", "Sodium and water retention", ["Natriuresis from low RAAS", "Suppressed ADH", "Decreased sympathetic tone", "Reduced aldosterone"], "Low effective arterial volume activates RAAS, ADH, and sympathetic tone, causing retention.", "Explain renal compensation in heart failure."),
    c("ANP is released during atrial stretch.", "Which renal effect lowers volume?", "Increased sodium excretion", ["Increased renin secretion", "Increased aldosterone", "Increased collecting duct sodium reabsorption", "Increased vasopressin only"], "ANP promotes natriuresis and opposes RAAS.", "Integrate cardiac endocrine function and renal sodium handling."),
    c("Renal sympathetic nerve activity increases during hypotension.", "Which effect occurs?", "Increased renin release and sodium reabsorption", ["Decreased renin", "Decreased proximal sodium reabsorption", "Increased GFR by afferent dilation only", "Blocked aldosterone"], "Sympathetic activation supports pressure by increasing renin and sodium retention.", "Describe renal sympathetic cardiovascular integration.")
  ],
  "Renal & Acid-Base": [
    c("Metabolic acidosis develops from excess fixed acid.", "Which renal response compensates?", "Increased ammonium excretion and new bicarbonate generation", ["Bicarbonate wasting", "Decreased hydrogen secretion", "Decreased glutamine metabolism", "Suppressed ventilation only"], "The kidney increases acid excretion as NH4+ and regenerates bicarbonate.", "Integrate renal acid excretion in acidosis."),
    c("Chronic respiratory acidosis persists.", "Which renal compensation is expected?", "Increased bicarbonate reabsorption", ["Increased bicarbonate secretion", "Decreased acid excretion", "No renal response", "Decreased ammonium excretion"], "The kidney retains bicarbonate and increases acid excretion in chronic respiratory acidosis.", "Explain renal compensation for respiratory acidosis."),
    c("Carbonic anhydrase is inhibited in proximal tubule.", "Which acid-base effect is expected?", "Bicarbonate loss causing metabolic acidosis", ["Bicarbonate retention causing alkalosis", "No urine pH change", "Respiratory acidosis only", "Increased distal bicarbonate reabsorption enough to prevent loss"], "Carbonic anhydrase inhibition reduces proximal bicarbonate reabsorption.", "Relate tubular transport to acid-base balance."),
    c("A patient loses gastric acid from vomiting.", "Which renal challenge accompanies metabolic alkalosis?", "Increased bicarbonate with volume and chloride depletion", ["Low bicarbonate", "High ammonium excretion as primary cause", "No chloride effect", "Mandatory hyperkalemia only"], "Vomiting causes metabolic alkalosis and volume/chloride depletion, which can maintain alkalosis.", "Integrate GI loss and renal acid-base handling."),
    c("Distal hydrogen secretion is impaired.", "Which pattern is expected?", "Reduced urinary acidification", ["Increased urinary acidification", "Increased bicarbonate generation", "Pure respiratory alkalosis", "No effect on systemic pH"], "Impaired distal acid secretion decreases net acid excretion and can cause metabolic acidosis.", "Explain distal nephron acid secretion.")
  ],
  "Endocrine & Metabolism": [
    c("Insulin rises in the fed state.", "Which metabolic shift occurs?", "Increased glucose storage and lipogenesis", ["Increased ketogenesis", "Increased proteolysis", "Increased hepatic glucose output", "Increased glucagon dominance"], "Insulin promotes fuel storage after meals.", "Integrate insulin with fuel metabolism."),
    c("Cortisol rises during prolonged stress.", "Which metabolic effect supports plasma glucose?", "Increased gluconeogenesis", ["Decreased gluconeogenesis", "Increased peripheral glucose uptake in muscle", "Suppressed amino acid mobilization", "Decreased lipolysis in all tissues"], "Cortisol promotes gluconeogenesis and mobilizes substrates.", "Describe cortisol metabolic effects."),
    c("Thyroid hormone increases.", "Which metabolic change is expected?", "Increased oxygen consumption", ["Decreased basal metabolic rate", "Decreased heat production", "Reduced adrenergic responsiveness", "Decreased cardiac output"], "Thyroid hormone increases metabolic rate and oxygen consumption.", "Integrate thyroid hormone and metabolism."),
    c("Glucagon predominates during fasting.", "Which hepatic pathway increases?", "Gluconeogenesis", ["Glycogen synthesis", "Fat storage", "GLUT4 insertion", "Protein synthesis only"], "Glucagon promotes hepatic glucose production during fasting.", "Explain fasting metabolism."),
    c("Low insulin and high glucagon persist.", "Which fuel pathway increases?", "Ketogenesis", ["Glycogen synthesis", "Malonyl-CoA inhibition of fatty acid entry", "Triglyceride storage only", "Glucose uptake by GLUT4"], "Low insulin and high glucagon promote lipolysis and hepatic ketone production.", "Describe hormonal control of ketogenesis.")
  ],
  "Neuro-Endocrine Integration": [
    c("Stress activates hypothalamic CRH neurons.", "Which pituitary hormone increases?", "ACTH", ["TSH only", "Prolactin inhibition", "FSH only", "Oxytocin only"], "CRH stimulates anterior pituitary ACTH release.", "Integrate hypothalamic control of adrenal function."),
    c("Plasma osmolality increases.", "Which hypothalamic-pituitary response occurs?", "Increased ADH release", ["Decreased ADH", "Increased FSH", "Increased calcitonin", "Suppressed thirst"], "Osmoreceptors stimulate thirst and ADH release.", "Explain osmoregulatory neuroendocrine control."),
    c("Suckling activates hypothalamic pathways postpartum.", "Which two hormones are involved in lactation?", "Prolactin and oxytocin", ["TSH and ACTH", "Insulin and glucagon", "PTH and calcitonin", "Renin and aldosterone"], "Prolactin supports milk production and oxytocin causes milk ejection.", "Integrate neural stimuli and lactation hormones."),
    c("Dopamine inhibition of lactotrophs decreases.", "Which hormone rises?", "Prolactin", ["ADH", "Oxytocin", "LH only", "ACTH only"], "Dopamine tonically suppresses prolactin.", "Describe hypothalamic inhibition of prolactin."),
    c("Pulsatile GnRH frequency changes.", "Which pituitary axis is affected?", "Gonadal axis", ["Posterior pituitary water axis only", "Parathyroid axis", "Pancreatic islet axis", "Renal RAAS only"], "GnRH pulse frequency regulates LH and FSH secretion.", "Integrate neural pulsatility with reproductive hormones.")
  ],
  "GI & Autonomic System": [
    c("Parasympathetic vagal activity increases in the gut.", "Which effect is expected?", "Increased motility and secretion", ["Decreased motility", "Complete sphincter contraction only", "Reduced pancreatic secretion", "Blocked gastric accommodation"], "Parasympathetic input generally increases GI motility and secretion.", "Integrate autonomic control of GI function."),
    c("Sympathetic activity to the gut increases.", "Which effect is expected?", "Decreased motility and blood flow", ["Increased peristalsis", "Increased secretion everywhere", "LES relaxation only", "Increased salivary watery flow"], "Sympathetic activation reduces GI motility and blood flow.", "Describe sympathetic GI effects."),
    c("Vagal stimulation of parietal cells occurs.", "Which mediator is released?", "Acetylcholine", ["Norepinephrine", "Dopamine", "PTH", "Renin"], "Vagal postganglionic fibers release acetylcholine, stimulating M3 receptors.", "Relate vagal tone to gastric secretion."),
    c("The myenteric plexus is damaged.", "Which function is most impaired?", "GI motility coordination", ["Bile acid synthesis", "Hemoglobin synthesis", "Renal bicarbonate reabsorption", "Thyroid hormone release"], "The myenteric plexus regulates gut smooth muscle motility.", "Identify enteric nervous system functions."),
    c("The submucosal plexus is activated.", "Which function is most associated?", "Secretion and local blood flow", ["Skeletal muscle contraction", "Cardiac conduction", "Glomerular filtration", "Ovarian steroid synthesis"], "The submucosal plexus regulates secretion and mucosal blood flow.", "Describe submucosal plexus function.")
  ],
  "Multisystem Homeostasis": [
    c("Severe dehydration decreases effective arterial blood volume.", "Which combined response is expected?", "Increased sympathetic tone, RAAS, and ADH", ["Suppressed ADH and renin", "Increased ANP only", "Decreased thirst", "Reduced sodium retention"], "Volume depletion activates sympathetic tone, RAAS, ADH, and thirst.", "Integrate responses to hypovolemia."),
    c("Exercise increases CO2 production, heat production, and oxygen demand.", "Which integrated response is expected?", "Increased ventilation, cardiac output, and heat dissipation", ["Decreased ventilation", "Decreased cardiac output", "Suppressed sweating", "Reduced muscle blood flow"], "Exercise requires coordinated respiratory, cardiovascular, and thermoregulatory responses.", "Integrate physiologic responses to exercise."),
    c("Acute blood loss reduces arterial pressure.", "Which rapid compensatory mechanism occurs first?", "Baroreceptor-mediated sympathetic activation", ["Renal erythropoietin immediately restores volume", "Thyroid hormone decreases instantly", "Insulin increases blood pressure", "Bile secretion increases"], "The baroreflex rapidly increases sympathetic tone after blood pressure falls.", "Identify rapid compensation for hemorrhage."),
    c("A patient has prolonged fasting.", "Which multisystem pattern is expected?", "Low insulin, high glucagon, lipolysis, and ketogenesis", ["High insulin and glycogen synthesis", "Low glucagon and suppressed lipolysis", "No hormonal changes", "Increased glucose storage only"], "Fasting shifts metabolism toward hepatic glucose production, lipolysis, and ketone production.", "Integrate endocrine and metabolic fasting responses."),
    c("Systemic inflammation increases capillary permeability and vasodilation.", "Which hemodynamic change may occur?", "Decreased effective arterial pressure", ["Increased systemic vascular resistance only", "Reduced interstitial fluid", "Decreased capillary filtration", "Increased plasma oncotic pressure"], "Vasodilation and capillary leak reduce effective arterial pressure and can trigger compensatory responses.", "Integrate vascular and fluid homeostasis.")
  ]
};

function c(setup, question, correct, distractors, explanation, objective) {
  return { setup, question, correct, distractors, explanation, objective };
}

function conceptsForTopic(topic) {
  return TOPIC_CONCEPTS[topic] || TOPIC_CONCEPTS["Multisystem Homeostasis"];
}

function createQuestion(systemSpec, topic, concept, id, index, variant) {
  const choices = [concept.correct, ...concept.distractors];
  const rotationSeed = index + topic.length + systemSpec.prefix.length + (variant === "vignette" ? 3 : 0);
  const isVignette = variant === "vignette";
  const concepts = conceptsForTopic(topic);
  const variantFrame = QUESTION_VARIANT_FRAMES[Math.floor(index / concepts.length) % QUESTION_VARIANT_FRAMES.length];
  const questionPrefix = variantFrame.questionLead.endsWith("?")
    ? variantFrame.questionLead
    : `${variantFrame.questionLead} ${concept.question}`;

  return {
    id,
    system: systemSpec.system,
    topic,
    stem: isVignette
      ? buildAdvancedVignetteStem(concept, topic, index, variantFrame, questionPrefix)
      : `${STEM_CONTEXTS[Math.floor(index / concepts.length) % STEM_CONTEXTS.length]} ${variantFrame.conceptLead} ${concept.setup} ${questionPrefix}`,
    choices: rotateChoices(choices, 0, rotationSeed),
    answer: rotatedAnswer(0, choices.length, rotationSeed),
    explanation: `${concept.explanation} ${variantFrame.explanationFocus}`,
    objective: `${concept.objective} ${isVignette ? "Applied vignette." : "Focused concept."} ${variantFrame.objectiveFocus}`,
    style: isVignette ? "CAS-like NBME-style applied clinical vignette" : "NBME-style single-best-answer",
    difficultyIndex: isVignette ? DIFFICULTY_VALUES[index % DIFFICULTY_VALUES.length] : 0,
    generationType: isVignette ? "vignette" : "concept"
  };
}

function buildAdvancedVignetteStem(concept, topic, index, variantFrame, questionPrefix) {
  const context = ADVANCED_VIGNETTE_CONTEXTS[index % ADVANCED_VIGNETTE_CONTEXTS.length];
  const data = advancedDataForTopic(topic, index);
  const seriesDetail = VIGNETTE_SERIES_DETAILS[Math.floor(index / ADVANCED_VIGNETTE_CONTEXTS.length) % VIGNETTE_SERIES_DETAILS.length];
  return `${context} ${seriesDetail} ${variantFrame.vignetteLead} ${data} ${concept.setup} ${questionPrefix}`;
}

function advancedDataForTopic(topic, index) {
  const defaultData = [
    "The relevant measurement is repeated to exclude random error, and a second variable changes in the expected compensatory direction.",
    "A graph of the response shows an early phase, a plateau, and partial recovery after the stimulus is removed.",
    "The abnormality is reproduced under controlled conditions, making a pharmacologic receptor effect or transport process most likely.",
    "Several distractor findings are normal, so the key step is identifying the primary altered physiologic variable.",
    "The team compares the finding with a normal reference table and asks which mechanism best accounts for the directional change."
  ];

  const topicData = {
    "Resting Membrane Potential": [
      "Serum potassium is 5.8 mEq/L, serum sodium is 140 mEq/L, and nerve conduction amplitude is slightly reduced.",
      "A membrane recording shows the resting potential moving from -70 mV toward -58 mV without a change in extracellular sodium.",
      "Patch-clamp data show reduced potassium leak conductance while voltage-gated sodium channel density is unchanged.",
      "The cell is exposed to a solution that changes one major ion gradient while ATP levels remain adequate.",
      "The instructor provides a Nernst potential table and asks which ion movement explains the new baseline voltage."
    ],
    "Action Potential": [
      "A nerve recording shows delayed propagation with preserved resting membrane potential.",
      "The upstroke velocity of the action potential is reduced while repolarization is relatively preserved.",
      "The stimulus is repeated during a refractory period and fails to produce a second spike.",
      "A demyelinated segment increases capacitance and reduces safety factor for conduction.",
      "A voltage-clamp tracing shows normal threshold but altered channel availability."
    ],
    "Synaptic Transmission": [
      "A presynaptic calcium current is reduced during stimulation, and quantal transmitter release decreases.",
      "A toxin cleaves SNARE proteins at the neuromuscular junction while postsynaptic receptor number is unchanged.",
      "Acetylcholine remains detectable in the synaptic cleft longer than expected after nerve stimulation.",
      "Patch-clamp data show increased postsynaptic chloride conductance after inhibitory interneuron activation.",
      "Repeated presynaptic stimuli delivered close together produce additive postsynaptic potentials."
    ],
    "Transport Mechanisms": [
      "The process stops when ATP depletion eliminates the sodium gradient, even though the transported solute does not directly bind ATP.",
      "An epithelial uptake study shows saturability and competition by a structurally similar solute.",
      "The transported molecule moves against its concentration gradient by coupling to another ion.",
      "Membrane vesicles take up the solute only when a specific carrier protein is present.",
      "The movement is temperature-sensitive and reduced by a transporter inhibitor."
    ],
    "Excitable Cells": [
      "A tracing from an excitable cell shows threshold-dependent depolarization followed by a specialized plateau or pacemaker phase.",
      "The response differs between skeletal muscle, smooth muscle, cardiac myocyte, and neuron preparations.",
      "A receptor antagonist blocks the initial depolarization without changing the contractile apparatus.",
      "The cell type is identified by its dominant calcium sensor and pattern of electrical activity.",
      "The key clue is whether the cell uses ligand-gated channels, voltage-gated channels, or calcium-calmodulin signaling."
    ],
    "Mechanics of Contraction": [
      "A length-tension curve is generated at several preload conditions.",
      "Force rises without shortening during one trial and shortening occurs against a fixed load during another.",
      "ATP is depleted experimentally and cross-bridge detachment is impaired.",
      "Repeated stimulation increases cytosolic calcium before the fiber has relaxed.",
      "Sarcomere length is changed before stimulation and maximal force occurs at an intermediate length."
    ],
    "Excitation-Contraction Coupling": [
      "A T-tubule voltage sensor is activated, but calcium release from the sarcoplasmic reticulum is altered.",
      "Cytosolic calcium remains elevated longer than expected after stimulation.",
      "A drug blocks L-type calcium channels and reduces contraction in cardiac muscle.",
      "The preparation is smooth muscle, and contraction depends on myosin light-chain phosphorylation.",
      "The trace shows normal membrane depolarization but impaired coupling to force generation."
    ],
    "Cardiac Cycle": [
      "A pressure-volume loop is shown with a changed end-systolic point and preserved end-diastolic volume.",
      "A phonocardiogram is aligned with valve opening and closing during systole and diastole.",
      "Left ventricular pressure, aortic pressure, and left atrial pressure are plotted on the same graph.",
      "Preload is increased during the study while afterload and contractility are unchanged.",
      "Aortic valve opening is delayed because ventricular pressure must reach a higher threshold."
    ],
    Electrocardiography: [
      "An ECG shows a change in one interval while the mechanical examination is normal.",
      "The tracing is aligned with atrial depolarization, AV nodal conduction, ventricular depolarization, and repolarization.",
      "A drug slows AV nodal conduction without directly changing ventricular depolarization.",
      "The learner must distinguish an electrical interval from a valve event.",
      "A prolonged ventricular repolarization phase changes the measured interval on the tracing."
    ],
    Hemodynamics: [
      "Flow changes after vessel radius is altered while viscosity and pressure gradient are held constant.",
      "A local metabolite accumulates in active tissue and changes arteriolar tone.",
      "The pressure gradient is unchanged, but resistance rises because of a change in vessel caliber.",
      "A compliance curve shows a smaller pressure increase for the same added volume.",
      "Blood viscosity is increased in the model and flow falls at a constant pressure gradient."
    ],
    "Blood Pressure Regulation": [
      "After standing, the patient has decreased carotid sinus firing and a compensatory change in autonomic outflow.",
      "Low renal perfusion pressure increases renin release during the first hour.",
      "Atrial stretch increases during volume expansion and urinary sodium excretion rises.",
      "A vasoconstrictor hormone increases systemic vascular resistance and aldosterone secretion.",
      "Mean arterial pressure changes more closely track diastolic pressure at normal heart rates."
    ],
    "Heart Failure": [
      "Echocardiography shows a low ejection fraction and elevated end-systolic volume.",
      "Filling pressures are high despite preserved ejection fraction.",
      "Pulmonary capillary hydrostatic pressure rises and oxygen diffusion becomes less efficient.",
      "Systemic venous pressure is elevated with dependent edema and hepatomegaly.",
      "Neurohormonal compensation initially supports pressure but worsens congestion."
    ],
    Hemostasis: [
      "Bleeding occurs after mucosal trauma, and platelet adhesion to exposed collagen is impaired.",
      "PT, aPTT, platelet count, and bleeding time are compared to locate the affected step.",
      "A platelet receptor antagonist prevents fibrinogen-mediated cross-linking.",
      "Thrombin generation is preserved, but fibrin degradation is increased.",
      "The abnormality is isolated to primary hemostasis rather than coagulation factor activation."
    ],
    "Microcirculation and Lymphatics": [
      "Edema develops after capillary hydrostatic pressure rises in a dependent limb.",
      "Plasma albumin is low and the net reabsorptive force is reduced.",
      "Lymphatic drainage is obstructed after surgery and interstitial protein accumulates.",
      "Histamine increases endothelial permeability and raises interstitial oncotic pressure.",
      "Arteriolar dilation increases downstream capillary hydrostatic pressure."
    ],
    "Respiratory Mechanics": [
      "A pressure-volume curve shifts downward, indicating reduced compliance.",
      "Airflow falls after airway radius decreases during bronchoconstriction.",
      "Pleural pressure becomes less negative after air enters the pleural space.",
      "Surfactant deficiency increases opening pressure and promotes alveolar collapse.",
      "During inspiration, alveolar pressure falls below atmospheric pressure."
    ],
    "Gas Exchange": [
      "Alveolar oxygen decreases after barometric pressure falls despite unchanged oxygen fraction.",
      "Diffusion distance increases and oxygen equilibration becomes less efficient.",
      "Carbon monoxide exposure lowers oxygen content while PaO2 is initially normal.",
      "Global hypoventilation increases PaCO2.",
      "Exercise increases CO2 delivery to the lungs and ventilation rises."
    ],
    "Oxygen Transport": [
      "A hemoglobin saturation curve shifts right during fever and increased tissue CO2 production.",
      "Oxygen content decreases despite a normal dissolved oxygen partial pressure.",
      "Fetal hemoglobin is compared with adult hemoglobin in placental exchange.",
      "2,3-BPG increases after chronic hypoxemia.",
      "Active tissue has increased hydrogen ion concentration and promotes oxygen unloading."
    ],
    "Ventilation Control": [
      "PaCO2 rises acutely and CSF pH changes before renal compensation occurs.",
      "Severe hypoxemia activates carotid body chemoreceptors.",
      "Voluntary hyperventilation lowers PaCO2 and changes systemic pH.",
      "Pulmonary stretch receptor firing increases at high lung volume.",
      "A medullary lesion disrupts automatic rhythmic breathing."
    ],
    "Acid-Base Balance": [
      "The values are pH 7.25, PaCO2 28 mm Hg, and HCO3- 12 mEq/L.",
      "The values are pH 7.50, PaCO2 48 mm Hg, and HCO3- 36 mEq/L.",
      "Acute hypoventilation increases PaCO2 before renal compensation.",
      "Chronic respiratory acidosis is followed by increased renal bicarbonate retention.",
      "The primary disturbance must be identified before deciding whether compensation is appropriate."
    ],
    "V/Q Ratio": [
      "A ventilated alveolar unit loses perfusion after an embolic event.",
      "An airway obstruction creates a perfused but poorly ventilated region.",
      "Regional lung measurements are compared from apex to base in an upright subject.",
      "Arterial oxygen improves incompletely with supplemental oxygen because some blood bypasses ventilated alveoli.",
      "Dead space ventilation increases the work needed to eliminate CO2."
    ],
    "Glomerular Filtration": [
      "Afferent or efferent arteriolar tone is changed while plasma protein concentration remains constant.",
      "Bowman space pressure increases after tubular obstruction.",
      "A freely filtered marker has no tubular secretion or reabsorption.",
      "Plasma oncotic pressure increases and opposes filtration.",
      "Renal autoregulation maintains GFR over a range of perfusion pressures."
    ],
    "Tubular Electrolyte Handling": [
      "A transporter in the thick ascending limb is inhibited and the medullary gradient decreases.",
      "A mineralocorticoid increases ENaC expression in principal cells.",
      "Parathyroid hormone changes phosphate handling in the proximal tubule.",
      "A thiazide-sensitive transporter is blocked in the distal convoluted tubule.",
      "The lumen becomes more negative and potassium secretion is favored."
    ],
    "Urine Concentration Mechanism": [
      "ADH rises and collecting duct water permeability increases.",
      "The thick ascending limb reabsorbs solute without water.",
      "Urea recycling increases inner medullary osmolality.",
      "The vasa recta preserve the corticomedullary gradient.",
      "In the absence of ADH, urine volume rises and osmolality falls."
    ],
    "Volume Regulation": [
      "Effective arterial blood volume decreases and neurohormonal responses are activated.",
      "Atrial stretch rises after volume expansion.",
      "Aldosterone increases sodium reabsorption in the distal nephron.",
      "Pressure natriuresis follows an increase in renal perfusion pressure.",
      "Renal sympathetic nerve activity increases during hypotension."
    ],
    "Renal Acid-Base Physiology": [
      "Proximal bicarbonate reabsorption is impaired after carbonic anhydrase inhibition.",
      "Chronic acidosis increases ammoniagenesis.",
      "Alpha-intercalated cells increase hydrogen ion secretion.",
      "Beta-intercalated cells secrete bicarbonate during alkalosis.",
      "Filtered phosphate buffers secreted hydrogen ions in tubular fluid."
    ],
    "Hypothalamic-Pituitary Axis": [
      "A portal blood sample shows altered hypothalamic releasing hormone delivery.",
      "Dopamine inhibition of lactotrophs changes during medication exposure.",
      "Pulsatile GnRH is disrupted and gonadotropin output changes.",
      "A posterior pituitary hormone is released after hypothalamic neuronal firing.",
      "Cortisol feedback suppresses an upstream pituitary hormone."
    ],
    Thyroid: [
      "TSH receptor signaling increases in thyroid follicular cells.",
      "Iodide organification is blocked during thyroid hormone synthesis.",
      "Basal metabolic rate rises with increased thyroid hormone.",
      "Peripheral deiodinase activity changes circulating T3 availability.",
      "Parafollicular cells are stimulated by elevated calcium."
    ],
    "Adrenal Gland": [
      "Angiotensin II stimulates a specific adrenal cortical zone.",
      "ACTH rises during stress and increases glucocorticoid synthesis.",
      "Preganglionic sympathetic fibers activate chromaffin cells.",
      "Chronically elevated cortisol produces negative feedback.",
      "Aldosterone changes distal nephron sodium and potassium handling."
    ],
    "Glucose Homeostasis": [
      "A meal increases insulin and suppresses hepatic glucose output.",
      "Fasting increases glucagon and hepatic gluconeogenesis.",
      "Insulin stimulates glucose uptake in skeletal muscle.",
      "Acute stress increases catecholamine-mediated glycogenolysis.",
      "Low insulin and high glucagon promote ketone formation."
    ],
    "Calcium Metabolism": [
      "Ionized calcium falls and parathyroid hormone increases.",
      "Vitamin D activation changes intestinal calcium absorption.",
      "PTH changes phosphate handling and calcium reabsorption.",
      "Osteoblast signaling indirectly increases osteoclast activity.",
      "Calcitonin reduces osteoclast activity."
    ],
    "Male Reproductive Physiology": [
      "LH stimulation of Leydig cells changes androgen production.",
      "FSH signaling in Sertoli cells supports spermatogenesis.",
      "Inhibin B feedback selectively changes pituitary output.",
      "Testosterone is converted to a more potent androgen in target tissue.",
      "Seminiferous tubule function depends on Sertoli cell support."
    ],
    "Female Reproductive Physiology": [
      "Sustained estradiol changes from negative to positive feedback.",
      "A midcycle gonadotropin surge triggers an ovarian event.",
      "The luteal phase is dominated by a steroid hormone.",
      "Theca and granulosa cells cooperate to synthesize estrogen.",
      "Basal body temperature changes after ovulation."
    ],
    "Pregnancy and Lactation": [
      "Early pregnancy depends on a placental hormone that rescues the corpus luteum.",
      "Postpartum suckling triggers a posterior pituitary reflex.",
      "Prolactin supports milk production after delivery.",
      "Progesterone maintains uterine quiescence during pregnancy.",
      "Estrogen increases uterine responsiveness near term."
    ],
    "Puberty and Sexual Differentiation": [
      "Increased pulsatile GnRH initiates pubertal gonadotropin secretion.",
      "Sertoli cell hormone causes regression of one embryologic duct system.",
      "Testosterone maintains internal male reproductive ducts.",
      "DHT is required for external male genital development.",
      "Estradiol promotes secondary sexual development."
    ],
    Motility: [
      "A swallowed bolus triggers coordinated sphincter relaxation and peristalsis.",
      "The stomach accommodates a meal without a large pressure rise.",
      "Small intestinal contractions alternate between mixing and propulsion.",
      "Enteric inhibitory neurons relax smooth muscle ahead of a bolus.",
      "The myenteric plexus coordinates smooth muscle activity."
    ],
    "Gastric Secretion": [
      "A protein-rich meal stimulates vagal and hormonal pathways that increase acid secretion.",
      "Histamine release from ECL cells amplifies parietal cell acid secretion.",
      "Low gastric pH activates inhibitory D cells.",
      "Parietal cell function is linked to vitamin B12 absorption.",
      "A receptor antagonist selectively reduces one acid-stimulatory pathway."
    ],
    "Digestion and Absorption": [
      "A regional intestinal resection selectively impairs one nutrient absorption pathway.",
      "Brush border and pancreatic enzymes are compared during digestion.",
      "A sodium-dependent transporter absorbs luminal monosaccharide.",
      "Bile salts improve delivery of hydrophobic nutrients to enterocytes.",
      "A carrier defect produces osmotic symptoms after a specific carbohydrate load."
    ],
    "Hepatic Physiology": [
      "Hepatocytes conjugate bilirubin to increase water solubility.",
      "Enterohepatic circulation returns bile acids to the liver.",
      "Low albumin changes plasma oncotic pressure.",
      "The urea cycle detoxifies nitrogen from amino acid metabolism.",
      "Bile acid synthesis depends on a lipid precursor."
    ],
    "Exocrine Pancreas": [
      "Duodenal acid stimulates pancreatic ductal bicarbonate secretion.",
      "Duodenal fat and amino acids stimulate acinar enzyme secretion.",
      "Pancreatic zymogens require luminal activation.",
      "Bicarbonate secretion optimizes duodenal pH for enzyme function.",
      "Premature protease activation threatens pancreatic tissue."
    ],
    "Motility Patterns": [
      "Fasting motility clears residual luminal contents between meals.",
      "Colonic mass movements propel fecal material toward the rectum.",
      "Haustral contractions mix contents and aid water absorption.",
      "Duodenal fat slows gastric emptying.",
      "Rectal distension triggers internal anal sphincter relaxation."
    ],
    "Salivary Secretion": [
      "Parasympathetic stimulation produces a high-volume secretion.",
      "Sympathetic stimulation changes protein content and viscosity.",
      "Ductal modification makes saliva hypotonic at low flow rates.",
      "Salivary amylase initiates starch digestion.",
      "High flow reduces the time available for ductal modification."
    ],
    "Carbohydrate Digestion": [
      "Starch digestion begins before the bolus reaches the stomach.",
      "Pancreatic amylase acts in the small intestine.",
      "A brush border enzyme deficiency causes carbohydrate malabsorption.",
      "Glucose and galactose share a sodium-dependent transporter.",
      "Fructose uptake uses facilitated diffusion."
    ],
    "Protein Digestion": [
      "Low gastric pH activates a protease precursor.",
      "Brush border enzyme activity initiates pancreatic protease activation.",
      "Amino acid uptake uses sodium-dependent transporters.",
      "Dipeptides and tripeptides use a hydrogen ion gradient.",
      "Proteases are released as inactive precursors to protect the pancreas."
    ],
    "Lipid Digestion": [
      "Bile salts emulsify dietary triglycerides.",
      "Pancreatic lipase generates absorbable lipid products.",
      "Micelles deliver long-chain lipids to enterocytes.",
      "Chylomicrons transport re-esterified triglycerides through lymph.",
      "Short-chain fatty acids enter portal blood directly."
    ],
    "Cardiovascular & Respiratory": [
      "Oxygen delivery changes after cardiac output and arterial oxygen content move in opposite directions.",
      "Pulmonary venous pressure rises and worsens diffusion across the alveolar-capillary membrane.",
      "Hypoxemia activates chemoreceptors and sympathetic cardiovascular responses.",
      "Pulmonary vascular resistance acutely increases right ventricular afterload.",
      "Exercise requires matching ventilation, perfusion, and cardiac output."
    ],
    "Renal Cardiovascular": [
      "Low renal perfusion activates a hormonal cascade that supports blood pressure.",
      "Efferent arteriolar tone changes to maintain filtration pressure.",
      "Heart failure lowers effective arterial volume despite edema.",
      "Atrial endocrine signaling opposes sodium retention.",
      "Renal sympathetic activity changes renin release and tubular sodium handling."
    ],
    "Renal & Acid-Base": [
      "Fixed acid accumulation requires renal generation of new bicarbonate.",
      "Chronic respiratory acidosis depends on renal compensation.",
      "Carbonic anhydrase inhibition causes urinary bicarbonate loss.",
      "Vomiting causes alkalosis that is sustained by chloride depletion.",
      "Distal acid secretion fails and urinary acidification is impaired."
    ],
    "Endocrine & Metabolism": [
      "Fed-state hormone levels promote fuel storage.",
      "Stress hormone signaling mobilizes substrates for gluconeogenesis.",
      "Thyroid hormone changes oxygen consumption and heat production.",
      "Fasting shifts hepatic metabolism toward glucose production.",
      "Low insulin and high glucagon increase ketogenesis."
    ],
    "Neuro-Endocrine Integration": [
      "Stress activates hypothalamic releasing hormone neurons.",
      "Osmoreceptor firing changes posterior pituitary hormone release.",
      "Suckling coordinates anterior and posterior pituitary responses.",
      "Dopamine changes lactotroph hormone secretion.",
      "GnRH pulse frequency regulates gonadotropins."
    ],
    "GI & Autonomic System": [
      "Parasympathetic input increases digestive activity.",
      "Sympathetic activation reduces gut perfusion and motility.",
      "Vagal acetylcholine stimulates gastric secretion.",
      "Myenteric plexus damage alters motility coordination.",
      "Submucosal plexus activity changes secretion and mucosal blood flow."
    ],
    "Multisystem Homeostasis": [
      "Hypovolemia activates neural, endocrine, renal, and thirst responses.",
      "Exercise coordinates ventilation, circulation, temperature control, and metabolism.",
      "Acute hemorrhage triggers rapid baroreflex compensation.",
      "Prolonged fasting coordinates endocrine and metabolic adaptation.",
      "Systemic inflammation changes vascular tone, permeability, and effective arterial pressure."
    ]
  };

  const items = topicData[topic] || defaultData;
  return items[index % items.length];
}

function buildQuestionBank() {
  return SYSTEM_DEFINITIONS.map((systemSpec) => {
    const topics = {};
    let sequence = 1;

    systemSpec.topics.forEach((topic) => {
      const concepts = conceptsForTopic(topic);
      topics[topic] = [];

      for (let index = 0; index < BASE_QUESTIONS_PER_TOPIC; index += 1) {
        const concept = concepts[index % concepts.length];
        const id = `${systemSpec.prefix}${String(sequence).padStart(4, "0")}`;
        topics[topic].push(createQuestion(systemSpec, topic, concept, id, index, "concept"));
        sequence += 1;
      }

      for (let index = 0; index < VIGNETTE_QUESTIONS_PER_TOPIC; index += 1) {
        const concept = concepts[index % concepts.length];
        const id = `${systemSpec.prefix}${String(sequence).padStart(4, "0")}`;
        topics[topic].push(createQuestion(systemSpec, topic, concept, id, index, "vignette"));
        sequence += 1;
      }
    });

    return {
      system: systemSpec.system,
      prefix: systemSpec.prefix,
      topics
    };
  });
}

function rotateChoices(choices, answer, seed) {
  const shift = seed % choices.length;
  if (shift === 0) return [...choices];
  return choices.map((_, index) => choices[(index - shift + choices.length) % choices.length]);
}

function rotatedAnswer(answer, length, seed) {
  return (answer + (seed % length)) % length;
}

async function loadStoredBank() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.version === BANK_VERSION && Array.isArray(parsed.bank)) {
        return parsed.bank;
      }
    }

    const assetBank = await loadBankAsset();
    if (assetBank) return assetBank;
  } catch (error) {
    return rebuildStoredBank();
  }
  return rebuildStoredBank();
}

async function loadBankAsset() {
  if (typeof fetch !== "function" || window.location.protocol === "file:") return null;

  try {
    const response = await fetch(BANK_ASSET_URL, { cache: "no-store" });
    if (!response.ok) return null;

    const payload = await response.json();
    if (payload.version !== BANK_VERSION || !Array.isArray(payload.bank)) return null;

    storeBankPayload(payload.bank);
    return payload.bank;
  } catch (error) {
    return null;
  }
}

function storeBankPayload(bank) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: BANK_VERSION,
        generatedAt: new Date().toISOString(),
        questionsPerTopic: QUESTIONS_PER_TOPIC,
        bank
      })
    );
  } catch (error) {
    // The in-memory bank still works if browser storage is unavailable.
  }
}

function rebuildStoredBank() {
  const bank = buildQuestionBank();
  storeBankPayload(bank);
  return bank;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeFilename(value) {
  return String(value)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function sanitizePdfText(value) {
  return String(value)
    .replaceAll("\u03b1", "alpha")
    .replaceAll("\u03b2", "beta")
    .replaceAll("\u03b3", "gamma")
    .replaceAll("\u03b4", "delta")
    .replaceAll("\u03bc", "mc")
    .replaceAll("\u2013", "-")
    .replaceAll("\u2014", "-")
    .replaceAll("\u2264", "<=")
    .replaceAll("\u2265", ">=")
    .replaceAll("\u2248", "~")
    .replaceAll("\u2192", "->")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function escapePdfText(value) {
  return sanitizePdfText(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

let questionBank = [];

const systemSelect = document.getElementById("systemSelect");
const topicSelect = document.getElementById("topicSelect");
const countInput = document.getElementById("countInput");
const questionIdInput = document.getElementById("questionIdInput");
const integratedLinks = document.getElementById("integratedLinks");
const startBtn = document.getElementById("startBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const loadIdBtn = document.getElementById("loadIdBtn");
const rebuildBankBtn = document.getElementById("rebuildBankBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const answerList = document.getElementById("answerList");
const stemText = document.getElementById("stemText");
const highlightStemBtn = document.getElementById("highlightStemBtn");
const clearStemHighlightsBtn = document.getElementById("clearStemHighlightsBtn");
const blockMeta = document.getElementById("blockMeta");
const questionTitle = document.getElementById("questionTitle");
const questionCounter = document.getElementById("questionCounter");
const questionIdBadge = document.getElementById("questionIdBadge");
const difficultyBadge = document.getElementById("difficultyBadge");
const reviewResult = document.getElementById("reviewResult");
const explanationText = document.getElementById("explanationText");
const learningObjective = document.getElementById("learningObjective");
const answeredStat = document.getElementById("answeredStat");
const accuracyStat = document.getElementById("accuracyStat");
const bankTotalStat = document.getElementById("bankTotalStat");
const bankSystemStat = document.getElementById("bankSystemStat");
const bankStatus = document.getElementById("bankStatus");
const timerText = document.getElementById("timerText");
const normalValuesTab = document.getElementById("normalValuesTab");
const normalValuesPanel = document.getElementById("normalValuesPanel");
const closeNormalValuesBtn = document.getElementById("closeNormalValuesBtn");
const validatorEndpointInput = document.getElementById("validatorEndpointInput");
const validateLisaBtn = document.getElementById("validateLisaBtn");
const validateMedGeminiBtn = document.getElementById("validateMedGeminiBtn");
const validationPayloadText = document.getElementById("validationPayloadText");
const copyValidationBtn = document.getElementById("copyValidationBtn");
const saveValidationBtn = document.getElementById("saveValidationBtn");
const validationStatus = document.getElementById("validationStatus");
const validationSummary = document.getElementById("validationSummary");
const versionStamp = document.getElementById("versionStamp");
const modeButtons = document.querySelectorAll("[data-mode]");

let mode = "tutor";
let activeQuestions = [];
let currentIndex = 0;
let selectedAnswer = null;
let hasSubmitted = false;
let totalAnswered = 0;
let totalCorrect = 0;
let timerId = null;
let startedAt = null;
let validationResults = {};
let currentValidationEngine = "lisa";

async function initApp() {
  renderVersionStamp();
  bankStatus.textContent = "Loading question bank...";

  try {
    questionBank = await loadStoredBank();
    validationResults = loadValidationResults();
    initSelectors();
    renderIntegratedLinks();
    updateBankStats();
    updateValidationPanel();
  } catch (error) {
    bankStatus.textContent = "Unable to load the question bank.";
    questionTitle.textContent = "Question bank unavailable";
  }
}

function renderVersionStamp() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  versionStamp.textContent = `${year}${month}${day} ${hour}${minute}`;
}

function loadValidationResults() {
  try {
    return JSON.parse(window.localStorage.getItem(VALIDATION_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function storeValidationResults() {
  try {
    window.localStorage.setItem(VALIDATION_STORAGE_KEY, JSON.stringify(validationResults));
  } catch (error) {
    validationStatus.textContent = "Validation result kept in memory; browser storage is unavailable.";
  }
}

function initSelectors() {
  systemSelect.innerHTML = questionBank
    .map((item) => `<option value="${escapeHtml(item.system)}">${escapeHtml(item.system)}</option>`)
    .join("");
  updateTopics();
}

function updateTopics() {
  const system = getSelectedSystem();
  const topicOptions = ["All topics", ...Object.keys(system.topics)];
  topicSelect.innerHTML = topicOptions
    .map((topic) => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`)
    .join("");
  updateBankStats();
}

function renderIntegratedLinks() {
  integratedLinks.innerHTML = INTEGRATED_TOPICS.map(
    (topic) => `<button class="integrated-link" type="button" data-integrated-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`
  ).join("");
}

function getSelectedSystem() {
  return questionBank.find((item) => item.system === systemSelect.value) || questionBank[0];
}

function getAllQuestions() {
  return questionBank.flatMap((system) => Object.values(system.topics).flat());
}

function getQuestionPool() {
  const system = getSelectedSystem();
  if (topicSelect.value === "All topics") {
    return Object.values(system.topics).flat();
  }
  return system.topics[topicSelect.value] || [];
}

function updateBankStats() {
  if (!questionBank.length) return;
  const total = getAllQuestions().length;
  const system = getSelectedSystem();
  const systemTotal = Object.values(system.topics).flat().length;
  bankTotalStat.textContent = String(total);
  bankSystemStat.textContent = String(systemTotal);
  bankStatus.textContent = `${system.prefix} IDs available: ${system.prefix}0001-${system.prefix}${String(systemTotal).padStart(4, "0")}`;
}

function updateDownloadState() {
  downloadPdfBtn.disabled = activeQuestions.length === 0;
}

function getCurrentQuestion() {
  return activeQuestions[currentIndex] || null;
}

function setValidationControlsEnabled(isEnabled) {
  validateLisaBtn.disabled = !isEnabled;
  validateMedGeminiBtn.disabled = !isEnabled;
  copyValidationBtn.disabled = !isEnabled;
  saveValidationBtn.disabled = !isEnabled;
}

function validationRecordFor(question) {
  return question ? validationResults[question.id] || {} : {};
}

function updateValidationPanel() {
  const question = getCurrentQuestion();
  setValidationControlsEnabled(Boolean(question));

  if (!question) {
    validationSummary.textContent = "Not validated";
    validationPayloadText.value = "";
    validationStatus.textContent = "Start or load a question to prepare validation.";
    return;
  }

  const record = validationRecordFor(question);
  const engines = Object.entries(VALIDATION_ENGINES)
    .filter(([key]) => record[key])
    .map(([, label]) => label);
  validationSummary.textContent = engines.length ? `Validated: ${engines.join(", ")}` : "Not validated";
  validationStatus.textContent = engines.length
    ? `Saved validation result for ${question.id}.`
    : `${question.id} is ready for LiSA V1.0 or Med-Gemini 1.5 validation.`;
}

function buildValidationPayload(engineKey) {
  const question = getCurrentQuestion();
  if (!question) return null;

  return {
    validationEngine: VALIDATION_ENGINES[engineKey],
    validationEngineKey: engineKey,
    requestedSchema: {
      verdict: "pass | revise | fail",
      score: "0.0-1.0",
      projectedDifficultyIndex: "0.0-0.7",
      findings: ["short actionable issues"],
      recommendedRevision: "optional revised item text"
    },
    rubric: VALIDATION_RUBRIC,
    item: {
      id: question.id,
      system: question.system,
      topic: question.topic,
      style: question.style,
      generationType: question.generationType,
      projectedDifficultyIndex: question.difficultyIndex,
      stem: question.stem,
      choices: question.choices.map((choice, index) => ({
        label: String.fromCharCode(65 + index),
        text: choice,
        isCorrect: index === question.answer
      })),
      explanation: question.explanation,
      learningObjective: question.objective
    },
    validationInstructions: [
      "Evaluate originality and avoid matching any known copyrighted NBME item wording.",
      "Evaluate whether the item uses a CAS-like applied clinical vignette requiring interpretation.",
      "Confirm that only one answer is best and all distractors are plausible.",
      "Check physiologic accuracy for first-year medical physiology.",
      "Return JSON only using the requested schema."
    ]
  };
}

function showValidationPacket(engineKey, message) {
  currentValidationEngine = engineKey;
  validationPayloadText.value = JSON.stringify(buildValidationPayload(engineKey), null, 2);
  validationStatus.textContent = message;
}

async function validateWithEngine(engineKey) {
  const payload = buildValidationPayload(engineKey);
  if (!payload) return;

  const endpoint = validatorEndpointInput.value.trim();
  if (!endpoint) {
    showValidationPacket(engineKey, `${VALIDATION_ENGINES[engineKey]} packet prepared. Add an endpoint URL to send it, or copy the packet for external validation.`);
    return;
  }

  currentValidationEngine = engineKey;
  validationStatus.textContent = `Sending ${getCurrentQuestion().id} to ${VALIDATION_ENGINES[engineKey]}...`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    validationPayloadText.value = text;
    validationStatus.textContent = response.ok
      ? `${VALIDATION_ENGINES[engineKey]} returned a result. Review and save it.`
      : `${VALIDATION_ENGINES[engineKey]} endpoint returned HTTP ${response.status}.`;
  } catch (error) {
    showValidationPacket(engineKey, `Could not reach the endpoint. Packet prepared for manual ${VALIDATION_ENGINES[engineKey]} validation.`);
  }
}

async function copyValidationPacket() {
  const question = getCurrentQuestion();
  if (!question) return;
  if (!validationPayloadText.value.trim()) {
    showValidationPacket(currentValidationEngine, "Validation packet prepared.");
  }

  try {
    await navigator.clipboard.writeText(validationPayloadText.value);
    validationStatus.textContent = `Validation packet for ${question.id} copied.`;
  } catch (error) {
    validationPayloadText.focus();
    validationPayloadText.select();
    validationStatus.textContent = "Packet is selected. Copy it from the text box.";
  }
}

function saveValidationResult() {
  const question = getCurrentQuestion();
  if (!question) return;

  let parsed;
  try {
    parsed = JSON.parse(validationPayloadText.value);
  } catch (error) {
    validationStatus.textContent = "Paste a valid JSON result before saving.";
    return;
  }

  if (!validationResults[question.id]) validationResults[question.id] = {};
  validationResults[question.id][currentValidationEngine] = {
    savedAt: new Date().toISOString(),
    engine: VALIDATION_ENGINES[currentValidationEngine],
    result: parsed
  };
  storeValidationResults();
  updateValidationPanel();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startBlock() {
  const pool = shuffle(getQuestionPool());
  const requestedCount = Math.max(1, Math.min(Number(countInput.value) || 1, pool.length));
  activeQuestions = pool.slice(0, requestedCount);
  currentIndex = 0;
  selectedAnswer = null;
  hasSubmitted = false;
  startTimer();
  renderQuestion();
  updateDownloadState();
}

function loadQuestionById() {
  const id = questionIdInput.value.trim().toUpperCase();
  const question = getAllQuestions().find((item) => item.id === id);
  if (!question) {
    bankStatus.textContent = `No question found for ${id || "that ID"}`;
    return;
  }

  systemSelect.value = question.system;
  updateTopics();
  topicSelect.value = question.topic;
  activeQuestions = [question];
  currentIndex = 0;
  selectedAnswer = null;
  hasSubmitted = false;
  startTimer();
  renderQuestion();
  updateDownloadState();
}

function rebuildBank() {
  questionBank = rebuildStoredBank();
  initSelectors();
  renderIntegratedLinks();
  updateBankStats();
  bankStatus.textContent = `Rebuilt ${getAllQuestions().length} stored questions`;
}

function buildPdfLines() {
  const systemNames = [...new Set(activeQuestions.map((question) => question.system))].join(", ");
  const topicNames = [...new Set(activeQuestions.map((question) => question.topic))].join(", ");
  const lines = [
    "PhysioQ NBME-Style Practice Block",
    `Systems: ${systemNames}`,
    `Topics: ${topicNames}`,
    `Questions: ${activeQuestions.length}`,
    `Generated: ${new Date().toLocaleString()}`,
    ""
  ];

  activeQuestions.forEach((question, questionIndex) => {
    lines.push(`Question ${questionIndex + 1} (${question.id})`);
    lines.push(`${question.system} / ${question.topic}`);
    if (question.generationType === "vignette") {
      lines.push(`Projected difficulty index: ${question.difficultyIndex.toFixed(2)}`);
    }
    lines.push(...wrapPdfText(question.stem, 92));
    lines.push("");
    question.choices.forEach((choice, choiceIndex) => {
      lines.push(...wrapPdfText(`${String.fromCharCode(65 + choiceIndex)}. ${choice}`, 88));
    });
    lines.push(`Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.choices[question.answer]}`);
    lines.push(...buildPdfAnswerExplanationLines(question));
    lines.push(...wrapPdfText(`Learning objective: ${question.objective}`, 92));
    lines.push("");
  });

  return lines;
}

function buildPdfAnswerExplanationLines(question) {
  return [
    ...wrapPdfText(`Why the correct answer fits the stem: ${correctAnswerFitText(question)}`, 92),
    ...wrapPdfText(`Physiologic mechanism: ${question.explanation}`, 92),
    ...wrapPdfText(`Key physiologic clue: ${keyStemSignal(question)}`, 92),
    ...wrapPdfText(`Why the other options are less likely: ${distractorPhysiologySummary(question)}`, 92)
  ];
}

function wrapPdfText(text, maxLength) {
  const words = sanitizePdfText(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function paginatePdfLines(lines) {
  const pages = [];
  let page = [];
  const maxLines = 54;

  lines.forEach((line) => {
    if (page.length >= maxLines) {
      pages.push(page);
      page = [];
    }
    page.push(line);
  });

  if (page.length) pages.push(page);
  return pages;
}

function makePdfStream(lines) {
  const commands = ["BT", "/F1 10 Tf", "13 TL", "54 738 Td"];
  lines.forEach((line) => {
    if (line) {
      commands.push(`(${escapePdfText(line)}) Tj`);
    }
    commands.push("T*");
  });
  commands.push("ET");
  return commands.join("\n");
}

function createPdfBlob(lines) {
  const pages = paginatePdfLines(lines);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
  ];
  const pageRefs = [];

  pages.forEach((pageLines) => {
    const pageObjectNumber = objects.length + 1;
    const contentObjectNumber = objects.length + 2;
    const content = makePdfStream(pageLines);
    pageRefs.push(`${pageObjectNumber} 0 R`);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${pages.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function downloadCurrentBlockPdf() {
  if (!activeQuestions.length) return;

  const firstQuestion = activeQuestions[0];
  const filename = `physioq-${safeFilename(firstQuestion.system)}-${safeFilename(firstQuestion.topic)}-${activeQuestions.length}-questions.pdf`;
  const blob = createPdfBlob(buildPdfLines());
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function startTimer() {
  clearInterval(timerId);
  startedAt = Date.now();
  timerText.textContent = "00:00";
  timerId = setInterval(() => {
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secondsText = String(seconds % 60).padStart(2, "0");
    timerText.textContent = `${minutesText}:${secondsText}`;
  }, 1000);
}

function renderQuestion() {
  const question = activeQuestions[currentIndex];
  selectedAnswer = null;
  hasSubmitted = false;

  blockMeta.textContent = `${question.system} / ${question.topic}`;
  questionTitle.textContent = mode === "exam" ? "Exam mode block" : "Tutor mode block";
  questionCounter.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
  questionIdBadge.textContent = question.id;
  difficultyBadge.textContent = question.generationType === "vignette"
    ? `Difficulty ${question.difficultyIndex.toFixed(2)}`
    : "NBME-style";
  stemText.textContent = question.stem;
  highlightStemBtn.disabled = false;
  clearStemHighlightsBtn.disabled = false;
  submitBtn.disabled = true;
  nextBtn.disabled = true;
  nextBtn.textContent = "Next";
  reviewResult.textContent = mode === "exam" ? "Hidden until submitted" : "Not answered";
  reviewResult.className = "";
  explanationText.textContent = "Select the single best answer.";
  learningObjective.textContent = question.objective;

  answerList.innerHTML = question.choices
    .map(
      (choice, index) => `
        <div class="answer-option" data-answer="${index}">
          <button class="choice-letter answer-select" type="button" aria-label="Select answer ${String.fromCharCode(65 + index)}">${String.fromCharCode(65 + index)}</button>
          <button class="choice-text answer-select" type="button">${escapeHtml(choice)}</button>
          <button class="strike-choice" type="button" aria-pressed="false" aria-label="Strike answer ${String.fromCharCode(65 + index)}">
            <span>S</span>
          </button>
          <span class="choice-status" aria-live="polite"></span>
        </div>
      `
    )
    .join("");
  updateValidationPanel();
}

function selectAnswer(index) {
  if (hasSubmitted) return;
  selectedAnswer = index;
  document.querySelectorAll(".answer-option").forEach((row) => {
    row.classList.toggle("selected", Number(row.dataset.answer) === index);
  });
  submitBtn.disabled = false;
}

function toggleAnswerStrike(row) {
  if (hasSubmitted) return;
  const isStruck = row.classList.toggle("struck");
  const strikeButton = row.querySelector(".strike-choice");
  if (strikeButton) strikeButton.setAttribute("aria-pressed", String(isStruck));
}

function highlightSelectedStemText() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!stemText.contains(range.commonAncestorContainer)) return;

  const mark = document.createElement("mark");
  mark.className = "stem-highlight";
  try {
    range.surroundContents(mark);
  } catch (error) {
    const fragment = range.extractContents();
    mark.appendChild(fragment);
    range.insertNode(mark);
  }
  selection.removeAllRanges();
}

function clearStemHighlights() {
  const question = activeQuestions[currentIndex];
  if (!question) return;
  stemText.textContent = question.stem;
}

function keyStemSignal(question) {
  const sentences = question.stem.match(/[^.!?]+[.!?]/g) || [question.stem];
  const signal = sentences
    .find((sentence) => /blood pressure|serum|pH|PaCO2|PaO2|pulse|respirations|pressure|concentration|gradient|receptor|transport|hormone|potential|volume|flow/i.test(sentence))
    || sentences[0];
  return signal.trim();
}

function correctAnswerFitText(question) {
  return `This item tests ${question.topic} physiology within ${question.system}. The correct answer fits because it is the option that directly expresses the physiologic mechanism responsible for the finding in the stem. It preserves the expected relationship between the altered variable, the site of action, and the direction of the physiologic response.`;
}

function selectedAnswerPhysiologyText(question, selectedIndex, isCorrect) {
  if (isCorrect) {
    return "The selected answer is physiologically consistent with the mechanism described in the stem.";
  }

  const selectedLabel = String.fromCharCode(65 + selectedIndex);
  const selectedChoice = question.choices[selectedIndex];
  return `Choice ${selectedLabel}, ${selectedChoice}, is not the best physiologic explanation because it does not account for the same altered variable, site of action, or direction of response as the correct mechanism.`;
}

function distractorPhysiologySummary(question) {
  return "The incorrect choices may name real physiologic concepts, but they do not produce the specific variable change described in the stem. They either act at a different site, alter the response in the opposite direction, or explain a related but noncausal finding.";
}

function buildDistractorReview(question, selectedIndex) {
  return question.choices
    .map((choice, index) => ({ choice, index }))
    .filter((item) => item.index !== question.answer)
    .slice(0, 4)
    .map((item) => {
      const label = String.fromCharCode(65 + item.index);
      const selectedPhrase = item.index === selectedIndex ? " This was the selected option, but" : "";
      return `<li><strong>${label}.</strong>${selectedPhrase} ${escapeHtml(item.choice)} is less appropriate physiologically because it does not explain the primary variable in the stem through the correct mechanism, site of action, or expected direction of change.</li>`;
    })
    .join("");
}

function buildDetailedReview(question, selectedIndex, isCorrect) {
  const correctLabel = String.fromCharCode(65 + question.answer);
  const correctChoice = question.choices[question.answer];

  return `
    <p><strong>${escapeHtml(question.id)} correct answer: ${correctLabel}. ${escapeHtml(correctChoice)}</strong></p>
    <p><strong>Physiology tested:</strong> ${escapeHtml(question.objective)}</p>
    <p><strong>Physiologic mechanism:</strong> ${escapeHtml(question.explanation)}</p>
    <p><strong>Why the correct answer fits the stem:</strong> ${escapeHtml(correctAnswerFitText(question))}</p>
    <p><strong>Key physiologic clue:</strong> ${escapeHtml(keyStemSignal(question))}</p>
    <p><strong>Your selected answer:</strong> ${escapeHtml(selectedAnswerPhysiologyText(question, selectedIndex, isCorrect))}</p>
    <p><strong>Why the other options are incorrect:</strong> ${escapeHtml(distractorPhysiologySummary(question))}</p>
    <ul>
      ${buildDistractorReview(question, selectedIndex)}
    </ul>
  `;
}

function submitAnswer() {
  if (selectedAnswer === null || hasSubmitted) return;
  hasSubmitted = true;

  const question = activeQuestions[currentIndex];
  const isCorrect = selectedAnswer === question.answer;
  totalAnswered += 1;
  if (isCorrect) totalCorrect += 1;

  document.querySelectorAll(".answer-option").forEach((row) => {
    const answerIndex = Number(row.dataset.answer);
    const status = row.querySelector(".choice-status");
    row.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
    if (answerIndex === question.answer) {
      row.classList.add("correct");
      if (status) status.textContent = "Correct answer";
    }
    if (answerIndex === selectedAnswer && !isCorrect) {
      row.classList.add("incorrect");
      if (status) status.textContent = "Your answer - not correct";
    }
  });

  submitBtn.disabled = true;
  nextBtn.disabled = currentIndex === activeQuestions.length - 1;
  reviewResult.textContent = isCorrect ? "Correct" : "Incorrect";
  reviewResult.className = isCorrect ? "correct-text" : "incorrect-text";
  explanationText.innerHTML = buildDetailedReview(question, selectedAnswer, isCorrect);
  learningObjective.textContent = question.objective;
  updateStats();

  if (currentIndex === activeQuestions.length - 1) {
    clearInterval(timerId);
    nextBtn.textContent = "Block complete";
  } else {
    nextBtn.textContent = "Next";
  }
}

function nextQuestion() {
  if (currentIndex >= activeQuestions.length - 1) return;
  currentIndex += 1;
  renderQuestion();
}

function updateStats() {
  answeredStat.textContent = String(totalAnswered);
  accuracyStat.textContent = totalAnswered === 0 ? "0%" : `${Math.round((totalCorrect / totalAnswered) * 100)}%`;
}

function setNormalValuesOpen(isOpen) {
  normalValuesPanel.hidden = !isOpen;
  normalValuesTab.setAttribute("aria-expanded", String(isOpen));
}

function eventInsideElement(event, element) {
  const rect = element.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}

function handleNormalValuesPointer(event) {
  if (eventInsideElement(event, normalValuesTab)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    setNormalValuesOpen(normalValuesPanel.hidden);
    return;
  }

  if (!normalValuesPanel.hidden && eventInsideElement(event, closeNormalValuesBtn)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    setNormalValuesOpen(false);
  }
}

function handleOverlayPointerBridge(event) {
  if (event.defaultPrevented || event.target.id !== "codex-browser-sidebar-comments-root") return;

  const interactiveElements = [...document.querySelectorAll("button, .answer-option")].filter((element) => {
    const rect = element.getBoundingClientRect();
    return (
      !element.disabled &&
      rect.width > 0 &&
      rect.height > 0 &&
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  });

  const target = interactiveElements.at(-1);
  if (!target) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  target.click();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    mode = button.dataset.mode;
  });
});

systemSelect.addEventListener("change", () => {
  updateTopics();
  updateBankStats();
});
startBtn.addEventListener("click", startBlock);
downloadPdfBtn.addEventListener("click", downloadCurrentBlockPdf);
loadIdBtn.addEventListener("click", loadQuestionById);
rebuildBankBtn.addEventListener("click", rebuildBank);
submitBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);
highlightStemBtn.addEventListener("click", highlightSelectedStemText);
clearStemHighlightsBtn.addEventListener("click", clearStemHighlights);
validateLisaBtn.addEventListener("click", () => validateWithEngine("lisa"));
validateMedGeminiBtn.addEventListener("click", () => validateWithEngine("medGemini"));
copyValidationBtn.addEventListener("click", copyValidationPacket);
saveValidationBtn.addEventListener("click", saveValidationResult);
normalValuesTab.addEventListener("click", () => {
  setNormalValuesOpen(normalValuesPanel.hidden);
});
closeNormalValuesBtn.addEventListener("click", () => {
  setNormalValuesOpen(false);
});
document.addEventListener("click", handleNormalValuesPointer, true);
document.addEventListener("click", handleOverlayPointerBridge, true);
answerList.addEventListener("click", (event) => {
  const row = event.target.closest(".answer-option");
  if (!row) return;
  if (event.target.closest(".strike-choice")) {
    toggleAnswerStrike(row);
    return;
  }
  if (event.target.closest(".answer-select") || event.target === row) {
    selectAnswer(Number(row.dataset.answer));
  }
});
integratedLinks.addEventListener("click", (event) => {
  const button = event.target.closest("[data-integrated-topic]");
  if (!button) return;
  systemSelect.value = "Integrated Systems";
  updateTopics();
  topicSelect.value = button.dataset.integratedTopic;
  updateBankStats();
  startBlock();
});

initApp();
