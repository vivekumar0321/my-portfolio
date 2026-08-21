import SectionTitle from "./common/SectionTitle";
import data from "../data/portfolio.json";
import { useRef } from "react";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Experience = () => {
  const { experience } = data;
  const cardRefs = useRef([]);
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <SectionTitle
          title="Work Experience"
          subtitle="My professional journey"
        />
        <div className="row g-4 stagger-children">
          {experience?.map((exp, idx) => (
            <div
              key={idx}
              className="col-12"
              ref={(el) => (cardRefs.current[200 + idx] = el)}
            >
              <div
                className="card card-3d"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="row align-items-start">
                  <div className="col-md-3">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="exp-company-logo"
                      />
                    )}
                    <h5 style={{ marginBottom: "4px" }}>{exp.company}</h5>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {exp.location}
                    </p>
                  </div>
                  <div className="col-md-9">
                    <h5 style={{ color: "var(--color-text-primary)" }}>
                      {exp.position}
                    </h5>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {exp.duration}
                    </p>
                    <p>{exp.description}</p>
                    <div className="exp-tech">
                      {exp.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="badge badge-primary badge--tech"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
