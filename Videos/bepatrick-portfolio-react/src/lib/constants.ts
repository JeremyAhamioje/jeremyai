/* ─── Site constants & data ─── */

export const SITE_NAME = 'Jeremy Ahamioje'
export const SITE_TITLE = 'Jeremy Ahamioje — Creative Developer'
export const SITE_ROLE = 'CREATIVE DEVELOPER, UI/UX DESIGNER'

export const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dz6kxumoo/video/upload/v1774818497/output-onlinegiftools_online-video-cutter.com_z7v6ac.mp4'

export const PROFILE_IMAGE_URL =
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1779883714/Gemini_Generated_Image_ir1zs1ir1zs1ir1z-removebg-preview_swf1pg.png'

export const LOGO_URL =
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778837798/Gemini_Generated_Image_alhhftalhhftalhh-removebg-preview_zpil3k.png'

export const VIDEO_LOOP_START = 12.8
export const VIDEO_LOOP_END   = 18.2

export const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'] as const

/* ─── About cards ─── */
export interface AboutCard {
  title: string
  body:  string
  tags:  string[]
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    title: 'Design',
    body:  'Crafting visual systems that balance beauty and function. From brand identity to UI/UX, every pixel is intentional.',
    tags:  ['Brand Identity', 'UI/UX', 'Motion'],
  },
  {
    title: 'Development',
    body:  'Writing clean, performant code that brings designs to life. Full-stack capable, front-end obsessed.',
    tags:  ['React / Next.js', 'Node.js', 'GSAP'],
  },
  {
    title: 'Others',
    body:  'Robotics, motion design, product management and engineering live here too. The range is wide and intentional.',
    tags:  ['Robotics', 'Product Mgmt', 'Engineering'],
  },
]

/* ─── About section — digest grid images ─── */
export const ABOUT_DIGEST_IMAGES = [
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012951/Luxury_fashion___independent_designers___SSENSE-removebg-preview_ivvgzr.png',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012928/cafe_studying_dfbmso.jpg',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012907/download_9_ozcxyu.jpg',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012897/UI_Ux_Case_Study_-_Culinary_Mobile_App_-_Reham_Khamis_sh6agh.jpg',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012881/Une_identit%C3%A9_visuelle_n_existe_que_si_elle_repose_sur_des_fondations_solides___celles_d_une_strat%C3%A9gie_pens%C3%A9e_en_profondeur____Apr%C3%A8s_une_phase_de_r%C3%A9flexion_strat%C3%A9gique_approfondie__positionnement__vale_j5foie.png',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012806/Business_Wireframe-removebg-preview_ehgck7.png',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012805/a_laptop_displaying_a_code_debugging_screen-removebg-preview_nfki7b.png',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012805/Mal%C3%83_na_-_Shopping_Mobile_UI_Kit-removebg-preview_ryujfx.png',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012805/design_could_be_fun_sometimes___._.__2.__severance_posterdesign_graphicdesign_graphic_juyfpi.jpg',
  'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775012805/download__10_-removebg-preview_1_svnf86.png',
]

/* ─── Projects — home horizontal scroll ─── */
export interface ProjectCard {
  num:      string
  title:    string
  subtitle: string
  year:     string
  role:     string
  desc:     string
  video:    string
  image:    string
  tags:     string[]
  href:     string
  category?: string
}

