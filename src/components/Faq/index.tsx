"use client";

import React, { useState } from "react";
import Graphics from "@/components/Faq/Graphics";
import faqData, { faqData2 } from "./faqData";
import FAQItem from "./FAQItem";

const Faq = () => {
  const [activeFaq1, setActiveFaq1] = useState(0);
  const [activeFaq2, setActiveFaq2] = useState(0);

  const handleFaqToggle1 = (index: number) => {
    setActiveFaq1(activeFaq1 === index ? 0 : index);
  };

  const handleFaqToggle2 = (index: number) => {
    setActiveFaq2(activeFaq2 === index ? 0 : index);
  };

  return (
    <>
      <section
        id="faq"
        className="relative z-10 bg-[#F8FAFB] py-[110px] dark:bg-[#15182B]"
      >
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-base text-body">

            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            
          <div
            className="faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark"
            data-wow-delay=".3s"
          >
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                faqData={{ ...faq, activeFaq: activeFaq1, handleFaqToggle: handleFaqToggle1 }}
              />
            ))}
          </div>
          <div
            className="faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark"
            data-wow-delay=".3s"
          >
            {faqData2.map((faq, index) => (
              <FAQItem
                key={index}
                faqData={{ ...faq, activeFaq: activeFaq2, handleFaqToggle: handleFaqToggle2 }}
              />
            ))}
          </div>
          </div>
        </div>

        {/*Graphics*/}
        <Graphics />
      </section>
    </>
  );
};

export default Faq;
