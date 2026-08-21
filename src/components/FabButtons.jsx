import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import data from "../data/portfolio.json";
import { useEffect, useState } from "react";

const FabButtons = () => {
  const [showTop, setShowTop] = useState(false);

  const { contact } = data;

  const whatsappMessage = encodeURIComponent(
    `Hello *Vivek* \u{1F44B}
    I found your portfolio and I'm interested in your services.
    I'd like to discuss a potential project involving web development, mobile apps, AI integration, or custom software solutions.
    Please let me know when you're available.
    Looking forward to working with you!`,
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fab-container">
      <button
        className={`fab-btn fab-btn--top ${showTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <a
        href={`https://wa.me/${contact?.whatsapp?.replace(/\D/g, "")}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-btn fab-btn--whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default FabButtons;
