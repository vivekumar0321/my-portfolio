import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

// Bootstrap Grid CSS only
import "bootstrap/dist/css/bootstrap-grid.min.css";
// Global CSS
import "./assets/css/style.css";
import ThemeProvider from "./context/ThemeProvider";
import CodeRainLoader from "./components/CodeRainLoader";
import data from "./data/portfolio.json";
import { Helmet } from "react-helmet-async";
import PWAInstallPrompt from "./components/pwa/PWAInstallPrompt";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { INSPECT_WARNING_MESSAGE } from "./constants/messages";
import { infoToast } from "./utils/toast";
import VisitorTracker from "./components/VisitorTracker";
function App() {
  const { website, seo } = data;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnFocusLoss={false}
      />
      <Helmet>
        <title>{seo?.title || website?.title || "Portfolio"}</title>
        <meta
          name="description"
          content={seo?.description || website?.description || ""}
        />
        <meta
          name="keywords"
          content={seo?.keywords || website?.keywords || ""}
        />
        <meta name="author" content={seo?.author || website?.author || ""} />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={seo?.title || website?.title} />
        <meta
          property="og:description"
          content={seo?.description || website?.description}
        />
        <meta property="og:image" content={seo?.ogImage || "/og-image.jpg"} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || website?.title} />
        <meta
          name="twitter:description"
          content={seo?.description || website?.description}
        />
        <meta name="twitter:image" content={seo?.ogImage || "/og-image.jpg"} />

        {/* Theme Color (for mobile browsers) */}
        <meta name="theme-color" content="#0d6efd" />

        {/* Favicon – you can also set dynamically */}
        <link
          rel="icon"
          type="image/svg+xml"
          href={website?.favicon || "/favicon.svg"}
        />
        <link
          rel="apple-touch-icon"
          href={website?.favicon || "/favicon.svg"}
        />
      </Helmet>

      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <VisitorTracker />
          <CodeRainLoader />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <PWAInstallPrompt />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