export const HOME_PROJECTS: ProjectCard[] = [
  {
    num: '01/', title: 'Shredded', subtitle: 'Shredded',
    year: '2025', role: 'Full-Stack Dev',
    desc: 'Modern sportswear e-commerce platform. Full shopping experience for a clothing brand.',
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830379/Screen_Recording_2026-05-14_014609_ymjfls.mp4',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    tags: ['Next.js', 'MongoDB'], href: 'https://www.shreddedcollective.store/',
  },
  {
    num: '02/', title: 'Jeremy AI', subtitle: 'Jeremy AI',
    year: '2025', role: 'Frontend Dev',
    desc: 'AI productivity assistant powered by Gemini API. AI chat, DOCX conversion, file merger.',
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829927/Screen_Recording_2026-05-15_041350_eiozl9.mp4',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    tags: ['Vite', 'Gemini API'], href: 'https://jeremyaiassistant.vercel.app/',
  },
  {
    num: '03/', title: 'Maison Jeremy', subtitle: 'Maison',
    year: '2025', role: 'Design & Dev',
    desc: 'Luxury watch brand concept website exploring branding, visual storytelling and premium UI.',
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829850/Screen_Recording_2026-05-15_043734_vdph1i.mp4',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&q=80',
    tags: ['Next.js', 'GSAP'], href: 'https://maison-jeremy.vercel.app/',
  },
  {
    num: '04/', title: 'Nightshift Observatory', subtitle: 'Nightshift',
    year: '2024', role: 'Creative Dev',
    desc: 'Astronomy e-learning platform with interactive Three.js visuals and educational simulations.',
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830064/Screen_Recording_2026-05-15_041901_bc6gqd.mp4',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    tags: ['React', 'Three.js'], href: 'https://nightshift-observatory.vercel.app/',
  },
  {
    num: '05/', title: 'Jeremy Blog', subtitle: 'Blog',
    year: '2024', role: 'Full-Stack Dev',
    desc: 'Custom Strapi-powered blog with bespoke admin logic, CMS integration and content architecture.',
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829846/Screen_Recording_2026-05-15_043303_mv00jl.mp4',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    tags: ['Strapi', 'React'], href: 'https://blog-strapi-x61r.vercel.app/',
  },
]

/* ─── All Projects page panels ─── */
export interface ProjectPanel {
  num:     string
  super:   string
  title:   string
  desc:    string
  tags:    string[]
  video:   string
  image:   string
  year:    string
  role:    string
  panelBg: string
  href:    string
  flip?:   boolean
}

