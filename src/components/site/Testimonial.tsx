import FeedbackCard from "../FeedbackCard.tsx";
import { Carousel as NukaCarousel } from "nuka-carousel";

const Carousel = NukaCarousel as any;

const feedback = [
  {
    id: "1",
    content:
      "Exceptional service! The team at Cynet East Africa Consultancy Limited is highly professional, knowledgeable, and dedicated. Their expert guidance helped us navigate complex challenges with ease.",
    name: "brian ogolla",
    title: "1 year ago",
    img: "b",
  },
  {
    id: "2",
    content:
      "Best of the best consultancy firm in Nairobi with excellent trainers. There knowledge and rich experience in human resources consultancy and team building activities...",
    name: "Avi Tuvia Odek",
    title: "2 years ago",
    img: "A",
  },
  {
    id: "3",
    content:
      "I'm thrilled to recommend Cynet East Africa Consultancy for PowerBI training. Their professionalism and expertise shone through every step of the process.",
    name: "churchill otiende",
    title: "2 years ago",
    img: "c",
    bgColor: "bg-purple-50 border-purple-200",
  },
  {
    id: "4",
    content:
      "Want to experience top-notch professional training services garnished with excellent customer service? Cynet East Africa Consultancy is the best I can recommend.",
    name: "nancy kemunto",
    title: "2 years ago",
    img: "N",
  },
  {
    id: "5",
    content:
      "Cynet East Africa has the best service in terms of delivery of training content and their trainers have a practical aspect in the industry.",
    name: "Cherono Janet",
    title: "2 years ago",
    img: "C",
  },
];

const Testimonials = () => (
  <section
    id="clients"
    className="sm:py-16 py-6 flex justify-center items-center flex-col relative bg-slate-50 w-full"
  >
    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] max-w-[1200px] mx-auto px-6">
      <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-slate-900 xs:leading-[76.8px] leading-[66.8px] w-full">
        What Our Clients <br className="sm:block hidden" /> Say About Us
      </h2>
      <div className="w-full md:mt-0 mt-6 md:flex justify-end">
        <a
          href="http://localhost:3001/"
          target="_blank"
          rel="noreferrer"
          className="justify-center items-center flex bg-[#0f2a4a] text-white px-6 py-3 rounded-xl font-poppins font-medium shadow-md hover:bg-slate-800 transition"
        >
          Leave a Review
        </a>
      </div>
    </div>

    <div className="w-full max-w-[1200px] mx-auto px-6 relative z-[1]">
      <Carousel
        autoplay={true}
        autoplayInterval={4000}
        wrapMode="wrap"
        scrollDistance="slide"
      >
        {feedback.map((card) => (
          <div
            key={card.id}
            className="w-full sm:w-1/2 lg:w-1/3 px-3 flex-shrink-0"
          >
            <FeedbackCard {...card} />
          </div>
        ))}
      </Carousel>
    </div>

    <div className="w-full max-w-[1200px] mx-auto px-6 flex justify-end mt-6">
      <div className="bg-[#006f42] text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
        <span>Verified by Trustindex</span>
      </div>
    </div>
  </section>
);

export default Testimonials;
