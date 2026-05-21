export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/image/bg.png')",
       
      }}
    >
      <div className="absolute inset-0 " />

      <div className="relative z-10 flex h-full items-center px-10">
        <div className="max-w-2xl text-black">
          <h1 className="text-7xl font-bold">
            AMCEN
          </h1>

          <p className="mt-6 text-2xl">
            Engineering Ideas Into Reality
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-full">
              Explore
            </button>

            <button className="px-6 py-3 border border-white rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}