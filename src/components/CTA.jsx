import Button from "./common/Button";

const CTA = () => {
    return (
        <section className="section-cta">
            <div className="container text-center">

                <span className="badge bg-primary px-3 py-2 mb-3">
                    🚀 Available for Full-Time, Part-Time, Freelance, Contract-Based & Remote Opportunities
                </span>

                <h2 className="fw-bold mb-3">
                    Let's Build Your Next{" "}
                    <span style={{ color: "var(--color-text-primary)" }}>
                        Digital Solution
                    </span>
                </h2>

                <p
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto 30px",
                        fontSize: "1.1rem",
                        lineHeight: "1.8",
                    }}
                >
                    I'm a <strong>Full Stack Developer</strong> with expertise in
                    <strong> Laravel, React.js, Next.js, Node.js, React Native, AI Integration,
                    REST APIs, DevOps, VPS Management,</strong> and
                    <strong> Cloud Deployment</strong>. Whether you're building a startup,
                    scaling an enterprise application, or need an experienced developer for your team,
                    I'm ready to deliver secure, scalable, and high-performance solutions.
                </p>

                <div className="d-flex justify-content-center flex-wrap gap-3">
                    <Button href="#contact" variant="primary" size="lg">
                        Hire Me
                    </Button>

                    <Button href="/resume.pdf" variant="outline-primary" size="lg">
                        Download Resume
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default CTA;