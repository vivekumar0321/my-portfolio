import {
  FaGlobe,
  FaReact,
  FaNode,
  FaPhp,
  FaPython,
  FaGit,
  FaBriefcase,
  FaProjectDiagram,
  FaUsers,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGraduationCap,
  FaRobot,
  FaCloud,
  FaShieldAlt,
  FaServer,
  FaTools,
  FaCodeBranch,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiHtml5,
} from "react-icons/si";
import data from "../data/portfolio.json";
import SectionTitle from "./common/SectionTitle";
import { useRef } from "react";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Services = () => {
  const { services } = data;
  const iconMap = {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
    FaBriefcase,
    FaProjectDiagram,
    FaUsers,
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaGraduationCap,
    SiNextdotjs,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiHtml5,
    FaRobot,
    FaCloud,
    FaShieldAlt,
    FaServer,
    FaTools,
    FaCodeBranch,
  };
  const cardRefs = useRef([]);
  
  return (
    <section id="services" className="section section-white">
      {/* <div className="container">
        <SectionTitle title="My Services" subtitle="What I can do for you" />
        <div className="row g-4">
          {services?.map((service, idx) => {
            const Icon = iconMap[service.icon] || FaGlobe;
            return (
              <div
                key={idx}
                className="col-md-6 col-lg-4"
                ref={(el) => (cardRefs.current[100 + idx] = el)}
              >
                <div
                  className="card card-3d"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="card-icon">
                    <Icon />
                  </div>
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <a href="#contact" className="card-link">
                    Learn More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </section>
  );
};
export default Services;
