import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-subtle-themed theme-bg-primary">
      <div className="section-pad py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="font-display text-2xl theme-text-primary">Maison Jeremy</p>
              <p className="font-mono text-[10px] tracking-ultra uppercase theme-text-muted mt-1">Architecture for the Wrist</p>
            </div>
            <p className="font-body text-sm theme-text-muted leading-relaxed max-w-xs">
              Ultra-luxury architectural tool watches. Swiss movement. Brutalist geometry.
            </p>
          </div>

          {/* Collection */}
          <div>
            <p className="label-text mb-5">Collection</p>
            <ul className="space-y-3">
              {['MJ-01 Monolith', 'MJ-01 Void', 'Configure', 'Atelier'].map(item => (
                <li key={item}>
                  <Link
                    to="/collection"
                    className="text-sm theme-text-muted hover:theme-text-primary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison */}
          <div>
            <p className="label-text mb-5">Maison</p>
            <ul className="space-y-3">
              {['Our Story', 'Material Science', 'Craftsmanship', 'Press'].map(item => (
                <li key={item}>
                  <Link
                    to="/story"
                    className="text-sm theme-text-muted hover:theme-text-primary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-text mb-5">Contact</p>
            <ul className="space-y-3">
              <li className="text-sm theme-text-muted">atelier@maisonjeremy.com</li>
              <li className="text-sm theme-text-muted">+41 22 000 0000</li>
              <li className="text-sm theme-text-muted">Geneva, Switzerland</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-subtle-themed mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-ultra uppercase theme-text-muted">
            © 2024 Maison Jeremy SA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Legal'].map(item => (
              <Link
                key={item}
                to="/"
                className="font-mono text-[10px] tracking-ultra uppercase theme-text-muted hover:theme-text-muted transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
