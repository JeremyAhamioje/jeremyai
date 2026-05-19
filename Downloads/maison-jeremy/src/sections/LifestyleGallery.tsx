import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const galleryImages = [
  {
    src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440072/Gemini_Generated_Image_rp7snhrp7snhrp7s_n3y6qj.png',
    caption: 'MJ-01 Monolith — On Wrist',
    size: 'large',
  },
  {
    src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440061/Gemini_Generated_Image_lv0qy5lv0qy5lv0q_fkphd9.png',
    caption: 'Sandwich Dial — Close Detail',
    size: 'small',
  },
  {
    src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440073/Gemini_Generated_Image_3owziz3owziz3owz_wkhyjb.png',
    caption: 'MJ-01 Void — NTPT Carbon',
    size: 'small',
  },
  {
    src: 'https://res.cloudinary.com/dz6kxumoo/image/upload/v1778440078/Gemini_Generated_Image_hxmruzhxmruzhxmr_l14sfy.png',
    caption: 'Orange Lume — Night Vision',
    size: 'large',
  },
]

export default function LifestyleGallery() {
  const { ref, isInView } = useScrollReveal(0.05)

  return (
    <section ref={ref} className="py-24 md:py-40 theme-bg-secondary relative overflow-hidden">
      <div className="section-pad">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20 flex items-end justify-between"
        >
          <div>
            <p className="label-text mb-4">— Atelier</p>
            <h2 className="font-display text-5xl md:text-6xl font-light theme-text-primary">
              In context.
            </h2>
          </div>
          <p className="hidden md:block label-text text-right max-w-xs">
            Industrial environments. Architectural spaces. Natural light and artificial darkness.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-sm ${
                img.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
              } ${i === 0 ? 'aspect-square md:aspect-auto' : 'aspect-square'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="label-text text-[9px] opacity-80 theme-text-primary">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
