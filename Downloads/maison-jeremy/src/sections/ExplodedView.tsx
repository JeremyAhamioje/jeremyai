import { useState } from 'react'
import { motion } from 'framer-motion'
import { explodedComponents } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Arrow target positions for each component (adjust as needed for accuracy)
const ARROW_TARGETS = [
  { top: '13%', left: '50%' }, // Crystal
  { top: '27%', left: '50%' }, // Bezel
  { top: '44%', left: '50%' }, // Dial
  { top: '62%', left: '50%' }, // Movement
  { top: '80%', left: '50%' }, // Caseback
  { top: '93%', left: '50%' }, // Seals
]

export default function ExplodedView() {
  const [activeComponent, setActiveComponent] = useState(0)
  const { ref, isInView } = useScrollReveal(0.1)



  return (
    <section ref={ref} className="py-24 md:py-40 theme-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20" />

      <div className="section-pad relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: THE INTERACTIVE IMAGE STAGE */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full flex items-center justify-center"
            >
              {/* THE MAIN EXPLODED IMAGE */}
              <img 
                src="https://res.cloudinary.com/dz6kxumoo/image/upload/v1778448355/Gemini_Generated_Image_yiebckyiebckyieb-removebg-preview_dcllz8.png"
                alt="Maison Jeremy Exploded View"
                className="w-full h-full object-contain z-10"
              />

              {/* ARROW POINTER OVERLAY */}
              {ARROW_TARGETS[activeComponent] && (
                <motion.div
                  key={activeComponent}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute z-30 pointer-events-none flex flex-col items-center"
                  style={{
                    top: ARROW_TARGETS[activeComponent].top,
                    left: ARROW_TARGETS[activeComponent].left,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Arrow SVG: points up for 6th, down for others */}
                  {activeComponent === 5 ? (
                    // Upward arrow
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#glow)">
                        <path d="M19 32V10" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M27 16l-8-8-8 8" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <filter id="glow" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF4D00" floodOpacity="0.4" />
                        </filter>
                      </defs>
                    </svg>
                  ) : (
                    // Downward arrow
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#glow)">
                        <path d="M19 6v22" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M11 22l8 8 8-8" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <filter id="glow" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF4D00" floodOpacity="0.4" />
                        </filter>
                      </defs>
                    </svg>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* RIGHT: COMPONENT SELECTOR */}
          <div className="flex flex-col h-full justify-center">
            <div className="mb-12">
              <p className="label-text text-orange-surgical mb-4 tracking-[0.2em] uppercase">Technical Anatomy</p>
              <h2 className="font-display text-4xl md:text-6xl theme-text-primary leading-tight">
                Refined <br /> <span className="font-light italic">Complexity.</span>
              </h2>
            </div>

            <div className="space-y-2">
              {explodedComponents.map((comp, i) => (
                <div key={comp.id} className="relative">
                  <button
                    onMouseEnter={() => setActiveComponent(i)}
                    onClick={() => setActiveComponent(i)}
                    className={`group w-full text-left py-5 px-6 rounded-lg transition-all duration-300 ${
                      i === activeComponent 
                      ? 'theme-bg-mid shadow-lg' 
                      : 'hover:theme-bg-mid/40'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`font-mono text-xs transition-colors ${
                        i === activeComponent ? 'text-orange-surgical' : 'theme-text-muted'
                      }`}>
                        0{i + 1}
                      </span>
                      
                      <div className="flex-1">
                        <h4 className={`font-display text-lg uppercase tracking-wide transition-colors ${
                          i === activeComponent ? 'theme-text-primary' : 'theme-text-muted'
                        }`}>
                          {comp.name}
                        </h4>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: i === activeComponent ? 'auto' : 0, opacity: i === activeComponent ? 1 : 0 }}
                          className="overflow-hidden"
                        >
                          <p className="theme-text-muted text-sm mt-2 leading-relaxed font-light">
                            {comp.description}
                          </p>
                        </motion.div>
                      </div>

                      {i === activeComponent && (
                        <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 bg-orange-surgical rounded-full" />
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}