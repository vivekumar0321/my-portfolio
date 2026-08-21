import SectionTitle from "./common/SectionTitle";
import data from '../data/portfolio.json';
import Button from "./common/Button";
import { FaBriefcase, FaCode, FaDownload, FaGraduationCap } from "react-icons/fa";

const Resume = () => {
    const { resume, experience, education, skills } = data;
    return (
        <section id="resume" className="section section-alt">
            <div className="container">
                <SectionTitle title="Resume" subtitle="My professional summary" />

                <div className="text-center mb-3">
                    <Button href={resume?.file || '/resume.pdf'} variant="primary" icon={<FaDownload />}>
                        Download Resume
                    </Button>
                </div>

                {resume?.summary && (
                    <div className="resume-summary card card--no-hover">
                        <p>{resume.summary}</p>
                    </div>
                )}

                <div className="row g-5">
                    <div className="col-lg-6">
                        <h3 className="resume-section-title">
                            <FaBriefcase /> Experience
                        </h3>
                        {experience?.map((exp, idx) => (
                            <div key={idx} className="resume-item">
                                <h5>{exp.position}</h5>
                                <p className="item-sub">{exp.company}</p>
                                <p className="item-meta">{exp.duration}</p>
                                <p className="item-desc">{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-6">
                        <h3 className="resume-section-title">
                            <FaGraduationCap /> Education
                        </h3>
                        {education?.map((edu, idx) => (
                            <div key={idx} className="resume-item">
                                <h5>{edu.degree}</h5>
                                <p className="item-sub">{edu.college}</p>
                                <p className="item-meta">{edu.university} • {edu.year}</p>
                                <p className="item-desc">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="resume-section-title">
                        <FaCode /> Skills Summary
                    </h3>
                    <div className="row g-3 resume-skills-grid">
                        {skills?.categories?.map((cat, idx) => (
                            <div key={idx} className="col-md-6 col-lg-4">
                                <div className="card skill-summary-card">
                                    <h6>{cat.name}</h6>
                                    <div className="skill-tags">
                                        {cat.skills?.map((s, sIdx) => (
                                            <span key={sIdx} className="badge badge--tech">
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Resume;