import Hero from '../sections/Hero'
import ProductShowcase from '../sections/ProductShowcase'
import ExplodedView from '../sections/ExplodedView'
import BrandStory from '../sections/BrandStory'
import LifestyleGallery from '../sections/LifestyleGallery'
import Configurator from '../sections/Configurator'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductShowcase />
      <ExplodedView />
      <BrandStory />
      <LifestyleGallery />
      <Configurator />
    </main>
  )
}
