/* ============================================================
   ACADEMIC WORKSPACE — lessons.js
   Course catalog + schedule + REAL lesson content.
   Each lesson is a studyable mini-lesson.
   Block types:
     {h} heading | {p} paragraph | {ul} bullets | {ol} numbered
     {hl} important concept | {mem} memory box | {ex} example
     {mis} misconception | {app} real-world/engineering
     {recap} recap bullets | {recall} recall questions
   ============================================================ */

/* ---------- Schedule (from Certificate of Registration) ----------
   "TH" = Tuesday AND Thursday (kept as separate day sessions).    */
const SCHEDULE = [
  { code:"GEC 002",  title:"Mathematics in the Modern World", day:"Tue", s:"07:30", e:"09:00", room:"CoE Rm. 513",  color:"#22c55e" },
  { code:"GEC 002",  title:"Mathematics in the Modern World", day:"Thu", s:"07:30", e:"09:00", room:"CoE Rm. 513",  color:"#22c55e" },
  { code:"CHEM010",  title:"Chemistry for Engineers",         day:"Thu", s:"09:00", e:"10:30", room:"Chemistry Lab", color:"#10b981" },
  { code:"CPE 111",  title:"Computer Engineering as a Discipline", day:"Mon", s:"09:30", e:"10:30", room:"CoE Rm. 513", color:"#3b82f6" },
  { code:"CHEM010",  title:"Chemistry for Engineers",         day:"Tue", s:"10:30", e:"12:00", room:"Science Lab",  color:"#10b981" },
  { code:"GEC 007",  title:"Readings in Philippine History",  day:"Mon", s:"10:30", e:"12:00", room:"Science Lab",  color:"#f59e0b" },
  { code:"GEC 007",  title:"Readings in Philippine History",  day:"Wed", s:"10:30", e:"12:00", room:"SBLR 2",       color:"#f59e0b" },
  { code:"IEM 001",  title:"Fundamentals of Mathematics for Engineers", day:"Tue", s:"13:00", e:"14:30", room:"CoE Rm. 525", color:"#06b6d4" },
  { code:"IEM 001",  title:"Fundamentals of Mathematics for Engineers", day:"Thu", s:"13:00", e:"14:30", room:"CoE Rm. 525", color:"#06b6d4" },
  { code:"MATH 001", title:"Calculus 1",                      day:"Mon", s:"13:00", e:"15:00", room:"CoE Rm. 515", color:"#6366f1" },
  { code:"MATH 001", title:"Calculus 1",                      day:"Wed", s:"13:00", e:"15:00", room:"CoE Rm. 515", color:"#6366f1" },
  { code:"GEC 004",  title:"Understanding the Self",          day:"Tue", s:"14:30", e:"16:00", room:"Science Lab",  color:"#ec4899" },
  { code:"GEC 004",  title:"Understanding the Self",          day:"Thu", s:"14:30", e:"16:00", room:"SBLR 1",       color:"#ec4899" },
  { code:"PATHFit 1",title:"Movement Competency Training",    day:"Wed", s:"08:00", e:"10:00", room:"Eng'g GYM Rm. 1", color:"#14b8a6" },
  { code:"NSTP 1",   title:"National Service Training Program 1", day:"Sat", s:"08:00", e:"11:00", room:"Eng'g Field 2", color:"#ef4444" },
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DAY_FULL = { Mon:"Monday", Tue:"Tuesday", Wed:"Wednesday", Thu:"Thursday", Fri:"Friday", Sat:"Saturday", Sun:"Sunday" };

/* ---------- Course catalog ---------- */
const COURSES = [
  {
    code:"CHEM010", title:"Chemistry for Engineers",
    color:"#10b981", units:3,
    desc:"Core chemistry concepts with a focus on how matter and reactions shape engineering materials and processes.",
    lessons:[
      { n:1, title:"Chemistry Foundations", blocks:[
        {h:"Overview"},
        {p:"Chemistry is the science of matter — what it is made of, how it behaves, and how it changes. For an engineer, chemistry is the reason a steel beam rusts, a battery stores energy, and a plastic pipe can last decades outdoors. This lesson builds the vocabulary you will use for the entire course."},
        {h:"What is chemistry?"},
        {p:"Chemistry studies matter (anything that has mass and takes up space) and the energy changes that happen when matter transforms. A chemist asks: what is this made of, and what can it become?"},
        {ul:[
          "Matter — anything with mass and volume (a rock, air, water, you).",
          "Substance — matter with a fixed, uniform composition (pure water).",
          "Mixture — two or more substances physically combined (seawater).",
          "Energy — the capacity to do work or produce change."
        ]},
        {h:"Physical vs chemical properties"},
        {hl:"A physical property can be observed without changing what the substance is; a chemical property describes how a substance reacts to become something new."},
        {ul:[
          "Physical: color, density, melting point, hardness — you still have the same stuff.",
          "Chemical: flammability, reactivity with acid, rusting — the substance turns into a different substance."
        ]},
        {ex:"Melting an ice cube is a physical change (still H₂O). Burning paper is a chemical change (paper becomes ash, smoke, and gases — different substances)."},
        {h:"Branches of chemistry"},
        {ul:[
          "Organic — compounds built around carbon.",
          "Inorganic — metals, minerals, and non-carbon compounds.",
          "Analytical — identifying and measuring substances.",
          "Physical — the laws and energy behind reactions.",
          "Biochemistry — the chemistry of living things."
        ]},
        {mem:"Chemistry = the 'why' behind how materials behave and change."},
        {h:"The scientific method"},
        {ol:["Observe something.","Ask a question.","Form a hypothesis (a testable guess).","Experiment and collect data.","Analyze and conclude.","Repeat and refine."]},
        {app:"Engineers use chemistry to pick the right metal, polymer, or coating so a product resists corrosion, heat, and stress in real conditions."},
        {recap:[
          "Chemistry is the study of matter and its changes.",
          "Physical properties keep identity; chemical properties change it.",
          "The scientific method turns curiosity into reliable knowledge."
        ]},
        {recall:[
          "Give one physical and one chemical property of an iron nail.",
          "Why is dissolving salt in water a physical change?",
          "Name three branches of chemistry."
        ]}
      ]},
      { n:2, title:"Measurements and Units", blocks:[
        {h:"Overview"},
        {p:"Science depends on measurement. To compare results, engineers worldwide share one system: the SI (Système International) units. This lesson covers units, prefixes, significant figures, and unit conversion."},
        {h:"The seven SI base units (the ones you must know)"},
        {ul:[
          "Length — metre (m)",
          "Mass — kilogram (kg)",
          "Time — second (s)",
          "Temperature — kelvin (K)",
          "Amount of substance — mole (mol)",
          "Electric current — ampere (A)",
          "Luminous intensity — candela (cd)"
        ]},
        {mem:"King Henry Died By Drinking Chocolate Milk = kilo, hecto, deca, base, deci, centi, milli. Each step is ×10."},
        {h:"Significant figures"},
        {p:"Significant figures show how precise a measurement is. Counting them tells others how much to trust a number."},
        {ul:[
          "Non-zero digits are always significant (23.4 → 3 sig figs).",
          "Zeros between non-zero digits count (205 → 3).",
          "Leading zeros never count (0.045 → 2).",
          "Trailing zeros count only if a decimal is shown (2.50 → 3)."
        ]},
        {ex:"0.005060 has 4 significant figures (5, 0, 6, 0). The leading zeros are placeholders only."},
        {h:"Unit conversion (dimensional analysis)"},
        {p:"Multiply by conversion factors equal to 1 so unwanted units cancel. Always carry the units — they are your safety check."},
        {ex:"Convert 5 km to metres: 5 km × (1000 m / 1 km) = 5000 m. The 'km' cancels, leaving metres."},
        {mis:"Don't round at every step — keep extra digits during calculation and round only the final answer."},
        {app:"A wrong unit conversion crashed the Mars Climate Orbiter in 1999 — pound-seconds vs newton-seconds. Units matter in engineering."},
        {recap:[
          "Use SI base units and metric prefixes.",
          "Significant figures communicate precision.",
          "Convert with dimensional analysis; cancel units."
        ]},
        {recall:[
          "How many significant figures are in 0.00720?",
          "Convert 350 cm to metres.",
          "Why do engineers carry units through calculations?"
        ]}
      ]},
      { n:3, title:"Atoms, Molecules and Ions", blocks:[
        {h:"Overview"},
        {p:"Everything you can touch is built from atoms. This lesson explains the particles inside an atom, how atoms are identified, and how they become molecules or ions. It is one of the most important foundations in chemistry."},
        {h:"What is an atom?"},
        {p:"An atom is the smallest unit of an element that still keeps the chemical properties of that element. Atoms are made of three subatomic particles:"},
        {ul:[
          "Protons — positive charge (+1), found in the nucleus, give the element its identity.",
          "Neutrons — no charge (neutral), found in the nucleus, add most of the mass.",
          "Electrons — negative charge (−1), move around the nucleus, control chemical reactions."
        ]},
        {mem:"Protons = identity · Electrons = charge · Neutrons = nuclear mass"},
        {h:"Atomic number and mass number"},
        {ul:[
          "Atomic number (Z) = number of protons. This defines the element.",
          "Mass number (A) = protons + neutrons.",
          "In a neutral atom, protons = electrons."
        ]},
        {ex:"Carbon has atomic number 6, so every carbon atom has 6 protons. A common carbon atom has 6 neutrons, giving mass number 12, written ¹²C."},
        {h:"Isotopes"},
        {p:"Isotopes are atoms of the same element (same proton count) with different neutron counts. They behave almost identically in chemistry but differ in mass."},
        {ex:"Carbon-12 (6 neutrons), Carbon-13 (7 neutrons), and Carbon-14 (8 neutrons) are isotopes of carbon."},
        {hl:"It is the number of protons that decides the element — never the number of neutrons or electrons."},
        {h:"Ions: how atoms become charged"},
        {p:"Atoms gain or lose electrons to become ions. Losing electrons (positive) makes a cation; gaining electrons (negative) makes an anion."},
        {ul:[
          "Cation — positive ion, formed by losing electrons (Na → Na⁺).",
          "Anion — negative ion, formed by gaining electrons (Cl → Cl⁻).",
          "Opposite charges attract — this is how ionic bonds form."
        ]},
        {mem:"LOAN: LOse = AniON? No — Losing electrons gives a Positive charge (cation). 'LEO the lion says GER': Loss of Electrons = Oxidation, Gain = Reduction."},
        {h:"Molecules vs ions in one line"},
        {p:"A molecule is a group of atoms bonded together and neutral (H₂O, O₂). An ion is a charged atom or group (Na⁺, SO₄²⁻)."},
        {app:"Battery and semiconductor engineering depend on controlling ions and electrons. Corrosion, electroplating, and nerve signals all involve ions moving."},
        {recap:[
          "Atoms = protons (+), neutrons (0), electrons (−).",
          "Atomic number = protons; mass number = protons + neutrons.",
          "Isotopes differ only in neutrons.",
          "Lose electrons → cation (+); gain electrons → anion (−)."
        ]},
        {recall:[
          "What two numbers identify an isotope like ¹⁴C?",
          "How does a sodium atom become Na⁺?",
          "If an atom has 11 protons and 10 electrons, what is its charge?"
        ]}
      ]},
      { n:4, title:"Chemical Formulas and Compounds", blocks:[
        {h:"Overview"},
        {p:"Chemical formulas are the shorthand chemists use to write substances and reactions. This lesson explains how to read formulas, the difference between molecular and empirical formulas, and how to name common compounds."},
        {h:"Reading a formula"},
        {p:"Subscripts show how many atoms of each element are present. No subscript means one atom."},
        {ex:"H₂O = 2 hydrogen + 1 oxygen. Ca(OH)₂ = 1 calcium + 2 oxygen + 2 hydrogen (the subscript outside the bracket multiplies everything inside)."},
        {h:"Types of formulas"},
        {ul:[
          "Molecular formula — the actual number of each atom (C₆H₁₂O₆ for glucose).",
          "Empirical formula — the simplest whole-number ratio (CH₂O for glucose).",
          "Structural formula — shows how atoms connect."
        ]},
        {mem:"Molecular = real count · Empirical = simplest ratio. Like a fraction: 6/12/6 reduces to 1/2/1."},
        {h:"Naming ionic compounds"},
        {p:"Ionic compounds combine a metal (cation) with a nonmetal (anion). Name the metal first, then the nonmetal with an '-ide' ending."},
        {ex:"NaCl = sodium chloride. CaO = calcium oxide. When a metal has more than one charge, use Roman numerals: FeCl₂ = iron(II) chloride, FeCl₃ = iron(III) chloride."},
        {h:"Naming molecular (covalent) compounds"},
        {p:"Use prefixes to count atoms: mono, di, tri, tetra, penta. The second element still ends in '-ide'."},
        {ex:"CO = carbon monoxide. CO₂ = carbon dioxide. N₂O₄ = dinitrogen tetroxide."},
        {mis:"'mono' is usually dropped for the first element — we say CO₂ 'carbon dioxide', not 'monocarbon dioxide'."},
        {hl:"Acids: an '-ide' ion makes hydro___ic acid (Cl⁻ → hydrochloric acid)."},
        {app:"Engineers read formulas constantly — in material safety sheets, concrete mixes (CaCO₃), fertilizers, and fuels — to know exactly what they are handling."},
        {recap:[
          "Subscripts count atoms; brackets multiply.",
          "Molecular = actual; empirical = simplest ratio.",
          "Ionic = metal + nonmetal (-ide).",
          "Covalent = prefixes + (-ide)."
        ]},
        {recall:[
          "What is the empirical formula of C₂H₄?",
          "Name CaCl₂ and CO.",
          "How many atoms total are in Al₂(SO₄)₃?"
        ]}
      ]},
      { n:5, title:"The Mole Concept", blocks:[
        {h:"Overview"},
        {p:"Atoms are too small to count one by one, so chemists use the mole — a counting unit, just like 'a dozen' means 12. The mole links the tiny atomic world to grams you can weigh on a balance."},
        {h:"What is a mole?"},
        {p:"One mole = 6.022 × 10²³ particles. This number is Avogadro's number. It works because one mole of any element's atoms, in grams, equals its atomic mass."},
        {mem:"1 mole = 6.022 × 10²³ — the 'chemist's dozen'."},
        {h:"Molar mass"},
        {p:"Molar mass is the mass of one mole of a substance, in grams per mole (g/mol). Read it straight from the periodic table."},
        {ex:"Water (H₂O): 2(1.008) + 16.00 = 18.02 g/mol. So 1 mole of water = 18.02 grams = 6.022 × 10²³ molecules."},
        {h:"The three conversions"},
        {p:"Use molar mass as a bridge between grams, moles, and particles:"},
        {ol:[
          "Grams ↔ moles: divide or multiply by molar mass.",
          "Moles ↔ particles: multiply or divide by Avogadro's number.",
          "Grams ↔ particles: go through moles."
        ]},
        {ex:"How many moles in 36.04 g of water? 36.04 ÷ 18.02 = 2.00 mol. That equals 2 × 6.022×10²³ = 1.20×10²⁴ molecules."},
        {mis:"You cannot go straight from grams to particles. Always convert through moles first."},
        {app:"Pharmacists and chemical engineers use the mole to mix exact reaction amounts. One extra mole can mean a useless batch or a dangerous one."},
        {recap:[
          "1 mole = 6.022 × 10²³ particles (Avogadro's number).",
          "Molar mass (g/mol) bridges grams and moles.",
          "Convert grams ↔ moles ↔ particles, never skipping moles."
        ]},
        {recall:[
          "What is the molar mass of CO₂?",
          "How many molecules are in 1 mole of anything?",
          "How many moles are in 24 g of carbon (12 g/mol)?"
        ]}
      ]},
      { n:6, title:"Stoichiometry", blocks:[
        {h:"Overview"},
        {p:"Stoichiometry is the math of chemical reactions — calculating exactly how much reactant is needed and how much product forms. It rests on the balanced equation."},
        {h:"Why balance equations?"},
        {p:"The law of conservation of mass says matter is neither created nor destroyed. A balanced equation has the same number of each atom on both sides."},
        {ex:"Unbalanced: H₂ + O₂ → H₂O. Balanced: 2H₂ + O₂ → 2H₂O. Now there are 4 H and 2 O on each side."},
        {mem:"Balance by changing coefficients (the big numbers) — never change the subscripts."},
        {h:"Mole ratios"},
        {p:"The coefficients in a balanced equation give mole ratios, the heart of stoichiometry."},
        {ex:"In 2H₂ + O₂ → 2H₂O, the ratio is 2 mol H₂ : 1 mol O₂ : 2 mol H₂O. So 2 moles of hydrogen react with 1 mole of oxygen to form 2 moles of water."},
        {h:"Limiting reactant"},
        {p:"Reactions rarely have ingredients in perfect ratio. The limiting reactant is the one that runs out first and decides how much product can form. The others are in excess."},
        {ul:[
          "Convert each reactant's grams to moles.",
          "Use mole ratios to find how much product each could make.",
          "The reactant that produces the least product is limiting."
        ]},
        {ex:"If you have 10 buns and 8 patties, you can only make 8 burgers — patties are limiting, 2 buns are in excess."},
        {hl:"The limiting reactant, not the total amount, determines the actual yield."},
        {app:"In chemical plants, engineers identify the limiting reactant to avoid wasting expensive materials and to predict output precisely."},
        {recap:[
          "Balanced equations conserve atoms.",
          "Coefficients give mole ratios.",
          "The limiting reactant decides maximum product.",
          "Theoretical yield vs actual yield (percent yield = actual/theoretical × 100)."
        ]},
        {recall:[
          "Balance: N₂ + H₂ → NH₃.",
          "What is a limiting reactant?",
          "If actual yield is 8 g and theoretical is 10 g, what is the percent yield?"
        ]}
      ]},
      { n:7, title:"Chemical Reactions and Equations", blocks:[
        {h:"Overview"},
        {p:"Chemical reactions rearrange atoms into new substances. Recognizing the type of reaction helps you predict products. This lesson sorts reactions into five main types."},
        {h:"The five main reaction types"},
        {ul:[
          "Synthesis (combination): A + B → AB. Two things join.",
          "Decomposition: AB → A + B. One thing breaks apart.",
          "Single replacement: A + BC → AC + B. One element swaps in.",
          "Double replacement: AB + CD → AD + CB. Partners swap (often in solution).",
          "Combustion: fuel + O₂ → CO₂ + H₂O (+ energy)."
        ]},
        {ex:"Synthesis: 2H₂ + O₂ → 2H₂O. Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O."},
        {mem:"Synthesis = build up · Decomposition = break down · Replacement = swap partners."},
        {h:"Evidence a reaction happened"},
        {ul:[
          "Color change, gas bubbles, temperature change, light, or a solid (precipitate) forming."
        ]},
        {h:"Redox reactions (a quick look)"},
        {p:"Many reactions involve the transfer of electrons — called oxidation-reduction or redox. 'LEO says GER': Losing Electrons is Oxidation; Gaining Electrons is Reduction. They always happen together."},
        {app:"Combustion powers engines and power plants; corrosion is an unwanted redox reaction that costs industry billions. Engineers design coatings and alloys to slow it."},
        {recap:[
          "Five types: synthesis, decomposition, single & double replacement, combustion.",
          "Watch for signs: gas, color, heat, precipitate.",
          "Redox = electron transfer (LEO-GER)."
        ]},
        {recall:[
          "Classify: CaCO₃ → CaO + CO₂.",
          "Classify: 2Na + Cl₂ → 2NaCl.",
          "What are two signs a reaction occurred?"
        ]}
      ]},
      { n:8, title:"Solutions and Concentration", blocks:[
        {h:"Overview"},
        {p:"A solution is a uniform mixture. Understanding concentration lets you describe exactly how much solute is dissolved — vital for chemistry, biology, and engineering."},
        {h:"Key terms"},
        {ul:[
          "Solute — the substance dissolved (usually the smaller amount).",
          "Solvent — the substance doing the dissolving (usually the larger amount).",
          "Solution — the uniform mixture of both.",
          "Soluble / insoluble — whether a substance dissolves."
        ]},
        {ex:"In salt water, salt is the solute and water is the solvent."},
        {h:"Molarity (M)"},
        {p:"Molarity is moles of solute per liter of solution. It is the most common concentration unit in the lab."},
        {hl:"Molarity = moles of solute ÷ liters of solution (mol/L)."},
        {ex:"Dissolve 1 mole of NaCl in enough water to make 1 L → a 1 M solution. Dissolve 0.5 mol in 1 L → 0.5 M."},
        {h:"Dilution"},
        {p:"Adding solvent lowers concentration. Use M₁V₁ = M₂V₂: the moles of solute stay the same before and after."},
        {ex:"How much 6 M acid makes 500 mL of 1 M? M₁V₁ = M₂V₂ → 6 × V₁ = 1 × 500 → V₁ ≈ 83 mL, then add water to reach 500 mL."},
        {mem:"M₁V₁ = M₂V₂ — moles don't change when you dilute."},
        {app:"Engineers control solution concentration in water treatment, electroplating, food processing, and battery electrolytes — precision protects quality and safety."},
        {recap:[
          "Solution = solute + solvent.",
          "Molarity = moles solute / liters solution.",
          "Dilution: M₁V₁ = M₂V₂."
        ]},
        {recall:[
          "What is the molarity of 2 mol NaCl in 1 L solution?",
          "Name the solute and solvent in sugar water.",
          "Using M₁V₁=M₂V₂, what happens to molarity when you add water?"
        ]}
      ]},
      { n:9, title:"Gases and the Gas Laws", blocks:[
        {h:"Overview"},
        {p:"Gases expand, compress, and respond strongly to pressure and temperature. The gas laws describe these relationships and are essential for engines, tires, and pressure vessels."},
        {h:"Properties of gases"},
        {ul:[
          "Gases fill their container and are easily compressed.",
          "Gas molecules move fast and are far apart.",
          "Pressure, volume, temperature, and amount are all linked."
        ]},
        {h:"Boyle's Law (pressure ↔ volume)"},
        {p:"At constant temperature, pressure and volume are inversely related: squeeze a gas and the pressure rises."},
        {hl:"P₁V₁ = P₂V₂ (temperature constant)."},
        {h:"Charles's Law (temperature ↔ volume)"},
        {p:"At constant pressure, volume increases with temperature: heat a gas and it expands."},
        {hl:"V₁/T₁ = V₂/T₂ (pressure constant). Always use Kelvin."},
        {mem:"Temperature in gas problems is ALWAYS Kelvin: K = °C + 273.15."},
        {h:"The Ideal Gas Law"},
        {p:"One equation ties everything together: PV = nRT, where P = pressure, V = volume, n = moles, R = the gas constant, T = temperature in Kelvin."},
        {ex:"A balloon in a hot car expands and may pop — Charles's Law. A sealed chip bag puffs up at altitude — Boyle's Law (lower outside pressure)."},
        {app:"Internal combustion engines, air conditioners, scuba tanks, and tire design all rely on the gas laws. Getting them wrong means blowouts or explosions."},
        {recap:[
          "Boyle: P↑ V↓ (constant T).",
          "Charles: T↑ V↑ (constant P).",
          "Ideal gas law: PV = nRT — always Kelvin."
        ]},
        {recall:[
          "Convert 25 °C to Kelvin.",
          "What happens to a gas's volume if you double the pressure at constant T?",
          "Write the ideal gas law."
        ]}
      ]},
      { n:10, title:"Thermochemistry", blocks:[
        {h:"Overview"},
        {p:"Thermochemistry studies the heat involved in chemical reactions and physical changes. It explains why some reactions feel hot and others cold — and how energy is stored in fuel."},
        {h:"Exothermic vs endothermic"},
        {ul:[
          "Exothermic — releases heat into surroundings (feels hot). Example: burning, hand warmers.",
          "Endothermic — absorbs heat from surroundings (feels cold). Example: melting ice, instant cold packs."
        ]},
        {mem:"Exothermic = EXits heat. Endothermic = ENters heat (takes it in)."},
        {h:"Enthalpy (ΔH)"},
        {p:"Enthalpy is the heat content of a system. The change in enthalpy, ΔH, tells you the heat of a reaction at constant pressure. Negative ΔH = exothermic; positive ΔH = endothermic."},
        {hl:"ΔH < 0 releases energy; ΔH > 0 requires energy."},
        {h:"Calorimetry"},
        {p:"Calorimetry measures heat flow using q = m·c·ΔT, where q = heat, m = mass, c = specific heat capacity, and ΔT = temperature change."},
        {ex:"Water has a high specific heat, so it takes a lot of energy to warm — which is why coastal climates stay mild."},
        {h:"Conservation of energy"},
        {p:"Energy cannot be created or destroyed, only transformed. The heat released by a reaction equals the heat absorbed by its surroundings."},
        {app:"Engineers use thermochemistry to design engines, power plants, batteries, and insulation. Fuels are chosen for their heat output per gram."},
        {recap:[
          "Exothermic releases heat (−ΔH); endothermic absorbs heat (+ΔH).",
          "q = m·c·ΔT measures heat flow.",
          "Energy is conserved in every reaction."
        ]},
        {recall:[
          "Is burning wood exothermic or endothermic?",
          "What does a negative ΔH mean?",
          "In q = m·c·ΔT, what does c represent?"
        ]}
      ]},
      { n:11, title:"Atomic Structure and Periodic Trends", blocks:[
        {h:"Overview"},
        {p:"After atoms, the next question is: how are electrons arranged, and why do elements behave in repeating patterns? The answer lies in atomic structure and the periodic table."},
        {h:"Electron shells"},
        {p:"Electrons occupy energy levels (shells) around the nucleus. The first shell holds 2 electrons, the second 8. The outermost shell determines how an element reacts."},
        {mem:"Valence electrons = the electrons in the outermost shell. They decide chemistry."},
        {h:"The periodic table is organized"},
        {ul:[
          "Rows (periods) = number of electron shells.",
          "Columns (groups) = same number of valence electrons → similar chemistry.",
          "Group 1 = reactive metals; Group 17 = reactive nonmetals; Group 18 = noble gases (inert)."
        ]},
        {h:"Periodic trends"},
        {ul:[
          "Atomic radius — decreases across a row (left→right), increases down a column.",
          "Ionization energy — energy to remove an electron; increases across a row, decreases down.",
          "Electronegativity — how strongly an atom pulls shared electrons; follows ionization energy."
        ]},
        {ex:"Fluorine (top-right) has very high electronegativity and grabs electrons. Cesium (bottom-left) easily loses electrons — opposite personalities."},
        {app:"Engineers pick elements by these trends: highly conductive metals for wiring, inert noble gases for lighting, reactive elements for batteries."},
        {recap:[
          "Electrons fill shells; valence electrons drive reactions.",
          "Columns share chemistry; rows add shells.",
          "Radius, ionization energy, and electronegativity follow clear trends."
        ]},
        {recall:[
          "What are valence electrons?",
          "Does atomic radius increase or decrease down a group?",
          "Which group is the noble gases, and why are they unreactive?"
        ]}
      ]},
      { n:12, title:"Chemical Bonding and Materials — Review", blocks:[
        {h:"Overview"},
        {p:"Atoms bond to gain stable electron arrangements. The type of bond decides a material's properties — strength, melting point, conductivity. This lesson ties bonding to real engineering materials and reviews the course."},
        {h:"Three bond types"},
        {ul:[
          "Ionic bond — metal gives electrons to nonmetal; strong, forms crystals (NaCl).",
          "Covalent bond — two nonmetals share electrons (H₂O, CO₂).",
          "Metallic bond — electrons flow freely among metal atoms; gives conductivity."
        ]},
        {mem:"Ionic = give/take. Covalent = share. Metallic = sea of electrons."},
        {h:"How bonding shapes properties"},
        {ul:[
          "Ionic solids: high melting points, brittle, conduct only when dissolved/molten.",
          "Covalent molecules: lower melting points, often poor conductors.",
          "Metals: malleable, ductile, excellent conductors."
        ]},
        {hl:"Free-moving electrons in metals are exactly why metals conduct electricity."},
        {h:"Intermolecular forces"},
        {p:"Between molecules, weaker forces (like hydrogen bonds in water) decide boiling points, surface tension, and viscosity. Stronger forces = higher boiling points."},
        {app:"Engineers choose materials by bonding: copper for wiring (metallic), ceramics for heat shields (ionic/covalent), polymers for light parts (covalent chains)."},
        {h:"Course recap"},
        {ul:[
          "Matter and measurement set the foundation.",
          "Atoms, the mole, and formulas connect the tiny to the weighable.",
          "Reactions, stoichiometry, solutions, gases, and heat describe change.",
          "Structure, trends, and bonding explain material properties."
        ]},
        {recall:[
          "Which bond gives metals their conductivity?",
          "Why does NaCl conduct electricity only when dissolved?",
          "Summarize in one sentence what the mole concept does."
        ]}
      ]}
    ]
  },

  {
    code:"CPE 111", title:"Computer Engineering as a Discipline",
    color:"#3b82f6", units:2,
    desc:"An introduction to computer engineering: how digital systems work, from logic gates to full computers and the profession itself.",
    lessons:[
      { n:1, title:"Introduction to Computer Engineering", blocks:[
        {h:"Overview"},
        {p:"Computer engineering blends electrical engineering and computer science to design the hardware and software that power modern technology. This lesson introduces the field, its scope, and why it matters."},
        {h:"What is computer engineering?"},
        {p:"Computer engineers build the systems that compute — from tiny chips inside appliances to huge data centers. They work where hardware meets software."},
        {ul:[
          "Hardware — processors, memory, circuits, sensors.",
          "Software — operating systems, firmware, applications.",
          "Integration — making hardware and software work together reliably."
        ]},
        {mem:"Computer engineering = Electrical Engineering + Computer Science, focused on building computing systems."},
        {h:"Related fields and the difference"},
        {ul:[
          "Electrical engineering — broader; power, signals, electronics.",
          "Computer science — more software, algorithms, theory.",
          "Computer engineering — the bridge between the two."
        ]},
        {hl:"Computer engineers turn ideas into working machines by mastering both the physical circuits and the code that runs on them."},
        {h:"Why it matters"},
        {p:"Smartphones, cars, medical devices, robots, and the internet all depend on computer engineering. The field drives automation, communication, and innovation."},
        {app:"Embedded systems in cars control braking and engine timing; errors there can be fatal — so computer engineers design for safety and reliability."},
        {recap:[
          "Computer engineering combines hardware and software.",
          "It bridges electrical engineering and computer science.",
          "It powers nearly every modern device."
        ]},
        {recall:[
          "Name two things a computer engineer might design.",
          "How is computer engineering different from computer science?",
          "Give one everyday device that depends on computer engineering."
        ]}
      ]},
      { n:2, title:"Engineering Roles and Disciplines", blocks:[
        {h:"Overview"},
        {p:"Engineering is about solving real problems using science and math. This lesson explores the engineering mindset, major disciplines, and where computer engineering fits."},
        {h:"What engineers do"},
        {ul:[
          "Define a problem and its constraints.",
          "Apply math, science, and creativity to design a solution.",
          "Build, test, and improve until it works reliably."
        ]},
        {mem:"Engineers solve problems; scientists explain phenomena. Engineers ask 'how can we make this work?'"},
        {h:"Major engineering disciplines"},
        {ul:[
          "Civil — structures, roads, water systems.",
          "Mechanical — machines, engines, moving parts.",
          "Electrical — power, circuits, signals.",
          "Chemical — materials, fuels, processes.",
          "Computer / Software — computing systems and programs."
        ]},
        {h:"The engineering design process"},
        {ol:["Identify the need.","Research and brainstorm.","Choose a solution.","Prototype and build.","Test and evaluate.","Improve and iterate."]},
        {app:"Computer engineers often work on cross-disciplinary teams — for example, helping mechanical engineers add smart sensors and controls to a robot."},
        {recap:[
          "Engineering uses science and math to solve problems.",
          "Many disciplines exist; computer engineering focuses on computing systems.",
          "The design process is iterative: build, test, improve."
        ]},
        {recall:[
          "List three engineering disciplines.",
          "What is the difference between a scientist and an engineer?",
          "Name one step in the design process."
        ]}
      ]},
      { n:3, title:"Computer Systems Overview", blocks:[
        {h:"Overview"},
        {p:"Every computer, from a phone to a supercomputer, follows the same basic model. This lesson introduces the parts of a computer system and how they cooperate."},
        {h:"The classic model: hardware components"},
        {ul:[
          "Input — keyboard, mouse, sensors (bring data in).",
          "Output — screen, speaker, motor (send results out).",
          "Processor (CPU) — the 'brain' that computes.",
          "Memory — holds data and programs (RAM = working memory; storage = long-term)."
        ]},
        {mem:"Input → Process → Output, with Memory holding the data throughout."},
        {h:"Hardware vs software vs firmware"},
        {ul:[
          "Hardware — physical parts you can touch.",
          "Software — programs and instructions.",
          "Firmware — low-level software stored permanently in hardware (like a device's built-in program)."
        ]},
        {h:"The stored-program concept"},
        {p:"Modern computers store both data and instructions in memory, so the same machine can do different jobs just by loading new software. This flexibility is what makes computers so powerful."},
        {hl:"The CPU reads instructions from memory, executes them one at a time, and writes results back — billions of times per second."},
        {app:"Understanding this overview helps engineers diagnose problems: a slow task could be CPU, memory, or storage related."},
        {recap:[
          "Computers use input, process, output, and memory.",
          "Hardware is physical; software is instructions; firmware is built-in.",
          "Stored programs make computers flexible."
        ]},
        {recall:[
          "Name the four main hardware groups.",
          "What does the CPU do?",
          "What is firmware?"
        ]}
      ]},
      { n:4, title:"Digital Information and Data", blocks:[
        {h:"Overview"},
        {p:"Computers store everything — text, images, music — as digital data made of 0s and 1s. This lesson explains bits, bytes, and how the real world becomes digital."},
        {h:"Bits and bytes"},
        {ul:[
          "Bit — a single 0 or 1, the smallest unit of data.",
          "Byte — 8 bits.",
          "Larger units: kilobyte (KB), megabyte (MB), gigabyte (GB), terabyte (TB) — each ~1000× the last."
        ]},
        {mem:"1 byte = 8 bits. Think of a bit as a light switch (off=0, on=1)."},
        {h:"Why binary?"},
        {p:"Electronic circuits reliably detect two states — voltage high or low. Two states map perfectly to 0 and 1, so computers use binary. It's about reliability, not preference."},
        {h:"Representing different data"},
        {ul:[
          "Text — each character gets a number code (ASCII, Unicode).",
          "Images — grids of pixels; each pixel stores color values.",
          "Sound — waves sampled into numbers many times per second."
        ]},
        {ex:"The letter 'A' in ASCII is the number 65, which in binary is 01000001 — one byte."},
        {app:"Knowing data sizes helps engineers estimate storage, network speeds, and memory needs when designing systems."},
        {recap:[
          "All data is stored as bits (0 and 1).",
          "8 bits = 1 byte.",
          "Different data types use encoding schemes."
        ]},
        {recall:[
          "How many bits are in a byte?",
          "Why do computers use binary?",
          "Which is larger: 1 MB or 1 KB?"
        ]}
      ]},
      { n:5, title:"Number Systems", blocks:[
        {h:"Overview"},
        {p:"Computers think in binary, but humans prefer decimal. This lesson covers decimal, binary, and hexadecimal, and how to convert between them — a core skill for computer engineering."},
        {h:"Place value is the key idea"},
        {p:"Every number system uses place value, but with a different base. Decimal is base-10; binary is base-2; hexadecimal is base-16."},
        {mem:"Decimal = base 10 (0–9). Binary = base 2 (0–1). Hex = base 16 (0–9, A–F)."},
        {h:"Decimal to binary"},
        {p:"Divide by 2 repeatedly and collect the remainders, reading from bottom to top."},
        {ex:"13 ÷ 2 = 6 r1; 6 ÷ 2 = 3 r0; 3 ÷ 2 = 1 r1; 1 ÷ 2 = 0 r1. Read bottom-up: 1101. So 13 = 1101₂."},
        {h:"Binary to decimal"},
        {p:"Multiply each bit by its place value (1, 2, 4, 8, …) and add."},
        {ex:"1011₂ = 8 + 0 + 2 + 1 = 11₁₀."},
        {h:"Hexadecimal"},
        {p:"Hex groups 4 bits into one digit, so it's a compact way to write binary. Each hex digit maps to exactly 4 bits: F = 1111, A = 1010."},
        {ex:"Binary 1111 0000 = hex F0. Memory addresses and color codes (like #FF0000 red) use hex."},
        {hl:"1 hex digit = 4 bits = 1 'nibble'. 2 hex digits = 1 byte."},
        {app:"Programmers and engineers read hex constantly — in memory addresses, machine code, color values, and network packets."},
        {recap:[
          "Place value changes with the base.",
          "Decimal↔binary: divide-by-2 or sum place values.",
          "Hex compresses binary; 1 hex digit = 4 bits."
        ]},
        {recall:[
          "Convert 9 to binary.",
          "Convert 1010₂ to decimal.",
          "How many bits does one hex digit represent?"
        ]}
      ]},
      { n:6, title:"Boolean Algebra and Logic", blocks:[
        {h:"Overview"},
        {p:"Boolean algebra is the math of true/false. It is the foundation of all digital logic — how computers make decisions. This lesson covers the basic operations."},
        {h:"Boolean values"},
        {p:"A Boolean has only two values: TRUE (1) or FALSE (0). Every condition a computer checks boils down to Boolean logic."},
        {h:"The basic operations"},
        {ul:[
          "AND — true only if ALL inputs are true.",
          "OR — true if ANY input is true.",
          "NOT — reverses the input (true ↔ false)."
        ]},
        {ex:"A door that unlocks only with the right key AND the right code = AND. A door that unlocks with EITHER a key OR a code = OR."},
        {mem:"AND = all must be true · OR = any can be true · NOT = flip it."},
        {h:"Truth tables"},
        {p:"A truth table lists every input combination and the output. They are the clearest way to describe a logic function."},
        {ex:"For A AND B: only the row where A=1 AND B=1 gives output 1; all others give 0."},
        {h:"Combining operations"},
        {p:"Just like arithmetic, Boolean operations combine into expressions: NOT (A AND B). Engineers simplify these to use fewer gates."},
        {app:"Search engines, database filters, and access-control systems all use Boolean logic. Every IF statement in code is Boolean."},
        {recap:[
          "Boolean values are true/false (1/0).",
          "AND needs all true; OR needs any true; NOT flips.",
          "Truth tables describe logic completely."
        ]},
        {recall:[
          "What is the output of TRUE AND FALSE?",
          "What does NOT TRUE equal?",
          "When is A OR B false?"
        ]}
      ]},
      { n:7, title:"Digital Logic Gates", blocks:[
        {h:"Overview"},
        {p:"Logic gates are the physical circuits that perform Boolean operations. They are the building blocks of every processor. This lesson introduces the main gates and their symbols."},
        {h:"The common gates"},
        {ul:[
          "AND gate — output 1 only if all inputs are 1.",
          "OR gate — output 1 if any input is 1.",
          "NOT gate (inverter) — output is the opposite of input.",
          "NAND, NOR, XOR — useful combinations."
        ]},
        {mem:"NAND = NOT AND · NOR = NOT OR · XOR = 'one or the other, not both'."},
        {h:"NAND is universal"},
        {p:"NAND gates alone can build any other gate — AND, OR, NOT, everything. This makes NAND a favorite in chip manufacturing because one type of gate can construct entire processors."},
        {hl:"Any digital circuit can be built using only NAND gates (or only NOR gates). They are 'universal gates'."},
        {h:"From gates to chips"},
        {p:"Millions or billions of transistors form gates, which form circuits, which form entire processors. Modern chips pack billions of transistors into a fingernail-sized area."},
        {app:"Engineers design with gates to build adders, memory cells, and control units. Choosing the right gates affects speed, cost, and power use."},
        {recap:[
          "Gates perform Boolean operations in hardware.",
          "AND, OR, NOT are the basics; NAND/NOR are universal.",
          "Billions of gates make up modern processors."
        ]},
        {recall:[
          "What Boolean operation does an AND gate perform?",
          "Why is the NAND gate called 'universal'?",
          "What does an XOR gate output for (1, 1)?"
        ]}
      ]},
      { n:8, title:"Combinational Circuits", blocks:[
        {h:"Overview"},
        {p:"A combinational circuit combines gates so the output depends only on the current inputs. This lesson shows how gates team up to do useful work like adding numbers."},
        {h:"What makes a circuit combinational"},
        {p:"Combinational circuits have no memory — the output is determined entirely by the inputs right now. Change the inputs, and the output changes immediately."},
        {h:"Examples of combinational circuits"},
        {ul:[
          "Adders — add binary numbers (half adder adds 2 bits; full adder handles carries).",
          "Multiplexers — select one of several inputs to send onward.",
          "Decoders — convert coded inputs into readable outputs.",
          "Encoders — the reverse of decoders."
        ]},
        {ex:"A half adder takes two 1-bit inputs and outputs a sum and a carry bit — exactly how binary addition produces carries, like 1 + 1 = 10₂."},
        {mem:"Combinational = no memory · Sequential = has memory."},
        {h:"Designing a combinational circuit"},
        {ol:["Define the truth table for the task.","Write the Boolean expression.","Simplify it.","Draw the gate circuit."]},
        {app:"Adders and multiplexers form the arithmetic and routing cores of CPUs. Engineers optimize them for speed and low power."},
        {recap:[
          "Combinational outputs depend only on current inputs (no memory).",
          "Adders, multiplexers, and decoders are common examples.",
          "Design starts with a truth table and ends with gates."
        ]},
        {recall:[
          "Does a combinational circuit remember past inputs?",
          "What does a half adder output?",
          "What does a multiplexer do?"
        ]}
      ]},
      { n:9, title:"Sequential Circuits and Memory", blocks:[
        {h:"Overview"},
        {p:"Unlike combinational circuits, sequential circuits remember — their output depends on current inputs AND past states. This memory is what lets computers count, store, and run programs step by step."},
        {h:"The key idea: state and memory"},
        {p:"A sequential circuit holds information (its state) and can change it over time using a clock signal that ticks in regular steps."},
        {h:"Important sequential components"},
        {ul:[
          "Flip-flop — stores 1 bit; the basic memory cell.",
          "Register — a group of flip-flops storing several bits.",
          "Counter — counts clock pulses.",
          "Clock — a steady timing signal that synchronizes everything."
        ]},
        {mem:"Flip-flop = 1-bit memory · Clock = the heartbeat that times changes."},
        {h:"Why memory changes everything"},
        {p:"With memory, a circuit can follow a sequence of instructions, recall results, and branch based on conditions. This is what turns a pile of gates into a working computer."},
        {ex:"A 4-bit counter using flip-flops counts 0000, 0001, 0010 … up — only possible because it remembers where it is."},
        {app:"RAM and registers in every device are built from sequential circuits. Without memory, there are no programs, files, or saved games."},
        {recap:[
          "Sequential circuits have memory and state.",
          "Flip-flops store bits; clocks time the changes.",
          "Memory enables programs and stored data."
        ]},
        {recall:[
          "How is a sequential circuit different from a combinational one?",
          "What does a flip-flop store?",
          "What is the role of the clock?"
        ]}
      ]},
      { n:10, title:"Computer Organization: CPU and Memory", blocks:[
        {h:"Overview"},
        {p:"Now the pieces come together into a full computer. This lesson explains how the CPU, memory, and buses cooperate to run programs."},
        {h:"Inside the CPU"},
        {ul:[
          "Control unit — directs operations, decides what to do next.",
          "ALU (Arithmetic Logic Unit) — performs calculations and logic.",
          "Registers — tiny, ultra-fast storage inside the CPU."
        ]},
        {mem:"Control unit = manager · ALU = calculator · Registers = CPU's pockets."},
        {h:"The fetch–execute cycle"},
        {ol:["Fetch the next instruction from memory.","Decode what it means.","Execute it using the ALU.","Store the result, then repeat."]},
        {hl:"A CPU repeats fetch–decode–execute billions of times per second — that speed is what makes computers feel instant."},
        {h:"Memory hierarchy"},
        {ul:[
          "Registers — fastest, smallest, inside CPU.",
          "Cache — very fast, small, near CPU.",
          "RAM — fast, larger, main working memory.",
          "Storage (SSD/HDD) — slowest, largest, permanent."
        ]},
        {app:"Engineers balance speed, cost, and size across this hierarchy. More cache speeds up programs but raises cost."},
        {recap:[
          "CPU = control unit + ALU + registers.",
          "The fetch–execute cycle runs programs.",
          "Memory forms a speed/cost hierarchy."
        ]},
        {recall:[
          "What are the three main parts of a CPU?",
          "List the fetch–execute steps.",
          "Which is faster: registers or RAM?"
        ]}
      ]},
      { n:11, title:"Programming, Problem Solving & Review", blocks:[
        {h:"Overview"},
        {p:"Hardware needs instructions to do anything useful — that's software. This lesson introduces programming, algorithms, and reviews the course, tying everything together."},
        {h:"What is programming?"},
        {p:"Programming is writing precise step-by-step instructions for a computer. A programming language lets humans express logic that the machine then executes."},
        {h:"Algorithms and flowcharts"},
        {ul:[
          "Algorithm — a clear, ordered set of steps to solve a problem.",
          "Flowchart — a diagram of those steps using shapes and arrows.",
          "Pseudocode — plain-language logic that resembles code."
        ]},
        {ex:"Algorithm to make coffee: boil water → add coffee → wait → pour. Every program is just a more detailed version of this kind of list."},
        {mem:"Algorithm = recipe for the computer. Flowchart = its picture."},
        {h:"The engineering problem-solving approach"},
        {p:"Define the problem clearly, break it into parts, design a solution, then code and test. Good engineers think before they type."},
        {h:"Course recap"},
        {ul:[
          "Computer engineering blends hardware and software.",
          "Data is binary; logic is Boolean; circuits are built from gates.",
          "Combinational circuits compute; sequential circuits remember.",
          "CPU + memory run the fetch–execute cycle; programming directs it all."
        ]},
        {app:"A computer engineer who understands both the hardware limits and the software logic can build faster, more reliable systems than someone who knows only one side."},
        {recap:[
          "Programs are precise instructions; algorithms are their plan.",
          "Flowcharts and pseudocode help design before coding.",
          "The whole course: bits → gates → circuits → CPU → programs."
        ]},
        {recall:[
          "What is an algorithm?",
          "Name two tools for planning a program before coding.",
          "Summarize how hardware and software work together."
        ]}
      ]}
    ]
  },

  {
    code:"MATH 001", title:"Calculus 1",
    color:"#6366f1", units:4,
    desc:"Limits, derivatives, and integrals — the mathematics of change, used throughout engineering and physics.",
    lessons:[
      { n:1, title:"Functions and Their Graphs", blocks:[
        {h:"Overview"},
        {p:"Calculus studies how quantities change. Before changing anything, we need functions — the objects calculus operates on. This lesson reviews what a function is and how to read its graph."},
        {h:"What is a function?"},
        {p:"A function is a rule that assigns each input exactly one output. If f(x) = 2x + 1, then an input of 3 gives the single output 7."},
        {mem:"A function is like a machine: one input in → one output out. No input may give two different answers."},
        {h:"Domain and range"},
        {ul:[
          "Domain — all allowed input values (x).",
          "Range — all resulting output values (f(x))."
        ]},
        {ex:"For f(x) = √x, the domain is x ≥ 0 (no negative inputs allowed), and the range is also f(x) ≥ 0."},
        {h:"Reading a graph"},
        {p:"A graph shows input on the horizontal axis and output on the vertical. The vertical-line test checks if a graph is a function: if any vertical line hits the graph more than once, it's not a function."},
        {hl:"A function passes the vertical-line test — each x has only one y."},
        {h:"Common function families"},
        {ul:["Linear — straight lines (mx + b).","Quadratic — parabolas (ax² + bx + c).","Polynomial, exponential, trigonometric."]},
        {app:"Engineers model speed, temperature, current, and force as functions of time. Understanding graphs lets them predict behavior visually."},
        {recap:[
          "A function maps each input to exactly one output.",
          "Domain = inputs; range = outputs.",
          "The vertical-line test identifies functions."
        ]},
        {recall:[
          "If f(x) = 3x − 2, what is f(4)?",
          "What is the domain of f(x) = 1/x?",
          "What does the vertical-line test check?"
        ]}
      ]},
      { n:2, title:"Limits and Continuity", blocks:[
        {h:"Overview"},
        {p:"The limit is the foundation idea of calculus. It asks: as x gets closer and closer to a value, what does f(x) approach? This lesson explains limits and continuity."},
        {h:"The idea of a limit"},
        {p:"We write lim(x→a) f(x) = L to mean 'as x approaches a, the function values approach L.' We care about the approach, not necessarily the value at a."},
        {ex:"For f(x) = (x²−1)/(x−1), we can't plug in x=1 directly (division by zero). But as x approaches 1, the values approach 2. So the limit is 2."},
        {mem:"Limit = the value the function is heading toward, not necessarily the value it reaches."},
        {h:"Continuity"},
        {p:"A function is continuous at a point if you can draw through it without lifting your pen — the limit exists, the function is defined there, and they match."},
        {hl:"Continuous: no jumps, holes, or breaks. Discontinuous: there's a gap or jump."},
        {h:"Why limits matter"},
        {p:"Limits let us handle instantaneous values — like the exact speed at a single moment — which ordinary algebra cannot. They make derivatives and integrals possible."},
        {mis:"The limit as x→a does not require f(a) to exist. The function can have a hole there and still have a perfectly good limit."},
        {app:"Engineers use continuity to model smooth physical processes. A sudden discontinuity often signals a real event — a switch flipping, a material breaking."},
        {recap:[
          "A limit is the value a function approaches.",
          "Continuous functions have no jumps or holes.",
          "Limits make instantaneous rates possible."
        ]},
        {recall:[
          "What does lim(x→a) describe?",
          "Must f(a) exist for the limit at a to exist?",
          "Name a type of discontinuity."
        ]}
      ]},
      { n:3, title:"The Derivative", blocks:[
        {h:"Overview"},
        {p:"The derivative is calculus's star tool — it measures how fast something changes at an instant. This lesson explains what a derivative is, both geometrically and physically."},
        {h:"The derivative as a rate of change"},
        {p:"The derivative of a function tells you its instantaneous rate of change. If position is a function of time, the derivative is the velocity at that exact moment."},
        {hl:"Derivative = instantaneous rate of change = slope of the tangent line."},
        {h:"The derivative as slope"},
        {p:"Geometrically, the derivative at a point is the slope of the tangent line — the line that just touches the curve there. A steep curve has a large derivative."},
        {mem:"Derivative = slope. Positive slope → rising; negative slope → falling; zero slope → flat (top or bottom)."},
        {ex:"If f(x) = x², then f'(x) = 2x. At x=3 the slope is 2(3)=6, so the curve is rising steeply there."},
        {h:"Notation"},
        {p:"Derivatives appear as f'(x), y', or dy/dx — they all mean the same thing."},
        {app:"Velocity is the derivative of position; acceleration is the derivative of velocity. Engineers use derivatives to analyze speed, growth, and reaction rates."},
        {recap:[
          "The derivative is the instantaneous rate of change.",
          "It equals the slope of the tangent line.",
          "Velocity and acceleration are derivatives."
        ]},
        {recall:[
          "What does the derivative measure?",
          "If f'(x) is positive, is the function rising or falling?",
          "What physical quantity is the derivative of position?"
        ]}
      ]},
      { n:4, title:"Differentiation Rules", blocks:[
        {h:"Overview"},
        {p:"Computing derivatives from scratch every time is slow. Calculus provides rules that make differentiation fast. This lesson covers the essential rules."},
        {h:"The power rule"},
        {p:"For f(x) = xⁿ, the derivative is f'(x) = n·xⁿ⁻¹. Bring the power down, then subtract one from the exponent."},
        {ex:"f(x) = x³ → f'(x) = 3x². f(x) = x⁵ → f'(x) = 5x⁴."},
        {mem:"Power rule: bring the exponent down front, then drop the exponent by one."},
        {h:"Constant and sum rules"},
        {ul:[
          "Derivative of a constant is 0 (constants don't change).",
          "Derivative of a sum = sum of the derivatives (differentiate term by term)."
        ]},
        {h:"Product and quotient rules"},
        {p:"When functions are multiplied or divided, use special rules. Product rule handles products; quotient rule handles ratios."},
        {ex:"Derivative of 5x² is 5·2x = 10x (constants multiply through)."},
        {h:"Chain rule"},
        {p:"For nested functions like (x²+1)⁵, the chain rule differentiates the outside, then multiplies by the derivative of the inside. It's essential for complex functions."},
        {app:"These rules let engineers quickly find rates of change for realistic models like compound growth, wave motion, and electrical signals."},
        {recap:[
          "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹.",
          "Constants → 0; sums differentiate term by term.",
          "Product, quotient, and chain rules handle combinations."
        ]},
        {recall:[
          "Differentiate f(x) = x⁴.",
          "What is the derivative of a constant?",
          "Which rule handles nested functions?"
        ]}
      ]},
      { n:5, title:"Implicit Differentiation and Higher Derivatives", blocks:[
        {h:"Overview"},
        {p:"Not every relationship is a clean y = f(x). Sometimes x and y are tangled together in one equation. Implicit differentiation handles those cases, and higher derivatives measure rates of rates."},
        {h:"Implicit differentiation"},
        {p:"When y is not isolated, differentiate both sides of the equation with respect to x, treating y as a function of x and using the chain rule wherever y appears."},
        {ex:"For the circle x² + y² = 25, differentiating gives 2x + 2y·(dy/dx) = 0, so dy/dx = −x/y. We get the slope without solving for y."},
        {mem:"Implicit differentiation: differentiate everything, and whenever you hit a y, multiply by dy/dx."},
        {h:"Higher derivatives"},
        {p:"Taking the derivative again gives the second derivative f''(x) — the rate of change of the rate of change."},
        {ul:[
          "First derivative f'(x) — velocity (rate of position).",
          "Second derivative f''(x) — acceleration (rate of velocity)."
        ]},
        {app:"Acceleration is the second derivative of position. Engineers designing vehicles and structures rely on second derivatives for motion and vibration analysis."},
        {recap:[
          "Implicit differentiation handles tangled x and y.",
          "Differentiate both sides, chain-rule the y terms.",
          "Second derivative = rate of the rate (acceleration)."
        ]},
        {recall:[
          "When would you use implicit differentiation?",
          "What does the second derivative of position represent?",
          "In x² + y² = r², what do you multiply by when differentiating y²?"
        ]}
      ]},
      { n:6, title:"Applications of Derivatives: Rates and Optimization", blocks:[
        {h:"Overview"},
        {p:"Derivatives become powerful tools for solving real problems — finding the fastest, cheapest, or largest something can be. This lesson covers optimization and related rates."},
        {h:"Finding maxima and minima"},
        {p:"At a peak or valley, the tangent is flat — so the derivative is zero. Set f'(x) = 0 to find candidates, then check which are maxima, minima, or neither."},
        {mem:"Where f'(x) = 0, the curve is flat — possible top, bottom, or turning point."},
        {h:"Optimization steps"},
        {ol:["Write a function for what you want to maximize/minimize.","Find where its derivative is zero.","Confirm it's a max or min using the second derivative or sign test."]},
        {ex:"To build the largest rectangular field from a fixed length of fence, you set the area's derivative to zero and solve — calculus finds the optimal shape."},
        {h:"Related rates"},
        {p:"When several quantities change together over time, relate them with an equation, then differentiate with respect to time to find how fast one changes."},
        {app:"Engineers optimize everything: minimum material for maximum strength, maximum profit, minimum cost. Related rates appear in filling tanks, expanding balloons, and moving parts."},
        {recap:[
          "Set the derivative to zero to find peaks and valleys.",
          "Optimization finds the best (max/min) value.",
          "Related rates link changing quantities through differentiation."
        ]},
        {recall:[
          "How do you locate a possible maximum or minimum?",
          "Name one real optimization problem.",
          "What are related rates about?"
        ]}
      ]},
      { n:7, title:"Curve Sketching", blocks:[
        {h:"Overview"},
        {p:"Derivatives reveal the shape of a graph without plotting every point. This lesson shows how the first and second derivatives describe rising, falling, and curvature."},
        {h:"First derivative tells direction"},
        {ul:[
          "f'(x) > 0 — function is increasing (rising).",
          "f'(x) < 0 — function is decreasing (falling).",
          "f'(x) = 0 — flat; possible local max or min."
        ]},
        {mem:"First derivative = direction (up/down). Second derivative = curvature (smile/frown)."},
        {h:"Second derivative tells curvature"},
        {ul:[
          "f''(x) > 0 — concave up (smile shape, holds water).",
          "f''(x) < 0 — concave down (frown shape, sheds water).",
          "Inflection point — where curvature flips."
        ]},
        {h:"Putting it together"},
        {p:"By combining where the function rises/falls and how it curves, you can sketch an accurate graph from the derivatives alone."},
        {app:"Engineers sketch curves to visualize stress, signal strength, and motion. Recognizing shapes from derivatives speeds up analysis enormously."},
        {recap:[
          "f' shows increasing/decreasing.",
          "f'' shows concavity (up or down).",
          "Inflection points are where curvature changes."
        ]},
        {recall:[
          "What does a positive first derivative mean?",
          "What does a positive second derivative mean (curvature)?",
          "What is an inflection point?"
        ]}
      ]},
      { n:8, title:"Antiderivatives and Indefinite Integrals", blocks:[
        {h:"Overview"},
        {p:"Integration is the reverse of differentiation. This lesson introduces antiderivatives — finding a function from its rate of change."},
        {h:"The antiderivative"},
        {p:"If the derivative of x² is 2x, then an antiderivative of 2x is x². Integration undoes differentiation."},
        {mem:"Derivative = speed → Antiderivative = undo to recover the original."},
        {h:"The power rule for integration"},
        {p:"Reverse the derivative rule: to integrate xⁿ, add one to the exponent and divide by the new exponent. Always add +C, the constant of integration."},
        {ex:"∫x² dx = x³/3 + C. We add C because constants vanish when differentiated, so the original could have had any constant."},
        {hl:"Always add '+ C' to an indefinite integral — the original function could have contained any constant."},
        {h:"Why +C?"},
        {p:"Differentiation kills constants: both x² and x²+5 have derivative 2x. So integration can't recover the exact constant — we represent all possibilities with C."},
        {app:"If you know an object's velocity (a rate), integrating gives its position. Engineers recover total quantities from their rates this way."},
        {recap:[
          "Integration reverses differentiation.",
          "Power rule: add one to exponent, divide by it.",
          "Always include + C."
        ]},
        {recall:[
          "What is ∫x³ dx?",
          "Why do we add + C?",
          "Integration is the reverse of what operation?"
        ]}
      ]},
      { n:9, title:"The Definite Integral", blocks:[
        {h:"Overview"},
        {p:"The definite integral computes the total accumulated quantity — and geometrically, the area under a curve between two points. This is one of the most useful tools in calculus."},
        {h:"Integration as area"},
        {p:"The definite integral from a to b equals the signed area between the curve and the x-axis. Above the axis counts positive; below counts negative."},
        {hl:"Definite integral = accumulated total = area under the curve."},
        {h:"The Fundamental Theorem of Calculus"},
        {p:"This theorem connects derivatives and integrals beautifully: to evaluate ∫ from a to b of f(x), find an antiderivative F(x) and compute F(b) − F(a)."},
        {mem:"Fundamental Theorem: ∫(a→b) f(x) dx = F(b) − F(a). No +C needed for definite integrals."},
        {ex:"To find the area under f(x)=x from 0 to 4: antiderivative is x²/2. Evaluate: (4²/2) − (0²/2) = 8 − 0 = 8."},
        {h:"Why it's fundamental"},
        {p:"It says differentiation and integration are opposites — two sides of the same coin. This insight powers most of applied calculus."},
        {app:"Engineers use definite integrals to find total distance from velocity, total work from force, and total charge from current."},
        {recap:[
          "Definite integral = accumulated area.",
          "Fundamental Theorem: F(b) − F(a).",
          "It links differentiation and integration as opposites."
        ]},
        {recall:[
          "What does a definite integral represent geometrically?",
          "State the Fundamental Theorem of Calculus.",
          "Why is no +C needed for definite integrals?"
        ]}
      ]},
      { n:10, title:"Integration Techniques & Review", blocks:[
        {h:"Overview"},
        {p:"Many real integrals don't fit the simple power rule. This lesson introduces basic techniques and reviews the whole course, linking limits, derivatives, and integrals."},
        {h:"Two key techniques"},
        {ul:[
          "Substitution — reverse of the chain rule; used for nested functions.",
          "Recognizing basic forms — integrate by matching known patterns."
        ]},
        {ex:"To integrate 2x·(x²+1)⁴, substitute u = x²+1 (so du = 2x dx). The integral becomes ∫u⁴ du = u⁵/5 + C, then substitute back."},
        {mem:"Substitution = undoing the chain rule. Pick the 'inner function' as u."},
        {h:"Applications of integration"},
        {ul:[
          "Area between curves.",
          "Total distance and displacement.",
          "Average value of a function.",
          "Volumes of solids (in later courses)."
        ]},
        {h:"Course recap: the big picture"},
        {ul:[
          "Limits handle instantaneous values and continuity.",
          "Derivatives measure rates of change and slopes.",
          "Derivative rules make computation fast.",
          "Integrals accumulate totals and find areas; they reverse derivatives."
        ]},
        {app:"Calculus is the language of engineering. Motion, electricity, heat, and growth are all modeled with derivatives and integrals — mastering them unlocks every quantitative field."},
        {recap:[
          "Substitution undoes the chain rule.",
          "Integration finds totals, areas, and averages.",
          "Limits → derivatives → integrals form one unified story."
        ]},
        {recall:[
          "What integration technique reverses the chain rule?",
          "Name one application of the definite integral.",
          "Summarize the relationship between derivatives and integrals."
        ]}
      ]}
    ]
  },

  {
    code:"IEM 001", title:"Fundamentals of Mathematics for Engineers",
    color:"#06b6d4", units:3,
    desc:"The essential math toolkit for engineers: algebra, trigonometry, vectors, complex numbers, matrices, and analytic geometry.",
    lessons:[
      { n:1, title:"Algebra Review and Equations", blocks:[
        {h:"Overview"},
        {p:"Algebra is the language engineers use to describe relationships and solve problems. This lesson reviews core algebra and solving equations that you'll meet in every engineering subject."},
        {h:"Solving linear equations"},
        {p:"To solve an equation, isolate the variable by doing the same operation to both sides until the variable stands alone."},
        {ex:"Solve 2x + 3 = 11. Subtract 3: 2x = 8. Divide by 2: x = 4."},
        {mem:"Golden rule of algebra: whatever you do to one side, do to the other."},
        {h:"Quadratic equations"},
        {p:"A quadratic has the form ax² + bx + c = 0. Solve it by factoring, completing the square, or the quadratic formula."},
        {hl:"Quadratic formula: x = [−b ± √(b² − 4ac)] / (2a)."},
        {h:"The discriminant"},
        {p:"The value b² − 4ac (under the square root) tells you about the solutions: positive means two real roots, zero means one, negative means two complex roots."},
        {app:"Engineers solve equations constantly — to find when a projectile lands, when a circuit reaches equilibrium, or what dimension maximizes strength."},
        {recap:[
          "Balance both sides to isolate the variable.",
          "Quadratics use the formula x = [−b ± √(b²−4ac)] / 2a.",
          "The discriminant predicts the type of solutions."
        ]},
        {recall:[
          "Solve 3x − 6 = 9.",
          "Write the quadratic formula.",
          "What does a negative discriminant mean?"
        ]}
      ]},
      { n:2, title:"Functions and Graphs", blocks:[
        {h:"Overview"},
        {p:"Functions describe how one quantity depends on another — the basis of all modeling. This lesson reviews function types and graphing for engineering use."},
        {h:"Function basics"},
        {p:"A function maps each input to one output. Engineers use functions to model real relationships like pressure vs. temperature or cost vs. quantity."},
        {h:"Important function families"},
        {ul:[
          "Linear — constant rate of change (straight lines).",
          "Quadratic — parabolas, used for trajectories.",
          "Exponential — rapid growth or decay (populations, radioactive decay).",
          "Logarithmic — the inverse of exponential growth."
        ]},
        {mem:"Linear = steady · Exponential = explosive growth · Logarithmic = slows down."},
        {h:"Inverse functions"},
        {p:"An inverse function reverses the original: if f turns x into y, then f⁻¹ turns y back into x. They undo each other."},
        {app:"Engineers fit functions to data to predict behavior — choosing linear, exponential, or other models depending on how the real system changes."},
        {recap:[
          "Functions model input→output relationships.",
          "Common families: linear, quadratic, exponential, logarithmic.",
          "Inverse functions reverse the original."
        ]},
        {recall:[
          "Which function family describes steady, constant change?",
          "Which models rapid growth?",
          "What does an inverse function do?"
        ]}
      ]},
      { n:3, title:"Trigonometry Basics", blocks:[
        {h:"Overview"},
        {p:"Trigonometry relates angles to side lengths in triangles. It's essential for engineering — anything involving waves, rotation, forces, or angles uses it."},
        {h:"The basic ratios"},
        {p:"In a right triangle, for an angle θ:"},
        {ul:[
          "Sine = opposite / hypotenuse",
          "Cosine = adjacent / hypotenuse",
          "Tangent = opposite / adjacent"
        ]},
        {mem:"SOH CAH TOA: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj."},
        {h:"Degrees and radians"},
        {p:"Angles can be measured in degrees (360 in a full circle) or radians (2π in a full circle). Calculus and engineering formulas usually use radians."},
        {ex:"180° = π radians. So 90° = π/2 and 60° = π/3 radians."},
        {h:"Special triangles"},
        {p:"The 45-45-90 and 30-60-90 triangles give common exact values you'll use often — memorize their ratios."},
        {app:"Trigonometry calculates bridge lengths from angles, resolves forces into components, and describes alternating currents and sound waves."},
        {recap:[
          "SOH CAH TOA gives the basic ratios.",
          "180° = π radians.",
          "Special triangles provide common exact values."
        ]},
        {recall:[
          "What does SOH stand for?",
          "How many radians are in 90°?",
          "In a right triangle, which side is the hypotenuse?"
        ]}
      ]},
      { n:4, title:"Trigonometric Identities and Equations", blocks:[
        {h:"Overview"},
        {p:"Identities are equations true for all angles. They let engineers simplify expressions and solve trig equations that appear in waves, signals, and rotations."},
        {h:"The Pythagorean identity"},
        {hl:"sin²θ + cos²θ = 1 — the most important trig identity. It follows directly from the unit circle."},
        {h:"Other key identities"},
        {ul:[
          "Sum and difference formulas combine angles.",
          "Double-angle formulas handle 2θ.",
          "Reciprocal identities: csc, sec, cot."
        ]},
        {mem:"sin²θ + cos²θ = 1 is your best friend — it links sine and cosine everywhere."},
        {h:"Solving trig equations"},
        {p:"To solve, isolate the trig function, find the reference angle, then list all angles that work (solutions repeat every full circle)."},
        {ex:"Solve sin θ = 0.5. The basic solution is θ = 30°, but also θ = 150°, and both repeat every 360°."},
        {app:"Engineers use identities to combine wave signals (like adding two alternating currents) and to simplify complex vibration and rotation problems."},
        {recap:[
          "Identities are always-true relationships.",
          "sin²θ + cos²θ = 1 is fundamental.",
          "Trig equations have repeating solutions."
        ]},
        {recall:[
          "State the Pythagorean identity.",
          "Why do trig equations have repeating solutions?",
          "Name one use of trig identities in engineering."
        ]}
      ]},
      { n:5, title:"Vectors", blocks:[
        {h:"Overview"},
        {p:"Vectors are quantities with both size (magnitude) and direction — like force, velocity, and displacement. This lesson covers vector basics engineers use daily."},
        {h:"Scalar vs vector"},
        {ul:[
          "Scalar — magnitude only (temperature, mass, time).",
          "Vector — magnitude AND direction (force, velocity, displacement)."
        ]},
        {mem:"Scalar = just a number · Vector = number + direction (think of an arrow)."},
        {h:"Vector components"},
        {p:"Any vector can be split into horizontal (x) and vertical (y) components using trigonometry. This turns angled vectors into easier horizontal/vertical pieces."},
        {ex:"A force of 10 N at 30° above horizontal has x-component 10·cos30° ≈ 8.66 N and y-component 10·sin30° = 5 N."},
        {h:"Adding vectors"},
        {p:"Add vectors tip-to-tail or by adding their components. The result (the resultant) is a single vector representing the combined effect."},
        {app:"Engineers add force vectors to find net load on a beam, combine velocity vectors for navigation, and resolve wind forces on structures."},
        {recap:[
          "Vectors have magnitude and direction.",
          "Components split a vector into x and y parts.",
          "Add vectors by components or tip-to-tail."
        ]},
        {recall:[
          "Give an example of a scalar and a vector.",
          "How do you find the x-component of a vector?",
          "How do you add two vectors?"
        ]}
      ]},
      { n:6, title:"Complex Numbers", blocks:[
        {h:"Overview"},
        {p:"Some equations have no real solution, so mathematicians invented complex numbers. They turn out to be incredibly useful in engineering, especially for circuits and signals."},
        {h:"What is a complex number?"},
        {p:"A complex number has the form a + bi, where a and b are real numbers and i = √(−1). The 'a' part is real; the 'bi' part is imaginary."},
        {hl:"i² = −1. This single fact is what makes complex numbers work."},
        {ex:"The equation x² + 1 = 0 has no real solution, but x = i and x = −i solve it using complex numbers."},
        {mem:"Complex number = a + bi, where i² = −1."},
        {h:"Visualizing on a plane"},
        {p:"Complex numbers are drawn on a 2D plane with a real axis and imaginary axis. The distance from the origin is the magnitude."},
        {app:"Electrical engineers use complex numbers constantly for alternating-current circuits (impedance), signal processing, and control systems."},
        {recap:[
          "Complex numbers use i, where i² = −1.",
          "Form: a + bi (real part + imaginary part).",
          "They appear in circuits, signals, and control."
        ]},
        {recall:[
          "What is the value of i²?",
          "Write the general form of a complex number.",
          "Name one engineering use of complex numbers."
        ]}
      ]},
      { n:7, title:"Matrices and Determinants", blocks:[
        {h:"Overview"},
        {p:"Matrices are grids of numbers that organize and solve systems of equations efficiently. This lesson introduces matrices and determinants for engineering."},
        {h:"What is a matrix?"},
        {p:"A matrix is a rectangular array of numbers. Engineers use them to represent systems of equations, transformations, and data sets compactly."},
        {mem:"Matrix = a grid of numbers. Solving many equations at once becomes organized arithmetic."},
        {h:"Basic operations"},
        {ul:[
          "Add/subtract — same size; combine matching entries.",
          "Multiply by a scalar — multiply every entry.",
          "Multiply matrices — a special row-by-column rule."
        ]},
        {h:"The determinant"},
        {p:"The determinant is a single number computed from a square matrix. It tells whether a system has a unique solution (nonzero determinant) or not."},
        {ex:"For a 2×2 matrix [[a,b],[c,d]], the determinant is ad − bc. If it's zero, the system has no unique solution."},
        {app:"Engineers solve large systems of equations (stress in structures, current in circuits) using matrices. Computer graphics and robotics rely on matrix multiplication for transformations."},
        {recap:[
          "Matrices are grids that organize equations.",
          "They add, scale, and multiply by special rules.",
          "The determinant signals solvability."
        ]},
        {recall:[
          "What is a matrix?",
          "What is the determinant of [[2,1],[3,4]]?",
          "What does a determinant of zero indicate?"
        ]}
      ]},
      { n:8, title:"Sequences, Series and the Binomial Theorem", blocks:[
        {h:"Overview"},
        {p:"Sequences and series deal with ordered lists of numbers and their sums. The binomial theorem expands powers of sums. These tools appear in finance, estimation, and analysis."},
        {h:"Sequences vs series"},
        {ul:[
          "Sequence — an ordered list of numbers (2, 4, 6, 8…).",
          "Series — the sum of a sequence's terms (2 + 4 + 6 + 8…)."
        ]},
        {h:"Arithmetic and geometric"},
        {ul:[
          "Arithmetic — add a fixed amount each term (2, 5, 8, 11…).",
          "Geometric — multiply by a fixed amount each term (3, 6, 12, 24…)."
        ]},
        {mem:"Arithmetic = ADD a constant. Geometric = MULTIPLY by a constant."},
        {h:"The binomial theorem"},
        {p:"The binomial theorem gives a formula to expand (a + b)ⁿ without multiplying everything out by hand. Each term has a coefficient from Pascal's triangle."},
        {ex:"(a + b)² = a² + 2ab + b². The coefficients 1, 2, 1 come from Pascal's triangle."},
        {app:"Engineers use series for approximations and error estimates; geometric series model signal delays, interest, and feedback loops."},
        {recap:[
          "Sequences list; series sum.",
          "Arithmetic adds; geometric multiplies.",
          "The binomial theorem expands powers efficiently."
        ]},
        {recall:[
          "Difference between a sequence and a series?",
          "Is 2,6,18,54 arithmetic or geometric?",
          "Expand (a + b)² using the binomial theorem."
        ]}
      ]},
      { n:9, title:"Analytic Geometry & Review", blocks:[
        {h:"Overview"},
        {p:"Analytic geometry connects algebra and geometry using coordinates. This lesson covers lines, circles, and conic sections, then reviews the whole course."},
        {h:"Coordinate geometry"},
        {p:"Points are located with (x, y) coordinates. This lets us describe geometric shapes with algebraic equations."},
        {h:"Distance and midpoint"},
        {ul:[
          "Distance between two points uses the Pythagorean theorem.",
          "Midpoint is the average of the coordinates."
        ]},
        {h:"Lines and slope"},
        {p:"The slope of a line measures steepness: rise over run. The equation y = mx + b gives the slope m and y-intercept b."},
        {mem:"Slope = rise / run. Bigger slope = steeper line."},
        {h:"Conic sections"},
        {p:"Slicing a cone gives circles, ellipses, parabolas, and hyperbolas. Each has a standard equation and appears in orbits, reflectors, and engineering designs."},
        {h:"Course recap"},
        {ul:[
          "Algebra and functions are the modeling language.",
          "Trigonometry, vectors, and complex numbers handle angles and signals.",
          "Matrices solve systems; sequences and geometry round out the toolkit."
        ]},
        {app:"This toolkit underpins physics, circuits, mechanics, and every advanced engineering course. Mastering these fundamentals makes later subjects far easier."},
        {recap:[
          "Coordinates connect algebra and geometry.",
          "Slope = rise/run; lines follow y = mx + b.",
          "Conics come from slicing cones."
        ]},
        {recall:[
          "What does the slope of a line measure?",
          "Name two conic sections.",
          "Which course topic handles systems of equations efficiently?"
        ]}
      ]}
    ]
  },

  {
    code:"GEC 002", title:"Mathematics in the Modern World",
    color:"#22c55e", units:3,
    desc:"How mathematics shapes modern life — from patterns and data to probability, finance, and the hidden structures all around us.",
    lessons:[
      { n:1, title:"Mathematics as a Language and Tool", blocks:[
        {h:"Overview"},
        {p:"Mathematics is often seen as a school subject, but it's really a universal language and a powerful tool for understanding the world. This lesson explores what mathematics truly is."},
        {h:"Math as a language"},
        {p:"Like any language, math has symbols, grammar, and meaning. It lets us express ideas — patterns, quantities, relationships — precisely and universally."},
        {mem:"Math is a language: numbers and symbols are its words, equations are its sentences."},
        {h:"Math as a tool"},
        {p:"Beyond description, math solves problems: it predicts the weather, designs buildings, secures data, and powers technology."},
        {h:"Math is everywhere"},
        {ul:[
          "In nature — spirals of shells, symmetry of leaves.",
          "In technology — algorithms, encryption, networks.",
          "In society — voting systems, economics, statistics."
        ]},
        {hl:"Mathematics is both a way to describe reality and a tool to change it."},
        {app:"Every modern convenience — phones, GPS, banking, streaming — runs on mathematics behind the scenes."},
        {recap:[
          "Math is a universal language with symbols and rules.",
          "It's also a tool for solving real problems.",
          "Math is embedded in nature, technology, and society."
        ]},
        {recall:[
          "Why is math considered a language?",
          "Give one example of math in nature.",
          "Name one technology that depends on math."
        ]}
      ]},
      { n:2, title:"Mathematical Language and Symbols", blocks:[
        {h:"Overview"},
        {p:"To use math, we must read and write its language. This lesson covers the symbols, notation, and logic that make mathematical communication precise."},
        {h:"Common symbols"},
        {ul:[
          "= means 'is equal to'; ≠ means 'not equal'.",
          "< and > mean 'less than' and 'greater than'.",
          "+, −, ×, ÷ are the basic operations.",
          "Variables (x, y, n) stand for unknown or changing values."
        ]},
        {mem:"Symbols are just shorthand — each one stands for a clear idea or operation."},
        {h:"Expressions vs equations"},
        {ul:[
          "Expression — a combination of numbers and variables (2x + 3) with no equals sign.",
          "Equation — a statement that two expressions are equal (2x + 3 = 7)."
        ]},
        {h:"Precision matters"},
        {p:"Mathematical language removes ambiguity. 'Some', 'most', or 'a few' are vague; numbers and symbols are exact."},
        {app:"Clear mathematical notation lets engineers, scientists, and programmers communicate complex ideas without misunderstanding."},
        {recap:[
          "Math symbols are precise shorthand.",
          "Expressions have no equals sign; equations do.",
          "Math removes the vagueness of ordinary language."
        ]},
        {recall:[
          "What's the difference between an expression and an equation?",
          "What does the symbol ≠ mean?",
          "Why is precision important in math?"
        ]}
      ]},
      { n:3, title:"Problem Solving and Patterns", blocks:[
        {h:"Overview"},
        {p:"Much of mathematical thinking is recognizing patterns and using them to solve problems. This lesson introduces strategies and pattern-spotting."},
        {h:"Recognizing patterns"},
        {p:"A pattern is a regular, repeated relationship. Spotting one lets us predict what comes next — the heart of mathematical reasoning."},
        {ex:"In 2, 4, 8, 16, 32… each term doubles. Recognizing this, you can predict the next number is 64."},
        {mem:"Pattern = a rule that repeats. Find the rule, predict the future."},
        {h:"Problem-solving strategies"},
        {ul:[
          "Understand the problem fully.",
          "Make a plan (draw, look for a pattern, work backward).",
          "Carry out the plan.",
          "Check the answer."
        ]},
        {h:"Patterns in nature and art"},
        {p:"The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13…) appears in flowers, shells, and galaxies — math built into the living world."},
        {app:"Engineers, programmers, and scientists all rely on spotting patterns to design algorithms, compress data, and make predictions."},
        {recap:[
          "Patterns are repeating rules we can detect.",
          "Good problem solving follows clear steps.",
          "Patterns like Fibonacci appear throughout nature."
        ]},
        {recall:[
          "What is the next number in 3, 6, 12, 24…?",
          "List two problem-solving strategies.",
          "Where does the Fibonacci sequence appear?"
        ]}
      ]},
      { n:4, title:"Sets and Logic", blocks:[
        {h:"Overview"},
        {p:"Sets group objects; logic gives rules for correct reasoning. Together they form the foundation of mathematics, computing, and clear thinking."},
        {h:"What is a set?"},
        {p:"A set is a collection of distinct objects, called elements. We can describe sets by listing members or by a rule."},
        {ex:"The set of even numbers less than 10 is {2, 4, 6, 8}. The curly braces show it's a set."},
        {h:"Set operations"},
        {ul:[
          "Union (A ∪ B) — everything in A or B (combine).",
          "Intersection (A ∩ B) — only what's in both A and B (overlap).",
          "Difference — what's in A but not B."
        ]},
        {mem:"Union = combine all · Intersection = only the shared overlap."},
        {h:"Logic and truth"},
        {p:"Logic studies valid reasoning using statements that are true or false. 'AND', 'OR', 'NOT' combine statements, just like in computer logic."},
        {app:"Databases, search engines, and spreadsheets all use sets and logic. 'Find customers in Manila AND who bought in 2024' is a set intersection."},
        {recap:[
          "Sets are collections of elements.",
          "Union combines; intersection finds the overlap.",
          "Logic uses true/false statements with AND, OR, NOT."
        ]},
        {recall:[
          "What is the union of {1,2} and {2,3}?",
          "What is their intersection?",
          "What does the logic operator AND require?"
        ]}
      ]},
      { n:5, title:"Numbers and Number Systems", blocks:[
        {h:"Overview"},
        {p:"Numbers are so familiar we forget they were invented. This lesson traces how number systems developed and how different bases work."},
        {h:"A brief history"},
        {p:"Early humans counted with tally marks. Civilizations like the Mayans and Indians developed place-value systems, and the Hindu-Arabic numerals (0–9) we use today spread worldwide."},
        {h:"Why zero was revolutionary"},
        {p:"The invention of zero enabled place value — the idea that a digit's value depends on its position. This made large calculations possible."},
        {mem:"Zero + place value = the system that powers all modern arithmetic."},
        {h:"Different bases"},
        {p:"Our decimal system is base-10, but other bases exist. Binary (base-2) runs computers; hexadecimal (base-16) is used in programming."},
        {ex:"The number 5 in decimal equals 101 in binary and 5 in hex — same quantity, different notation."},
        {app:"Computing depends entirely on binary. Understanding bases helps you grasp how machines store and process information."},
        {recap:[
          "Number systems evolved from tally marks to place value.",
          "Zero enabled efficient computation.",
          "Different bases (decimal, binary, hex) represent the same quantities."
        ]},
        {recall:[
          "Why was the invention of zero important?",
          "What base do computers use?",
          "What is place value?"
        ]}
      ]},
      { n:6, title:"Statistics: Describing Data", blocks:[
        {h:"Overview"},
        {p:"Statistics turns raw data into understanding. This lesson covers how we collect, summarize, and visualize data to make sense of the world."},
        {h:"Describing a data set"},
        {ul:[
          "Mean — the average (sum divided by count).",
          "Median — the middle value when sorted.",
          "Mode — the most frequent value."
        ]},
        {mem:"Mean = average · Median = middle · Mode = most common."},
        {h:"Measures of spread"},
        {p:"Two data sets can have the same average but very different spread. Range and standard deviation describe how spread out the values are."},
        {h:"Visualizing data"},
        {p:"Charts make patterns visible: bar charts compare categories, line graphs show trends over time, pie charts show parts of a whole."},
        {ex:"Test scores of 70, 75, 80, 85, 90 have a mean of 80 and median of 80. Add a single 20 and the mean drops sharply — showing how outliers affect the mean."},
        {app:"Statistics drive decisions in business, health, government, and sports. Understanding them helps you read news critically and avoid being misled."},
        {recap:[
          "Mean, median, and mode summarize the center.",
          "Range and standard deviation describe spread.",
          "Charts reveal patterns hidden in numbers."
        ]},
        {recall:[
          "What's the difference between mean and median?",
          "Which measure is most affected by an outlier?",
          "Name two types of charts."
        ]}
      ]},
      { n:7, title:"Probability", blocks:[
        {h:"Overview"},
        {p:"Probability measures how likely something is to happen. It underpins weather forecasts, insurance, games, and risk assessment."},
        {h:"Basic probability"},
        {p:"Probability ranges from 0 (impossible) to 1 (certain). It's calculated as favorable outcomes divided by total possible outcomes."},
        {hl:"Probability = (favorable outcomes) ÷ (total possible outcomes)."},
        {ex:"The probability of rolling a 4 on a normal die is 1/6, since one face shows 4 out of six total faces."},
        {h:"Independent events"},
        {p:"Independent events don't affect each other. Flipping a coin twice: the second flip isn't influenced by the first."},
        {mem:"Probability 0 = never · 0.5 = even chance · 1 = certain."},
        {h:"The law of large numbers"},
        {p:"Over many trials, results tend to settle near the expected probability. A few coin flips can be very uneven, but thousands will approach 50/50."},
        {app:"Insurance pricing, medical testing, quality control, and artificial intelligence all rely on probability to make decisions under uncertainty."},
        {recap:[
          "Probability ranges from 0 to 1.",
          "Favorable ÷ total outcomes gives the chance.",
          "Independent events don't influence each other."
        ]},
        {recall:[
          "What is the probability of heads on a fair coin?",
          "What does a probability of 0 mean?",
          "What does the law of large numbers say?"
        ]}
      ]},
      { n:8, title:"Mathematics of Finance", blocks:[
        {h:"Overview"},
        {p:"Money and math are deeply connected. This lesson shows how interest, growth, and financial decisions are modeled mathematically."},
        {h:"Simple vs compound interest"},
        {ul:[
          "Simple interest — earned only on the original amount.",
          "Compound interest — earned on the original plus previous interest (grows faster)."
        ]},
        {mem:"Compound interest = 'interest on interest' — it makes savings snowball over time."},
        {ex:"₱1,000 at 10% simple interest for 3 years grows to ₱1,300. Compounded, it grows to ₱1,331 — because each year's interest also earns interest."},
        {h:"Saving and borrowing"},
        {p:"Compound growth rewards early saving and punishes high-interest debt. Time is the most powerful factor in finance."},
        {hl:"The same compound growth that builds savings can bury you in debt — understand it before borrowing."},
        {app:"Loans, mortgages, investments, and retirement planning all depend on financial mathematics. Understanding it protects your future wealth."},
        {recap:[
          "Simple interest grows linearly; compound grows faster.",
          "Compound interest is 'interest on interest'.",
          "Time dramatically amplifies both savings and debt."
        ]},
        {recall:[
          "Which grows faster: simple or compound interest?",
          "What is compound interest?",
          "Why does time matter so much in saving?"
        ]}
      ]},
      { n:9, title:"Networks, Codes and Review", blocks:[
        {h:"Overview"},
        {p:"Modern math powers the digital world: networks connect us, codes keep secrets, and data moves instantly. This lesson covers these ideas and reviews the course."},
        {h:"Networks and graphs"},
        {p:"A network is a set of points (nodes) connected by links (edges). Social networks, roads, and the internet are all networks. Graph theory studies their structure."},
        {ex:"The shortest route between two cities on a map is a network problem — finding the path with the least total distance."},
        {mem:"Network = points connected by lines. Used to model the internet, transport, and social connections."},
        {h:"Codes and cryptography"},
        {p:"Cryptography uses math to scramble information so only intended readers can decode it. It secures messages, banking, and online accounts."},
        {h:"Algorithms"},
        {p:"An algorithm is a step-by-step procedure. Search engines, recommendations, and GPS routing all run on mathematical algorithms."},
        {h:"Course recap"},
        {ul:[
          "Math is a universal language and powerful tool.",
          "Patterns, logic, sets, and numbers are its building blocks.",
          "Statistics, probability, finance, networks, and codes shape the modern world."
        ]},
        {app:"From the internet to banking to social media, mathematics quietly runs the modern world. Understanding it makes you a more informed, capable citizen."},
        {recap:[
          "Networks model connections using nodes and edges.",
          "Cryptography secures data with math.",
          "Algorithms are step-by-step procedures that power technology."
        ]},
        {recall:[
          "What are the points and lines in a network called?",
          "What does cryptography do?",
          "Name one modern technology powered by algorithms."
        ]}
      ]}
    ]
  },

  {
    code:"GEC 004", title:"Understanding the Self",
    color:"#ec4899", units:3,
    desc:"A multidisciplinary exploration of who we are — examining the self through philosophy, psychology, biology, society, and culture.",
    lessons:[
      { n:1, title:"Knowing the Self: Introduction", blocks:[
        {h:"Overview"},
        {p:"Who are you? This is one of the oldest questions in human thought. This course explores the self from many angles to help you understand yourself more deeply."},
        {h:"What is the 'self'?"},
        {p:"The self is your sense of who you are — your thoughts, feelings, identity, and awareness. It's both deeply personal and shaped by everything around you."},
        {mem:"The self = your sense of 'I' — the person experiencing your life from the inside."},
        {h:"Why study the self?"},
        {ul:[
          "To make better decisions aligned with your values.",
          "To understand your emotions and relationships.",
          "To grow as a person and reach your potential."
        ]},
        {h:"Many lenses on the self"},
        {p:"No single view captures the whole self. We'll look through philosophy, sociology, anthropology, psychology, biology, and more — each reveals something different."},
        {hl:"Knowing yourself is the foundation of personal growth, healthy relationships, and a meaningful life."},
        {app:"Self-awareness improves leadership, communication, mental health, and resilience — skills that help in any career and in life generally."},
        {recap:[
          "The self is your sense of identity and awareness.",
          "Understanding it improves decisions and relationships.",
          "Many disciplines offer different views of the self."
        ]},
        {recall:[
          "How would you describe your 'self' in one sentence?",
          "Why is self-knowledge valuable?",
          "Name two disciplines that study the self."
        ]}
      ]},
      { n:2, title:"The Self from Different Perspectives", blocks:[
        {h:"Overview"},
        {p:"Different fields define the self differently. This lesson compares philosophical, sociological, and anthropological views to build a richer picture."},
        {h:"Philosophical view"},
        {p:"Philosophers ask what makes you 'you' over time. Socrates urged 'know thyself'; thinkers debate whether identity comes from the mind, the body, or memories."},
        {h:"Sociological view"},
        {p:"Sociology sees the self as shaped by society. Cooley's 'looking-glass self' says we form our self-image from how we think others see us."},
        {mem:"Looking-glass self: we see ourselves partly through others' imagined reactions to us."},
        {h:"Anthropological view"},
        {p:"Anthropology studies how culture shapes the self. Some cultures emphasize the individual; others emphasize the group and family."},
        {ex:"In many Western cultures the self is seen as independent; in many Asian cultures it's seen as deeply connected to family and community."},
        {app:"Understanding that the self is socially and culturally shaped helps you communicate across cultures and question your own assumptions."},
        {recap:[
          "Philosophy asks what makes identity persist.",
          "Sociology sees the self shaped by others.",
          "Anthropology shows culture's influence on the self."
        ]},
        {recall:[
          "What is the 'looking-glass self'?",
          "How does anthropology view the self?",
          "Give one difference between individual and group-focused cultures."
        ]}
      ]},
      { n:3, title:"The Physical Self", blocks:[
        {h:"Overview"},
        {p:"Your body is the most immediate part of your self. This lesson explores how biology, appearance, and physical experiences shape who you are."},
        {h:"Biology and identity"},
        {p:"Heredity gives you traits from your parents — height, features, even tendencies. Your body is both given and something you care for."},
        {h:"Body image"},
        {p:"Body image is how you think and feel about your appearance. It's powerfully shaped by media, culture, and peers — and it affects confidence and mental health."},
        {mem:"Body image = your mental picture of your body, which may not match reality or others' view."},
        {h:"Caring for the physical self"},
        {ul:[
          "Nutrition and exercise build energy and health.",
          "Sleep and rest restore the body and mind.",
          "Avoiding harmful habits protects long-term wellbeing."
        ]},
        {mis:"A healthy body isn't about looking a certain way — it's about feeling capable, energetic, and well."},
        {app:"A healthy body supports mental focus, emotional stability, and longevity. Athletes, performers, and professionals all depend on physical self-care."},
        {recap:[
          "Heredity gives physical traits; care shapes health.",
          "Body image is mental and influenced by culture.",
          "Physical self-care supports every part of life."
        ]},
        {recall:[
          "What is body image?",
          "Name two factors that shape body image.",
          "List two ways to care for the physical self."
        ]}
      ]},
      { n:4, title:"The Sexual Self", blocks:[
        {h:"Overview"},
        {p:"Sexuality is a natural and important part of being human. This lesson approaches the sexual self with maturity, respect, and accurate information."},
        {h:"Understanding sexuality"},
        {p:"Sexuality is broad — it includes biological sex, gender identity, sexual orientation, and intimate relationships. It's a normal part of human development."},
        {h:"Key distinctions"},
        {ul:[
          "Biological sex — physical characteristics assigned at birth.",
          "Gender identity — your internal sense of being male, female, or another gender.",
          "Sexual orientation — who you are attracted to."
        ]},
        {mem:"Sex ≠ gender ≠ orientation — these are related but distinct parts of a person."},
        {h:"Responsibility and respect"},
        {p:"A healthy sexual self involves consent, safety, mutual respect, and informed choices. Understanding your body and boundaries protects your wellbeing."},
        {hl:"Consent and respect are the foundations of healthy relationships — always."},
        {app:"Understanding sexuality supports healthy relationships, personal safety, and respect for diversity in any community or workplace."},
        {recap:[
          "Sexuality includes sex, gender identity, and orientation.",
          "These are distinct but related aspects of a person.",
          "Consent, safety, and respect are essential."
        ]},
        {recall:[
          "Difference between biological sex and gender identity?",
          "What is sexual orientation?",
          "What is the foundation of healthy relationships?"
        ]}
      ]},
      { n:5, title:"The Material and Economic Self", blocks:[
        {h:"Overview"},
        {p:"We express ourselves through what we own and how we earn. This lesson explores the material and economic dimensions of the self."},
        {h:"The material self"},
        {p:"Psychologist William James called our possessions part of the self — our clothes, gadgets, and spaces reflect and reinforce who we are."},
        {ex:"A musician's guitar, a student's laptop, an athlete's gear — these objects feel like extensions of the self."},
        {h:"Consumerism and identity"},
        {p:"Advertising links products to identity, urging us to buy to 'be' someone. Awareness helps us distinguish real needs from identity-driven wants."},
        {mem:"We are not what we own — but what we own can feel like part of who we are."},
        {h:"The economic self"},
        {p:"How we earn, spend, and save reflects our values. Financial habits shape our freedom, security, and stress levels over a lifetime."},
        {app:"Smart financial habits — budgeting, saving, avoiding debt — give you choices and reduce stress, supporting every other part of your self."},
        {recap:[
          "Possessions can become part of the self.",
          "Consumerism ties identity to buying.",
          "Financial habits shape freedom and security."
        ]},
        {recall:[
          "Why are possessions part of the 'material self'?",
          "How does advertising affect identity?",
          "Name one healthy financial habit."
        ]}
      ]},
      { n:6, title:"The Spiritual Self", blocks:[
        {h:"Overview"},
        {p:"Beyond body and possessions, people seek meaning, purpose, and connection to something greater. This lesson explores the spiritual dimension of the self."},
        {h:"What is spirituality?"},
        {p:"Spirituality is the search for meaning, purpose, and connection. It may involve religion, but also nature, art, community, or inner reflection."},
        {h:"Spirituality vs religion"},
        {ul:[
          "Religion — organized beliefs, practices, and community.",
          "Spirituality — personal search for meaning and connection, which may or may not be religious."
        ]},
        {mem:"Religion = organized tradition. Spirituality = personal meaning — they can overlap or be separate."},
        {h:"Why meaning matters"},
        {p:"Having a sense of purpose supports resilience, mental health, and life satisfaction. People draw meaning from faith, values, relationships, and goals."},
        {ex:"Someone may find deep meaning in helping others, creating art, or pursuing knowledge — spirituality isn't only about religion."},
        {app:"A sense of purpose improves motivation, resilience, and wellbeing — valuable for students, professionals, and anyone facing challenges."},
        {recap:[
          "Spirituality is the search for meaning and connection.",
          "It may or may not involve religion.",
          "Purpose supports resilience and wellbeing."
        ]},
        {recall:[
          "What is the difference between spirituality and religion?",
          "Where might someone find meaning besides religion?",
          "Why does purpose matter for wellbeing?"
        ]}
      ]},
      { n:7, title:"The Political and Digital Self", blocks:[
        {h:"Overview"},
        {p:"We are citizens and we live much of life online. This lesson explores the political self and the digital self in the modern world."},
        {h:"The political self"},
        {p:"As citizens, our values and choices shape and are shaped by society. Voting, advocacy, and civic participation express the political self."},
        {h:"The digital self"},
        {p:"Online, we build a version of ourselves through profiles, posts, and interactions. This digital self can differ from — and affect — our offline identity."},
        {mem:"Your digital self is the online version of you — curated, but real in its consequences."},
        {h:"Digital wellbeing"},
        {ul:[
          "Curated profiles can create pressure and comparison.",
          "Privacy and online safety protect the digital self.",
          "Balance prevents technology from harming mental health."
        ]},
        {hl:"What you post online can affect your reputation, relationships, and opportunities for years — share thoughtfully."},
        {app:"Digital literacy and civic awareness are essential modern skills — they affect your career, privacy, and role in society."},
        {recap:[
          "The political self is expressed through civic participation.",
          "The digital self is your online identity.",
          "Digital habits affect reputation and mental health."
        ]},
        {recall:[
          "How is the digital self different from the offline self?",
          "Name one risk of social media for mental health.",
          "What does the political self involve?"
        ]}
      ]},
      { n:8, title:"Managing and Caring for the Self", blocks:[
        {h:"Overview"},
        {p:"Understanding the self leads to the most important question: how do you care for and improve it? This final lesson brings it all together with practical self-management."},
        {h:"Self-management skills"},
        {ul:[
          "Goal-setting — defining what you want to achieve.",
          "Time management — using time intentionally.",
          "Self-discipline — doing what needs doing, consistently.",
          "Stress management — handling pressure healthily."
        ]},
        {mem:"You can't control everything, but you can control your habits — and habits shape your life."},
        {h:"Becoming your best self"},
        {p:"Growth is a lifelong process. Small, consistent improvements in habits, mindset, and relationships compound into major change over time."},
        {ex:"Reading 20 minutes daily, exercising regularly, and reflecting weekly are small habits that transform your future self."},
        {h:"Course recap"},
        {ul:[
          "The self has physical, sexual, material, economic, spiritual, political, and digital dimensions.",
          "Many disciplines help us understand identity.",
          "Caring for the self across all dimensions leads to a flourishing life."
        ]},
        {app:"Self-awareness and self-management are 'meta-skills' that improve every area — academics, career, health, and relationships."},
        {recap:[
          "Self-management includes goals, time, discipline, and stress.",
          "Small consistent habits create major growth.",
          "Caring for all dimensions of self leads to wellbeing."
        ]},
        {recall:[
          "Name two self-management skills.",
          "Why do small habits matter?",
          "Which dimension of self will you focus on improving?"
        ]}
      ]}
    ]
  },

  {
    code:"GEC 007", title:"Readings in Philippine History",
    color:"#f59e0b", units:3,
    desc:"Philippine history examined through primary sources — learning to read evidence critically and understand the nation's past.",
    lessons:[
      { n:1, title:"The Meaning and Relevance of History", blocks:[
        {h:"Overview"},
        {p:"History is more than dates and names — it's how we understand who we are. This lesson explains what history is and why studying it matters."},
        {h:"What is history?"},
        {p:"History is the disciplined study of the past based on evidence. It's not just 'what happened' but 'how we know what happened' and why it matters."},
        {mem:"History = the study of the past using evidence — it's interpretation, not just memorization."},
        {h:"Why study history?"},
        {ul:[
          "To understand the present — today's problems have roots in the past.",
          "To learn from past successes and mistakes.",
          "To build identity and a sense of national self."
        ]},
        {hl:"Those who do not learn from history are doomed to repeat its mistakes."},
        {h:"History vs the past"},
        {p:"The past is everything that happened; history is the careful reconstruction and interpretation of it. Not everything in the past gets recorded or remembered."},
        {app:"Understanding history helps citizens make informed decisions and resist manipulation. It builds critical thinking about causes and consequences."},
        {recap:[
          "History studies the past using evidence.",
          "It explains the present and guides the future.",
          "The past is what happened; history is how we interpret it."
        ]},
        {recall:[
          "What is the difference between the past and history?",
          "Give one reason to study history.",
          "Why does history involve interpretation?"
        ]}
      ]},
      { n:2, title:"Sources of Philippine History", blocks:[
        {h:"Overview"},
        {p:"Historians build their accounts from sources. This lesson distinguishes primary and secondary sources and explains how to evaluate them critically."},
        {h:"Primary vs secondary sources"},
        {ul:[
          "Primary source — created during the time studied (letters, treaties, photos, artifacts, oral accounts).",
          "Secondary source — later analysis built on primary sources (textbooks, articles)."
        ]},
        {mem:"Primary = firsthand evidence from the time. Secondary = someone's later interpretation."},
        {ex:"A letter written by Jose Rizal is a primary source. A 2020 book analyzing Rizal's letters is a secondary source."},
        {h:"Evaluating sources critically"},
        {p:"Every source has a perspective and possible bias. Ask: Who created it? Why? When? What might they have wanted to hide or emphasize?"},
        {hl:"No source is perfectly neutral — a good historian weighs many sources against each other."},
        {h:"Challenges with Philippine sources"},
        {p:"Many precolonial Filipino records were lost; much early history comes from foreign observers. Historians cross-check sources carefully."},
        {app:"In the age of misinformation, evaluating sources critically is a vital life skill — useful for news, research, and decision-making."},
        {recap:[
          "Primary sources are firsthand; secondary are interpretive.",
          "Every source has bias and must be evaluated.",
          "Good history cross-checks multiple sources."
        ]},
        {recall:[
          "What is a primary source?",
          "Give an example of a secondary source.",
          "What questions help evaluate a source's reliability?"
        ]}
      ]},
      { n:3, title:"Precolonial Philippine Society", blocks:[
        {h:"Overview"},
        {p:"Before colonization, the Philippines had thriving, organized communities. This lesson explores precolonial society, culture, and governance."},
        {h:"Barangays and social structure"},
        {p:"Early Filipinos lived in independent communities called barangays, led by a chief (datu). Society had classes including nobles, freemen, and dependents."},
        {mem:"Barangay = the basic precolonial community, led by a datu."},
        {h:"Culture and livelihood"},
        {ul:[
          "Farming, fishing, and trade connected islands and other nations.",
          "Baybayin and other writing systems existed before Spanish arrival.",
          "Rich oral traditions, music, and crafts flourished."
        ]},
        {h:"Trade and connections"},
        {p:"Filipinos traded with China, India, and Southeast Asian neighbors long before colonization, showing an advanced, connected society."},
        {mis:"The myth that precolonial Filipinos were 'uncivilized' is false — they had laws, writing, trade, and the rule of custom."},
        {app:"Knowing precolonial achievements builds national pride and corrects colonial narratives that underestimated Filipino civilization."},
        {recap:[
          "Precolonial Filipinos lived in barangays led by datus.",
          "They had writing, trade, and rich culture.",
          "They were connected to Asia long before colonization."
        ]},
        {recall:[
          "Who led a precolonial barangay?",
          "Name one achievement of precolonial Filipinos.",
          "Why is the 'uncivilized' myth wrong?"
        ]}
      ]},
      { n:4, title:"The Spanish Colonization", blocks:[
        {h:"Overview"},
        {p:"Spain colonized the Philippines for over 300 years, reshaping its society, religion, and economy. This lesson examines that era and its lasting effects."},
        {h:"The arrival"},
        {p:"In 1521, Ferdinand Magellan arrived; in 1565, Spain began formal colonization under Miguel López de Legazpi, uniting the islands under Spanish rule."},
        {h:"Three pillars of Spanish rule"},
        {ul:[
          "Political — centralized government and the encomienda system.",
          "Religious — widespread conversion to Christianity by friars.",
          "Economic — the Galleon Trade and tribute systems."
        ]},
        {mem:"Spanish colonization rested on politics, religion (the friars), and trade (the galleons)."},
        {h:"Effects on Filipino society"},
        {p:"Colonization brought Christianity and new institutions, but also exploitation, forced labor, and limited education for most Filipinos. Resistance simmered throughout."},
        {ex:"Early revolts like the Tamblot and Bankaw uprisings showed Filipinos resisted colonial rule long before the major revolution."},
        {app:"Understanding 300 years of colonization explains the deep Catholic influence, language borrowing, and social structures still present in the Philippines today."},
        {recap:[
          "Spain colonized the Philippines from 1565 to 1898.",
          "Rule rested on politics, religion, and the Galleon Trade.",
          "Effects included Christianity, exploitation, and resistance."
        ]},
        {recall:[
          "When did formal Spanish colonization begin?",
          "What were the three pillars of Spanish rule?",
          "Name one effect of colonization still visible today."
        ]}
      ]},
      { n:5, title:"The Propaganda Movement", blocks:[
        {h:"Overview"},
        {p:"In the late 1800s, educated Filipinos began demanding reforms peacefully. This lesson covers the Propaganda Movement and its key figures."},
        {h:"What was the Propaganda Movement?"},
        {p:"A peaceful campaign by educated Filipinos (ilustrados) seeking reforms — equality with Spaniards, representation, and an end to abuse — through writing and petitions."},
        {h:"Key figures"},
        {ul:[
          "Jose Rizal — novelist, doctor, and intellectual; wrote Noli Me Tangere and El Filibusterismo.",
          "Marcelo H. del Pilar — fiery journalist and editor of La Solidaridad.",
          "Graciano Lopez Jaena — orator and founder of La Solidaridad."
        ]},
        {mem:"Propaganda Movement = peaceful reform through writing. Rizal, del Pilar, Lopez Jaena were its voices."},
        {h:"Goals and limits"},
        {p:"They sought reform, not independence, hoping Spain would treat Filipinos equally. When reforms failed, more radical paths emerged."},
        {hl:"The Propaganda Movement awakened Filipino national identity, even though it sought reform rather than revolution."},
        {app:"The movement shows the power of ideas and writing to mobilize people — a lesson for civic engagement and peaceful advocacy today."},
        {recap:[
          "The Propaganda Movement sought peaceful reform.",
          "Rizal, del Pilar, and Lopez Jaena led it.",
          "It awakened national identity despite limited success."
        ]},
        {recall:[
          "What did the Propaganda Movement want?",
          "Name two of its key figures.",
          "Why did the movement eventually give way to revolution?"
        ]}
      ]},
      { n:6, title:"The Philippine Revolution", blocks:[
        {h:"Overview"},
        {p:"When peaceful reform failed, Filipinos turned to armed revolution against Spain. This lesson covers the revolution and the quest for independence."},
        {h:"The spark"},
        {p:"Rizal's execution in 1896 outraged Filipinos. The Katipunan, a secret society founded by Andres Bonifacio, launched the armed revolution for independence."},
        {mem:"Katipunan = the secret revolutionary society. Bonifacio = its founder, the 'Father of the Revolution'."},
        {h:"Key events"},
        {ul:[
          "1896 — the Cry of Pugad Lawin; the revolution begins.",
          "Emilio Aguinaldo rises as a military leader.",
          "1897 — the Pact of Biak-na-Bato (a temporary truce).",
          "1898 — Aguinaldo declares Philippine Independence."
        ]},
        {h:"Achieving and losing independence"},
        {p:"Filipinos declared independence in 1898, but the Spanish-American War brought the Americans, who would soon replace Spain as colonizers."},
        {app:"The revolution demonstrates courage, unity, and the Filipino desire for freedom — central to national identity and civic values."},
        {recap:[
          "The Katipunan and Bonifacio led the 1896 revolution.",
          "Aguinaldo declared independence in 1898.",
          "Independence was short-lived as the Americans arrived."
        ]},
        {recall:[
          "Who founded the Katipunan?",
          "In what year was Philippine independence declared?",
          "What interrupted the new independence?"
        ]}
      ]},
      { n:7, title:"The American Period and Commonwealth", blocks:[
        {h:"Overview"},
        {p:"After Spain, the United States ruled the Philippines, promising eventual independence. This lesson covers the American period and the Commonwealth era."},
        {h:"The American era"},
        {ul:[
          "The Philippine-American War (1899–1902) followed U.S. takeover.",
          "Americans introduced public education, English, and democratic institutions.",
          "The 'benevolent assimilation' policy shaped Filipino-American relations."
        ]},
        {h:"The Commonwealth (1935–1946)"},
        {p:"The Commonwealth was a transition government preparing the Philippines for full independence, led by Manuel L. Quezon as its first president."},
        {mem:"Commonwealth = the 10-year transition government preparing for independence, led by Quezon."},
        {h:"World War II"},
        {p:"Japan occupied the Philippines during WWII (1941–1945). Filipinos resisted fiercely; liberation came in 1945, and full independence followed in 1946."},
        {app:"The American period's legacy — English, education, institutions — still shapes Philippine society, law, and culture today."},
        {recap:[
          "The U.S. ruled after Spain; the Philippine-American War followed.",
          "The Commonwealth (1935–46) prepared for independence.",
          "Full independence came in 1946 after WWII."
        ]},
        {recall:[
          "Who was the first Commonwealth president?",
          "What did the Americans introduce to the Philippines?",
          "When did the Philippines gain full independence?"
        ]}
      ]},
      { n:8, title:"Post-War Philippines and Review", blocks:[
        {h:"Overview"},
        {p:"After independence in 1946, the Philippines faced the challenges of nation-building. This lesson surveys the post-war era and reviews the course."},
        {h:"Building the nation"},
        {ul:[
          "Reconstruction after wartime devastation.",
          "Economic development and political challenges.",
          "Martial Law under Ferdinand Marcos (1972–1986) and the People Power Revolution.",
        ]},
        {h:"People Power and democracy"},
        {p:"The 1986 EDSA People Power Revolution peacefully restored democracy, showing the power of united, peaceful citizen action."},
        {mem:"1986 EDSA = peaceful revolution that restored democracy — a defining moment of Filipino courage and unity."},
        {h:"Why history matters now"},
        {p:"Knowing this history helps Filipinos make informed choices as citizens and protect hard-won freedoms."},
        {h:"Course recap"},
        {ul:[
          "History uses sources to understand the past.",
          "Precolonial society was advanced; Spain ruled 300+ years.",
          "Reform, revolution, American rule, WWII, and independence shaped the nation."
        ]},
        {app:"An informed citizenry that knows its history can hold leaders accountable and safeguard democracy — history is a tool for active citizenship."},
        {recap:[
          "Post-war Philippines rebuilt and faced dictatorship.",
          "EDSA 1986 restored democracy peacefully.",
          "History empowers informed, responsible citizenship."
        ]},
        {recall:[
          "What did the 1986 EDSA Revolution achieve?",
          "Why is understanding history important for citizens?",
          "Name one period in Philippine history that shaped today's society."
        ]}
      ]}
    ]
  },

  {
    code:"NSTP 1", title:"National Service Training Program 1",
    color:"#ef4444", units:3,
    desc:"Citizenship training and national service — understanding civic duty, values, and community involvement as a Filipino citizen.",
    lessons:[
      { n:1, title:"The NSTP Law and Overview", blocks:[
        {h:"Overview"},
        {p:"The National Service Training Program (NSTP) is required of Filipino college students. This lesson explains the law behind it and its purpose."},
        {h:"What is the NSTP?"},
        {p:"NSTP is a program aimed at enhancing civic consciousness and defense preparedness among youth, developing their sense of duty to the nation."},
        {mem:"NSTP = training youth for civic consciousness, defense preparedness, and national service."},
        {h:"Legal basis"},
        {p:"NSTP was created by Republic Act 9163 (2001), making it a requirement for all college students, both male and female."},
        {hl:"RA 9163 (NSTP Act of 2001) established the program and its three components."},
        {h:"Why it matters"},
        {p:"NSTP connects students to their communities and nation, building responsible, service-oriented citizens — not just skilled professionals."},
        {app:"The values NSTP instills — service, responsibility, and patriotism — prepare students to contribute meaningfully to society in any career."},
        {recap:[
          "NSTP trains youth in civic consciousness and national service.",
          "It is mandated by RA 9163 (2001).",
          "It builds responsible, service-minded citizens."
        ]},
        {recall:[
          "What law created the NSTP?",
          "What is the main goal of NSTP?",
          "Who is required to take NSTP?"
        ]}
      ]},
      { n:2, title:"The Three NSTP Components", blocks:[
        {h:"Overview"},
        {p:"NSTP offers three components so students can serve in ways matching their interests. This lesson explains each option."},
        {h:"The three components"},
        {ul:[
          "ROTC (Reserve Officers' Training Corps) — military training for national defense.",
          "CWTS (Civic Welfare Training Service) — community service and development programs.",
          "LTS (Literacy Training Service) — teaching literacy and numeracy to others."
        ]},
        {mem:"ROTC = military · CWTS = community service · LTS = teaching literacy."},
        {h:"Choosing a component"},
        {p:"Students select one component. CWTS and LTS are the most common choices, focusing on civic welfare and education rather than military training."},
        {ex:"A CWTS student might organize a community health drive or environmental cleanup, applying learning to real community needs."},
        {app:"Each component develops leadership, teamwork, and a service mindset — transferable skills for any profession and for active citizenship."},
        {recap:[
          "NSTP has three components: ROTC, CWTS, and LTS.",
          "ROTC is military; CWTS is community service; LTS is teaching.",
          "All develop leadership and service skills."
        ]},
        {recall:[
          "What does CWTS stand for and focus on?",
          "Which component is military training?",
          "Name one skill all components develop."
        ]}
      ]},
      { n:3, title:"Citizenship and the Constitution", blocks:[
        {h:"Overview"},
        {p:"Good citizenship rests on understanding rights, duties, and the constitution. This lesson covers what it means to be a responsible Filipino citizen."},
        {h:"Rights and duties"},
        {ul:[
          "Rights — protections guaranteed to citizens (e.g., vote, free speech, education).",
          "Duties — responsibilities citizens owe (e.g., pay taxes, obey laws, vote)."
        ]},
        {mem:"Rights = what you're guaranteed. Duties = what you owe in return. They go together."},
        {h:"The Constitution"},
        {p:"The 1987 Philippine Constitution is the supreme law of the land, defining government structure and guaranteeing citizens' rights and freedoms."},
        {hl:"The constitution balances government power with citizens' rights — protecting freedom while enabling order."},
        {h:"Active citizenship"},
        {p:"Citizenship isn't passive. Voting, paying taxes honestly, following laws, and contributing to the community are all part of being a good citizen."},
        {app:"Active, informed citizens sustain democracy and good governance — essential for national progress in every field."},
        {recap:[
          "Citizens have both rights and duties.",
          "The 1987 Constitution is the supreme law.",
          "Active citizenship strengthens democracy."
        ]},
        {recall:[
          "Give one right and one duty of a citizen.",
          "What is the supreme law of the Philippines?",
          "What does active citizenship involve?"
        ]}
      ]},
      { n:4, title:"Values Formation and Ethics", blocks:[
        {h:"Overview"},
        {p:"Values guide behavior and decisions. This lesson explores Filipino values and the ethics that shape responsible citizenship and service."},
        {h:"What are values?"},
        {p:"Values are beliefs about what is good, important, and worthwhile. They shape how we act, choose, and treat others."},
        {h:"Filipino values"},
        {ul:[
          "Bayanihan — communal unity and cooperation.",
          "Pakikisama — smooth interpersonal relationships.",
          "Utang na loob — gratitude and reciprocity.",
          "Hospitality and respect for elders (po, opo)."
        ]},
        {mem:"Bayanihan = community working together — the spirit behind NSTP service."},
        {h:"Positive and negative sides"},
        {p:"Some values have downsides if taken to extremes — pakikisama can become harmful conformity. Ethical reflection helps us use values wisely."},
        {app:"Strong values build trust, teamwork, and integrity — qualities employers, communities, and families all depend on."},
        {recap:[
          "Values guide decisions and behavior.",
          "Filipino values include bayanihan and respect.",
          "Values should be reflected on, not followed blindly."
        ]},
        {recall:[
          "What is bayanihan?",
          "Name two Filipino values.",
          "Why must values be reflected on critically?"
        ]}
      ]},
      { n:5, title:"Drug Awareness and Prevention", blocks:[
        {h:"Overview"},
        {p:"Substance abuse destroys lives, families, and communities. This lesson provides accurate information about drugs and prevention."},
        {h:"Understanding drugs"},
        {p:"Drugs alter the body and mind. Some are medicines used properly; others are abused and cause dependence, health damage, and legal problems."},
        {h:"Dangers of abuse"},
        {ul:[
          "Health damage to brain, organs, and mental health.",
          "Addiction — compulsive use despite harm.",
          "Legal, financial, and family consequences."
        ]},
        {mem:"Addiction = compulsive use despite harm — a health condition, not a moral failure."},
        {h:"Prevention"},
        {p:"Prevention means making healthy choices, resisting peer pressure, managing stress positively, and seeking help early."},
        {hl:"Drug abuse is preventable — education, healthy coping skills, and support are the best defenses."},
        {app:"Understanding drug awareness helps you protect yourself and others, and contributes to safer, healthier communities."},
        {recap:[
          "Drug abuse harms health, relationships, and society.",
          "Addiction is a health condition requiring support.",
          "Prevention relies on education and healthy choices."
        ]},
        {recall:[
          "What is addiction?",
          "Name two consequences of drug abuse.",
          "How can drug abuse be prevented?"
        ]}
      ]},
      { n:6, title:"Disaster Risk Reduction and Preparedness", blocks:[
        {h:"Overview"},
        {p:"The Philippines faces typhoons, earthquakes, and floods. This lesson covers disaster awareness and preparedness — vital knowledge for citizens."},
        {h:"Common hazards"},
        {ul:[
          "Typhoons and flooding — frequent and damaging.",
          "Earthquakes and volcanic eruptions.",
          "Landslides and storm surges."
        ]},
        {mem:"The Philippines is disaster-prone due to its location — preparedness saves lives."},
        {h:"The three phases"},
        {ol:["Before — prepare kits, plans, and knowledge.","During — follow safety procedures and alerts.","After — check for injuries, assess damage, help others."]},
        {h:"What you can do"},
        {ul:[
          "Prepare an emergency 'go bag' with supplies.",
          "Know your evacuation routes and centers.",
          "Stay informed through official weather alerts."
        ]},
        {app:"Disaster preparedness protects you, your family, and your community. NSTP service often includes community disaster drills and education."},
        {recap:[
          "The Philippines faces many natural hazards.",
          "Disaster management has before, during, and after phases.",
          "Preparedness with kits and plans saves lives."
        ]},
        {recall:[
          "Name two natural hazards in the Philippines.",
          "List the three phases of disaster management.",
          "What should be in a 'go bag'?"
        ]}
      ]},
      { n:7, title:"Community Service and National Security", blocks:[
        {h:"Overview"},
        {p:"NSTP culminates in applying service to real needs. This lesson connects community service to national security and reviews the course."},
        {h:"Community service in action"},
        {p:"NSTP students plan and carry out projects — cleanups, health drives, tutoring, tree planting — addressing genuine community needs."},
        {mem:"Service learning = applying classroom knowledge to solve real community problems."},
        {h:"National security"},
        {p:"Security isn't only military. It includes economic stability, health, education, and disaster resilience — a secure community strengthens the nation."},
        {hl:"True national security is built by informed, healthy, united citizens serving their communities."},
        {h:"Course recap"},
        {ul:[
          "NSTP (RA 9163) has ROTC, CWTS, and LTS components.",
          "Citizenship, values, and ethics ground responsible service.",
          "Drug awareness, disaster preparedness, and community service protect the nation."
        ]},
        {app:"The NSTP mindset — service, responsibility, and civic engagement — makes you a better professional and a stronger citizen for life."},
        {recap:[
          "NSTP service addresses real community needs.",
          "National security is broader than military defense.",
          "Service and citizenship strengthen the nation."
        ]},
        {recall:[
          "Give one example of an NSTP community project.",
          "What is 'service learning'?",
          "How does community service relate to national security?"
        ]}
      ]}
    ]
  },

  {
    code:"PATHFit 1", title:"Movement Competency Training",
    color:"#14b8a6", units:2,
    desc:"Foundations of physical fitness and movement — building the competence, habits, and knowledge for lifelong health and performance.",
    lessons:[
      { n:1, title:"Introduction to Movement Competency", blocks:[
        {h:"Overview"},
        {p:"Movement competency is the ability to move with skill, efficiency, and safety. This course builds the foundation for lifelong fitness and physical confidence."},
        {h:"What is movement competency?"},
        {p:"It's the combination of mobility, stability, strength, and coordination that lets you perform movements correctly. Good competency prevents injury and boosts performance."},
        {mem:"Movement competency = moving well, safely, and efficiently — the foundation of all fitness."},
        {h:"Why it matters"},
        {ul:[
          "Reduces injury risk in daily life and sport.",
          "Improves posture, balance, and coordination.",
          "Builds confidence to stay active for life."
        ]},
        {hl:"You can't build fitness safely on poor movement — competence comes first."},
        {h:"Fitness vs competency"},
        {p:"Fitness is how fit you are (strength, endurance). Competency is how well you move. Both matter, but competency is the safer foundation to build on."},
        {app:"Athletes, soldiers, and everyday people all benefit — moving well prevents the injuries that derail careers and active lifestyles."},
        {recap:[
          "Movement competency means moving well and safely.",
          "It reduces injury and improves performance.",
          "Build competency before chasing fitness."
        ]},
        {recall:[
          "What is movement competency?",
          "Why does competency come before fitness?",
          "Name one benefit of good movement competency."
        ]}
      ]},
      { n:2, title:"Health-Related Fitness Components", blocks:[
        {h:"Overview"},
        {p:"Fitness has several parts. This lesson covers the health-related components that most directly affect your wellbeing and longevity."},
        {h:"The five health-related components"},
        {ul:[
          "Cardiovascular endurance — heart and lung efficiency.",
          "Muscular strength — how much force muscles produce.",
          "Muscular endurance — how long muscles can keep working.",
          "Flexibility — range of motion around joints.",
          "Body composition — ratio of fat to lean mass."
        ]},
        {mem:"The health-related five: Cardio · Strength · Endurance · Flexibility · Body composition."},
        {h:"Each component's role"},
        {p:"Cardio endurance powers sustained activity; strength handles loads; endurance sustains effort; flexibility prevents injury; composition reflects overall health."},
        {ex:"Running improves cardiovascular endurance; lifting weights builds muscular strength; stretching improves flexibility."},
        {app:"A balanced routine targeting all five components delivers the best health outcomes and reduces disease risk."},
        {recap:[
          "Five health-related components: cardio, strength, endurance, flexibility, body composition.",
          "Each targets a different aspect of health.",
          "Balanced training works all five."
        ]},
        {recall:[
          "Name three health-related fitness components.",
          "Which component is improved by running?",
          "Which is improved by stretching?"
        ]}
      ]},
      { n:3, title:"Warm-up, Mobility and Flexibility", blocks:[
        {h:"Overview"},
        {p:"Preparing the body prevents injury and improves performance. This lesson covers warming up, mobility, and flexibility training."},
        {h:"Why warm up?"},
        {p:"A warm-up raises body temperature, increases blood flow, and primes muscles and joints for activity. Skipping it raises injury risk."},
        {ul:[
          "General warm-up — light activity (jogging, jumping jacks) to raise heart rate.",
          "Dynamic stretching — moving through ranges of motion to prepare.",
          "Sport-specific — movements that mimic the activity ahead."
        ]},
        {mem:"Warm up before activity (dynamic); cool down after (static stretching)."},
        {h:"Mobility vs flexibility"},
        {ul:[
          "Flexibility — the range a muscle can stretch.",
          "Mobility — how well a joint moves actively with control."
        ]},
        {h:"Cooling down"},
        {p:"After activity, gentle static stretches help muscles recover and improve flexibility over time."},
        {app:"Proper warm-up and mobility work keep athletes and active people injury-free, allowing consistent training and progress."},
        {recap:[
          "Warm-ups prepare the body and prevent injury.",
          "Use dynamic stretching before, static after.",
          "Flexibility is muscle range; mobility is joint control."
        ]},
        {recall:[
          "Why is a warm-up important?",
          "What type of stretching is done before activity?",
          "Difference between flexibility and mobility?"
        ]}
      ]},
      { n:4, title:"Posture and Body Mechanics", blocks:[
        {h:"Overview"},
        {p:"How you hold and move your body affects health, energy, and injury risk. This lesson covers posture and proper body mechanics."},
        {h:"What is good posture?"},
        {p:"Good posture keeps the body aligned so muscles, joints, and the spine work efficiently with minimal strain."},
        {ul:[
          "Ears over shoulders, shoulders over hips.",
          "Spine in neutral — not overly arched or rounded.",
          "Relaxed but supported, not stiff."
        ]},
        {mem:"Good posture = aligned, efficient, low-strain. Poor posture = pain and injury over time."},
        {h:"Body mechanics in daily life"},
        {p:"Proper mechanics mean moving safely — lifting with the legs (not the back), avoiding twisting under load, and keeping objects close."},
        {ex:"To lift safely: bend knees, keep the back straight, hold the load close, and lift with your legs."},
        {mis:"'Lift with your legs, not your back' isn't just a saying — bending at the waist to lift is a leading cause of back injury."},
        {app:"Good posture and mechanics prevent the back, neck, and joint problems that plague students, office workers, and manual laborers alike."},
        {recap:[
          "Good posture aligns the body efficiently.",
          "Lift with the legs, keep loads close.",
          "Proper mechanics prevent long-term injury."
        ]},
        {recall:[
          "Describe two features of good posture.",
          "How should you lift a heavy object safely?",
          "What problems does poor posture cause?"
        ]}
      ]},
      { n:5, title:"Fundamental Movement Skills", blocks:[
        {h:"Overview"},
        {p:"All physical activity is built from fundamental movement skills. This lesson covers the basic movements you should master before advanced training."},
        {h:"Categories of fundamental skills"},
        {ul:[
          "Locomotor — moving the body through space (running, jumping, hopping).",
          "Non-locomotor — moving in place (bending, twisting, balancing).",
          "Manipulative — controlling objects (throwing, catching, kicking)."
        ]},
        {mem:"Fundamental skills: Locomotor (travel) · Non-locomotor (in place) · Manipulative (objects)."},
        {h:"Mastering the basics"},
        {p:"Like learning letters before writing sentences, mastering fundamental skills lets you perform complex sports and activities safely and well."},
        {ex:"A squat is a fundamental movement — mastering it builds the strength and pattern needed for jumping, lifting, and many sports."},
        {app:"Athletes who master fundamentals progress faster and get injured less. These skills also keep everyday people moving well into old age."},
        {recap:[
          "Fundamental skills are the building blocks of movement.",
          "Three categories: locomotor, non-locomotor, manipulative.",
          "Mastery of basics enables safe, advanced activity."
        ]},
        {recall:[
          "Name the three categories of fundamental skills.",
          "Give an example of a manipulative skill.",
          "Why master fundamentals first?"
        ]}
      ]},
      { n:6, title:"Cardiovascular and Strength Basics", blocks:[
        {h:"Overview"},
        {p:"Two pillars of fitness are cardiovascular training and strength training. This lesson introduces how to develop both safely and effectively."},
        {h:"Cardiovascular training"},
        {p:"Cardio (aerobic) exercise strengthens the heart and lungs. Aim for moderate activity that raises your heart rate and breathing over sustained periods."},
        {ul:[
          "Examples: brisk walking, jogging, cycling, swimming.",
          "Benefits: heart health, endurance, calorie burn, mood."
        ]},
        {mem:"Cardio = heart and lungs (endurance). Strength = muscles (force). Both are essential."},
        {h:"Strength training"},
        {p:"Strength training builds muscle using resistance — bodyweight, free weights, or machines. It improves strength, bone density, and metabolism."},
        {ex:"Bodyweight exercises like push-ups, squats, and planks build strength with no equipment needed."},
        {hl:"A balanced program includes both cardio and strength — each supports the other."},
        {app:"Consistent cardio and strength training reduce disease risk, boost energy, improve mood, and maintain independence with age."},
        {recap:[
          "Cardio builds heart and lung endurance.",
          "Strength training builds muscle and bone.",
          "A balanced program includes both."
        ]},
        {recall:[
          "Give two examples of cardio exercise.",
          "What does strength training improve besides muscle?",
          "Why include both cardio and strength?"
        ]}
      ]},
      { n:7, title:"Fitness Assessment and Review", blocks:[
        {h:"Overview"},
        {p:"To improve fitness, you must measure it. This lesson covers basic fitness assessments and reviews the course to build a lifelong fitness mindset."},
        {h:"Why assess fitness?"},
        {p:"Assessment sets a baseline, tracks progress, and identifies areas to improve. What gets measured can be improved."},
        {h:"Common assessments"},
        {ul:[
          "Cardio — step test, run/walk for time.",
          "Strength — push-up or plank test.",
          "Flexibility — sit-and-reach test.",
          "Body composition — BMI or measurements."
        ]},
        {mem:"Assess to establish a baseline, set goals, and track real progress."},
        {h:"Building lifelong habits"},
        {p:"Sustainable fitness comes from consistent, enjoyable habits — not extreme effort. Start small, build gradually, and stay consistent."},
        {h:"Course recap"},
        {ul:[
          "Movement competency is the safe foundation of fitness.",
          "Train all health-related components with proper warm-ups and mechanics.",
          "Assess progress and build consistent habits for life."
        ]},
        {app:"Fitness is a lifelong journey. The habits and knowledge from this course support health, energy, and performance for decades."},
        {recap:[
          "Assessments establish baselines and track progress.",
          "Set goals based on assessment results.",
          "Consistent habits beat extreme, short-term effort."
        ]},
        {recall:[
          "Why assess your fitness?",
          "Name one test for flexibility.",
          "What makes fitness habits sustainable?"
        ]}
      ]}
    ]
  }
];
