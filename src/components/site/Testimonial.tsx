import FeedbackCard from "../FeedbackCard.tsx";
import { Carousel } from "nuka-carousel";

const feedback = [
  {
    id: "1",
    content:
    "Exceptional service! The team at Cynet East Africa Consultancy Limited is highly professional, knowledgeable, and dedicated. Their expert guidance helped us navigate complex challenges with ease.",
    name: "brian ogolla",
    title: "1 year ago",
    img: "https://googleusercontent.com",
  },
  {
    id: "2",
    content:
      "Best of the best consultancy firm in Nairobi with excellent trainers. Their knowledge and rich experience in human resource development and training design are fully customized.",
    name: "Avi Tuvia Odek",
    title: "2 years ago",
    img: "A",
  },
  {
    id: "3",
    content:
    "I'm thrilled to recommend Cynet East Africa Consultancy for PowerBI training. Their professionalism, patience, and clear expertise made data modeling completely effortless for our team.",
    name: "churchill otiende",
    title: "2 years ago",
    img: "https://googleusercontent.com",
  },
  {
    id: "4",
    content:
    "Want to experience top-notch professional training services garnished with excellent customer service? Cynet East Africa is the absolute partner you need.",
    name: "nancy kemunto",
    title: "2 years ago",
    img: "N",
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
          href="https://cyneteastafrica.com/"
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
        slidesToShow={1}
        breakpoints={[
          { minWidth: 768, slidesToShow: 2 },
          { minWidth: 1024, slidesToShow: 3 },
        ]}
      >
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </Carousel>
    </div>

    <div className="w-full max-w-[1200px] mx-auto px-6 flex justify-end mt-6">
      <div className="bg-[#006f42] text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
        <span>Verified by Trustindex</span>
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </section>
);

export default Testimonials;
