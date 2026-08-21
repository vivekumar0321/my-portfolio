import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <section className="section-404">
            <div className="container">
                <h1 className="page-404-number">404</h1>
                <h2 className="page-404-title">Page Not Found</h2>
                <p className="page-404-text">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary d-inline-flex align-center gap-1">
                    <FaHome /> Back to Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;