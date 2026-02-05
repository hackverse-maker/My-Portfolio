// --- Sticky Navbar ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Scroll progress or active link update logic can go here
});

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- Active Link on Scroll ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- Scroll Reveal Animation ---
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
// Run on load to show elements already in view
window.addEventListener('load', reveal);
reveal(); // Initial call
setTimeout(reveal, 500); // Fail-safe for slower rendering


// --- Theme Toggle (Dark/Light Mode) ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        theme = 'dark';
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// --- Smooth Scrolling for all internal links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Adjust for sticky nav height
                behavior: 'smooth'
            });
        }
    });
});

// --- Modal Logic ---
const projectData = {
    1: {
        title: "Tariq's Portfolio",
        desc: "A stunning showcase of professional skills, featuring modern design patterns and fully responsive layouts. Built with performance in mind.",
        img: "images/work1.jpg",
        features: ["Glassmorphism UI", "Dark/Light Mode", "Scroll Animations", "SEO Optimized"],
        live: "https://hackverse-maker.github.io/My-Portfolio/",
        github: "#"
    },
    2: {
        title: "Marquise Vault",
        desc: "An elegant and secure platform designed for managing digital assets with a focus on luxury aesthetics and user security.",
        img: "images/work2.jpg",
        features: ["Secure Access", "Luxury UI Design", "Cross-browser Support", "Asset Management"],
        live: "https://hackverse-maker.github.io/Marquise-Vault/",
        github: "#"
    },
    3: {
        title: "Bint-e-Zahra Garments",
        desc: "A high-conversion e-commerce landing page specifically tailored for fashion and cosmetic brands, featuring mobile-first optimization.",
        img: "images/work3.jpg",
        features: ["Inventory Display", "Mobile-First", "Smooth Interactivity", "Fast Loading"],
        live: "https://hackverse-maker.github.io/Bint-e-Zahra-garments-and-cosmetic/",
        github: "#"
    },
    4: {
        title: "Rhyl Super Store",
        desc: "A robust superstore solution with sophisticated inventory systems and a clean, professional interface for everyday shoppers.",
        img: "images/work4.jpg",
        features: ["Search Functionality", "Category Filters", "Interactive Elements", "Modern Grid"],
        live: "#",
        github: "#"
    }
};

const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        const id = card.getAttribute('data-project');
        const data = projectData[id];

        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-image').src = data.img;
        document.getElementById('modal-live').href = data.live;
        document.getElementById('modal-github').href = data.github;

        const featuresList = document.getElementById('modal-features');
        featuresList.innerHTML = "";
        data.features.forEach(f => {
            const li = document.createElement('li');
            li.innerText = f;
            featuresList.appendChild(li);
        });

        modal.classList.add('active');
        document.body.style.overflow = "hidden"; // Prevent background scroll
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = "auto";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = "auto";
    }
});
