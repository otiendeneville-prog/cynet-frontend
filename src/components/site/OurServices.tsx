import nita from "/assets/nita.webp"
import cynet from "/assets/cert.jpg"
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";


export default function OurServices() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-slate-100">

          <h2 className="font-bold text-2xl lg:text-4xl tracking-tight">
            Our Services
          </h2>
          <div className="flex-col lg:flex-row ml-0 gap-4 lg:gap-16">
            <p className="text-base leading-relaxed mb-5">
              Tailored solutions to help organizations succeed — from <br />growth strategy and financial advisory to team building <br /> and research. We drive measurable outcomes at every stage.
            </p>

            <Button className="flex items-center p-1.5 pr-5 bg-white border  rounded-full transition-all duration-300 shadow-sm">
              <p className="flex items-center justify-center h-9 w-9 bg-secondary group-hover:bg-emerald-500 text-white rounded-full
              font-bold text-xs tracking-wider transition-colors">
                11+
              </p>
              <div className="flex flex-col items-start ml-3 text-left">
                <p className="text-xs  justify-center content-center font-bold text-slate-800">Explore Solutions</p>
                <p className="text-[10px] text-slate-500 font-normal">View consultancy frameworks</p>
              </div>
            </Button>
          </div>

        </div>

        <div className="mt-12 grid grid-cols-1 align md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className=" rounded-xl p-8  border border-border bg-card">
            <h1 className="font-semibold leading-snug line-clamp-2">
              Business Strategy Services
            </h1>
            <p className="mt-6 text-sm text-muted-foreground line-clamp-3">
              We help organizations build resilient strategies aligned to long-term goals — from operational frameworks to performance excellence.
            </p>
            <div className="mt-8">
              <ol className="cursor-pointer flex flex-col">
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Strategic Planning <ArrowUpRight className="size-2.5" /></li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Balance Scorecard <ArrowUpRight className="size-2.5" /></li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Operations <ArrowUpRight className="size-2.5" /></li>
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Performance Management <ArrowUpRight className="size-2.5" /></li>
              </ol>

            </div>

          </div>
          <div className="rounded-xl p-8  border border-border bg-card">
            <h1 className="font-semibold leading-snug line-clamp-2">
              Team Building Services
            </h1>
            <p className="mt-6 text-sm text-muted-foreground line-clamp-3">
              Strengthen your organization from the inside. We design interventions that improve team dynamics, culture, and collective problem-solving capability.
            </p>
            <div className="mt-8">
              <ol className="cursor-pointer flex flex-col">
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Team Dynamics <ArrowUpRight className="size-2.5" /></li>
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Productivity <ArrowUpRight className="size-2.5" /></li>
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Culture Alignment <ArrowUpRight className="size-2.5" /></li>
              </ol>
            </div>
          </div>
          <div className="rounded-xl p-8  border border-border bg-card">
            <h1 className="font-semibold leading-snug line-clamp-2 ">
              Tax and Financial Issues
            </h1>
            <p className="mt-6 text-sm text-muted-foreground line-clamp-3">
              Navigate complex tax landscapes and optimize your financial position with expert advisory tailored to your sector and scale
            </p>
            <div className="mt-8">
              <ol className="cursor-pointer flex flex-col">
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Business Tax <ArrowUpRight className="size-2.5" /></li>
                <li className=" inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">Risk Management <ArrowUpRight className="size-2.5" /></li>
                <li className="  inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">
                  Capital Advisory <ArrowUpRight className="size-2.5" />
                </li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foregroundr">
                  Employment Tax <ArrowUpRight className="size-2.5" />
                </li>
              </ol>


            </div>
            <div>

            </div>
          </div>
          <div className="rounded-xl p-8 mb-17  border border-border bg-card">
            <h1 className="font-semibold leading-snug line-clamp-2">
              Research Services
            </h1>
            <p className="mt-6 text-sm text-muted-foreground line-clamp-3">
              Data-driven insight to inform every decision. From baseline surveys to impact evaluations, we give you clarity on what's working and what's not.
            </p>
            <div className="mt-8">
              <ol className="cursor-pointer flex flex-col">
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">
                  Market Surveys <ArrowUpRight className="size-2.5" />
                </li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">
                  Impact Evaluations <ArrowUpRight className="size-2.5" />
                </li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">
                  Baseline Data
                </li>
                <li className="inline-flex items-center gap-1.5 text-xs hover:text-primary text-muted-foreground">
                  End-line Surveys <ArrowUpRight className="size-2.5" />
                </li>
              </ol>

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
