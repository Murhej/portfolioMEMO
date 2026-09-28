import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Menu,
  Network,
  ScanLine,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";

type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  goal: string;
  architecture: string[];
  tags: string[];
  implementation: string[];
  results?: { value: string; label: string }[];
  resultNote?: string;
  github?: string;
  demo?: string;
  accent: string;
  visual: string;
};

const projects: Project[] = [
  {
    id: "nutrivision",
    number: "01",
    title: "NutriVision",
    subtitle: "AI food recognition & nutrition app",
    description:
      "A meal photo becomes a useful nutrition log: image classification, nutrition lookup, and a mobile experience connected end to end.",
    problem:
      "Estimating a meal’s nutrition takes manual searching and logging, making consistent tracking harder than it needs to be.",
    goal: "Build a mobile workflow that recognizes food from a meal image and brings the prediction together with nutrition data and personal tracking.",
    architecture: [
      "Expo app",
      "FastAPI",
      "PyTorch model",
      "Food prediction",
      "Edamam + USDA",
      "Nutrition results",
    ],
    tags: [
      "Python",
      "PyTorch",
      "Food-101",
      "FastAPI",
      "React Native",
      "Expo",
      "Edamam API",
      "USDA API",
    ],
    implementation: [
      "Trained a deep-learning image-classification model on Food-101 and return ranked top-three predictions.",
      "Served inference through FastAPI and connected Edamam and USDA nutrition lookups for calories and macros.",
      "Built the mobile product with React Native and Expo, including authentication, meal history, and adjustable goals.",
      "Added correction workflows and incremental fine-tuning to support new food classes over time.",
    ],
    github: "https://github.com/Murhej/NutriVision",
    accent: "lime",
    visual: "food",
  },
  {
    id: "squirreldoctor",
    number: "02",
    title: "SquirrelDoctor AI",
    subtitle: "Handwritten prescription recognition",
    description:
      "A computer-vision workflow that turns a prescription image into structured, readable medicine information.",
    problem:
      "Handwritten prescription names can be difficult to read and interpret consistently.",
    goal: "Create a real-time image-to-result application connecting handwriting recognition with a clear web interface.",
    architecture: [
      "Prescription image",
      "Preprocessing",
      "CRNN model",
      "Confidence score",
      "Medicine mapping",
      "Structured result",
    ],
    tags: [
      "Python",
      "CRNN",
      "Computer Vision",
      "FastAPI",
      "React",
      "Vite",
      "REST APIs",
    ],
    implementation: [
      "Applied image preprocessing before CRNN-based handwriting inference.",
      "Returned prediction confidence and mapped brand names to generic medicine names.",
      "Presented structured medicine and safety information through a React/Vite frontend backed by FastAPI.",
      "Deployed the application using Render.",
    ],
    accent: "blue",
    visual: "prescription",
  },
  {
    id: "pathscope",
    number: "03",
    title: "PathScope",
    subtitle: "Histopathologic cancer detection",
    description:
      "A deep-learning computer-vision application for image classification, exposed through an API and a typed web interface.",
    problem:
      "Histopathology image classification requires a model workflow that pairs image preparation with interpretable prediction output.",
    goal: "Fine-tune a model and build an interface for single-image and batch predictions with confidence and threshold information.",
    architecture: [
      "Tissue image",
      "160 × 160 RGB",
      "Preprocessing",
      "EfficientNetB0",
      "Classification",
      "Confidence threshold",
      "FastAPI",
      "React UI",
    ],
    tags: [
      "Python",
      "TensorFlow",
      "Keras",
      "EfficientNetB0",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
    ],
    implementation: [
      "Fine-tuned EfficientNetB0 using the Histopathologic Cancer Detection dataset.",
      "Built preprocessing and confidence/threshold-based classification for 160 × 160 RGB inputs.",
      "Implemented single-image and batch prediction through FastAPI.",
      "Built the web interface with React, TypeScript, and Vite.",
    ],
    results: [
      { value: "98.80%", label: "Recall" },
      { value: "98.67%", label: "ROC-AUC" },
      { value: "98.14%", label: "PR-AUC" },
    ],
    resultNote:
      "Evaluation results on the held-out evaluation set. These are model evaluation metrics, not a claim of production or clinical accuracy.",
    accent: "coral",
    visual: "pathology",
  },
  {
    id: "ksi-prediction",
    number: "04",
    title: "Toronto KSI Fatal Collision Prediction",
    subtitle: "Machine-learning risk prediction web app",
    description:
      "A full-stack machine-learning workflow built around historical Toronto traffic-collision data and a map-based prediction interface.",
    problem:
      "Real-world collision records require careful preparation and imbalance-aware evaluation before they can support useful predictions.",
    goal: "Build an end-to-end pipeline from raw collision data to a calibrated model served through a web application.",
    architecture: [
      "Raw data",
      "Data cleaning",
      "Feature engineering",
      "Imbalance handling",
      "Model training",
      "Evaluation",
      "Flask API",
      "React UI",
    ],
    tags: [
      "Python",
      "Machine Learning",
      "Flask",
      "React",
      "SMOTE",
      "Model Evaluation",
    ],
    implementation: [
      "Cleaned and transformed historical Toronto collision data, engineering temporal and location-based features.",
      "Addressed class imbalance using SMOTE and random undersampling.",
      "Evaluated classification models with precision, recall, F1, F2, AUROC, and precision-recall AUC.",
      "Served a calibrated serialized model through Flask and connected it to a React interface with map-based area selection, role-specific workflows, and safety guidance.",
    ],
    accent: "amber",
    visual: "map",
  },
];

