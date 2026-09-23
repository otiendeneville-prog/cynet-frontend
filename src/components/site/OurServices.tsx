export default function OurServices() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-slate-100">
          
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Our <span className="text-primary">Services</span>
          </h2>
          
          <div className="flex-col lg:flex-row ml-0 gap-4 lg:gap-16">
            <p className="text-base leading-relaxed">
              Tailored solutions to help organizations succeed — from growth strategy and financial advisory to team building and research. We drive measurable outcomes at every stage.
            </p>
            
            <button className="flex-shrink-0 flex items-center p-1.5 pr-5 bg-white border border-slate-200 rounded-full transition-all duration-300 shadow-sm group/btn">
              <span className="flex items-center justify-center h-9 w-9 bg-secondary group-hover:bg-emerald-600 text-white rounded-full font-bold text-xs tracking-wider transition-colors">
                11+
              </span>
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-xs font-bold text-slate-800">Explore Solutions</span>
                <span className="text-[10px] text-slate-400 font-normal">View consultancy frameworks</span>
              </div>
            </button>
          </div>

        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Business Strategy Services
            </h1>
            <p className="text-slate-900">
              We help organizations build resilient strategies aligned to long-term goals — from operational frameworks to performance excellence.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
