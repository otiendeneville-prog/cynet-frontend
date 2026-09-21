import React from "react";

export default function feedBack({ id, content, name, title, img }) {
  return (
    <>
      <div className="justify-center flex-col flex px-10 py-12 rounde-[20px] max-w-[370px] max-auto my-0 feedback-card">
        <img
          src="https://i.imgur.com/rx3eOUo.png"
          alt="Double quotes"
          className="w-[42.6] h-[27.6] object-contain"
        />
        <p className="justify-center align-center flex text-white font-poppin font-normal text-[19px]">
          {content}
        </p>
      </div>
      <div className="flex  flex-row">
        <img className="rounded-full" src={img} alt={name} />
        {title}
        <div className="flex flex-col ml-4 ">
          <h4 className="font-popping font-semibold text-[20px] leading-[32px] text-white flex-column ml-2">
            {name}
          </h4>
          <p className="font-poppins font-normal text-[15px] leading-[24px] text-deemWhite">
            {title}
          </p>
        </div>
      </div>
    </>
  );
}
