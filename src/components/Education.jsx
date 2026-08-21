import SectionTitle from "./common/SectionTitle";
import data from "../data/portfolio.json";
import { useRef } from "react";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Education = () => {
  const { education } = data;
  const cardRefs = useRef([]);
  return (
    <section id="education" className="section section-white">
      <div className="container">
        <SectionTitle title="Education" subtitle="My academic background" />
        <div className="row g-4 stagger-children">
          {education?.map((edu, idx) => (
            <div
              key={idx}
              className="col-md-6"
              ref={(el) => (cardRefs.current[300 + idx] = el)}
            >
              <div
                className="card card--education card-3d"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {edu.logo && (
                  <img src={edu.logo} alt={edu.college} className="edu-logo" />
                )}
                <h5 className="card-title">{edu.degree}</h5>
                <p
                  style={{
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {edu.college}
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {edu.university} • {edu.year}
                </p>
                <p className="card-text">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Education;
