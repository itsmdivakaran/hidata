'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

type Era = {
  id: string;
  label: string;
  period: string;
  icon: string;
  color: string;
  bg: string;
};

type TimelineEvent = {
  id: string;
  year: number;
  displayYear: string;
  era: string;
  event: string;
  description: string;
  details: string;
  impact: 'Foundational' | 'Major' | 'Significant' | 'Revolutionary';
  icon: string;
  tags: string[];
};

const DATA_ERAS: Era[] = [
  { id: 'ancient', label: 'Ancient World', period: '3000 BC – 500 AD', icon: '🏛️', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { id: 'predigital', label: 'Pre-Digital', period: '1600 – 1939', icon: '⚙️', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  { id: 'computing', label: 'Dawn of Computing', period: '1940 – 1969', icon: '💻', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
  { id: 'databases', label: 'Database Era', period: '1970 – 1999', icon: '🗄️', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  { id: 'bigdata', label: 'Big Data Era', period: '2000 – 2015', icon: '📊', color: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  { id: 'modern', label: 'Modern Data', period: '2016 – Present', icon: '🚀', color: '#22d3ee', bg: 'rgba(34,211,238,0.08)' },
];

const AI_ERAS: Era[] = [
  { id: 'ancient', label: 'Ancient Logic', period: '400 BC – 1800', icon: '🧩', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
  { id: 'stats', label: 'Statistical Roots', period: '1800 – 1942', icon: '📐', color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
  { id: 'dawn', label: 'Dawn of AI', period: '1943 – 1969', icon: '🌅', color: '#818cf8', bg: 'rgba(129,140,248,0.08)' },
  { id: 'winters', label: 'AI Winters', period: '1970 – 1994', icon: '❄️', color: '#67e8f9', bg: 'rgba(103,232,249,0.08)' },
  { id: 'mlboom', label: 'ML Renaissance', period: '1995 – 2012', icon: '🌱', color: '#4ade80', bg: 'rgba(74,222,128,0.08)' },
  { id: 'deep', label: 'Deep Learning', period: '2013 – 2017', icon: '🔮', color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  { id: 'transformer', label: 'Transformer Age', period: '2018 – Present', icon: '⚡', color: '#f43f5e', bg: 'rgba(244,63,94,0.08)' },
];

const DATA_EVENTS: TimelineEvent[] = [
  // Ancient
  { id: 'd1', year: -3000, displayYear: '3000 BC', era: 'ancient', event: 'Babylonian Cuneiform Tablets', description: 'First systematic data recording on clay tablets in Mesopotamia — tax records, trade data, and astronomical observations.', details: 'The Sumerians of ancient Mesopotamia developed cuneiform writing, creating the world\'s first systematic data storage. Clay tablets recorded numerical data for agricultural yields, trade transactions, and tax records — the original database. Over 400,000 such tablets have been discovered, storing data about economic activity going back 5,000 years.', impact: 'Foundational', icon: '📜', tags: ['storage', 'ancient', 'writing'] },
  { id: 'd2', year: -2600, displayYear: '2600 BC', era: 'ancient', event: 'Abacus — First Calculation Tool', description: 'The abacus emerges in Mesopotamia and China as the first mechanical calculation instrument.', details: 'The abacus (from Babylonian "abaku" meaning dust/sand) was the world\'s first mechanical computation tool. It enabled fast arithmetic for trade and taxation. Used across Mesopotamia, Egypt, Greece, Rome, and China, it remained the most advanced computational device for nearly 4,000 years.', impact: 'Foundational', icon: '🧮', tags: ['computation', 'tools', 'ancient'] },
  { id: 'd3', year: -300, displayYear: '300 BC', era: 'ancient', event: 'Library of Alexandria', description: 'The ancient world\'s greatest data repository — storing knowledge from across the known world.', details: 'Founded by Ptolemy I Soter, the Library of Alexandria contained between 400,000 and 700,000 scrolls. It was humanity\'s first serious attempt at a universal repository of knowledge — an analog to a modern data warehouse. Scholars like Euclid, Archimedes, and Eratosthenes used its vast datasets for groundbreaking research.', impact: 'Major', icon: '🏛️', tags: ['storage', 'library', 'knowledge'] },
  { id: 'd4', year: -100, displayYear: '100 BC', era: 'ancient', event: 'Antikythera Mechanism', description: 'The world\'s first analog computer, tracking astronomical positions with extraordinary precision.', details: 'Discovered in a shipwreck off the Greek island of Antikythera, this bronze device from ~100 BC could predict solar eclipses, track lunar phases, and calculate the positions of planets. It had at least 37 interlocking gears and could compute complex astronomical data — a remarkable proto-computer 2,000 years before modern computing.', impact: 'Revolutionary', icon: '⚙️', tags: ['computation', 'astronomy', 'mechanical'] },
  // Pre-Digital
  { id: 'd5', year: 1614, displayYear: '1614', era: 'predigital', event: 'Logarithms Invented', description: 'John Napier\'s logarithms revolutionize calculation, enabling complex astronomical and navigation data processing.', details: 'John Napier published "Mirifici Logarithmorum Canonis Descriptio," introducing logarithms that reduced multiplication and division to addition and subtraction. This dramatically sped up complex calculations — a crucial tool for astronomers, navigators, and engineers. It was the 17th century equivalent of a computational speedup.', impact: 'Major', icon: '📐', tags: ['mathematics', 'calculation'] },
  { id: 'd6', year: 1642, displayYear: '1642', era: 'predigital', event: 'Pascal\'s Mechanical Calculator', description: 'Blaise Pascal builds the Pascaline — the first mechanical calculator that can add and subtract automatically.', details: 'At age 18, Blaise Pascal built the Pascaline to help his father calculate taxes. It was the first mechanical device that could perform carries automatically. Though expensive and fragile, it demonstrated that arithmetic could be mechanized — a conceptual breakthrough that would inspire all future computing.', impact: 'Significant', icon: '🔢', tags: ['mechanical', 'calculator', 'automation'] },
  { id: 'd7', year: 1801, displayYear: '1801', era: 'predigital', event: 'Jacquard Loom — Punch Cards', description: 'Joseph Marie Jacquard\'s loom uses punched cards to control weaving patterns — the first programmable machine.', details: 'The Jacquard loom used punched cards (holes = thread raised, no holes = thread down) to automatically control complex weaving patterns. This was the first instance of stored machine instructions. Charles Babbage and Ada Lovelace would directly reference this invention when designing the Analytical Engine. IBM punch cards descended directly from this concept.', impact: 'Revolutionary', icon: '🃏', tags: ['punch cards', 'programmable', 'automation'] },
  { id: 'd8', year: 1854, displayYear: '1854', era: 'predigital', event: 'Boolean Algebra', description: 'George Boole\'s "Laws of Thought" lays the mathematical foundation for all digital computation.', details: 'George Boole published "An Investigation of the Laws of Thought," introducing Boolean algebra — a system where all logic could be expressed with TRUE/FALSE (1/0). Claude Shannon would later prove in 1937 that Boolean algebra could be implemented with electrical circuits, directly enabling all modern computing and data storage.', impact: 'Foundational', icon: '⊕', tags: ['mathematics', 'logic', 'foundation'] },
  { id: 'd9', year: 1880, displayYear: '1880', era: 'predigital', event: 'Hollerith Punch Card System', description: 'Herman Hollerith invents electromechanical tabulation for the US Census — birth of the data processing industry.', details: 'Herman Hollerith created the tabulating machine that processed the 1890 US Census in 2 years instead of the projected 10 years for a manual count. His Tabulating Machine Company would become IBM in 1924. This is arguably the moment when "big data" became an industrial necessity and data processing became a business.', impact: 'Revolutionary', icon: '🗂️', tags: ['census', 'tabulation', 'IBM'] },
  { id: 'd10', year: 1936, displayYear: '1936', era: 'predigital', event: 'Turing Machine Concept', description: 'Alan Turing\'s mathematical model defines what computation means — the theoretical foundation of all computers.', details: 'In "On Computable Numbers," Alan Turing described an abstract machine that could simulate any mathematical process. The Turing Machine concept proved what is and isn\'t computable, set limits on computation (halting problem), and provided the theoretical blueprint for all modern computers. Every CPU you use today is essentially a physical Turing machine.', impact: 'Foundational', icon: '∞', tags: ['theory', 'computability', 'Turing'] },
  // Computing Era
  { id: 'd11', year: 1945, displayYear: '1945', era: 'computing', event: 'ENIAC — First Electronic Computer', description: 'The Electronic Numerical Integrator and Computer fills a room and performs 5,000 additions per second.', details: 'ENIAC at the University of Pennsylvania was the first general-purpose electronic digital computer. Weighing 30 tons, using 18,000 vacuum tubes, it could perform 5,000 additions per second. Programmed by women (the "ENIAC Programmers"), it computed artillery trajectories. This machine began the transformation from mechanical to electronic data processing.', impact: 'Revolutionary', icon: '🖥️', tags: ['hardware', 'electronic', 'computing'] },
  { id: 'd12', year: 1947, displayYear: '1947', era: 'computing', event: 'Transistor Invented at Bell Labs', description: 'Bardeen, Brattain, and Shockley invent the transistor — enabling miniaturization of all computing.', details: 'The transistor (from "transfer resistor") replaced the bulky vacuum tube. This invention enabled the exponential miniaturization of electronics that would eventually pack billions of transistors on a chip the size of a fingernail. The transistor is arguably the most important invention of the 20th century for computing and data technology.', impact: 'Foundational', icon: '⚡', tags: ['hardware', 'transistor', 'Bell Labs'] },
  { id: 'd13', year: 1956, displayYear: '1956', era: 'computing', event: 'IBM 350 — First Commercial Hard Drive', description: 'IBM ships the first hard disk drive with 5MB capacity the size of a refrigerator.', details: 'The IBM 350 Disk Storage Unit was the first magnetic hard disk drive. It stored 5MB on 50 24-inch disks, weighed over a ton, and leased for $3,200/month. Despite its modest capacity, it introduced random-access data storage — a revolutionary departure from sequential tape storage. It established the paradigm of magnetic disk storage that persists today.', impact: 'Revolutionary', icon: '💾', tags: ['storage', 'hardware', 'IBM'] },
  { id: 'd14', year: 1960, displayYear: '1960', era: 'computing', event: 'COBOL — Data Processing Language', description: 'COBOL becomes the language of business data processing, still running critical systems today.', details: 'COBOL (Common Business-Oriented Language), championed by Grace Hopper, was designed for business data processing. Its English-like syntax made it accessible to non-mathematicians. By 1970, more COBOL code existed than any other language. Remarkably, $3 trillion in daily commerce still runs on COBOL, making it history\'s most economically impactful programming language.', impact: 'Major', icon: '💬', tags: ['programming', 'business', 'Grace Hopper'] },
  { id: 'd15', year: 1969, displayYear: '1969', era: 'computing', event: 'ARPANET — The Internet is Born', description: 'The first message transmitted over ARPANET: "LO" (login crashed after two letters). The internet began.', details: 'ARPANET (Advanced Research Projects Agency Network) connected UCLA, Stanford, UC Santa Barbara, and University of Utah. The first transmission "LO" (intended to be "LOGIN" but crashed) became the first data transmitted over a computer network. This packet-switching network would evolve into the internet, the world\'s largest distributed data system.', impact: 'Revolutionary', icon: '🌐', tags: ['internet', 'network', 'ARPANET'] },
  // Database Era
  { id: 'd16', year: 1970, displayYear: '1970', era: 'databases', event: 'Relational Database Model (Codd)', description: 'Edgar F. Codd\'s paper "A Relational Model of Data" transforms how all structured data is stored.', details: 'IBM researcher Edgar Codd published "A Relational Model of Data for Large Shared Data Banks," proposing that data should be stored in tables with relationships between them. This mathematical model, based on set theory and predicate logic, became the foundation of all relational databases (MySQL, PostgreSQL, Oracle, SQL Server). It unified data management theory.', impact: 'Foundational', icon: '🗄️', tags: ['database', 'relational', 'Codd'] },
  { id: 'd17', year: 1974, displayYear: '1974', era: 'databases', event: 'SQL Language Created', description: 'IBM develops SEQUEL (later SQL) — the universal language for querying structured data, still dominant 50 years later.', details: 'Donald Chamberlin and Raymond Boyce at IBM created SEQUEL (Structured English Query Language) based on Codd\'s relational model. Renamed SQL, it became the universal language for relational databases. Despite 50 years of innovation, SQL remains the lingua franca of data — more data is queried with SQL each day than any other language in history.', impact: 'Foundational', icon: '🔍', tags: ['SQL', 'query', 'language'] },
  { id: 'd18', year: 1979, displayYear: '1979', era: 'databases', event: 'Oracle — First Commercial RDBMS', description: 'Larry Ellison launches Oracle, the first commercially available relational database management system.', details: 'Inspired by Codd\'s 1970 paper and IBM\'s System R research, Larry Ellison, Bob Miner, and Ed Oates founded Oracle. It became the first commercially available RDBMS, pioneering the enterprise database market. Oracle would grow into a $50B+ company and its database remains the gold standard for enterprise transactional data.', impact: 'Major', icon: '🏢', tags: ['Oracle', 'enterprise', 'RDBMS'] },
  { id: 'd19', year: 1989, displayYear: '1989', era: 'databases', event: 'World Wide Web Invented', description: 'Tim Berners-Lee proposes the WWW at CERN — transforming information access and creating the data explosion.', details: 'Tim Berners-Lee\'s proposal "Information Management: A Proposal" at CERN introduced hypertext linked documents on the internet. The web democratized information access and, within a decade, generated more data than all previous human history combined. It fundamentally changed data\'s role from internal business asset to global public resource.', impact: 'Revolutionary', icon: '🕸️', tags: ['web', 'internet', 'Berners-Lee'] },
  { id: 'd20', year: 1991, displayYear: '1991', era: 'databases', event: 'Linux Kernel Released', description: 'Linus Torvalds releases Linux — which would become the operating system powering 96% of all cloud data infrastructure.', details: 'Linus Torvalds released Linux 0.01 with the famous "just a hobby" message. Three decades later, Linux runs 96.3% of the world\'s top 1 million web servers, 100% of the top 500 supercomputers, and nearly all cloud data infrastructure (AWS, Azure, Google Cloud). The open-source movement it spawned gave us MySQL, PostgreSQL, Hadoop, Spark, and virtually every major data tool.', impact: 'Revolutionary', icon: '🐧', tags: ['Linux', 'open source', 'infrastructure'] },
  // Big Data
  { id: 'd21', year: 2003, displayYear: '2003', era: 'bigdata', event: 'Google GFS & MapReduce Papers', description: 'Google publishes its file system and MapReduce papers — triggering the open-source big data movement.', details: 'Google published the Google File System (2003) and MapReduce (2004) papers, revealing the distributed computing architecture behind its search engine. These papers directly inspired Doug Cutting to create Hadoop, which democratized big data processing. Google\'s academic openness accidentally triggered a revolution: suddenly any organization could process petabytes of data.', impact: 'Revolutionary', icon: '🔎', tags: ['Google', 'distributed', 'papers'] },
  { id: 'd22', year: 2004, displayYear: '2004', era: 'bigdata', event: 'Facebook & Social Data Explosion', description: 'Facebook\'s launch begins the era of unstructured social data at unprecedented scale.', details: 'Facebook\'s 2004 launch began generating unprecedented volumes of unstructured human-generated data: text, photos, social graphs, behavioral data. By 2012, Facebook processed 2.5 billion content items and 500+ terabytes daily. Social media collectively transformed data from structured business records to messy, rich, behavioral human data — requiring entirely new approaches.', impact: 'Major', icon: '📱', tags: ['social media', 'unstructured', 'scale'] },
  { id: 'd23', year: 2006, displayYear: '2006', era: 'bigdata', event: 'Hadoop Open-Sourced', description: 'Apache Hadoop democratizes big data processing — any organization can now process petabytes.', details: 'Doug Cutting and Mike Cafarella created Hadoop (named after Doug\'s son\'s toy elephant) based on Google\'s MapReduce paper. Apache Hadoop enabled horizontal scaling across commodity hardware, making big data processing accessible. Yahoo!, Facebook, Twitter, and thousands of companies adopted it. Hadoop effectively launched the commercial big data industry.', impact: 'Revolutionary', icon: '🐘', tags: ['Hadoop', 'open source', 'MapReduce'] },
  { id: 'd24', year: 2007, displayYear: '2007', era: 'bigdata', event: 'iPhone — Mobile Data Revolution', description: 'Apple\'s iPhone triggers an explosion of mobile-generated data, GPS signals, and app behavioral data.', details: 'The iPhone\'s 2007 launch put a sensor-laden computer in every pocket. GPS, accelerometers, cameras, and constant connectivity generated continuous behavioral data. By 2023, 6.8 billion smartphones generate 2.5 quintillion bytes of data daily. The mobile revolution shifted data from server-side transactions to continuous, ambient, human-generated streams.', impact: 'Major', icon: '📲', tags: ['mobile', 'IoT', 'behavioral data'] },
  { id: 'd25', year: 2009, displayYear: '2009', era: 'bigdata', event: 'MongoDB & the NoSQL Movement', description: 'MongoDB sparks the NoSQL revolution — enabling flexible document storage for unstructured web data.', details: 'MongoDB\'s release challenged the 40-year dominance of relational databases for certain use cases. NoSQL databases (MongoDB, Cassandra, Redis, CouchDB) offered flexible schemas, horizontal scaling, and document/key-value storage ideal for web applications. This "polyglot persistence" movement recognized that different data problems need different data solutions.', impact: 'Significant', icon: '🍃', tags: ['NoSQL', 'MongoDB', 'documents'] },
  { id: 'd26', year: 2013, displayYear: '2013', era: 'bigdata', event: 'Apache Spark Replaces MapReduce', description: 'Apache Spark processes data 100x faster than Hadoop MapReduce using in-memory computation.', details: 'Matei Zaharia\'s Spark project at UC Berkeley achieved 100x performance over Hadoop MapReduce for iterative algorithms by keeping data in memory rather than writing to disk. Spark unified batch processing, streaming, SQL, ML, and graph processing in one engine. It became the dominant big data processing framework and enabled practical machine learning on massive datasets.', impact: 'Major', icon: '⚡', tags: ['Spark', 'in-memory', 'streaming'] },
  // Modern Data
  { id: 'd27', year: 2016, displayYear: '2016', era: 'modern', event: 'Modern Data Stack Emerges', description: 'Cloud-native data tools (Snowflake, dbt, Fivetran) redefine how data teams build pipelines.', details: 'The "Modern Data Stack" emerged around Snowflake\'s cloud data warehouse, dbt (data build tool), Fivetran for ELT, and Looker for BI. This composable, cloud-native approach separated storage from compute, enabled SQL-first transformations, and dramatically lowered the barrier to enterprise analytics. Data engineering transformed from infrastructure work to software engineering.', impact: 'Major', icon: '☁️', tags: ['cloud', 'Snowflake', 'dbt'] },
  { id: 'd28', year: 2019, displayYear: '2019', era: 'modern', event: 'Delta Lake & Data Lakehouse', description: 'Databricks introduces Delta Lake, merging data lake flexibility with data warehouse reliability.', details: 'Databricks released Delta Lake (open-source) to bring ACID transactions, schema enforcement, and time travel to data lakes. This enabled the "lakehouse" architecture — combining the low cost and flexibility of data lakes with the reliability and performance of data warehouses. Azure, AWS, and Google Cloud all built equivalent solutions within two years.', impact: 'Major', icon: '🏞️', tags: ['lakehouse', 'Delta Lake', 'ACID'] },
  { id: 'd29', year: 2021, displayYear: '2021', era: 'modern', event: 'Data Mesh Architecture', description: 'Zhamak Dehghani\'s Data Mesh decentralizes data ownership across domains, treating data as a product.', details: 'Zhamak Dehghani popularized Data Mesh — a sociotechnical approach to data management that distributes data ownership to domain teams rather than centralizing in a data platform team. Each domain owns, maintains, and serves their data as a "product." Major companies like Zalando, Netflix, and Goldman Sachs adopted data mesh to scale their data organizations.', impact: 'Significant', icon: '🕸️', tags: ['architecture', 'data mesh', 'decentralized'] },
  { id: 'd30', year: 2023, displayYear: '2023', era: 'modern', event: 'Data + AI Convergence', description: 'Databricks, Snowflake, and cloud platforms merge data engineering with AI/ML workloads into unified platforms.', details: 'The convergence of data platforms and AI accelerated dramatically. Databricks acquired MosaicML and launched DBRX. Snowflake launched Cortex AI. Every major data platform became an AI platform. The separation between "data engineering" and "AI engineering" dissolved, with data lakehouses becoming the substrate for training and serving AI models.', impact: 'Revolutionary', icon: '🤝', tags: ['AI', 'convergence', 'platform'] },
  { id: 'd31', year: 2025, displayYear: '2025', era: 'modern', event: 'Real-Time AI Data Pipelines', description: 'Streaming data infrastructure enables sub-second AI model updates and real-time personalization at global scale.', details: 'The modern data stack has evolved to support real-time AI inference. Tools like Flink, Kafka, and emerging vector database platforms (Pinecone, Weaviate, Qdrant) enable continuous model fine-tuning, real-time feature stores, and sub-second retrieval for RAG systems. The line between data pipeline and AI inference pipeline has essentially disappeared.', impact: 'Major', icon: '🌊', tags: ['streaming', 'real-time', 'vector databases'] },
];

const AI_EVENTS: TimelineEvent[] = [
  // Ancient Logic
  { id: 'a1', year: -350, displayYear: '350 BC', era: 'ancient', event: 'Aristotle\'s Formal Logic', description: 'Aristotle formalizes deductive reasoning with syllogisms — the intellectual foundation of all AI.', details: 'Aristotle\'s "Organon" introduced formal logic and syllogistic reasoning: if all A are B, and all B are C, then all A are C. This systematic approach to inference from premises to conclusions is the direct ancestor of rule-based AI systems, expert systems, and modern theorem provers. Aristotle\'s logic shaped Western philosophy for 2,000 years and directly inspired early AI researchers.', impact: 'Foundational', icon: '🧩', tags: ['logic', 'philosophy', 'reasoning'] },
  { id: 'a2', year: 820, displayYear: '820 AD', era: 'ancient', event: 'Al-Khwarizmi\'s Algorithms', description: 'Muhammad ibn Musa al-Khwarizmi writes the first systematic procedures for computation — giving us the word "algorithm."', details: 'Al-Khwarizmi\'s "Kitab al-mukhtasar fi hisab al-jabr wal-muqabala" (The Compendious Book on Calculation by Completion and Balancing) introduced systematic step-by-step procedures for solving mathematical problems. "Algorithm" derives from the Latinization of his name. His work defined what a computational procedure is, making him the intellectual ancestor of all programmers.', impact: 'Foundational', icon: '📖', tags: ['algorithm', 'mathematics', 'computation'] },
  { id: 'a3', year: 1206, displayYear: '1206 AD', era: 'ancient', event: 'Al-Jazari\'s Programmable Automata', description: 'Al-Jazari creates programmable musical robots — the first documented programmable machines.', details: 'Ismail al-Jazari\'s "Book of Knowledge of Ingenious Mechanical Devices" described a programmable musical robot band powered by a drum machine with pegs that could be repositioned to play different rhythms. This is arguably the first documented programmable machine — a direct conceptual ancestor of the music box, player piano, Jacquard loom, and ultimately the stored-program computer.', impact: 'Significant', icon: '🤖', tags: ['automata', 'programmable', 'robots'] },
  { id: 'a4', year: 1763, displayYear: '1763', era: 'ancient', event: 'Bayes\' Theorem', description: 'Thomas Bayes\' posthumous paper introduces conditional probability — the foundation of probabilistic AI.', details: 'Thomas Bayes\' posthumous paper, published by Richard Price, described how to update beliefs based on evidence. Bayes\' Theorem: P(A|B) = P(B|A)×P(A)/P(B). This framework for reasoning under uncertainty underpins Naive Bayes classifiers, Bayesian networks, probabilistic graphical models, and is fundamental to modern ML. Every time a spam filter or medical diagnosis AI updates its beliefs, it\'s doing Bayesian reasoning.', impact: 'Foundational', icon: '📊', tags: ['probability', 'Bayesian', 'statistics'] },
  // Statistical Foundations
  { id: 'a5', year: 1805, displayYear: '1805', era: 'stats', event: 'Least Squares Method (Gauss/Legendre)', description: 'Gauss and Legendre independently discover least squares — the mathematical heart of regression and optimization.', details: 'Legendre (1805) and Gauss (1809) independently developed the method of least squares for fitting lines to data points. This optimization technique — minimizing the sum of squared errors — is the foundation of linear regression, logistic regression, gradient descent, and virtually all modern ML training algorithms. It\'s the mathematical primitive underneath billions of parameter updates happening daily.', impact: 'Foundational', icon: '📈', tags: ['regression', 'optimization', 'statistics'] },
  { id: 'a6', year: 1855, displayYear: '1855', era: 'stats', event: 'Florence Nightingale — Data Visualization', description: 'Florence Nightingale\'s "rose diagrams" demonstrate that data visualization can change policy and save lives.', details: 'Florence Nightingale used statistical graphics (polar area diagrams, rose charts) to convince the British Army that more soldiers died from preventable diseases than from battle wounds during the Crimean War. Her work pioneered the use of data visualization for persuasion and decision-making. She proved that data, properly visualized, has the power to change minds and policies — an insight that drives modern data science.', impact: 'Significant', icon: '🌹', tags: ['visualization', 'statistics', 'public health'] },
  { id: 'a7', year: 1901, displayYear: '1901', era: 'stats', event: 'Principal Component Analysis (PCA)', description: 'Karl Pearson invents PCA — still one of the most used dimensionality reduction techniques in ML.', details: 'Karl Pearson\'s 1901 paper introduced PCA as a technique for finding the "lines of closest fit" to data points in multi-dimensional space. PCA reduces high-dimensional data to its most important dimensions by finding principal components that explain maximum variance. Over 120 years later, PCA remains a foundational tool in data science, feature engineering, and understanding model representations.', impact: 'Major', icon: '🎯', tags: ['PCA', 'dimensionality reduction', 'statistics'] },
  { id: 'a8', year: 1913, displayYear: '1913', era: 'stats', event: 'Markov Chains', description: 'Andrei Markov\'s probabilistic sequence model underpins language models, reinforcement learning, and speech recognition.', details: 'Andrei Markov developed the concept of stochastic processes where the next state depends only on the current state ("memoryless" property). Markov chains are the mathematical foundation of Google\'s original PageRank algorithm, Hidden Markov Models (the core of speech recognition for 40 years), reinforcement learning, and — in a generalized sense — the foundation of modern language models.', impact: 'Foundational', icon: '🔗', tags: ['probability', 'sequences', 'language models'] },
  // Dawn of AI
  { id: 'a9', year: 1943, displayYear: '1943', era: 'dawn', event: 'First Neural Network (McCulloch-Pitts)', description: 'McCulloch and Pitts create a mathematical model of the neuron — birth of neural network theory.', details: 'Warren McCulloch and Walter Pitts published "A Logical Calculus of Ideas Immanent in Nervous Activity," proposing that neurons could be modeled as simple binary threshold units. They showed these artificial neurons could implement Boolean logic. This paper directly inspired Rosenblatt\'s Perceptron, which inspired deep learning, which became the foundation of modern AI. The 1943 paper started it all.', impact: 'Foundational', icon: '🧠', tags: ['neural networks', 'neurons', 'model'] },
  { id: 'a10', year: 1948, displayYear: '1948', era: 'dawn', event: 'Shannon\'s Information Theory', description: 'Claude Shannon\'s "A Mathematical Theory of Communication" defines information mathematically — the backbone of all digital AI.', details: 'Claude Shannon quantified information with entropy (H = -Σ p log p), defined the "bit," and proved theorems about information transmission capacity. Information theory underlies data compression, error correction, maximum entropy models, and — crucially — cross-entropy loss, which is the most widely used training objective for language models and classifiers. Every GPT model is optimized using Shannon\'s framework.', impact: 'Foundational', icon: '📡', tags: ['information theory', 'entropy', 'Shannon'] },
  { id: 'a11', year: 1950, displayYear: '1950', era: 'dawn', event: 'Turing Test Proposed', description: 'Alan Turing asks "Can machines think?" in "Computing Machinery and Intelligence" — defining the AI challenge.', details: 'Alan Turing\'s landmark paper proposed the Imitation Game (Turing Test): if a machine\'s responses are indistinguishable from a human\'s, it can be considered intelligent. Turing predicted that by 2000, machines would have a 30% chance of fooling interrogators. This paper framed AI\'s core challenge for decades. With GPT-4 and Claude, we\'ve arguably reached — and arguably exceeded — Turing\'s threshold.', impact: 'Foundational', icon: '❓', tags: ['Turing Test', 'intelligence', 'definition'] },
  { id: 'a12', year: 1952, displayYear: '1952', era: 'dawn', event: 'First Machine Learning Program', description: 'Arthur Samuel\'s checkers program learns from experience — coining the term "machine learning."', details: 'IBM researcher Arthur Samuel created a checkers-playing program that improved through self-play — he called this "machine learning," the first use of the term. The program used a form of what we now call reinforcement learning to develop an evaluation function from experience. Samuel\'s insight that machines could learn rather than just execute rules changed the entire direction of AI research.', impact: 'Major', icon: '♟️', tags: ['machine learning', 'reinforcement learning', 'Samuel'] },
  { id: 'a13', year: 1956, displayYear: '1956', era: 'dawn', event: 'Dartmouth Conference — AI is Born', description: 'John McCarthy coins "Artificial Intelligence" at the Dartmouth Summer Research Project — AI officially begins.', details: 'McCarthy, Minsky, Shannon, and others gathered at Dartmouth College for a 6-week workshop, officially founding AI as an academic discipline. McCarthy proposed that "every aspect of learning or intelligence can in principle be so precisely described that a machine can be made to simulate it." The field exploded with optimistic predictions — some premature, but directionally correct by 70 years later.', impact: 'Foundational', icon: '🎓', tags: ['Dartmouth', 'founding', 'McCarthy'] },
  { id: 'a14', year: 1957, displayYear: '1957', era: 'dawn', event: 'Perceptron Invented', description: 'Frank Rosenblatt\'s perceptron at Cornell is the first trainable single-layer neural network.', details: 'Frank Rosenblatt\'s Perceptron, implemented on IBM 704, was the first algorithm that could learn from examples by adjusting weights. The New York Times (1958) reported it would "be able to walk, talk, see, write, reproduce itself." Though Minsky and Papert\'s 1969 "Perceptrons" book showed its limitations, the perceptron became the building block of deep learning six decades later.', impact: 'Major', icon: '🔵', tags: ['perceptron', 'neural networks', 'Rosenblatt'] },
  { id: 'a15', year: 1966, displayYear: '1966', era: 'dawn', event: 'ELIZA — First Chatbot', description: 'Joseph Weizenbaum\'s ELIZA at MIT simulates a therapist and shocks people into believing it understands them.', details: 'ELIZA (named after Eliza Doolittle in Pygmalion) used pattern matching and scripted responses to simulate a Rogerian therapist. Weizenbaum was disturbed by how readily people anthropomorphized the program and believed it genuinely understood them. The "ELIZA Effect" — humans attributing understanding to programs — is arguably more relevant now than ever with modern LLMs. ChatGPT is ELIZA\'s heir.', impact: 'Significant', icon: '💬', tags: ['chatbot', 'NLP', 'ELIZA effect'] },
  // AI Winters
  { id: 'a16', year: 1970, displayYear: '1970', era: 'winters', event: 'First AI Winter Begins', description: 'The Lighthill Report and funding cuts plunge AI into its first major decline after overpromised results.', details: 'The British Science Research Council\'s 1973 Lighthill Report criticized AI progress and recommended curtailing funding. US DARPA cut AI funding. The combination of unfulfilled promises (machine translation, general problem solving) with the exponential cost of scaling early AI led to the first AI Winter. This cycle of hype and winter would repeat, teaching the AI community hard lessons about managing expectations.', impact: 'Major', icon: '❄️', tags: ['AI Winter', 'funding', 'setback'] },
  { id: 'a17', year: 1974, displayYear: '1974', era: 'winters', event: 'Backpropagation Concept', description: 'Paul Werbos\'s PhD thesis introduces backpropagation — the algorithm that would eventually power all deep learning.', details: 'Paul Werbos\'s 1974 Harvard PhD thesis first described backpropagation (back-propagation of errors) for training multilayer neural networks. The algorithm was largely ignored due to the AI Winter. Rumelhart, Hinton, and Williams would independently rediscover and popularize it in 1986, making deep learning possible. It took 12 years for the most important ML algorithm of the 20th century to get recognition.', impact: 'Foundational', icon: '↩️', tags: ['backpropagation', 'gradient descent', 'training'] },
  { id: 'a18', year: 1980, displayYear: '1980', era: 'winters', event: 'Expert Systems Boom', description: 'Rule-based expert systems like MYCIN and R1 create a brief AI renaissance — until they couldn\'t scale.', details: 'Expert systems encoded human expert knowledge as IF-THEN rules. MYCIN diagnosed blood diseases, R1 configured computers, XCON saved DEC $40M annually. By 1985, expert systems were a $2B industry. But they proved brittle — knowledge acquisition bottleneck, inability to handle uncertainty, and maintenance nightmare — leading to the second AI Winter when the hype collapsed in 1987.', impact: 'Significant', icon: '📋', tags: ['expert systems', 'rules', 'knowledge engineering'] },
  { id: 'a19', year: 1986, displayYear: '1986', era: 'winters', event: 'Backpropagation Popularized', description: 'Rumelhart, Hinton, and Williams publish "Learning representations by back-propagating errors" — restarting neural network research.', details: 'This landmark Nature paper demonstrated backpropagation training on multi-layer networks (MLPs), showing they could learn internal representations. It launched the second wave of neural network research after the first AI Winter. Though another winter followed, this paper planted the seeds for the deep learning revolution 25 years later. Geoffrey Hinton would win the 2024 Nobel Prize in Physics for this work.', impact: 'Revolutionary', icon: '🔄', tags: ['backpropagation', 'Hinton', 'MLPs'] },
  { id: 'a20', year: 1989, displayYear: '1989', era: 'winters', event: 'LeCun\'s CNN for Handwriting', description: 'Yann LeCun applies convolutional neural networks to handwritten digit recognition — precursor to all modern vision AI.', details: 'Yann LeCun at Bell Labs applied backpropagation to convolutional neural networks (CNNs) for handwriting recognition. His LeNet architecture processed USPS zip codes, reading millions of checks daily. This demonstrated practical deep learning 23 years before AlexNet. LeCun\'s CNN architecture — convolutions, pooling, fully-connected — is still the foundation of virtually all image recognition systems.', impact: 'Major', icon: '✍️', tags: ['CNN', 'LeCun', 'computer vision'] },
  { id: 'a21', year: 1995, displayYear: '1995', era: 'winters', event: 'Support Vector Machines', description: 'Vapnik and Cortes introduce SVMs — dominating ML competitions for 17 years until deep learning arrived.', details: 'Vladimir Vapnik and Corinna Cortes published "Support-vector networks," introducing SVMs with soft margins and the kernel trick. SVMs found the maximum-margin hyperplane separating classes, and with kernel functions could handle non-linear boundaries. From 1995-2012, SVMs were the undisputed best approach for classification. Every Kaggle competition was won with SVMs or ensembles — until 2012 when AlexNet changed everything.', impact: 'Major', icon: '🎯', tags: ['SVM', 'kernel', 'classification'] },
  // ML Renaissance
  { id: 'a22', year: 1997, displayYear: '1997', era: 'mlboom', event: 'Deep Blue Defeats Kasparov', description: 'IBM\'s Deep Blue becomes the first computer to defeat a reigning world chess champion — a symbolic AI milestone.', details: 'Deep Blue\'s 3.5-2.5 victory over Garry Kasparov demonstrated AI could excel at human games thought to require intuition and creativity. But Deep Blue was brute-force search + hand-crafted evaluation functions, not learning. This "false flag" of AI capability led to debates about whether computers truly "thought." Real game-playing AI would come 19 years later with AlphaGo.', impact: 'Major', icon: '♟️', tags: ['chess', 'Deep Blue', 'IBM'] },
  { id: 'a23', year: 1997, displayYear: '1997', era: 'mlboom', event: 'LSTM Invented', description: 'Hochreiter and Schmidhuber solve the vanishing gradient problem with Long Short-Term Memory networks.', details: 'Sepp Hochreiter and Jürgen Schmidhuber\'s LSTM paper introduced gating mechanisms (input, output, forget gates) that allowed recurrent neural networks to maintain long-term dependencies. This solved the vanishing gradient problem that had stymied sequence modeling. LSTMs powered speech recognition, translation, and text generation for 20 years — until Transformers replaced them in 2017.', impact: 'Major', icon: '🧬', tags: ['LSTM', 'recurrent', 'sequences'] },
  { id: 'a24', year: 2001, displayYear: '2001', era: 'mlboom', event: 'Data Science as Formal Discipline', description: 'William S. Cleveland\'s "Data Science: An Action Plan" formally proposes data science as a new academic discipline.', details: 'Cleveland\'s influential paper proposed expanding statistics to incorporate computer science, arguing for data science as a field that combines statistical thinking with computational tools. Simultaneously, the combination of cheap computing, internet data, and statistical methods was creating a new kind of practitioner. The Harvard Business Review would later (2012) call it "the sexiest job of the 21st century."', impact: 'Significant', icon: '🔬', tags: ['data science', 'discipline', 'Cleveland'] },
  { id: 'a25', year: 2006, displayYear: '2006', era: 'mlboom', event: 'Deep Learning Breakthrough (Hinton)', description: 'Geoffrey Hinton\'s breakthrough with deep belief networks restarts neural network research after the second AI winter.', details: 'Geoffrey Hinton, Simon Osindero, and Yee-Whye Teh\'s paper "A Fast Learning Algorithm for Deep Belief Nets" demonstrated pre-training of deep networks via Restricted Boltzmann Machines. This was the key breakthrough that restarted deep learning research. Hinton\'s group at the University of Toronto would later produce AlexNet, and Hinton himself would win the 2024 Nobel Prize in Physics.', impact: 'Revolutionary', icon: '🌊', tags: ['deep learning', 'Hinton', 'revival'] },
  { id: 'a26', year: 2009, displayYear: '2009', era: 'mlboom', event: 'ImageNet Dataset Created', description: 'Fei-Fei Li creates ImageNet with 14 million labeled images — enabling the deep learning revolution.', details: 'Fei-Fei Li assembled ImageNet — 14+ million hand-labeled images across 1,000 categories — and launched the ImageNet Large Scale Visual Recognition Challenge (ILSVRC). Before ImageNet, researchers couldn\'t train or fairly evaluate visual recognition systems. The 2012 ILSVRC competition would trigger the deep learning revolution when AlexNet demolished the previous best by 10.8 percentage points.', impact: 'Foundational', icon: '🖼️', tags: ['dataset', 'vision', 'Fei-Fei Li'] },
  { id: 'a27', year: 2011, displayYear: '2011', era: 'mlboom', event: 'IBM Watson Wins Jeopardy!', description: 'Watson defeats Ken Jennings and Brad Rutter on Jeopardy!, demonstrating natural language understanding at scale.', details: 'IBM Watson\'s victory on Jeopardy! (winning $1M) demonstrated that a computer could parse the nuanced, pun-filled, indirect questions of the game show. Watson used 90+ algorithms analyzing text, knowledge bases, and confidence scores. Though not "deep learning" (it was statistical NLP + knowledge graphs), Watson showed the world that AI was approaching human-level language understanding for narrow tasks.', impact: 'Major', icon: '🎮', tags: ['Watson', 'NLP', 'Jeopardy'] },
  // Deep Learning
  { id: 'a28', year: 2012, displayYear: '2012', era: 'deep', event: 'AlexNet — Deep Learning Revolution', description: 'Alex Krizhevsky\'s AlexNet wins ImageNet with a 10.8% margin, triggering the deep learning era.', details: 'AlexNet by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton achieved 15.3% top-5 error vs. 26.2% for the second place on ImageNet. This 10.8 percentage point gap, achieved using deep CNNs trained on GPUs, was the single most impactful result in AI history. Every major AI lab immediately pivoted to deep learning. The modern AI era effectively began on September 30, 2012.', impact: 'Revolutionary', icon: '💥', tags: ['AlexNet', 'ImageNet', 'CNN'] },
  { id: 'a29', year: 2013, displayYear: '2013', era: 'deep', event: 'Word2Vec — Language Representations', description: 'Mikolov\'s Word2Vec shows word analogies (king - man + woman = queen) via dense vector embeddings.', details: 'Tomas Mikolov at Google published Word2Vec, which learned 300-dimensional vector representations of words such that "king" - "man" + "woman" ≈ "queen." This demonstrated that meaning could be encoded geometrically in high-dimensional space. Word embeddings became the standard input representation for NLP, and the concept of learned representations generalized to all modalities — images, audio, code, graphs.', impact: 'Major', icon: '👑', tags: ['embeddings', 'NLP', 'Word2Vec'] },
  { id: 'a30', year: 2014, displayYear: '2014', era: 'deep', event: 'GANs Invented by Goodfellow', description: 'Ian Goodfellow invents Generative Adversarial Networks — enabling AI to generate photorealistic images, text, and audio.', details: 'Ian Goodfellow invented GANs at 3am after an argument, writing the code in a single evening. The generator/discriminator adversarial framework enabled AI to generate convincingly realistic images, audio, video, and text. GANs enabled deepfakes, art generation (DALL-E\'s predecessor), drug discovery (molecular generation), and data augmentation. Yann LeCun called it "the most interesting idea in ML in the last 20 years."', impact: 'Revolutionary', icon: '🎨', tags: ['GANs', 'generative', 'Goodfellow'] },
  { id: 'a31', year: 2015, displayYear: '2015', era: 'deep', event: 'TensorFlow Released by Google', description: 'Google open-sources TensorFlow — democratizing deep learning research and production deployment globally.', details: 'Google Brain\'s open-source release of TensorFlow put industrial-grade deep learning tools in the hands of every researcher. TensorFlow\'s computational graph abstraction and automatic differentiation enabled researchers worldwide to experiment and deploy large models. Within a year, PyTorch (Facebook, 2016) offered a more Pythonic alternative. The democratization of deep learning frameworks catalyzed an explosion of AI research.', impact: 'Major', icon: '🔵', tags: ['TensorFlow', 'Google', 'open source'] },
  { id: 'a32', year: 2016, displayYear: '2016', era: 'deep', event: 'AlphaGo Defeats Lee Sedol', description: 'DeepMind\'s AlphaGo beats 9-dan grandmaster Lee Sedol 4-1, conquering a game thought impossible for AI.', details: 'Go has more possible board positions than atoms in the universe. Experts thought AI was 10 years away from beating top players. AlphaGo\'s combination of deep CNNs + MCTS + reinforcement learning produced "Move 37" in Game 2 — a move so beautiful and counterintuitive it stunned Go professionals worldwide. Lee Sedol\'s single win (Game 4) is considered the greatest Go move ever played, teaching AlphaGo something it didn\'t know.', impact: 'Revolutionary', icon: '⚫', tags: ['AlphaGo', 'DeepMind', 'reinforcement learning'] },
  // Transformer Age
  { id: 'a33', year: 2017, displayYear: '2017', era: 'transformer', event: '"Attention Is All You Need" — Transformers', description: 'Vaswani et al. at Google publish the Transformer architecture — the foundation of all modern LLMs.', details: 'The Transformer architecture introduced self-attention: instead of processing sequences step-by-step, every position attends to every other position simultaneously. This enabled massive parallelization, eliminated the bottleneck of recurrent networks, and scaled to 100B+ parameters. BERT, GPT, T5, ViT, Whisper, DALL-E, Stable Diffusion — every state-of-the-art AI system today uses Transformers. The eight authors changed the world.', impact: 'Revolutionary', icon: '🔮', tags: ['Transformer', 'attention', 'architecture'] },
  { id: 'a34', year: 2018, displayYear: '2018', era: 'transformer', event: 'BERT & GPT-1 — Transfer Learning', description: 'Google\'s BERT and OpenAI\'s GPT-1 establish pre-training + fine-tuning as the dominant NLP paradigm.', details: 'BERT (Bidirectional Encoder Representations from Transformers) and GPT-1 demonstrated that pre-training on massive text corpora and fine-tuning on small task-specific datasets outperformed all prior approaches. BERT\'s bidirectional masking and GPT\'s autoregressive prediction represented two complementary approaches. The "pre-train, fine-tune" paradigm they established became the dominant approach in all of AI, not just NLP.', impact: 'Revolutionary', icon: '🔤', tags: ['BERT', 'GPT', 'transfer learning'] },
  { id: 'a35', year: 2020, displayYear: '2020', era: 'transformer', event: 'GPT-3 — 175 Billion Parameters', description: 'OpenAI\'s GPT-3 demonstrates emergent few-shot learning at scale — shocking the AI community with its capabilities.', details: 'GPT-3\'s 175 billion parameters demonstrated qualitatively new "emergent" capabilities: few-shot learning (learning from just 2-3 examples in the prompt), code generation, reasoning, creative writing. Andrej Karpathy called it "a computing paradigm shift." GPT-3 API enabled thousands of startups. More importantly, it proved the "scaling hypothesis": more data + more compute = qualitative capability jumps.', impact: 'Revolutionary', icon: '🌐', tags: ['GPT-3', 'scale', 'emergent capabilities'] },
  { id: 'a36', year: 2021, displayYear: '2021', era: 'transformer', event: 'AlphaFold2 Solves Protein Folding', description: 'DeepMind\'s AlphaFold2 predicts 3D protein structures from sequences — solving a 50-year grand challenge in biology.', details: 'AlphaFold2 achieved a median score of 92.4 GDT on CASP14 — effectively solving protein structure prediction, a problem biologists had worked on for 50 years. DeepMind released structures for all 200 million known proteins. This enables drug discovery acceleration, disease mechanism understanding, and synthetic biology. AlphaFold2 is arguably the single greatest scientific achievement by an AI system in history.', impact: 'Revolutionary', icon: '🧬', tags: ['AlphaFold', 'proteins', 'biology'] },
  { id: 'a37', year: 2022, displayYear: '2022', era: 'transformer', event: 'ChatGPT Shocks the World', description: 'OpenAI\'s ChatGPT reaches 100 million users in 60 days — the fastest product adoption in human history.', details: 'Released November 30, 2022, ChatGPT reached 1 million users in 5 days and 100 million in 60 days — faster than TikTok (9 months) or Instagram (2.5 years). ChatGPT demonstrated that RLHF (Reinforcement Learning from Human Feedback) could align LLMs to be genuinely helpful. It triggered immediate emergency responses from Google, Microsoft, and Meta. Sam Altman called it "a once in a generation change in how people interact with computers."', impact: 'Revolutionary', icon: '💥', tags: ['ChatGPT', 'RLHF', 'mainstream AI'] },
  { id: 'a38', year: 2022, displayYear: '2022', era: 'transformer', event: 'Stable Diffusion & Image Generation', description: 'Open-source Stable Diffusion and DALL-E 2 make AI image generation accessible to millions.', details: 'Stability AI\'s Stable Diffusion (open-source) and OpenAI\'s DALL-E 2 brought photorealistic image generation from text prompts to the masses. For the first time, anyone could generate professional-quality images from a text description. Midjourney, Adobe Firefly, and hundreds of products followed. This triggered major debates about artistic copyright, creative work, and the economic impact of generative AI.', impact: 'Revolutionary', icon: '🎨', tags: ['image generation', 'diffusion', 'multimodal'] },
  { id: 'a39', year: 2023, displayYear: '2023', era: 'transformer', event: 'GPT-4, Llama & Open-Source LLM Race', description: 'GPT-4 achieves top 10% on bar exam; Meta\'s Llama spawns the open-source LLM ecosystem.', details: 'GPT-4\'s capabilities (bar exam top 10%, coding, multimodal) combined with Meta\'s open-source Llama models that anyone could fine-tune created a bifurcated AI landscape: closed frontier models (GPT-4, Claude, Gemini) vs. open-source models (Llama, Mistral, Falcon). Google released Bard and Gemini. Anthropic launched Claude. The AI arms race between the world\'s largest companies officially began.', impact: 'Revolutionary', icon: '🦙', tags: ['GPT-4', 'Llama', 'open source LLMs'] },
  { id: 'a40', year: 2024, displayYear: '2024', era: 'transformer', event: 'Nobel Prize for Deep Learning', description: 'Geoffrey Hinton and John Hopfield win the Nobel Prize in Physics for foundational work on neural networks.', details: 'The Royal Swedish Academy of Sciences awarded the 2024 Nobel Prize in Physics to John Hopfield (Hopfield networks, 1982) and Geoffrey Hinton (Boltzmann machines, backpropagation) "for foundational discoveries and inventions that enable machine learning with artificial neural networks." This was the first Nobel Prize awarded for AI/ML research, signaling the field\'s scientific maturity. Hinton had left Google to speak freely about AI risks.', impact: 'Major', icon: '🏆', tags: ['Nobel Prize', 'Hinton', 'recognition'] },
  { id: 'a41', year: 2024, displayYear: '2024', era: 'transformer', event: 'GPT-4o, Gemini Ultra & Multimodal AI', description: 'Real-time multimodal AI (see, hear, speak) enters every pocket via smartphones and browsers.', details: 'GPT-4o\'s real-time voice interaction (with emotion recognition), Google\'s Gemini Ultra with 1M context windows, Anthropic\'s Claude 3 Opus, and Meta\'s Llama 3 collectively brought frontier AI capabilities to hundreds of millions of users. AI Overviews in Google Search changed how billions search. The question shifted from "can AI do this?" to "how do we integrate AI responsibly into society?"', impact: 'Revolutionary', icon: '🌍', tags: ['multimodal', 'GPT-4o', 'Gemini', 'Claude'] },
  { id: 'a42', year: 2025, displayYear: '2025', era: 'transformer', event: 'AGI Debate & Agentic AI', description: 'Leading AI labs report systems approaching AGI benchmarks; autonomous AI agents handle multi-step real-world tasks.', details: 'OpenAI\'s o3, Anthropic\'s Claude 3.7 Sonnet, and Google\'s Gemini 2.0 demonstrated reasoning capabilities approaching or exceeding expert human performance across many domains. AI agents (Claude Code, Devin, OpenAI Operator) began autonomously performing complex multi-step tasks: writing code, conducting research, booking travel. The definition of AGI became hotly debated as benchmarks fell one by one.', impact: 'Revolutionary', icon: '🤯', tags: ['AGI', 'agents', 'reasoning'] },
];

const IMPACT_COLORS: Record<string, string> = {
  'Foundational': '#f59e0b',
  'Revolutionary': '#ef4444',
  'Major': '#7c3aed',
  'Significant': '#06b6d4',
};

function getEraColor(eraId: string, eras: Era[]) {
  return eras.find(e => e.id === eraId)?.color || '#94a3b8';
}

function TimelineEventCard({
  event,
  side,
  eraColor,
  isSelected,
  onClick,
}: {
  event: TimelineEvent;
  side: 'left' | 'right';
  eraColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`md:w-[46%] cursor-pointer rounded-xl p-5 transition-all duration-300 ${
        side === 'left' ? 'md:mr-auto md:text-right' : 'md:ml-auto'
      }`}
      style={{
        background: isSelected ? `${eraColor}12` : 'rgba(26,34,54,0.6)',
        border: `1px solid ${isSelected ? eraColor + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: isSelected ? `0 0 30px ${eraColor}20` : 'none',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLElement).style.borderColor = `${eraColor}40`;
          (e.currentTarget as HTMLElement).style.background = `${eraColor}08`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(26,34,54,0.6)';
        }
      }}
    >
      <div className={`flex items-center gap-2 mb-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: `${eraColor}20`,
            color: eraColor,
            border: `1px solid ${eraColor}40`,
          }}
        >
          {event.displayYear}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: `${IMPACT_COLORS[event.impact]}15`,
            color: IMPACT_COLORS[event.impact],
          }}
        >
          {event.impact}
        </span>
      </div>
      <div className={`flex items-start gap-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
        <span className="text-2xl flex-shrink-0">{event.icon}</span>
        <div>
          <h4 className="font-bold text-sm mb-1" style={{ color: '#f1f5f9' }}>{event.event}</h4>
          <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{event.description}</p>
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${eraColor}30` }}>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#94a3b8' }}>{event.details}</p>
          <div className={`flex flex-wrap gap-1.5 ${side === 'left' ? 'md:justify-end' : ''}`}>
            {event.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${eraColor}15`, color: eraColor, border: `1px solid ${eraColor}25` }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SingleTimeline({
  events,
  eras,
  title,
  subtitle,
  accentColor,
  secondColor,
}: {
  events: TimelineEvent[];
  eras: Era[];
  title: string;
  subtitle: string;
  accentColor: string;
  secondColor: string;
}) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<string>('all');
  const [search, setSearch] = useState('');
  const eraRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = events.filter(e => {
    const matchEra = activeEra === 'all' || e.era === activeEra;
    const matchSearch = !search || e.event.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchEra && matchSearch;
  });

  const groupedByEra = eras.map(era => ({
    era,
    events: filtered.filter(e => e.era === era.id),
  })).filter(g => g.events.length > 0);

  return (
    <div>
      {/* Timeline header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-black mb-3"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${secondColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </h2>
        <p className="text-base" style={{ color: '#64748b' }}>{subtitle}</p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-shrink-0">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none w-56"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f8fafc',
            }}
            onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}60`; }}
            onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
          <svg className="absolute left-3 top-2.5 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#64748b' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Era filter chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveEra('all')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeEra === 'all' ? accentColor : 'rgba(255,255,255,0.05)',
              color: activeEra === 'all' ? 'white' : '#94a3b8',
              border: `1px solid ${activeEra === 'all' ? accentColor : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            All Eras
          </button>
          {eras.map(era => (
            <button
              key={era.id}
              onClick={() => {
                setActiveEra(era.id);
                eraRefs.current[era.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1"
              style={{
                background: activeEra === era.id ? era.color : 'rgba(255,255,255,0.05)',
                color: activeEra === era.id ? 'white' : '#94a3b8',
                border: `1px solid ${activeEra === era.id ? era.color : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              <span>{era.icon}</span>
              <span className="hidden sm:inline">{era.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {groupedByEra.map(({ era, events: eraEvents }, eraIdx) => (
          <div
            key={era.id}
            ref={el => { eraRefs.current[era.id] = el; }}
            className="mb-16"
          >
            {/* Era header */}
            <div
              className="flex items-center gap-4 mb-8 p-4 rounded-xl sticky top-20 z-10"
              style={{
                background: era.bg,
                border: `1px solid ${era.color}30`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${era.color}25`, border: `1px solid ${era.color}40` }}
              >
                {era.icon}
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: era.color }}>{era.label}</h3>
                <p className="text-xs" style={{ color: '#64748b' }}>{era.period}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>
                  {eraEvents.length} events
                </span>
              </div>
            </div>

            {/* Events with center spine */}
            <div className="relative">
              {/* Center line */}
              <div
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{ background: `linear-gradient(to bottom, ${era.color}60, ${era.color}20)` }}
              />

              <div className="space-y-6">
                {eraEvents.map((event, eventIdx) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4"
                  >
                    {/* Left card (even) */}
                    {eventIdx % 2 === 0 ? (
                      <>
                        <TimelineEventCard
                          event={event}
                          side="left"
                          eraColor={era.color}
                          isSelected={selectedEvent === event.id}
                          onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                        />
                        {/* Center dot */}
                        <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-8">
                          <div
                            className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                            style={{
                              background: selectedEvent === event.id ? era.color : '#1a2236',
                              borderColor: era.color,
                              boxShadow: selectedEvent === event.id ? `0 0 16px ${era.color}` : `0 0 6px ${era.color}60`,
                              transform: selectedEvent === event.id ? 'scale(1.4)' : 'scale(1)',
                            }}
                          />
                        </div>
                        <div className="hidden md:block md:w-[46%]" />
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block md:w-[46%]" />
                        {/* Center dot */}
                        <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-8">
                          <div
                            className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                            style={{
                              background: selectedEvent === event.id ? era.color : '#1a2236',
                              borderColor: era.color,
                              boxShadow: selectedEvent === event.id ? `0 0 16px ${era.color}` : `0 0 6px ${era.color}60`,
                              transform: selectedEvent === event.id ? 'scale(1.4)' : 'scale(1)',
                            }}
                          />
                        </div>
                        <TimelineEventCard
                          event={event}
                          side="right"
                          eraColor={era.color}
                          isSelected={selectedEvent === event.id}
                          onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p style={{ color: '#64748b' }}>No events match your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}

type TabType = 'data' | 'ai' | 'dual';

export default function TimelinesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('data');

  const TABS: { id: TabType; label: string; icon: string; desc: string }[] = [
    { id: 'data', label: 'Data & Computation', icon: '💾', desc: '3000 BC → 2025' },
    { id: 'ai', label: 'AI & Machine Learning', icon: '🤖', desc: '400 BC → 2025' },
    { id: 'dual', label: 'Side by Side', icon: '⚡', desc: 'Both timelines' },
  ];

  return (
    <>
      <Header />
      <main style={{ background: '#0a0e1a', minHeight: '100vh' }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{
            background: 'linear-gradient(135deg, #0a0e1a 0%, #0d0b1e 50%, #080e1a 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: '#06b6d4',
              }}
            >
              🕰️ Two Interactive Timelines · 5,000+ Years of History
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ lineHeight: 1.05 }}>
              <span style={{ color: '#f8fafc' }}>Journey Through</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #7c3aed, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Data &amp; AI History
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b' }}>
              From <span style={{ color: '#f59e0b' }}>3000 BC Babylonian clay tablets</span> to{' '}
              <span style={{ color: '#ef4444' }}>2025 AGI systems</span> — explore the complete,
              parallel histories of Data &amp; Computation and Artificial Intelligence.
            </p>

            {/* Quick stats */}
            <div className="flex justify-center gap-8 mt-10">
              {[
                { v: '42', l: 'Data Events', c: '#06b6d4' },
                { v: '42', l: 'AI/ML Events', c: '#7c3aed' },
                { v: '5000+', l: 'Years Covered', c: '#f59e0b' },
                { v: '13', l: 'Eras', c: '#10b981' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-xs mt-1" style={{ color: '#475569' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab selector */}
        <div
          className="sticky top-16 z-40"
          style={{
            background: 'rgba(10,14,26,0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 py-3 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex-shrink-0"
                  style={{
                    background: activeTab === tab.id
                      ? tab.id === 'data' ? 'rgba(6,182,212,0.15)' : tab.id === 'ai' ? 'rgba(124,58,237,0.15)' : 'rgba(16,185,129,0.15)'
                      : 'transparent',
                    color: activeTab === tab.id
                      ? tab.id === 'data' ? '#06b6d4' : tab.id === 'ai' ? '#a78bfa' : '#10b981'
                      : '#64748b',
                    border: activeTab === tab.id
                      ? `1px solid ${tab.id === 'data' ? 'rgba(6,182,212,0.35)' : tab.id === 'ai' ? 'rgba(124,58,237,0.35)' : 'rgba(16,185,129,0.35)'}`
                      : '1px solid transparent',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#64748b' }}
                  >
                    {tab.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'data' && (
            <SingleTimeline
              events={DATA_EVENTS}
              eras={DATA_ERAS}
              title="History of Data & Computation"
              subtitle="From ancient clay tablets to modern real-time data pipelines"
              accentColor="#06b6d4"
              secondColor="#7c3aed"
            />
          )}

          {activeTab === 'ai' && (
            <SingleTimeline
              events={AI_EVENTS}
              eras={AI_ERAS}
              title="History of AI, ML & Data Science"
              subtitle="From Aristotle's logic to AGI — the complete story"
              accentColor="#7c3aed"
              secondColor="#f43f5e"
            />
          )}

          {activeTab === 'dual' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black mb-3" style={{ color: '#f8fafc' }}>
                  Parallel Histories
                </h2>
                <p style={{ color: '#64748b' }}>
                  Explore how Data infrastructure and AI/ML evolved together — often feeding each other's breakthroughs
                </p>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: '#0d1524',
                    border: '1px solid rgba(6,182,212,0.15)',
                  }}
                >
                  <div
                    className="flex items-center gap-3 mb-8 pb-4"
                    style={{ borderBottom: '1px solid rgba(6,182,212,0.15)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}
                    >
                      💾
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: '#06b6d4' }}>Data &amp; Computation</h3>
                      <p className="text-xs" style={{ color: '#475569' }}>3000 BC – 2025</p>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {DATA_EVENTS.map(event => {
                      const era = DATA_ERAS.find(e => e.id === event.era);
                      return (
                        <div
                          key={event.id}
                          className="flex items-start gap-3 p-3 rounded-lg transition-all"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.2)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)'; }}
                        >
                          <span className="text-lg flex-shrink-0">{event.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold" style={{ color: era?.color || '#06b6d4' }}>{event.displayYear}</span>
                              <span className="text-xs" style={{ color: '#475569' }}>·</span>
                              <span className="text-xs" style={{ color: '#475569' }}>{era?.label}</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>{event.event}</p>
                            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#64748b' }}>{event.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: '#0d1524',
                    border: '1px solid rgba(124,58,237,0.15)',
                  }}
                >
                  <div
                    className="flex items-center gap-3 mb-8 pb-4"
                    style={{ borderBottom: '1px solid rgba(124,58,237,0.15)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
                    >
                      🤖
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: '#a78bfa' }}>AI, ML &amp; Data Science</h3>
                      <p className="text-xs" style={{ color: '#475569' }}>400 BC – 2025</p>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {AI_EVENTS.map(event => {
                      const era = AI_ERAS.find(e => e.id === event.era);
                      return (
                        <div
                          key={event.id}
                          className="flex items-start gap-3 p-3 rounded-lg transition-all"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.2)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)'; }}
                        >
                          <span className="text-lg flex-shrink-0">{event.icon}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold" style={{ color: era?.color || '#a78bfa' }}>{event.displayYear}</span>
                              <span className="text-xs" style={{ color: '#475569' }}>·</span>
                              <span className="text-xs" style={{ color: '#475569' }}>{era?.label}</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>{event.event}</p>
                            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: '#64748b' }}>{event.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  💡 Switch to <strong style={{ color: '#06b6d4' }}>Data & Computation</strong> or <strong style={{ color: '#a78bfa' }}>AI & ML</strong> tabs for the full interactive timeline with detailed event cards, era navigation, and search
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Future section */}
        <section
          className="py-16 md:py-24"
          style={{
            background: 'linear-gradient(180deg, #0a0e1a 0%, #0d0b1e 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171',
                }}
              >
                What's Next?
              </span>
              <h2 className="text-3xl md:text-4xl font-black" style={{ color: '#f8fafc' }}>
                The Near Future of AI &amp; Data
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'AGI & Superintelligence',
                  desc: 'Systems matching or exceeding human cognitive ability across all domains. Leading labs report approaching this threshold by 2026-2027.',
                  icon: '🧠',
                  color: '#ef4444',
                  year: '2026-2028?',
                },
                {
                  title: 'Quantum Data Processing',
                  desc: 'Quantum computers will solve optimization and cryptography problems intractable for classical computers, revolutionizing ML training.',
                  icon: '⚛️',
                  color: '#7c3aed',
                  year: '2027-2030?',
                },
                {
                  title: 'Brain-Computer Interfaces',
                  desc: 'Direct neural interfaces enabling humans to interact with AI systems and data at the speed of thought.',
                  icon: '🔌',
                  color: '#06b6d4',
                  year: '2028+',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}25`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${item.color}20`, color: item.color }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#f1f5f9' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
