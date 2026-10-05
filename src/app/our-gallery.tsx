import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "Monitoring and Evalution",
    category: "Training",
    image: "hero-1.jpeg",
  },
  {
    id: 2,
    title: "Child Protection ",
    category: "Training",
    image: "hero-2.jpeg",
  },
  {
    id: 3,
    title: "Human Resource",
    category: "Training",
    image: "hero-3.jpeg",
  },
  {
    id: 4,
    title: "Humanitarian",
    category: "Training",
    image: "hero-4.webp",
  },
  {
    id: 5,
    title: "Accounting and Finance  ",
    category: "Training",
    image: "hero-6.jpeg",
  },
  {
    id: 6,
    title: "Project Management",
    category: "Training",
    image: "hero-7.jpeg",
  },
  {
    id: 7,
    title: "Stragetic Learn Six",
    category: "Training",
    image: "hero-8.jpeg",
  },
  {
    id: 8,
    title: "Accounting and Finance  ",
    category: "Training",
    image: "hero-9.jpeg",
  },
  {
    id: 9,
    title: "Project Management",
    category: "Training",
    image: "img-4.webp",
  },
  {
    id: 10,
    title: "Child Protection ",
    category: "Workshop",
    image: "image-5.webp",
  },
  {
    id: 11,
    title: "Mobile Data Management  ",
    category: "Workshop",
    image: "img-6.webp",
  },
  {
    id: 12,
    title: "Strategy and Learn Six  ",
    category: "Workshop",
    image: "img-7.webp",
  },
  {
    id: 13,
    title: "Customer Experience  ",
    category: "Workshop",
    image: "img-8.webp",
  },
  {
    id: 14,
    title: "Customer Experience  ",
    category: "Workshop",
    image: "img-9.webp",
  },
  {
    id: 15,
    title: "Customer Experience  ",
    category: "Workshop",
    image: "img-1.jpeg",
  },
  {
    id: 16,
    title: "Project Management  ",
    category: "Workshop",
    image: "img-11.webp",
  },
  {
    id: 17,
    title: "Customer Experience  ",
    category: "Workshop",
    image: "img-12.webp",
  },
  {
    id: 18,
    title: "Monitoring and Evalution  ",
    category: "Workshop",
    image: "img-13.webp",
  },
  {
    id: 19,
    title: "Data Management  ",
    category: "Workshop",
    image: "img-14.jpeg",
  },
  {
    id: 20,
    title: "Mobile Data Collection  ",
    category: "Workshop",
    image: "img-15.jpeg",
  },
  {
    id: 21,
    title: "Monitoring and Evalution  ",
    category: "Engagement",
    image: "img-16.jpeg",
  },
  {
    id: 22,
    title: "Customer Experience  ",
    category: "Engagement",
    image: "img-14.webp",
  },
  {
    id: 23,
    title: "GIS and Information Technology  ",
    category: "Engagement",
    image: "img-15.webp",
  },
  {
    id: 24,
    title: "Humanitarian Course ",
    category: "Engagement",
    image: "img-16.webp",
  },
  {
    id: 25,
    title: "GIS and Technology ",
    category: "Engagement",
    image: "img-17.webp",
  },
  {
    id: 27,
    title: "Governance and Leadership ",
    category: "Engagement",
    image: "img-19.webp",
  },
  {
    id: 28,
    title: "Strategic Learn Six ",
    category: "Engagement",
    image: "img-20.webp",
  },
  {
    id: 26,
    title: "Data Management ",
    category: "Engagement",
    image: "img-21.webp",
  },
  {
    id: 29,
    title: "Climate Change Management ",
    category: "Engagement",
    image: "",
  },
  {
    id: 30,
    title: "Data Management  ",
    category: "Engagement",
    image: "e-data-management.webp",
  },
  {
    id: 31,
    title: "GIS and Information Technology ",
    category: "Engagement",
    image: "-gif-technology.webp",
  },
  {
    id: 32,
    title: "GIS and Information Technology ",
    category: "Seminar",
    image: "-management.webp ",
  },
  {
    id: 33,
    title: "Environment Management ",
    category: "Seminar",
    image: "-environment-management.webp ",
  },
  {
    id: 34,
    title: "Environmet and Climate Management ",
    category: "Seminar",
    image: "-environment (3).webp ",
  },
  {
    id: 35,
    title: "Children Protection ",
    category: "Seminar",
    image: "-children-protection.webp ",
  },
  {
    id: 36,
    title: "Monitoring and Evalution",
    category: "Seminar",
    image: "-monitoring-evalution.webp ",
  },
  {
    id: 37,
    title: "Strategic Learn Six",
    category: "Seminar",
    image: "blustron-learn-six.webp",
  },
  {
    id: 38,
    title: "Customer Experience",
    category: "Seminar",
    image: "-customer-experience.webp",
  },
  {
    id: 39,
    title: "Project Management",
    category: "Training",
    image: "-project-management-training.webp",
  },
  {
    id: 40,
    title: "GIS and Information Technology",
    category: "Seminar",
    image: "-gif-technology-training.webp",
  },
  {
    id: 41,
    title: "Project and Procurement",
    category: "Seminar",
    image: "-project-procurement.webp",
  },
  {
    id: 42,
    title: "Monitoring and Evalution",
    category: "Bootcamp",
    image: "-monitoring.webp",
  },
  {
    id: 43,
    title: "Children Protection",
    category: "Bootcamp",
    image: "-children-training.webp",
  },
  {
    id: 44,
    title: "Strategic Learn Six",
    category: "Bootcamp",
    image: "-learn-six-training.webp",
  },
  {
    id: 45,
    title: "Monitoring and Evalution",
    category: "Bootcamp",
    image: "-logistics.webp",
  },
  {
    id: 46,
    title: "Project Monitoring and Evalution",
    category: "Bootcamp",
    image: "-project.webp",
  },
  {
    id: 47,
    title: "Data Management",
    category: "Bootcamp",
    image: "-data-mange.webp",
  },
  {
    id: 48,
    title: "Data Management",
    category: "Bootcamp",
    image: "-data.webp",
  },
  {
    id: 49,
    title: "Children Protection",
    category: "Bootcamp",
    image: "-child.webp",
  },
  {
    id: 50,
    title: "Leadership and Management",
    category: "Bootcamp",
    image: "-leadership.webp",
  },
  {
    id: 51,
    title: "Monitoring and Evalution",
    category: "Retreat",
    image: "-evaluation.webp",
  },
  {
    id: 52,
    title: "Management and Leadership",
    category: "Retreat",
    image: "-leader.webp",
  },
  {
    id: 53,
    title: "Humanitarian Course",
    category: "Retreat",
    image: "-humanitarian-courses.webp",
  },
  {
    id: 54,
    title: "Human Resource",
    category: "Retreat",
    image: "-human-manage.webp",
  },
  {
    id: 55,
    title: "Children Training ",
    category: "Retreat",
    image: "-children-course.webp",
  },
  {
    id: 56,
    title: "Mobile Data Management ",
    category: "Retreat",
    image: "-mobile.webp",
  },
  {
    id: 57,
    title: "Human Resource ",
    category: "Retreat",
    image: "-humanity.webp",
  },
  {
    id: 58,
    title: "Climate and Agriculture ",
    category: "Retreat",
    image: "-climate.webp",
  },
  {
    id: 59,
    title: "Monitoring and Evaluation ",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 60,
    title: "Management and Administration ",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 61,
    title: "Mobile Data Collection ",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 62,
    title: "Monitoring and Evalution ",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 63,
    title: "Customer Experience",
    category: "Forum",
    image: "-evalu.webp",
  },
  {
    id: 64,
    title: "Project Management",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 65,
    title: "Human Resource",
    category: "Forum",
    image: "-serve.webp",
  },
  {
    id: 66,
    title: "Strategic Learn Six",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 67,
    title: "Management and Leadership",
    category: "Forum",
    image: ".webp",
  },
  {
    id: 68,
    title: "Humanitarian",
    category: "Forum",
    image: ".webp",
  },
];

const categories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.category))),
];

export const Route = createFileRoute("/our-gallery")({
  head: () => ({
    meta: [{ title: "Our Gallery | Cynet East Africa" }],
  }),
  component: OurGallery,
});
export function OurGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Our Gallery
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            A visual look at our work, workshops, and experiences across the
            region.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md"
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={`/our-gallery/${item.image}`}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-1 text-xs font-medium uppercase tracking-widest text-white/70">
                  {item.category}
                </span>
                <p className="text-sm font-semibold leading-snug text-white">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
