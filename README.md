# 🚀 Professional Portfolio Website

A modern, fully responsive **single-page portfolio** built with React.js + Vite. All content is driven by a single JSON file, featuring **light/dark themes with rich gradients**, 3D card hover effects, smooth animations, a pricing section, project filtering, and floating action buttons (scroll-to-top & WhatsApp).

![Portfolio Screenshot](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop)

## ✨ Features

- 📄 **Single‑page layout** – All sections (Hero, About, Skills, Services, Experience, Education, Certificates, Projects, Testimonials, Pricing, Resume, Contact) on one scrollable page with smooth anchor navigation.
- 🎨 **Gradient‑rich themes** – Light and dark modes with beautiful multi‑color gradients (hero, cards, buttons, text, and borders).
- 🃏 **3D card hover effect** – Interactive tilt effect on cards using CSS perspective and JavaScript.
- 📂 **JSON‑driven content** – Update all text, images, skills, projects, and pricing in `portfolio.json` – no need to touch component code.
- 📱 **Fully responsive** – Mobile‑first design using Bootstrap 5 grid system (CSS only).
- 🖼️ **Dynamic images** – Uses [picsum.photos](https://picsum.photos) and [Unsplash](https://unsplash.com) for placeholder images; easily replace with your own.
- 🧩 **Reusable components** – Clean, modular React components for easy maintenance.
- ⚡ **Fast & performant** – Built with Vite for blazing‑fast HMR and optimized production builds.
- 🔍 **SEO friendly** – Semantic HTML, meta tags, and clean URLs.
- 📬 **Contact form** – Functional form with success feedback (backend integration optional).
- 💬 **WhatsApp & scroll‑to‑top** – Floating action buttons for quick actions.
- 🎞️ **Smooth animations** – Fade‑in, float, and pulse animations with staggered children.

## 🛠️ Tech Stack

- **React 19** – UI library
- **Vite** – Build tool and dev server
- **React Router DOM** – Client‑side routing (only for 404 page)
- **Bootstrap 5** – Grid system and utilities (CSS only, no React Bootstrap)
- **React Icons** – Icon library (FontAwesome, Simple Icons, etc.)
- **CSS3** – Custom styling with CSS variables, gradients, animations
- **JSON** – Single source of truth for all content

## 📂 Project Structure

```
portfolio-website/
├── public/                     # Static assets
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── style.css       # All styles (gradients, themes, animations)
│   ├── components/
│   │   ├── common/             # Button, SectionTitle, ScrollToTop
│   │   └── layout/             # Header, Footer
│   ├── context/
│   │   └── ThemeContext.jsx    # Light/Dark theme with localStorage
│   ├── data/
│   │   └── portfolio.json      # ⭐ All content (edit this)
│   ├── pages/
│   │   ├── Home/Home.jsx       # All sections combined
│   │   └── NotFound/NotFound.jsx
│   ├── App.jsx                 # Routes: Home & 404
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder. You can preview the production build with:

```bash
npm run preview
```

## 🎨 Customization

### Update Content

Edit `src/data/portfolio.json` to change all text, images, skills, projects, pricing, and contact details. The website updates instantly.

### Change Images

- Replace the Unsplash/picsum URLs in `portfolio.json` with your own image paths.
- Place your images inside the `public/images/` folder and reference them as `/images/your-image.jpg`.

### Modify Colors & Gradients

All color variables and gradients are defined in `src/assets/css/style.css` under `:root` and `[data-theme="dark"]`. Adjust the CSS variables to match your brand.

### Add or Remove Sections

- Edit the `navigation` array in `portfolio.json` to add/remove menu items.
- In `Home.jsx`, add or remove section components as needed.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by [Your Name](https://yourwebsite.com)**