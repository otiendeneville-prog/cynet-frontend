import { Link } from "@tanstack/react-router";
function BestPatner() {
  return (
    <section
      className="bg-team-hero w-full min-h-[500px] relative"
      style={{
        backgroundImage: `url("https://cyneteastafrica.com/wp-content/uploads/revslider/slider-1/colleagues-team-working-company-paperwork-doig-teamwork-analyze-documents-online-research-information-planning-corporate-presentation-with-data-charts-job-collaboration-scaled.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-16 relative z-10 ">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] items-center">
          <div className="lg:col-span-2 flex items-center ">
            <h2 className="text-white text-4xl ">
              Your Best Partner in Business Development
            </h2>
          </div>
          <div className="text-2xl">
            <div className="flex items-center gap-3 text-sm mt-9">
              <Link
                to="/about"
                className="font-medium text-2xl text-white/90 hover:text-white px-20 py-5 hover:bg-secondary border border-primary"
              >
                Our Mission
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm mt-5">
              <Link
                to="/about"
                className="font-medium text-2xl text-white/90 hover:text-white  px-20 py-5 hover:bg-secondary border border-primary"
              >
                Our Vision
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 text-sm mt-9">
              <Link
                to="/about"
                className="font-medium text-2xl text-white/90 hover:text-white  px-20 hover:bg-secondary py-5 border border-primary"
              >
                Our Values
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm mt-5">
              <Link
                to="/about"
                className="font-medium text-2xl text-white/90 hover:text-white  px-20 py-5 hover:bg-secondary  border border-primary"
              >
                Our Journey
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <a
              href="https://cyneteastafrica.com/courses/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 h-12 rounded-lg bg-[#1e293b] text-primary-foreground hover:text-amber-50 font-medium shadow-glow"
            >
              Start Learning, Choose a course
            </a>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default BestPatner;
