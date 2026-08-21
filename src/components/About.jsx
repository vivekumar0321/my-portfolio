import { FaDownload } from "react-icons/fa";
import data from "../data/portfolio.json";
import Button from "./common/Button";
import SectionTitle from "./common/SectionTitle";

const About = () => {
  const { about } = data;
  return (
    <section id="about" className="section section-white">
      <div className="container">
        <SectionTitle title="About Me" subtitle="Get to know me" />
        <div className="row align-items-center g-5">
          <div className="col-lg-5 animate-fade-in-up">
            <div
              className="overflow-hidden about-image radius-lg shadow-lg"
              style={{ border: "4px solid var(--color-white)" }}
            >
              <img
                src={about?.image}
                height={50}
                alt="Profile"
                className="w-100 d-block"
              />
            </div>
          </div>
          <div
            className="col-lg-7 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            <h3 className="mb-2">{about?.title || "About Me"}</h3>
            <p>{about?.description || ""}</p>
            <h5 className="mt-2" style={{ color: "var(--color-text-primary)" }}>
              Career Objective
            </h5>
            <p>{about?.objective || ""}</p>
            <div className="row g-3 mt-1">
              {about?.personal &&
                Object.entries(about.personal)
                  .filter(([key]) => key !== "phone" && key !== "email")
                  .map(([key, value]) => (
                    <div key={key} className="col-6 col-md-6">
                      <strong
                        style={{
                          textTransform: "capitalize",
                          display: "block",
                          fontSize: "0.85rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {key}
                      </strong>

                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--color-text-heading)",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
            </div>
            {about?.personal && (
              <div className="row g-3 mt-1">
                <div className="col-12 col-md-6">
                  <strong
                    style={{
                      textTransform: "capitalize",
                      display: "block",
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Phone
                  </strong>

                  <a
                    href={`tel:${about.personal.phone}`}
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-heading)",
                      textDecoration: "none",
                      transition: "0.3s",
                    }}
                  >
                    {about.personal.phone}
                  </a>
                </div>

                <div className="col-12 col-md-6">
                  <strong
                    style={{
                      textTransform: "capitalize",
                      display: "block",
                      fontSize: "0.85rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Email
                  </strong>

                  <a
                    href={`mailto:${about.personal.email}`}
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-heading)",
                      textDecoration: "none",
                      wordBreak: "break-word",
                      transition: "0.3s",
                    }}
                  >
                    {about.personal.email}
                  </a>
                </div>
              </div>
            )}
            <div className="mt-3">
              <Button href="/uploads/resume.pdf" variant="primary" icon={<FaDownload />}>
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
