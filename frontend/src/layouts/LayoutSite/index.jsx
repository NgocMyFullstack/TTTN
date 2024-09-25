import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AdvertisementModal from "./AdvertisementModal";
import Chatbot from "../../pages/frontend/home/Chatbot"; // Import component Chatbot
import "./LayOutSite.css";

export default function LayOutSite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Mở modal sau 3 giây khi người dùng truy cập trang
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    // Dọn dẹp timer khi component bị unmount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Theo dõi sự kiện cuộn trang
    const handleScroll = () => {
      if (window.pageYOffset > 20) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp event listener khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <AdvertisementModal isOpen={isModalOpen} onClose={closeModal} />
      {showScrollToTop && (
        <button id="scrollToTopBtn" onClick={scrollToTop} className="show">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z" />
          </svg>
        </button>
      )}
      <button id="botchatBtn" onClick={toggleChatbot} className="show">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          fill="white"
          width="24px"
          height="24px"
        >
          <path
            d="M18 2C9.163 2 2 8.746 2 17c0 4.56 2.061 8.64 5.326 11.309C6.852 31.267 4.8 33.56 4.8 33.56c-.241.243-.176.416.136.415.087 0 4.822-1.291 7.126-2.389A16.792 16.792 0 0 0 18 32c8.837 0 16-6.746 16-15s-7.163-15-16-15z"
            fill="#0084ff"
          />
          <path
            d="M26.553 13.368l-4.426 6.926-3.94-3.825-4.557 3.825 4.428-6.926 3.94 3.824z"
            fill="#fff"
          />
        </svg>
      </button>
      {isChatbotOpen && <Chatbot />}
    </>
  );
}
