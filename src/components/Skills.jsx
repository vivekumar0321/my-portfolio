import { useEffect, useRef, useState } from "react";

import {
  FaGlobe,
  FaReact,
  FaNode,
  FaPhp,
  FaPython,
  FaGit,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaJs,
  FaServer,
  FaKey,
  FaUserShield,
  FaNetworkWired,
  FaClock,
  FaMobileAlt,
  FaAndroid,
  FaLinux,
  FaUbuntu,
  FaLock,
  FaTerminal,
  FaCodeBranch,
  FaGlobe as FaGlobeIcon,
  FaBriefcase,
  FaProjectDiagram,
  FaUsers,
  FaCode,
  FaPaintBrush,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGraduationCap,
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
  // SiCss3,
  SiTailwindcss,
  SiRedux,
  SiJquery,
  SiAxios,
  SiReacthookform,
  SiVite,
  SiExpress,
  SiRedis,
  SiPhpmyadmin,
  // SiAmazonaws,
  SiApache,
  SiNginx,
  SiCloudflare,
  // SiVisualstudiocode,
  SiPostman,
  SiComposer,
} from "react-icons/si";

import { FaNpm, FaYarn, FaFigma, FaJira } from "react-icons/fa6";

import data from "../data/portfolio.json";
import SectionTitle from "./common/SectionTitle";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Skills = () => {
  const { skills } = data;

  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const iconMap = {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
    FaGitAlt,
    FaGithub,
    FaBootstrap,
    FaJs,
    FaServer,
    FaKey,
    FaUserShield,
    FaNetworkWired,
    FaClock,
    FaMobileAlt,
    FaAndroid,
    FaLinux,
    FaUbuntu,
    FaLock,
    FaTerminal,
    FaCodeBranch,
    FaGlobeIcon,
    FaBriefcase,
    FaProjectDiagram,
    FaUsers,
    FaCode,
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
    // SiCss3,
    SiTailwindcss,
    SiRedux,
    SiJquery,
    SiAxios,
    SiReacthookform,
    SiVite,
    SiExpress,
    SiRedis,
    SiPhpmyadmin,
    // SiAmazonaws,
    SiApache,
    SiNginx,
    SiCloudflare,
    // SiVisualstudiocode,
    SiPostman,
    SiComposer,

    FaNpm,
    FaYarn,
    FaFigma,
    FaJira,
  };

  return (
    <section id="skills" ref={sectionRef} className="section section-alt">
      <div className="container">
        <SectionTitle
          title="My Skills"
          subtitle="Technologies & tools I work with"
        />
        {/* <FaCode /> */}
        {skills?.categories?.map((category, idx) => (
          <div key={idx} className="mb-5">
            <h4
              style={{
                color: "var(--color-text-primary)",
                marginBottom: 20,
              }}
            >
              {category.name}
            </h4>

            <div className="row g-4">
              {category.skills?.map((skill, index) => {
                const Icon = iconMap[skill.icon] || FaCode;

                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <SkillCard skill={skill} Icon={Icon} animate={animate} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function SkillCard({ skill, Icon, animate }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let current = 0;

    const timer = setInterval(() => {
      current++;

      if (current >= skill.percentage) {
        current = skill.percentage;
        clearInterval(timer);
      }

      setProgress(current);
    }, 50);

    return () => clearInterval(timer);
  }, [animate, skill.percentage]);

  return (
    <div
      className="card card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-icon">
        <Icon />
      </div>

      <h5 className="card-title">{skill.name}</h5>

      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: `${progress}%`,
            transition: "width .1s linear",
          }}
        />
      </div>

      <span className="skill-percent">{progress}%</span>
    </div>
  );
}

export default Skills;