export const ALL_PROJECTS: ProjectPanel[] = [
  { num: '01', super: 'E-Commerce / Full-Stack', title: 'SHREDDED',
    desc: 'Modern sportswear e-commerce platform. Full shopping experience — product catalog, cart, checkout, and admin.',
    tags: ['Next.js', 'MongoDB', 'Stripe'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830379/Screen_Recording_2026-05-14_014609_ymjfls.mp4',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
    year: '2025', role: 'Full-Stack Dev', href: 'https://www.shreddedcollective.store', panelBg: 'linear-gradient(135deg,#0a0a0a,#1a0a00)' },
  { num: '02', super: 'AI Productivity Tool', title: 'JEREMY AI',
    desc: 'AI productivity assistant powered by Gemini API with AI chat, DOCX conversion, file merger and productivity utilities.',
    tags: ['Vite', 'Gemini API', 'TypeScript'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829927/Screen_Recording_2026-05-15_041350_eiozl9.mp4',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
    year: '2025', role: 'Frontend Dev', href: 'https://jeremyaiassistant.vercel.app/', panelBg: 'linear-gradient(135deg,#0a0a1a,#1a0a2d)', flip: true },
  { num: '03', super: 'Luxury Brand / Design', title: 'MAISON JEREMY',
    desc: 'Luxury watch brand concept website exploring high-end branding, visual storytelling and premium UI design language.',
    tags: ['Next.js', 'GSAP', 'Framer Motion'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829850/Screen_Recording_2026-05-15_043734_vdph1i.mp4',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&q=80',
    year: '2025', role: 'Design & Dev', href: 'https://maison-jeremy.vercel.app/', panelBg: 'linear-gradient(135deg,#0d0d0d,#1a1200)' },
  { num: '04', super: 'EdTech / 3D / Immersive', title: 'NIGHTSHIFT\nOBSERVATORY',
    desc: 'Astronomy e-learning platform with interactive Three.js visuals, educational simulations and immersive space environments.',
    tags: ['React', 'Three.js', 'WebGL'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830064/Screen_Recording_2026-05-15_041901_bc6gqd.mp4',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80',
    year: '2024', role: 'Creative Dev', href: 'https://nightshift-observatory.vercel.app/', panelBg: 'linear-gradient(135deg,#00050f,#0a0a28)', flip: true },
  { num: '05', super: 'CMS / Blog Platform', title: 'JEREMY BLOG',
    desc: 'Custom Strapi-powered blog with bespoke admin logic, flexible content architecture and CMS integration.',
    tags: ['Strapi', 'React', 'PostgreSQL'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829846/Screen_Recording_2026-05-15_043303_mv00jl.mp4',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80',
    year: '2024', role: 'Full-Stack Dev', href: 'https://blog-strapi-x61r.vercel.app/', panelBg: 'linear-gradient(135deg,#0a0a0a,#001a0a)' },
  { num: '06', super: 'OS-Inspired / Experimental', title: 'WINDOWS\nPORTFOLIO',
    desc: 'Experimental OS-inspired portfolio with wallpaper changing, calculator, Spotify widget and mini browser apps.',
    tags: ['React', 'CSS', 'Experimental'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830095/Screen_Recording_2026-05-15_063321_ok0xro.mp4',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80',
    year: '2024', role: 'Creative Dev', href: 'https://folk-grip-43835807.figma.site/', panelBg: 'linear-gradient(135deg,#0d0d0d,#1a1a1a)', flip: true },
  { num: '07', super: 'Space / Advancement', title: 'ORBITA',
    desc: 'Space and human advancement themed website exploring the frontier of possibility through immersive web design.',
    tags: ['React', 'Three.js', 'GSAP'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830188/Video_Project_3_2_qjw9v6.mp4',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
    year: '2024', role: 'Creative Dev', href: 'https://humanity-kappa.vercel.app/', panelBg: 'linear-gradient(135deg,#00050f,#05001a)' },
  { num: '08', super: 'Engineering Portfolio', title: 'JEREMY\nENGINEERING',
    desc: 'Portfolio focused on robotics, engineering and experimental systems where hardware meets software.',
    tags: ['React', 'Three.js', 'ROS2'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830369/Screen_Recording_2026-05-15_060017_bdimyy.mp4',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&q=80',
    year: '2023', role: 'Engineering', href: 'https://portfolio-pa3u.vercel.app/', panelBg: 'linear-gradient(135deg,#0a0a0a,#001005)', flip: true },
  { num: '09', super: 'Motion / Luxury Automotive', title: 'PAGANI\nEXPERIENCE',
    desc: 'Motion-heavy luxury automotive-inspired site exploring cinematic scrolling, GSAP ScrollTrigger and digital storytelling.',
    tags: ['GSAP', 'React', 'ScrollTrigger'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830022/Screen_Recording_2026-05-15_054317_vjrkpq.mp4',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&q=80',
    year: '2023', role: 'Motion Dev', href: 'https://paganiscroll.vercel.app/', panelBg: 'linear-gradient(135deg,#0d0000,#1a0500)' },
  { num: '10', super: 'Gaming / Interactive', title: 'GAMING HUB',
    desc: 'Gaming platform with custom browser-based games, leaderboards and interactive entertainment experiences.',
    tags: ['React', 'Canvas API', 'WebSockets'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830021/Screen_Recording_2026-05-15_063033_lpusyg.mp4',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80',
    year: '2023', role: 'Frontend Dev', href: 'https://crater-tame-79467474.figma.site/', panelBg: 'linear-gradient(135deg,#05000d,#0d0020)', flip: true },
  { num: '11', super: 'AI / Travel Planning', title: 'TRIPPIT',
    desc: 'AI-powered itinerary and travel planning platform with smart trip builder and real-time suggestions.',
    tags: ['React', 'AI API', 'Maps'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829933/Screen_Recording_2026-05-15_053625_wij3cn.mp4',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80',
    year: '2023', role: 'Full-Stack Dev', href: 'https://trippit-pi-drab.vercel.app/', panelBg: 'linear-gradient(135deg,#00100a,#001a14)' },
  { num: '12', super: 'Music / Retro Web App', title: 'RETRO SPINS',
    desc: 'Retro-inspired vinyl music player web app. Nostalgic aesthetic meets modern audio engineering.',
    tags: ['React', 'Web Audio API', 'CSS'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778829967/Screen_Recording_2026-05-15_062839_xelq5l.mp4',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80',
    year: '2023', role: 'Creative Dev', href: 'https://pound-city-70607657.figma.site/', panelBg: 'linear-gradient(135deg,#1a0000,#2d0500)', flip: true },
  { num: '13', super: 'Museum / 3D Interactive', title: 'GLOBAL\nMUSEUM HUB',
    desc: 'Interactive world museum concept with 3D artifacts, maps, countries and historical information.',
    tags: ['React', 'Three.js', 'GIS'],
    video: 'https://res.cloudinary.com/dz6kxumoo/video/upload/v1778830102/Screen_Recording_2026-05-15_064227_p0kvrk.mp4',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900&q=80',
    year: '2023', role: 'Creative Dev', href: 'https://dingy-wiry-12631115.figma.site/', panelBg: 'linear-gradient(135deg,#0a0510,#10052a)' },
  { num: '14', super: 'UI/UX Design / Figma', title: 'FOOD\nDELIVERY APP',
    desc: 'Figma food delivery app concept showcasing UI/UX design — user flows, components and high-fidelity prototypes.',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    video: '',
    image: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778836345/Screenshot_2026-05-15_045603_ijhyhu.png',
    year: '2022', role: 'UI/UX Design', href: '/wip', panelBg: 'linear-gradient(135deg,#0d0a00,#1a1200)', flip: true },
]

/* ─── Tools ─── */
export interface Tool {
  name: string
  src:  string
  desc: string
}

export const TOOLS: Tool[] = [
  { name: 'Vite',         src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662952/Vite_Logo_PNG_Vector_SVG_Free_Download_tlvzdu.jpg',                                                                     desc: 'Lightning-fast build tool and dev server.' },
  { name: 'Blender',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662952/Blender_vector_logo_in_SVG_EPS_for_free_-_Brandlogos_net_k1og43.jpg',                                                  desc: '3D modeling, animation and rendering.' },
  { name: 'Next.js',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662952/Next_js_Logo_PNG_Vector_SVG_Free_Download_u7psxv.jpg',                                                                 desc: 'React framework for production.' },
  { name: 'Node.js',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662608/node_p7mjdj.jpg',                                                                                                       desc: 'JavaScript runtime on V8.' },
  { name: 'JavaScript',   src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662608/javascript_bkbhxr.png',                                                                                                 desc: 'The language of the web.' },
  { name: 'MongoDB',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662608/mongodb_duanv2.jpg',                                                                                                    desc: 'NoSQL database for modern apps.' },
  { name: 'React',        src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662609/ReactJS_wlaisj.jpg',                                                                                                    desc: 'Library for building composable UIs.' },
  { name: 'Notion',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662609/Notion_Logo_transparent_PNG_-_StickPNG_vbmxmf.jpg',                                                                    desc: 'All-in-one workspace.' },
  { name: 'Pinterest',    src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662609/Pinterest_logo_sxige2.jpg',                                                                                             desc: 'Visual discovery for creative ideas.' },
  { name: 'Material UI',  src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/Material_UI_vs_Joy_UI_vs_Base_UI_vehxtg.jpg',                                                                          desc: 'React components on Material Design.' },
  { name: 'Google Cloud', src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/Google_Cloud_Logo_Icon_itt6fh.jpg',                                                                                    desc: 'Cloud computing by Google.' },
  { name: 'Git',          src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/Git_on81gi.png',                                                                                                        desc: 'Distributed version control.' },
  { name: 'HTML',         src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/html_zulfdy.jpg',                                                                                                       desc: 'Standard markup language.' },
  { name: 'VS Code',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662606/Visual_Studio_Code_logo_in_vector_format_-_Brandlogos_net_qpfjrw.jpg',                                                 desc: 'Code editor of choice.' },
  { name: 'Docker',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/Docker_mark_logo_in_vector_formats_EPS_SVG_-_Brandlogos_net_xivv8v.jpg',                                               desc: 'Containerized applications.' },
  { name: 'Copilot',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662607/Copilot_n79hzf.jpg',                                                                                                    desc: 'AI-powered pair programmer.' },
  { name: 'Gemini',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662606/gemini_logo_-_Pesquisa_Google_nnt3fe.jpg',                                                                             desc: 'Advanced AI models from Google.' },
  { name: 'AWS',          src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662606/Best_Amazon_Web_Services_institute_gktrtv.jpg',                                                                         desc: 'Comprehensive cloud platform.' },
  { name: 'Figma',        src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/Figma__The_Collaborative_Interface_Design_Tool_pcpurs.jpg',                                                             desc: 'Collaborative interface design.' },
  { name: 'Claude',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/Download_Claude_AI_Logo_Rounded_HD_vxxlyd.jpg',                                                                        desc: 'AI for reasoning and writing.' },
  { name: 'Express',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/express_j8tdgv.jpg',                                                                                                    desc: 'Minimalist Node.js framework.' },
  { name: 'Webflow',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/The_Power_of_Webflow__What_a_Skilled_Developer_Can_Do_for_Your_Site_-_TechKnowable_k2xrw9.jpg',                        desc: 'Design-led web platform.' },
  { name: 'Canva',        src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/365________________________________________________365_inspirational_canvas_templates_for_business_dvfdtn.jpg',         desc: 'Graphic design platform.' },
  { name: 'Vercel',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1772662605/Vercel_Logo_PNG_Vector_SVG_Free_Download_sxjjem.jpg',                                                                  desc: 'Frontend deployment platform.' },
  { name: 'TypeScript',   src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775013900/download_11_mami0f.jpg',                                                                                               desc: 'Typed superset of JavaScript.' },
  { name: 'Supabase',     src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775013907/Supabase_Logo_PNG_Vector_SVG_Free_Download_yozgux.jpg',                                                                desc: 'Open source Firebase alternative.' },
  { name: 'Python',       src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775013900/Python_Programming_Language_Icon_PNG_SVG_Design_For_T-Shirts_xi7z0x.jpg',                                              desc: 'High-level programming language.' },
  { name: 'Flutter',      src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1775013900/Flutter_vector_logo__EPS.SVG_ac7g95.jpg',                                                                              desc: 'UI toolkit for compiled apps.' },
]

/* ─── Affairs ─── */
export interface Affair {
  label: string
  image: string
  href:  string
}

export const AFFAIRS: Affair[] = [
  { label: 'Robotics',           image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',  href: 'https://portfolio-pa3u.vercel.app/' },
  { label: 'Motion Design',      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',    href: '#' },
  { label: 'Freelancing',        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', href: '#' },
  { label: 'Engineering',        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80', href: 'https://portfolio-pa3u.vercel.app/' },
  { label: 'Product Management', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',    href: '#' },
  { label: 'Design',             image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',    href: '#' },
]

/* ─── Services ─── */
export interface Service {
  num:   string
  title: string
  desc:  string
  items: string[]
}

export const SERVICES: Service[] = [
  { num: '01', title: 'Web Development',      desc: 'Full-stack web applications built with modern frameworks and best practices.',   items: ['React / Next.js', 'Node.js / Express', 'REST & GraphQL APIs', 'Database Design'] },
  { num: '02', title: 'UI/UX Design',         desc: 'Human-centred design systems that balance aesthetics with functionality.',       items: ['User Research', 'Wireframing', 'Figma Prototypes', 'Design Systems'] },
  { num: '03', title: 'Frontend Engineering', desc: 'Pixel-perfect, performant interfaces with smooth animations and interactions.',  items: ['GSAP / Framer Motion', 'Three.js / WebGL', 'Responsive Design', 'Performance Opt.'] },
  { num: '04', title: 'AI Integrations',      desc: 'Embedding AI capabilities into products to create intelligent experiences.',     items: ['Gemini / OpenAI APIs', 'Chatbots & Assistants', 'Document AI', 'Custom Pipelines'] },
  { num: '05', title: 'CMS & Branding',       desc: 'Content management and brand implementation for teams that need to scale.',     items: ['Strapi / Sanity', 'Brand Identity', 'Style Guides', 'Component Libraries'] },
  { num: '06', title: 'Motion & 3D',          desc: 'Cinematic animations and 3D experiences that make products unforgettable.',     items: ['Blender 3D', 'GSAP ScrollTrigger', 'WebGL Shaders', 'Lottie / SVG Anim.'] },
]

/* ─── Footer drag cards ─── */
export interface DragCardData {
  id:        string
  bg:        string
  content:   string
  initStyle: string
}

export const DRAG_CARDS: DragCardData[] = [
  { id: 'dc1', bg: '#3b00ed', initStyle: 'top:14%;left:4%;transform:rotate(-3deg)',  content: 'Your tech stack<br/>called.<br/><em>It wants an upgrade.</em>' },
  { id: 'dc2', bg: '#16a34a', initStyle: 'top:8%;left:30%;transform:rotate(2deg)',   content: '<span style="font-style:italic;font-size:1.6rem;display:block">Shipped.</span>Pixel-perfect.<br/>Zero bugs.<br/>On deadline.' },
  { id: 'dc3', bg: '#ca8a04', initStyle: 'top:52%;left:16%;transform:rotate(-5deg)', content: 'Code so clean<br/>it hurts.' },
  { id: 'dc4', bg: '#9333ea', initStyle: 'top:46%;left:48%;transform:rotate(4deg)',  content: 'WARNING:<br/>May render your<br/>old dev obsolete.' },
  { id: 'dc5', bg: '#be123c', initStyle: 'top:18%;left:62%;transform:rotate(-2deg)', content: 'Frontend.<br/>Backend.<br/>Whatever it takes.' },
]
