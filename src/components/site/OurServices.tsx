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
              Tailored solutions to help organizations succeed — from <br />growth strategy and financial advisory to team building <br /> and research. We drive measurable outcomes at every stage.
            </p>
            
            <button className="f flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <span className="flex items-center justify-center h-9 w-9 bg-secondary group-hover:bg-emerald-600 text-white rounded-full
              font-bold text-xs tracking-wider transition-colors">
                11+
              </span>
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-xs font-bold text-slate-800">Explore Solutions</span>
                <span className="text-[10px] text-slate-400 font-normal">View consultancy frameworks</span>
              </div>
            </button>
          </div>

        </div>

        <div className="mt-12 grid grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white hover: border rounded-3xl p-8 shadow-sm">
            <h1 className="text-xl  font-bold text-slate-900">
              Business Strategy Services
            </h1>
            <p className="text-slate-400 mt-6">
              We help organizations build resilient strategies aligned to long-term goals — from operational frameworks to performance excellence.
            </p>
            <div className="mt-8 grid grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-2">
              <button className="f flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-[10px] text-slate-400 font-normal">Strategic Planning</span>
              </div>
            </button>
            <button className="f flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-[10px] text-slate-400 font-normal">Balance Scorecard</span>
              </div>
            </button>
             <button className="f flex align-center justify-center items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-[10px] text-slate-400 font-normal">Operations</span>
              </div>
            </button>
             <button className="f align-center justify-center flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <div className="flex flex-col items-start ml-3 text-left">
                <span className="text-[10px] text-slate-400 font-normal">Performance Management</span>
              </div>
            </button>
            </div>
            
          </div>
          <div className="bg-white border  rounded-3xl p-8 shadow-sm ">
            <h1 className="text-xl font-bold text-slate-900">
                Team Building Services
            </h1>
            <p className="text-slate-900">
            Strengthen your organization from the inside. We design interventions that improve team dynamics, culture, and collective problem-solving capability.
            </p>
          </div>
          <div className="bg-white border  rounded-3xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900"> 
                Tax and Financial Issues
            </h1>
            <p className="text-slate-900">
             Navigate complex tax landscapes and optimize your financial position with expert advisory tailored to your sector and scale
            </p>
          </div>
          <div className="bg-white border  rounded-3xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
                Research Services
            </h1>
           <p className="text-slate-900">
            Data-driven insight to inform every decision. From baseline surveys to impact evaluations, we give you clarity on what's working and what's not.
           </p>
          </div>
        </div>
        


      </div>
    </section>
  )
}
