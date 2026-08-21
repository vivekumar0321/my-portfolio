import SectionTitle from "./common/SectionTitle";
import data from '../data/portfolio.json';
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
    const { projects } = data;
    const cardRefs = useRef([]);

    const [filter, setFilter] = useState('All');
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(projects?.map((p) => p.category).filter(Boolean))];
        return cats;
    }, [projects]);
    const filteredProjects = useMemo(() => {
        if (filter === 'All') return projects || [];
        return projects?.filter((p) => p.category === filter) || [];
    }, [filter, projects]);
    return (
        <section id="projects" className="section section-white">
            <div className="container">
                <SectionTitle title="My Projects" subtitle="Some of my recent work" />

                <div className="filter-group">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`filter-btn ${filter === cat ? 'filter-btn--active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="row g-4 stagger-children">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <div key={project.id} className="col-md-6 col-lg-4" ref={(el) => (cardRefs.current[500 + idx] = el)}>
                                <div className="card card--image-top card--3d">
                                    <div className="card-img-wrap">
                                        <img src={project.thumbnail || project.image || 'https://picsum.photos/seed/project/400/300'} alt={project.title} />
                                        <span className="badge badge-primary card-badge">{project.category}</span>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{project.title}</h5>
                                        <p className="card-text">{project.description?.slice(0, 200)}...</p>
                                        <div className="card-tech">
                                            {project.technologies?.slice(0, 4).map((tech, tIdx) => (
                                                <span key={tIdx} className="badge badge--tech">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="card-actions">
                                            {project.demo && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                                    Live
                                                </a>
                                            )}
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                                                    Code
                                                </a>
                                            )}
                                            {/* <Link to={`/projects/${project.slug}`} className="btn btn-outline btn-sm">
                                                Details
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="project-empty col-12">
                            <p>No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Projects;