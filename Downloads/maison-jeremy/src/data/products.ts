export interface Product {
  id: string
  name: string
  subtitle: string
  tagline: string
  price: string
  material: string
  caseMaterial: string
  crystal: string
  movement: string
  waterResistance: string
  diameter: string
  thickness: string
  strap: string
  lume: string
  limitedTo: string | null
  accentColor: string
  images: {
    hero: string
    side: string
    detail: string
    wrist?: string
  }
  specs: Array<{ label: string; value: string }>
  description: string
  shortDesc: string
}

export const products: Product[] = [
  {
    id: 'mj-01-monolith',
    name: 'MJ-01',
    subtitle: 'Monolith',
    tagline: 'The primary form. Grade 5 titanium forged into architecture.',
    price: '₦4,500,000',
    material: 'Grade 5 Titanium',
    caseMaterial: 'Grade 5 Titanium — brushed industrial finish',
    crystal: 'Sapphire crystal, AR-coated both sides',
    movement: 'In-house MJ-Cal 01, 72h power reserve',
    waterResistance: '300m / 30ATM',
    diameter: '42mm',
    thickness: '12.4mm',
    strap: 'Grey rubber integrated strap with titanium deployant',
    lume: 'Surgical Orange SuperLuminova — C1 grade',
    limitedTo: null,
    accentColor: '#FF4D00',
    images: {
      hero: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440054/Gemini_Generated_Image_brp0mjbrp0mjbrp0_gxztkh.png',
      side: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440061/Gemini_Generated_Image_lv0qy5lv0qy5lv0q_fkphd9.png',
      detail: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440071/Gemini_Generated_Image_y43p3my43p3my43p_njirwf.png',
      wrist: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440072/Gemini_Generated_Image_rp7snhrp7snhrp7s_n3y6qj.png',
    },
    specs: [
      { label: 'Reference', value: 'MJ-01-T-GR' },
      { label: 'Case', value: 'Grade 5 Titanium' },
      { label: 'Diameter', value: '42mm' },
      { label: 'Thickness', value: '12.4mm' },
      { label: 'Crystal', value: 'Sapphire, AR both sides' },
      { label: 'Movement', value: 'MJ-Cal 01 In-house' },
      { label: 'Power Reserve', value: '72 hours' },
      { label: 'Water Resistance', value: '300m / 30ATM' },
      { label: 'Weight', value: '98g' },
      { label: 'Strap', value: 'Integrated Grey Rubber' },
    ],
    description:
      'The Monolith is the foundational statement. A grade 5 titanium case shaped by the philosophy of Brutalist architecture — forms that do not ask permission. The squircle geometry sits on the wrist with architectural authority. Brushed industrial surfaces catch light the way concrete does: bluntly, honestly.',
    shortDesc: 'The primary form. Titanium authority.',
  },
  {
    id: 'mj-01-void',
    name: 'MJ-01',
    subtitle: 'Void',
    tagline: 'NTPT carbon. A watch that absorbs light rather than reflects it.',
    price: '₦6,200,000',
    material: 'NTPT Carbon',
    caseMaterial: 'NTPT Carbon fiber — multidirectional weave',
    crystal: 'Sapphire crystal, AR-coated both sides',
    movement: 'In-house MJ-Cal 01 Black Edition, 72h power reserve',
    waterResistance: '300m / 30ATM',
    diameter: '42mm',
    thickness: '11.8mm',
    strap: 'Black rubber integrated strap with DLC-coated titanium deployant',
    lume: 'Surgical Orange SuperLuminova — C1 grade',
    limitedTo: '88 pieces',
    accentColor: '#FF4D00',
    images: {
      hero: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440056/Gemini_Generated_Image_vtarqzvtarqzvtar_res7l5.png',
      side: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440073/Gemini_Generated_Image_3owziz3owziz3owz_wkhyjb.png',
      detail: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440078/Gemini_Generated_Image_hxmruzhxmruzhxmr_l14sfy.png',
    },
    specs: [
      { label: 'Reference', value: 'MJ-01-C-BK' },
      { label: 'Case', value: 'NTPT Carbon Fiber' },
      { label: 'Diameter', value: '42mm' },
      { label: 'Thickness', value: '11.8mm' },
      { label: 'Crystal', value: 'Sapphire, AR both sides' },
      { label: 'Movement', value: 'MJ-Cal 01 Black Edition' },
      { label: 'Power Reserve', value: '72 hours' },
      { label: 'Water Resistance', value: '300m / 30ATM' },
      { label: 'Weight', value: '71g' },
      { label: 'Edition', value: '88 numbered pieces' },
    ],
    description:
      'The Void eliminates reflection. NTPT carbon, built from 600 layers of filament wound at alternating 45° angles, creates a surface that consumes light. The near-Vantablack dial exists as negative space — pure architectural absence. Orange lume indices emerge from the darkness like structural markings on a blueprint.',
    shortDesc: 'NTPT carbon. Stealth luxury.',
  },
]

export const explodedComponents = [
  {
    id: 'crystal',
    label: '01 — Crystal',
    name: 'Sapphire Crystal',
    description: 'Synthetic sapphire, 9H hardness. AR-coated on both surfaces for zero reflectance distortion.',
    depth: 0,
  },
  {
    id: 'bezel',
    label: '02 — Bezel',
    name: 'Architectural Bezel',
    description: 'Squircle geometry machined to ±0.005mm tolerance. Brushed and polished contrast surfaces.',
    depth: 1,
  },
  {
    id: 'dial',
    label: '03 — Sandwich Dial',
    name: 'Sandwich Dial Construction',
    description: 'Two-layer dial system. Applied indices emerge from a recessed base plate. Depth and dimension without decoration.',
    depth: 2,
  },
  {
    id: 'movement',
    label: '04 — Movement',
    name: 'MJ-Cal 01 Manufacture',
    description: 'In-house caliber. 35 jewels. 72h power reserve. Column wheel chronograph architecture.',
    depth: 3,
  },
  {
    id: 'caseback',
    label: '05 — Case',
    name: 'Grade 5 Titanium Case',
    description: 'Investment-cast and CNC-finished. Brushed industrial surfaces. Helium escape valve at 10 o\'clock.',
    depth: 4,
  },
  {
    id: 'seals',
    label: '06 — Seals',
    name: 'Triple-Crown Gaskets',
    description: 'Three independent sealing systems. Rated 300m / 30ATM. Military-spec EPDM o-rings.',
    depth: 5,
  },
]
