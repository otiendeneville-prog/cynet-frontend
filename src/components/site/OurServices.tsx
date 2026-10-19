import nita from "/assets/nita.webp"
import cynet from "/assets/cert.jpg"
import { Button } from "@/components/ui/button";

export default function OurServices() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-slate-100">

          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Our <p className="text-primary">Services</p>
          </h2>
          <div className="flex-col lg:flex-row ml-0 gap-4 lg:gap-16">
            <p className="text-base leading-relaxed">
              Tailored solutions to help organizations succeed — from <br />growth strategy and financial advisory to team building <br /> and research. We drive measurable outcomes at every stage.
            </p>

            <button className="flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm group/btn">
              <p className="flex items-center justify-center h-9 w-9 bg-secondary group-hover:bg-emerald-600 text-white rounded-full
              font-bold text-xs tracking-wider transition-colors">
                11+
              </p>
              <div className="flex flex-col items-start ml-3 text-left">
                <p className="text-xs  justify-center content-center font-bold text-slate-800">Explore Solutions</p>
                <p className="text-[10px] text-slate-400 font-normal">View consultancy frameworks</p>
              </div>
            </button>
          </div>

        </div>

        <div className="mt-12 grid grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className=" rounded-xl p-8  border border-border bg-card">
            <h1 className="text-xl  font-bold text-secondary">
              Business Strategy Services
            </h1>
            <p className="text-slate-400 mt-6">
              We help organizations build resilient strategies aligned to long-term goals — from operational frameworks to performance excellence.
            </p>
            <div className="mt-8 align md:grid-cols-2 lg:grid-cols-3 gap-2">
              <ul className="text-underline">
                <p className="font-normal text-slate-400">Strategic Planning</p>
                <p className="font-normal text-slate-400">Balance Scorecard</p>
                <p className="text-slate-400 font-normal">Operations</p>
                <p className=" text-slate-400 font-normal">Performance Management</p>
              </ul>

            </div>

          </div>
          <div className="rounded-xl p-8  border border-border bg-card">
            <h1 className="text-xl font-bold text-secondary">
              Team Building Services
            </h1>
            <p className="text-slate-400 mt-6">
              Strengthen your organization from the inside. We design interventions that improve team dynamics, culture, and collective problem-solving capability.
            </p>
            <div className="mt-8 grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-2">
              <p className=" text-slate-400 font-normal">Team Dynamics</p>
              <p className=" text-slate-400 font-normal">Productivity</p>
              <p className=" text-slate-400 font-normal">Culture Alignment</p>
            </div>
          </div>
          <div className="rounded-xl p-8  border border-border bg-card">
            <h1 className="text-xl font-bold text-secondary">
              Tax and Financial Issues
            </h1>
            <p className="text-slate-400 mt-6">
              Navigate complex tax landscapes and optimize your financial position with expert advisory tailored to your sector and scale
            </p>
            <div className="mt-8  grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-2">
              <p className="text-slate-400 font-normal">Business Tax</p>
              <p className="] text-slate-400 font-normal">Risk Management</p>
              <p className=" text-slate-400 font-normal">
                Capital Advisory
              </p>
              <p className="text-slate-400 font-normal justify-center">
                Employment Tax
              </p>
            </div>
            <div>

            </div>
          </div>
          <div className="rounded-xl p-8  border border-border bg-card">
            <h1 className="text-xl font-bold text-secondary">
              Research Services
            </h1>
            <p className="text-slate-400 mt-6">
              Data-driven insight to inform every decision. From baseline surveys to impact evaluations, we give you clarity on what's working and what's not.
            </p>
            <div className="mt-8  grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-2">
              <p className="text-slate-400 font-normal">
                Market Surveys
              </p>
              <p className="text-slate-400 font-normal">
                Impact Evaluations
              </p>
              <p className="text-slate-400 font-normal">
                Baseline Data
              </p>
              <p className="text-slate-400 font-normal">
                End-line Surveys
              </p>
            </div>
          </div>
          <div>
            <img src={cynet} alt="Cynet" />
          </div>
          <div className="align-center  content-center">
            <img className="" src={nita} alt="Nita" />
          </div>
        </div>
      </div>
    </section>
  )
}
