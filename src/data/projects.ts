export type VisualKind = 'nexora' | 'nova' | 'qubitx' | 'backdoor' | 'gearbox' | 'pond'

export type Project = {
  id: string
  index: string
  title: string
  kicker: string
  summary: string
  visual: VisualKind
  stack: string[]
  repo?: string // omitted when the repository is private
  repoNote?: string
  role?: string
  status: string
  problem: string
  built: string[]
  interesting: string[]
  explore: string
  honest: string
}

// Every claim here comes from the repository's README/docs/results. "honest" records what is NOT done.
export const projects: Project[] = [
  {
    id: 'nexora',
    index: '01',
    title: 'Nexora',
    kicker: 'AI mentor for DSA, competitive programming and system design',
    summary:
      'Builds a model of what you know from your real submissions, then tells you what to practise next, why, and how to get unstuck without handing over the answer.',
    visual: 'nexora',
    stack: ['FastAPI', 'Next.js', 'Postgres + pgvector', 'Redis', 'Docker', 'GitHub Actions'],
    repo: 'https://github.com/Jas-thinks/nexora',
    role: 'Solo project',
    status: 'In active development',
    problem:
      'Practice platforms show you a list of problems. They rarely tell you which pattern you are weak at, when you are about to forget one, or how to get a hint without spoiling the solution.',
    built: [
      'A mastery model (Bayesian knowledge tracing) over problem patterns, fed by real submission verdicts.',
      'Daily challenge picked from weak and due-for-revision patterns, with a disclosed holdout experiment against a rating-matched baseline.',
      'AI mentor with a hint ladder (never the full answer first), retrieval over first-party notes and an offline fallback when no model is configured.',
      'Coding studio and stress tester that runs C++/Python/Java/JS in network-less sandbox containers and finds the smallest input where a solution and a brute force disagree.',
      'System Design Lab: a written plan plus an architecture canvas, reviewed by a rule checker and the mentor.',
    ],
    interesting: [
      'Runs as a small fleet of stateless processes: 3 API replicas, 2 web replicas, a worker and an executor behind nginx, with CI/CD to GHCR images, a smoke test and automatic rollback.',
      'A sandbox bug found by testing: output flooding blocked container kill because the pipe was not drained. Fixed and covered by tests.',
      'The repository documents its own limits: which patterns cannot be measured yet, and which results are synthetic.',
    ],
    explore:
      'Start with docs/architecture/distributed-system.md, then the sandbox security tests in backend/tests.',
    honest:
      'Not yet deployed to a real VM, and no measured effect on learners yet. Hosted-LLM review quality is unverified: only a local model was tried.',
  },
  {
    id: 'nova',
    index: '02',
    title: 'NOVA',
    kicker: 'Two compilers, one native backend, one studio',
    summary:
      'A statically typed language compiled through an LR(1) parser, SSA analyses and an optimizer down to a VM and x86-64, plus a SQL compiler. Verified by differential fuzzing against independent oracles.',
    visual: 'nova',
    stack: ['C++17', 'x86-64', 'FastAPI', 'React', 'TypeScript', 'LSP'],
    repoNote: 'Private repository. Walkthrough on request.',
    status: 'CI green on GitHub Actions',
    problem:
      'Compilers are easy to get subtly wrong. I wanted to build the whole pipeline and prove each stage correct, not just make examples run.',
    built: [
      'Hand-written lexer and a canonical LR(1) parser generator (432 states, 0 conflicts) with panic-mode error recovery and "did you mean" diagnostics.',
      'Three-address IR, CFG, dominators, liveness, pruned SSA and seven optimization passes including interprocedural inlining.',
      'Stack bytecode VM with a time-travel debugger, and a native x86-64 backend with a linear-scan register allocator.',
      'NOVA-SQL: parser, binder with 3-valued NULL logic, rule-based optimizer (predicate pushdown, hash join, top-N) and a bytecode executor.',
      'A 20-page studio that visualises real compiler output: AST, IR, CFG, optimizer, debugger, native code.',
    ],
    interesting: [
      'Reference interpreter, VM, optimized VM and native code agree on 1000 random programs.',
      'The SQL engine agreed with SQLite on 4,910 random queries. The fuzzer found a real bug along the way.',
      'Measured: native fib(35) about 12× faster than CPython; inlining made a hot loop 2.2× faster. Register allocation gave no gain on the sieve and the README says so.',
    ],
    explore: 'The screenshot is the Optimization Lab. Each number in it is measured from a real run of the compiler.',
    honest: 'The repository is private, so there is no public link yet.',
  },
  {
    id: 'qubitx',
    index: '03',
    title: 'QubitX',
    kicker: 'A natural-language tutor for quantum computing',
    summary:
      'Build circuits visually, run them on three simulators, and talk to a tutor whose every NLP component has a dataset, a baseline, metrics and an ablation.',
    visual: 'qubitx',
    stack: ['PyTorch', 'Transformers', 'pgvector', 'FastAPI', 'React', 'Qiskit · PennyLane · Cirq'],
    repo: 'https://github.com/Jas-thinks/QubitX',
    role: 'Solo project',
    status: 'Evaluation report generated 16 Nov 2026',
    problem:
      'LLM tutors sound confident while being wrong. For a technical subject, answers need sources, claims need checking, and circuits need to actually run.',
    built: [
      'Cascade intent router (DistilBERT first, LLM only when unsure) and an entity tagger.',
      'Hybrid retrieval (dense + full-text, RRF) with a cross-encoder reranker and out-of-scope decline.',
      'NLI faithfulness check on every cited claim, and a fine-tuned text-to-circuit parser (T5 and Qwen + LoRA).',
      'Socratic hints with a leak guard, grounded quiz generation, and an in-app NLP Lab with a "Why this answer?" trace.',
    ],
    interesting: [
      'The evaluation report is generated by make eval and shows weak results too: the NLI check flagged 69% of tutor claims, and only 8 of 60 generated quiz questions survived filtering.',
      'On hand-written messages a lexicon baseline beat the DistilBERT entity tagger (F1 0.959 vs 0.888).',
    ],
    explore: 'eval/results/REPORT.md has every table. explanation.md walks through the repository end to end.',
    honest: 'Retrieval and intent numbers are on small, hand-built test sets. Treat them as an experiment log, not a benchmark.',
  },
  {
    id: 'backdoor',
    index: '04',
    title: 'Backdoors in Code Models',
    kicker: 'Poisoning a code-summarization model, and trying to catch it',
    summary:
      'B.Tech research project on adversarial backdoors in neural code models: injecting triggers, measuring attack success, and evaluating detectors.',
    visual: 'backdoor',
    stack: ['Python', 'PyTorch', 'CodeT5', 'UniXcoder', 'Streamlit'],
    repo: 'https://github.com/Jas-thinks/lstm-code-backdoor-detection',
    role: 'Team of three. Presented one of three workstreams.',
    status: 'Single-seed results, reported as such',
    problem:
      'If a code model is trained on poisoned data, a trigger in the input can make it emit an attacker-chosen output while it behaves normally otherwise. How easily can that be done, and can the poison be filtered out?',
    built: [
      'Reproduced the attack on CodeT5 across three poison budgets with identical test cases, seed and decoding.',
      'Extended the study to UniXcoder, a model outside the original paper: clean fine-tuning, a poisoned victim, and two detectors (spectral signature, and an OAS-shrinkage Mahalanobis detector).',
      'A Streamlit results viewer and an independent verifier that recomputes the headline metrics.',
    ],
    interesting: [
      'Attack success on CodeT5 rose from 65% to 98% as the poison budget went from 5% to 20%.',
      'Detection was much harder: the better detector recovered about 22% of triggered inputs at 6% false positives, and the spectral signature was close to chance (ROC AUC 0.49).',
    ],
    explore: 'results/README.md lists every recorded run, and docs/ holds the protocol and limitations.',
    honest:
      'Team project: the repository has contributions from three people. All results are single-seed on one test set. Detection did not work well, and that is the finding.',
  },
  {
    id: 'gearbox',
    index: '05',
    title: 'Gearbox',
    kicker: 'Peer-to-peer camera-gear rental, built as a distributed system',
    summary:
      'A rental marketplace where correctness under concurrency is the point: no double bookings, safe retries and reliable events.',
    visual: 'gearbox',
    stack: ['Next.js', 'TypeScript', 'Postgres', 'Redis', 'SQS', 'Terraform'],
    repo: 'https://github.com/Jas-thinks/gearbox',
    role: 'Solo project',
    status: 'AWS infrastructure defined in Terraform',
    problem: 'Two people booking the same camera for the same dates, or a client retry charging twice.',
    built: [
      'Postgres exclusion constraint on (equipment, daterange) so overlapping bookings are impossible at the database level.',
      'Idempotency keys claimed in Redis and enforced by a unique DB key.',
      'Transactional outbox with a SKIP LOCKED relay into SQS, with a dead-letter queue and alarm.',
      'Redis Lua rate limiter and cache-aside with single-flight.',
    ],
    interesting: ['The consistency guarantees live in the database, not in application code.'],
    explore: 'docs/ARCHITECTURE.md and the ADRs in docs/adr.',
    honest: 'Written to be AWS-ready. Redis and SQS fall back to in-memory locally.',
  },
  {
    id: 'pond',
    index: '06',
    title: 'AI Pond Intelligence',
    kicker: 'Geospatial decision support for village pond planning',
    summary:
      'Ranks candidate pond sites from terrain and hydrology: priority-flood sink filling, D8 flow, catchments, runoff, land exclusions and TOPSIS scoring.',
    visual: 'pond',
    stack: ['Python', 'FastAPI', 'Leaflet', 'OpenStreetMap', 'DEM / GeoTIFF'],
    repo: 'https://github.com/Jas-thinks/AI-POND-RECOMMENDATION',
    status: 'Preliminary planning tool',
    problem: 'Choosing where to dig a village pond means judging slope, drainage, catchment, land use and who can actually reach it.',
    built: [
      'Elevation from OpenTopography, or interpolated from uploaded KML contours (barycentric / IDW).',
      'Priority-flood, D8 flow direction, flow accumulation and reverse-BFS catchment delineation.',
      'OpenStreetMap exclusions plus beneficiary proximity, with five factors combined by TOPSIS and a spatially diversified top-N.',
    ],
    interesting: ['A missing factor is dropped and the weights renormalised, never replaced by a made-up default.'],
    explore: 'The README walks the analysis workflow stage by stage.',
    honest:
      'No soil data. Ground-truth validation script exists but its coordinate list is still empty, so ranking accuracy is unvalidated. Field survey required.',
  },
]

