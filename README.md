# Sankalp Khatake — Ultra Pro Portfolio

## 🚀 Features
- **3D Animated Hero Orb** (Three.js) with orbital rings, particle cloud, orbiting spheres
- **Live Particle Network** background with connecting lines
- **Custom Cursor** with smooth trailing effect
- **Typewriter Role Animation**
- **Animated Counters** (triggered on scroll)
- **Skill Filter Tabs** with smooth transitions
- **3D Card Tilt** on projects and certificates
- **Scroll Progress Bar**
- **Shimmer animations** on certificate cards
- **Timeline with pulsing dots** for experience
- **Mobile Responsive** with hamburger menu
- **Preloader** with progress bar
- **Contact Form** with success animation

## 📁 Structure
```
portfolio-ultra/
├── index.html        ← Main HTML
├── css/
│   └── style.css     ← All styles
├── js/
│   └── main.js       ← All JavaScript + Three.js
└── README.md
```

## 🖼️ Adding Certificate Images
Inside `index.html`, find each `.cert-card` block.
Replace the `.cc-visual` div content with:
```html
<img src="your-cert-image.jpg" style="width:100%; height:140px; object-fit:cover;" />
```

## 🎨 Color Scheme
| Color  | Hex       | Usage                  |
|--------|-----------|------------------------|
| Cyan   | `#00FFD1` | Primary accent, glow   |
| Blue   | `#0066FF` | Secondary, skills      |
| Purple | `#7B2FFF` | Accent, stack tags     |
| Orange | `#FF6B35` | Copyrights, highlights |
| Dark   | `#020B18` | Background             |

## 🌐 How to Run
Simply open `index.html` in any modern browser.
No build step needed — everything is self-contained.

## ✏️ Customization
- Edit data in `index.html` directly
- Color variables in `css/style.css` under `:root {}`
- Three.js orb settings in `js/main.js` in the hero orb section