const skillGroups = [
  {
    name: "Programming",
    items: ["Python", "Java", "C#", "JavaScript", "Kotlin", "SQL"],
  },
  {
    name: "AI / Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Deep Learning",
      "Computer Vision",
      "Predictive Modeling",
      "Image Classification",
      "Model Evaluation",
      "NumPy",
      "Pandas",
    ],
  },
  {
    name: "Frontend / Mobile",
    items: [
      "React",
      "React Native",
      "Expo",
      "Android Development",
      "TypeScript",
      "Vite",
    ],
  },
  {
    name: "Backend / APIs",
    items: ["FastAPI", "Node.js", "Express", "Flask", ".NET", "REST APIs"],
  },
  { name: "Databases", items: ["MongoDB", "NoSQL", "Oracle SQL", "SQL"] },
  {
    name: "Tools / Environment",
    items: [
      "Git",
      "GitHub",
      "Linux",
      "Unix",
      "CentOS",
      "Android Studio",
      "Visual Studio",
      "VS Code",
      "Eclipse",
      "VMware",
      "VirtualBox",
    ],
  },
];

const buildSteps = [
  [
    "01",
    "Understand the problem",
    "Start with the user and the decision the product should support.",
  ],
  [
    "02",
    "Collect & process data",
    "Prepare inputs so the model is learning from meaningful signals.",
  ],
  [
    "03",
    "Train / fine-tune",
    "Choose an approach suited to the data and the product constraints.",
  ],
  [
    "04",
    "Evaluate the model",
    "Measure behavior carefully before putting predictions in front of users.",
  ],
  [
    "05",
    "Build the API",
    "Make inference and application logic available through a clear contract.",
  ],
  [
    "06",
    "Connect the interface",
    "Turn model output into a workflow people can understand and use.",
  ],
  [
    "07",
    "Deploy & iterate",
    "Ship the system, learn from feedback, and improve the next version.",
  ],
];

const chapters = [
  ["01", "INTRO", "intro"],
  ["02", "ENGINEER", "about"],
  ["03", "STACK", "technology"],
  ["04", "SYSTEMS", "systems"],
  ["05", "PROJECTS", "projects"],
  ["06", "INSIDE", "inside-system"],
  ["07", "EXPERIENCE", "experience"],
  ["08", "EDUCATION", "education"],
  ["09", "CONTACT", "contact"],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [13, 0, -13]),
    { stiffness: 95, damping: 24 },
  );
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--portrait-tilt-x", `${y * -7}deg`);
    event.currentTarget.style.setProperty("--portrait-tilt-y", `${x * 9}deg`);
  };

  const resetTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--portrait-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--portrait-tilt-y", "0deg");
  };

  return (
    <motion.div
      ref={cardRef}
      className="hero-portrait-parallax"
      style={{ y: reduceMotion ? 0 : scrollY }}
    >
      <motion.div
        className="hero-portrait"
        initial={false}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <motion.img
          className="hero-portrait-image"
          src="/images/murhej-portrait.jpg"
          alt="Murhej Hantoush"
          loading="eager"
          whileHover={reduceMotion ? undefined : { scale: 1.035 }}
          transition={{ duration: 0.25 }}
        />
        <div className="hero-portrait-copy">
          <span className="eyebrow">SOFTWARE ENGINEER</span>
          <strong>Murhej Hantoush</strong>
          <span className="portrait-location"><i /> Toronto, Canada</span>
        </div>
        <ArrowUpRight className="portrait-arrow" size={14} aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  text,
}: {
  index: string;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <i />
        {eyebrow}
      </div>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </Reveal>
  );
}

