import React, { useState } from "react";
import { RxPlus, RxMinus } from "react-icons/rx";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const faqData = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 30 days of delivery. Simply contact our support team with your order number to begin the return process.",
  },
  {
    id: 2,
    question: "How do I track my order?",
    answer:
      "You can track your order from your account dashboard or by using the tracking link sent to your email after shipment.",
  },
  {
    id: 3,
    question: "How do I contact customer support?",
    answer:
      "You can reach us through the Contact Us page or email us at support@crownmarket.com. Our team is available Monday to Saturday.",
  },
  {
    id: 4,
    question: "Can I change or cancel my order?",
    answer:
      "Yes. Orders can be modified or cancelled within 24 hours of placing them, provided they haven't been shipped yet.",
  },
  {
    id: 5,
    question: "Which payment methods do you accept?",
    answer:
      "We accept Cash on Delivery, Debit/Credit Cards, Easypaisa, JazzCash, and Bank Transfer.",
  },
  {
    id: 6,
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–7 business days depending on your location.",
  },
];

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggle = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <>
      <Header activeHeading={5} className="mb-24" />

      <div className="mt-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-14">
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 ">
            <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm mb-4 ">
              Support Center
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Frequently Asked Questions
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about orders, payments,
              shipping, returns and customer support.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-5">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <h2 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.question}
                  </h2>

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center text-white flex-shrink-0">
                    {activeTab === item.id ? (
                      <RxMinus size={18} />
                    ) : (
                      <RxPlus size={18} />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeTab === item.id
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 border-t border-blue-100 text-gray-600 leading-7">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          <div className="mt-14 bg-white rounded-3xl shadow-md border border-pink-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Still Need Help?
            </h2>

            <p className="text-gray-600 mt-3">
              Our support team is always ready to help you with your questions.
            </p>

            <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:scale-105 transition duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default FAQPage;