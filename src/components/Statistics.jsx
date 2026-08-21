import { FaBriefcase } from 'react-icons/fa';
import data from '../data/portfolio.json';
import {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
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
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiHtml5,
} from 'react-icons/si';
import Counter from './Counter';

const Statistics = () => {
    const { statistics } = data;
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
    };
    return (
        <section className="section section-alt" style={{ padding: '50px 0' }}>
            <div className="container">
                <div className="row text-center g-4 stagger-children">
                    {statistics?.map((stat, idx) => {
                        const Icon = iconMap[stat.icon] || FaBriefcase;
                        return (
                            <div key={idx} className="col-6 col-md-3">
                                <div style={{ fontSize: '2rem', color: 'var(--color-text-primary)' }}>
                                    <Icon />
                                </div>
                                <h2 className="stat-number"><Counter value={stat.value} /></h2>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Statistics