function Architecture({
  steps,
  compact = false,
}: {
  steps: string[];
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={`architecture ${compact ? "architecture-compact" : ""}`}
      aria-label={`System flow: ${steps.join(" to ")}`}
    >
      {steps.map((step, index) => (
        <div className="architecture-item" key={`${index}-${step}`}>
          <motion.div
            className={`architecture-node ${index === steps.length - 1 ? "node-final" : ""}`}
            initial={reduceMotion ? false : { opacity: 0.4, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: reduceMotion ? 0 : index * 0.075, duration: reduceMotion ? 0 : 0.3 }}
          >
            <span className="node-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <ArrowRight className="architecture-arrow" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

function HeroSystem() {
  return (
    <motion.div
      className="hero-system"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      aria-label="From interface to intelligent application"
    >
      <div className="system-topline">
        <span>ILLUSTRATIVE FLOW</span>
        <span className="live-indicator">
          <i /> SAMPLE OUTPUT
        </span>
      </div>
      <div className="system-board">
        <div className="system-left">
          <div className="app-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>meal_scan.jpg</span>
            </div>
            <div
              className="meal-photo"
              role="img"
              aria-label="A colorful meal ready for food recognition"
            >
              <div className="photo-label">
                <ScanLine size={13} /> INPUT IMAGE
              </div>
            </div>
            <div className="prediction-line">
              <span className="prediction-dot" />
              <span>chicken_wings</span>
              <b>0.92</b>
            </div>
            <div className="prediction-line faded">
              <span className="prediction-dot" />
              <span>roast_chicken</span>
              <b>0.05</b>
            </div>
            <div className="prediction-line faded">
              <span className="prediction-dot" />
              <span>grilled_salmon</span>
              <b>0.02</b>
            </div>
          </div>
        </div>
        <div className="system-middle">
          <span className="flow-line" />
          <div className="model-orb">
            <BrainCircuit size={27} strokeWidth={1.4} />
            <span>INFERENCE</span>
          </div>
          <span className="flow-line" />
        </div>
        <div className="system-right">
          <div className="result-card">
            <div className="result-head">
              <span className="result-icon">
                <Activity size={15} />
              </span>
              <span>SAMPLE NUTRITION</span>
              <Check size={15} className="result-check" />
            </div>
            <div className="result-food">
              Chicken wings <span>TOP MATCH</span>
            </div>
            <div className="macro-list">
              <div>
                <span>Energy</span>
                <b>
                  318 <small>kcal</small>
                </b>
                <i>
                  <em style={{ width: "68%" }} />
                </i>
              </div>
              <div>
                <span>Protein</span>
                <b>
                  24.6 <small>g</small>
                </b>
                <i>
                  <em style={{ width: "82%" }} />
                </i>
              </div>
              <div>
                <span>Carbs</span>
                <b>
                  8.2 <small>g</small>
                </b>
                <i>
                  <em style={{ width: "34%" }} />
                </i>
              </div>
            </div>
            <div className="result-source">
              <span /> FastAPI · Nutrition APIs
            </div>
          </div>
        </div>
      </div>
      <div className="system-bottom">
        <span>USER INTERFACE</span>
        <i />
        <span>MODEL + API</span>
        <i />
        <span>REAL-WORLD DATA</span>
      </div>
    </motion.div>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "food")
    return (
      <div className="visual-food">
        <img
          src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1200&q=85"
          alt="Roasted chicken dish used as an example food-image input"
          loading="lazy"
        />
        <span className="visual-corner">INPUT / 01</span>
        <span className="visual-target">
          <i />
        </span>
        <span className="visual-detection">
          FOOD CLASS DETECTED <b>0.92</b>
        </span>
      </div>
    );
  const details: Record<
    string,
    { icon: React.ReactNode; label: string; code: string; accent: string }
  > = {
    prescription: {
      icon: <ScanLine />,
      label: "HANDWRITING RECOGNITION",
      code: "BRAND → GENERIC NAME",
      accent: "visual-blue",
    },
    pathology: {
      icon: <Activity />,
      label: "IMAGE CLASSIFICATION",
      code: "THRESHOLD-BASED PREDICTION",
      accent: "visual-coral",
    },
    map: {
      icon: <Network />,
      label: "LOCATION-BASED PREDICTION",
      code: "TORONTO  /  COLLISION DATA",
      accent: "visual-amber",
    },
  };
  const item = details[kind];
  return (
    <div className={`visual-lab ${item.accent}`}>
      <div className="lab-grid" />
      <div className="lab-orbit orbit-a" />
      <div className="lab-orbit orbit-b" />
      <div className="lab-mark">{item.icon}</div>
      <div className="lab-label">
        <span>{item.label}</span>
        <b>{item.code}</b>
      </div>
      <div className="lab-coordinate">
        MODEL OUTPUT <i>///</i>
      </div>
    </div>
  );
}

function CaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();
    const manageDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", manageDialogKeys);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", manageDialogKeys);
      document.body.classList.remove("dialog-open");
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        ref={dialogRef}
        className="case-study"
        layoutId={`project-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ y: 24, scale: 0.985 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.99 }}
        transition={{ duration: 0.28 }}
      >
        <div className="case-topbar">
          <span>PROJECT FILE / {project.number}</span>
          <button
            ref={closeButtonRef}
            className="icon-button"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={19} />
          </button>
        </div>
        <div className="case-content">
          <div className="case-title-block">
            <span className={`project-marker marker-${project.accent}`}>
              {project.number}
            </span>
            <div>
              <span className="eyebrow">CASE STUDY</span>
              <h2 id="case-title">{project.title}</h2>
              <p>{project.subtitle}</p>
            </div>
          </div>
          <div className="case-visual">
            <ProjectVisual kind={project.visual} />
          </div>
          <div className="case-section">
            <span className="case-index">01 / CONTEXT</span>
            <div>
              <h3>The problem</h3>
              <p>{project.problem}</p>
            </div>
          </div>
          <div className="case-section">
            <span className="case-index">02 / INTENT</span>
            <div>
              <h3>The goal</h3>
              <p>{project.goal}</p>
            </div>
          </div>
          <div className="case-section case-architecture">
            <span className="case-index">03 / SYSTEM</span>
            <div>
              <h3>Architecture</h3>
              <Architecture steps={project.architecture} />
            </div>
          </div>
          <div className="case-section">
            <span className="case-index">04 / BUILD</span>
            <div>
              <h3>Implementation</h3>
              <ul className="implementation-list">
                {project.implementation.map((line) => (
                  <li key={line}>
                    <span>
                      <Check size={13} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {project.results && (
            <div className="case-section">
              <span className="case-index">05 / EVALUATION</span>
              <div>
                <h3>Model evaluation</h3>
                <div className="result-metrics">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <b>{result.value}</b>
                      <span>{result.label}</span>
                    </div>
                  ))}
                </div>
                <p className="result-caveat">{project.resultNote}</p>
              </div>
            </div>
          )}
          <div className="case-section">
            <span className="case-index">
              {project.results ? "06" : "05"} / STACK
            </span>
            <div>
              <h3>Technology choices</h3>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="case-actions">
            {project.github ? (
              <a
                className="button button-light"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> View on GitHub <ArrowUpRight size={15} />
              </a>
            ) : (
              <span className="link-unavailable">GitHub link not provided</span>
            )}
            {project.demo && (
              <a
                className="button button-outline"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Open demo <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const storyHeadlines: Record<string, string> = {
    nutrivision: "SEE FOOD. UNDERSTAND IT.",
    squirreldoctor: "READING WHAT HUMANS WRITE.",
    pathscope: "SEE THE UNSEEN.",
    "ksi-prediction": "FINDING PATTERNS IN DATA.",
  };
  const projectFeatures: Record<string, string[]> = {
    nutrivision: [
      "Food image recognition + top-three predictions",
      "Nutrition lookup, authentication, meal history + goals",
      "Correction workflow + incremental fine-tuning",
    ],
    squirreldoctor: [
      "Image preprocessing + CRNN inference",
      "Confidence scoring + brand-to-generic mapping",
      "Structured medicine information + Render deployment",
    ],
    pathscope: [
      "160 × 160 RGB inputs + preprocessing",
      "Single-image + batch prediction via FastAPI",
      "Confidence scoring + threshold-based classification",
    ],
    "ksi-prediction": [
      "Historical collision data + temporal/location features",
      "SMOTE + random undersampling for class imbalance",
      "Flask prediction API + map-based React interface",
    ],
  };
  return (
    <motion.article
      className={`project-card project-story ${featured ? "project-featured" : ""} story-${project.visual}`}
      layoutId={`project-${project.id}`}
      whileInView={{ opacity: 1, y: 0 }}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-story-top">
        <div className="project-card-head">
          <span className={`project-marker marker-${project.accent}`}>
            {project.number}
          </span>
          <span className="project-chapter-label">AI PROJECT / {project.number}</span>
          <span className="project-open-icon"><ArrowUpRight size={19} /></span>
        </div>
        <div className="project-story-heading">
          <span className="eyebrow">{project.subtitle}</span>
          <h3>{project.title}</h3>
          <p className="project-story-slogan">{storyHeadlines[project.id]}</p>
          <p className="project-story-description">{project.description}</p>
        </div>
      </div>
      <div className="project-story-visual"><ProjectVisual kind={project.visual} /><span className="project-visual-index">VISION / SYSTEM / OUTPUT</span></div>
      <div className="project-story-flow"><span className="micro-label">SYSTEM / DATA PATH</span><Architecture steps={project.architecture} compact /></div>
      {project.results && <div className="card-metrics project-story-metrics">{project.results.map((result) => <div key={result.label}><b>{result.value}</b><span>{result.label}</span></div>)}<p>Held-out evaluation set · not a claim of clinical or production accuracy</p></div>}
      <div className="project-story-bottom">
        <div className="project-feature-list">{projectFeatures[project.id].map((feature) => <span key={feature}>{feature}</span>)}</div>
        <div className="project-story-meta"><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-case-link" onClick={() => onOpen(project)} aria-label={`Open ${project.title} case study`}>OPEN CASE STUDY <ArrowUpRight size={15} /></button></div>
      </div>
    </motion.article>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("AI / Machine Learning");
  const [activeChapter, setActiveChapter] = useState("intro");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const introNameY = useTransform(scrollYProgress, [0, 0.16], [0, -82]);
  const introNameOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.1]);
  const introGlowOpacity = useTransform(scrollYProgress, [0, 0.08], [0.5, 0]);
  const closeCaseStudy = () => setActiveProject(null);
  const goTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
  };

  useEffect(() => {
    const sections = chapters
      .map(([, , id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveChapter(current.target.id);
      },
      { rootMargin: "-32% 0px -56% 0px", threshold: [0, 0.2, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Murhej Hantoush home">
          <span className="wordmark-symbol">
            M<span>.</span>
          </span>
          <span className="wordmark-name">MURHEJ HANTOUSH</span>
        </a>
        <nav
          className={`main-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Portfolio chapters"
        >
          {chapters.map(([number, label, id]) => (
            <button
              key={id}
              aria-current={activeChapter === id ? "location" : undefined}
              onClick={() => goTo(id)}
            >
              <span>{number}</span> {label}
            </button>
          ))}
        </nav>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="top">
        <section className="hero intro-chapter" aria-labelledby="hero-title" id="intro">
          <div className="intro-grid" aria-hidden="true" />
          <div className="intro-coordinate intro-coordinate-top">TORONTO / CANADA <i /> AI SYSTEMS / 2026</div>
          <motion.div className="intro-nameplate" style={reduceMotion ? undefined : { y: introNameY, opacity: introNameOpacity }}>
            <motion.span className="intro-index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>PORTFOLIO / 01</motion.span>
            <motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.15 }}>
              <span>MURHEJ</span><span>HANTOUSH<span className="intro-period">.</span></span>
            </motion.h1>
            <motion.p className="intro-role" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.42 }}>AI / ML SOFTWARE ENGINEER</motion.p>
            <motion.p className="intro-statement" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.52 }}>I build intelligent software systems from machine learning models to real-world applications.</motion.p>
          </motion.div>
          <div className="intro-portrait-stage"><PortraitCard /><span className="portrait-frame-label">ENGINEER / TORONTO, ON</span></div>
          <div className="intro-bottomline"><span>SOFTWARE / DATA / INTELLIGENCE</span><button className="hero-scroll" onClick={() => goTo("about")}><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></button><span>01 — 09</span></div>
          <motion.div className="intro-edge-glow" style={{ opacity: introGlowOpacity }} />
        </section>
        <section className="about section-wrap section-space" id="about">
          <SectionHeading
            index="02"
            eyebrow="THE ENGINEER / PRACTICE"
            title="I build intelligent software."
            text="Machine learning is one layer. The product is everything connected to it."
          />
          <div className="about-grid">
            <Reveal className="about-statement">
              <p>
                I’m a{" "}
                <strong>
                  Software Engineering Technology – Artificial Intelligence
                </strong>{" "}
                graduate from Centennial College, working across the parts that
                turn an idea into a usable product.
              </p>
              <p>
                From image data and model evaluation to APIs, mobile apps, and
                full-stack interfaces, I work across the system that makes
                intelligent software useful.
              </p>
              <div className="engineer-disciplines">
                {["Machine Learning", "Computer Vision", "Backend Systems", "Full-Stack Applications", "Mobile Applications", "APIs"].map((discipline, index) => <span key={discipline}><i>{String(index + 1).padStart(2, "0")}</i>{discipline}</span>)}
              </div>
              <button className="text-link" onClick={() => goTo("experience")}>
                A little more about me <ArrowDownRight size={15} />
              </button>
            </Reveal>
            <Reveal className="capability-map" delay={0.1}>
              <div className="capability-center">
                <BrainCircuit size={21} />
                <span>
                  INTELLIGENT
                  <br />
                  APPLICATIONS
                </span>
              </div>
              <div className="capability-node cap-one">
                <ScanLine />
                <span>Computer vision</span>
              </div>
              <div className="capability-node cap-two">
                <Code2 />
                <span>Full-stack</span>
              </div>
              <div className="capability-node cap-three">
                <Database />
                <span>Data + APIs</span>
              </div>
              <div className="capability-node cap-four">
                <Layers3 />
                <span>Mobile</span>
              </div>
              <svg
                className="capability-lines"
                viewBox="0 0 600 360"
                aria-hidden="true"
              >
                <path d="M300 180 L132 76 M300 180 L468 76 M300 180 L132 284 M300 180 L468 284" />
              </svg>
              <span className="capability-caption">
                ONE PRODUCT · CONNECTED LAYERS
              </span>
            </Reveal>
          </div>
        </section>
        <section
          className="technology section-wrap section-space"
          id="technology"
        >
          <SectionHeading
            index="03"
            eyebrow="STACK / LAYERS"
            title="Technologies in the system."
            text="A practical toolkit across code, models, interfaces, and deployment."
          />
          <Reveal className="tech-interface">
            <div
              className="tech-tabs"
              role="group"
              aria-label="Technology categories"
            >
              {skillGroups.map((group) => (
                <button
                  key={group.name}
                  aria-pressed={activeSkill === group.name}
                  className={activeSkill === group.name ? "selected" : ""}
                  onClick={() => setActiveSkill(group.name)}
                >
                  {group.name}
                  <ChevronDown size={13} />
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="tech-content"
                key={activeSkill}
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                <div className="tech-group-title">
                  <span className="tech-signal" />
                  <span>{activeSkill}</span>
                  <small>
                    {String(
                      skillGroups.find((group) => group.name === activeSkill)
                        ?.items.length,
                    ).padStart(2, "0")}{" "}
                    TECHNOLOGIES
                  </small>
                </div>
                <div className="tech-badges">
                  {skillGroups
                    .find((group) => group.name === activeSkill)
                    ?.items.map((item, index) => (
                      <motion.span
                        key={item}
                        whileHover={{
                          y: -3,
                          borderColor: "rgba(200, 255, 103, .55)",
                        }}
                        transition={{ duration: 0.15 }}
                        style={{ transitionDelay: `${index * 12}ms` }}
                      >
                        {item}
                      </motion.span>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
          <Reveal className="stack-path">
            <span className="micro-label">INFERENCE PATH / TECHNOLOGIES IN CONTEXT</span>
            <Architecture steps={["Frontend · React", "API · FastAPI", "Backend · Python", "Data · SQL / MongoDB", "Machine learning · PyTorch", "Model", "Prediction"]} compact />
          </Reveal>
        </section>
        <section className="systems-chapter section-wrap section-space" id="systems">
          <SectionHeading
            index="04"
            eyebrow="SYSTEM / MODEL TO PRODUCT"
            title="From model to product."
            text="A prediction only becomes useful when the interface, API, model, and real-world data work together."
          />
          <HeroSystem />
        </section>
        <section className="projects section-wrap section-space" id="projects">
          <SectionHeading
            index="05"
            eyebrow="PROJECT CHAPTERS / 01—04"
            title="AI projects, end to end."
            text="Follow the path from input to prediction, API, and an application people can use."
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                className="project-reveal"
                delay={index === 1 ? 0.07 : 0}
              >
                <ProjectCard
                  project={project}
                  onOpen={setActiveProject}
                  featured={index === 0}
                />
              </Reveal>
            ))}
          </div>
          <Reveal className="business-project">
            <div className="business-project-kicker">
              <span className="project-marker marker-neutral">05</span>
              <span className="eyebrow">COMMERCIAL WEB · TORONTO / GTA</span>
            </div>
            <div className="business-project-main">
              <div>
                <h3>Tydra Cleaning Website</h3>
                <p>
                  A customer-facing platform for a Toronto/GTA commercial
                  cleaning business, connecting service discovery with clear
                  ways to get in touch.
                </p>
              </div>
              <div className="business-feature-list">
                <span>Responsive desktop + mobile</span>
                <span>Express backend · NoSQL</span>
                <span>Service discovery · lead generation</span>
              </div>
              <div className="business-tags">
                {["React", "Express", "NoSQL"].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
        <section className="inside-system section-wrap section-space" id="inside-system">
          <SectionHeading
            index="06"
            eyebrow="SYSTEM MAP / EVERYTHING CONNECTS"
            title="Everything connects."
            text="The work isn’t a collection of isolated components. It’s one continuous path from a person’s input to a useful result."
          />
          <div className="reveal-architecture"><span>APPLICATION LIFECYCLE / 01 → 08</span><Architecture steps={["User", "Frontend", "API", "Data", "Machine learning", "Model", "Prediction", "User"]} compact /><div className="project-connectors"><button onClick={() => goTo("projects")}><span>01</span> Food photo → nutrition result <ArrowUpRight size={14} /></button><button onClick={() => goTo("projects")}><span>02</span> Prescription → structured result <ArrowUpRight size={14} /></button><button onClick={() => goTo("projects")}><span>03</span> Tissue image → classification <ArrowUpRight size={14} /></button><button onClick={() => goTo("projects")}><span>04</span> Collision data → risk prediction <ArrowUpRight size={14} /></button></div></div>
          <div className="approach-layout">
            <Reveal className="approach-visual">
              <div className="approach-visual-header">
                <span>PRODUCT PIPELINE</span>
                <span>
                  END TO END <Network size={13} />
                </span>
              </div>
              <div className="approach-spine">
                <span className="spine-node">
                  <BrainCircuit size={25} />
                </span>
                <motion.div
                  className="spine-line"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <span className="spine-node spine-end">
                  <Layers3 size={22} />
                </span>
              </div>
              <div className="approach-visual-label">
                <b>MODEL</b>
                <span>is one layer</span>
                <b>PRODUCT</b>
                <span>is the system</span>
              </div>
            </Reveal>
            <div className="approach-steps">
              {buildSteps.map(([number, title, description], index) => (
                <Reveal
                  key={number}
                  delay={index * 0.035}
                  className="approach-step"
                >
                  <span className="step-number">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <ArrowUpRight size={14} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="experience section-wrap section-space" id="experience">
          <SectionHeading
            index="07"
            eyebrow="ENGINEERING EXPERIENCE / CUSTOMER EXPERIENCE"
            title="People work is engineering work."
            text="Professional experience outside software engineering, building the communication, judgment, and adaptability I bring to technical teams."
          />
          <div className="timeline">
            <Reveal className="timeline-entry">
              <div className="timeline-rail">
                <span />
                <i />
              </div>
              <div className="timeline-date">
                <span>JAN 2020 — PRESENT</span>
                <small>TORONTO, ON</small>
              </div>
              <div className="timeline-body">
                <div className="timeline-heading">
                  <div>
                    <span className="eyebrow">PROFESSIONAL EXPERIENCE</span>
                    <h3>Cumbraes</h3>
                    <p>Customer Service Supervisor</p>
                  </div>
                  <span className="timeline-current">CURRENT</span>
                </div>
                <p className="timeline-description">
                  A fast-paced, customer-facing role where clear communication,
                  practical problem solving, and technical adaptability matter
                  every day.
                </p>
                <div className="experience-points">
                  <span>Serve 50+ customers daily</span>
                  <span>Resolve service issues and recommend products</span>
                  <span>
                    Process payments and complete end-of-day reconciliation
                  </span>
                  <span>
                    Support online ordering, loyalty platforms, POS systems, and
                    basic technical support
                  </span>
                </div>
              </div>
              <div className="experience-traits"><span>COMMUNICATION</span><span>PROBLEM SOLVING</span><span>ADAPTABILITY</span><span>CUSTOMER EXPERIENCE</span></div>
            </Reveal>
          </div>
        </section>
        <section className="education-chapter section-wrap section-space" id="education">
          <SectionHeading index="08" eyebrow="EDUCATION / FOUNDATIONS" title="Built on software engineering fundamentals." text="Machine learning, data, and user-centered design, grounded in a software engineering technology diploma." />
          <Reveal className="education-record"><span className="education-year">2023 — 2026</span><div className="education-record-main"><span className="eyebrow">TORONTO, ON</span><h3>CENTENNIAL COLLEGE</h3><p>Diploma in Software Engineering Technology – Artificial Intelligence</p><div className="course-tags">{["Machine Learning", "Python", "Java", "SQL", "Data Management", "Customer-Centered Design"].map((course) => <span key={course}>{course}</span>)}</div></div><GraduationCap size={27} className="education-icon" /></Reveal>
        </section>
        <section className="contact section-wrap" id="contact">
          <Reveal className="contact-panel">
            <div className="contact-orbit contact-orbit-one" />
            <div className="contact-orbit contact-orbit-two" />
            <div className="contact-content">
              <div className="section-kicker">
                <span>09</span>
                <i /> STORY / ENDPOINT
              </div>
              <h2>
                LET’S BUILD
                <br />
                <span>SOMETHING</span>
                <br />
                INTELLIGENT.
              </h2>
              <p>
                Open to junior software, AI/ML, full-stack, and machine-learning
                engineering opportunities.
              </p>
              <a
                className="button button-lime contact-email"
                href="mailto:murhej.hantoush.work@gmail.com"
              >
                Start a conversation <ArrowUpRight size={16} />
              </a>
              <span className="contact-address">
                murhej.hantoush.work@gmail.com
              </span>
              <div className="contact-socials" aria-label="Profile links not provided">
                <span><Github size={13} /> GitHub profile link not provided</span>
                <span><Linkedin size={13} /> LinkedIn link not provided</span>
              </div>
            </div>
            <div className="contact-side">
              <div className="contact-side-mark">
                <ArrowUpRight size={21} />
              </div>
              <span>
                TORONTO
                <br />
                CANADA
              </span>
              <i />
              <span>2026</span>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <a className="footer-name" href="#top">
          MURHEJ HANTOUSH<span>.</span>
        </a>
        <span>AI/ML SOFTWARE ENGINEER</span>
        <span>TORONTO, CANADA</span>
        <span>© 2026 MURHEJ HANTOUSH</span>
        <a className="back-to-top" href="#top" aria-label="Back to top">
          <ArrowUpRight size={16} />
        </a>
      </footer>
      <AnimatePresence>
        {activeProject && (
          <CaseStudy
            key={activeProject.id}
            project={activeProject}
            onClose={closeCaseStudy}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
