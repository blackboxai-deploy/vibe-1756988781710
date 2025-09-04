import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-nude-secondary min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-nude-text">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Premium Coffee<br />
              <span className="text-nude-accent">Every Cup</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-nude-muted max-w-lg">
              Experience the perfect blend of tradition and innovation. Our expertly crafted coffee drinks bring you quality, comfort, and style in every sip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="bg-nude-accent text-nude-secondary px-8 py-3 font-semibold transition-colors hover:bg-nude-text text-center">
                Shop Now
              </Link>
              <Link href="/account" className="border border-nude-accent text-nude-accent px-8 py-3 font-semibold hover:bg-nude-accent hover:text-nude-secondary transition-colors text-center">
                Join Our Community
              </Link>
            </div>
          </div>

          {/* Right Content - Placeholder for coffee image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-96 bg-nude-primary rounded-lg shadow-lg flex items-center justify-center">
              <img
                src="https://placehold.co/500x500?text=Elegant+coffee+shop+interior+with+baristas+crafting+perfect+drinks+on+slate+counters"
                alt="Elegant coffee shop interior with warm lighting and skilled baristas"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}