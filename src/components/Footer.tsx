export default function Footer() {
  return (
    <footer className="bg-nude-accent text-nude-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">COFFEE</h3>
            <p className="text-nude-secondary text-sm leading-relaxed">
              Premium coffee drinks made with love and served with care.
              Experience the finest blends in every cup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-nude-secondary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-nude-secondary hover:text-nude-primary transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-nude-secondary hover:text-nude-primary transition-colors text-sm">
                  Products
                </a>
              </li>
              <li>
                <a href="/account" className="text-nude-secondary hover:text-nude-primary transition-colors text-sm">
                  Account
                </a>
              </li>
              <li>
                <a href="/cart" className="text-nude-secondary hover:text-nude-primary transition-colors text-sm">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-nude-secondary">Contact</h4>
            <div className="space-y-2">
              <p className="text-nude-secondary text-sm">
                <span className="block">123 Coffee Street</span>
                <span className="block">Coffeeville, CF 12345</span>
              </p>
              <p className="text-nude-secondary text-sm">
                <a href="mailto:hello@coffee.com" className="hover:text-nude-primary transition-colors">
                  hello@coffee.com
                </a>
              </p>
              <p className="text-nude-secondary text-sm">
                <a href="tel:+1-234-567-8900" className="hover:text-nude-primary transition-colors">
                  +1 (234) 567-8900
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-nude-secondary mt-8 pt-8 text-center">
          <p className="text-nude-secondary text-sm">
            © 2024 COFFEE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}