import SectionTitle from "./common/SectionTitle";
import data from "../data/portfolio.json";
import { useRef } from "react";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Certificate = () => {
  const { certificates } = data;
  const cardRefs = useRef([]);
  return (
    <section id="certificates" className="section section-alt">
      <div className="container">
        <SectionTitle
          title="Certificates"
          subtitle="My professional certifications"
        />
        <div className="row g-4 stagger-children">
          {certificates?.map((cert, idx) => (
            <div
              key={idx}
              className="col-md-4"
              ref={(el) => (cardRefs.current[400 + idx] = el)}
            >
              <div
                className="card card--certificate card-3d "
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="cert-avatar">
                  <img
                    src={
                      cert.image || "https://picsum.photos/seed/default/400/400"
                    }
                    alt={cert.title}
                  />
                </div>
                <h5 className="card-title">{cert.title}</h5>
                <p
                  style={{
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                  }}
                >
                  {cert.organization}
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {cert.year}
                </p>
                {/* {cert.verify && (
                                    <a href={cert.verify} target="_blank" rel="noopener noreferrer" className="cert-verify">
                                        Verify
                                    </a>
                                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Certificate;