export type ArchiveItem = {
  title: string
  kind: string
  note: string
  stack: string[]
  repo: string
  team?: boolean
}

// Everything else on the GitHub profile. Notes are taken from each repository's README or source.
export const archive: ArchiveItem[] = [
  {
    title: 'VesselWatch',
    kind: 'Oil spill detection · B.Tech project',
    note: 'Live AIS vessel anomaly detection (Transformer contrastive encoder + FAISS) that triggers Sentinel-1 SAR validation with YOLOv8 through Airflow.',
    stack: ['Kafka', 'Airflow', 'PyTorch', 'YOLOv8', 'FastAPI', 'Next.js'],
    repo: 'https://github.com/Jas-thinks/oil-spill-detection',
    team: true,
  },
  {
    title: 'OpenCS Labs',
    kind: 'Teaching platform · team project',
    note: 'Isolated, persistent Jupyter notebooks for teaching data science. My part: multi-node deployment, local spawner, notebook state, autosave and grading.',
    stack: ['FastAPI', 'React', 'JupyterHub', 'KubeSpawner'],
    repo: 'https://github.com/Jas-thinks/opencs-labs',
    team: true,
  },
  {
    title: 'Interview Prep Platform',
    kind: 'Full-stack web app',
    note: 'Judged multi-language code workspace with hidden tests, SM-2 spaced repetition, XP leaderboard, 4,375-question bank and a DSA visualizer.',
    stack: ['React 19', 'Express', 'MongoDB', 'Judge0', 'Monaco'],
    repo: 'https://github.com/Jas-thinks/interview-prep-platform',
  },
  {
    title: 'Global Migration Networks',
    kind: 'Network science · coursework',
    note: 'Countries as nodes, migrant stocks as weighted edges across 8 snapshots (1990–2024): centrality, community detection and regression.',
    stack: ['Python', 'NetworkX', 'scikit-learn', 'Power BI'],
    repo: 'https://github.com/Jas-thinks/Network-Science58',
  },
  {
    title: 'Proximity Search API',
    kind: 'CS559 lab · systems design',
    note: 'Radius-based eligibility, category filtering and BFS road-distance ranking behind a FastAPI service.',
    stack: ['Python', 'FastAPI', 'BFS'],
    repo: 'https://github.com/Jas-thinks/SYSTEM_DESIGN-PROXIMITY-API',
  },
  {
    title: 'Encrypted Group Chat',
    kind: 'Real-time app',
    note: 'Real-time group chat over WebSockets with messages encrypted with Fernet and stored in SQLite.',
    stack: ['Flask-SocketIO', 'SQLite', 'Fernet', 'JavaScript'],
    repo: 'https://github.com/Jas-thinks/CHAT-Application',
  },
  {
    title: 'Interview Question Bank',
    kind: 'Dataset + web app',
    note: 'Interview questions across OS, DBMS, SQL, system design, ML, DL and GenAI as structured JSON, with a small prep web app.',
    stack: ['JavaScript', 'JSON'],
    repo: 'https://github.com/Jas-thinks/STT_END_SEMESTER_PROJECT',
  },
  {
    title: 'Bunty Ki Tapree',
    kind: 'Website · local business',
    note: 'Website for a local chai stall: menu, daily deals, community updates and an admin login. Next.js, deployed on Vercel.',
    stack: ['Next.js', 'TypeScript'],
    repo: 'https://github.com/Jas-thinks/BKT',
  },
  {
    title: 'Outlast Media',
    kind: 'Website · creative agency',
    note: 'Marketing site for a creative media agency, built as a React single-page app with Vite and configured for Vercel/Netlify.',
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/Jas-thinks/Outlast-Media',
  },
]
