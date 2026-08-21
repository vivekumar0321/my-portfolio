
import Toast from "../helpers/toastHelper";
import Button from "./common/Button";

const CTA = () => {
    const testPromise = () => {
        Toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            }),
            {
                pending: "Uploading...",
                success: "Upload Successful!",
                error: "Upload Failed!",
            }
        );
    };

    const testLoading = () => {
        const id = Toast.loading("Please wait...");

        setTimeout(() => {
            Toast.update(id, "Completed Successfully!", "success");
        }, 3000);
    };
    return (
        <>
            <div className="container py-5">

                <h3 className="mb-4">React Toastify Test</h3>

                <div className="d-flex flex-wrap gap-3">

                    <button
                        className="btn btn-success"
                        onClick={() => Toast.success("Success Message")}
                    >
                        Success
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => Toast.error("Error Message")}
                    >
                        Error
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() => Toast.warning("Warning Message")}
                    >
                        Warning
                    </button>

                    <button
                        className="btn btn-info text-white"
                        onClick={() => Toast.info("Information Message")}
                    >
                        Info
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={testLoading}
                    >
                        Loading
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={testPromise}
                    >
                        Promise
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={() => Toast.dismiss()}
                    >
                        Dismiss All
                    </button>

                </div>

            </div>
            <section className="section-cta">
                <div className="container text-center">
                    <h2>
                        Ready to build something{' '}
                        <span style={{ color: 'var(--color-text-primary)' }}>amazing</span>?
                    </h2>
                    <p style={{ maxWidth: '500px', margin: '12px auto 24px', fontSize: '1.05rem' }}>
                        Let's collaborate and create something extraordinary together.
                    </p>
                    <Button href="#contact" variant="primary" size="lg">
                        Let's Talk
                    </Button>
                </div>
            </section>
        </>
    )
}
export default CTA;