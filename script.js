// --- VARIABLES ---
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// --- THEME TOGGLE LOGIC ---
const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// --- MOBILE MENU LOGIC ---
hamburger.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide vertical menu
    navMenu.classList.toggle('active');
    
    // Optional: Switch icon from bars to times (X)
    const hamIcon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        hamIcon.classList.remove('fa-bars');
        hamIcon.classList.add('fa-times');
    } else {
        hamIcon.classList.remove('fa-times');
        hamIcon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.hidden');
            if (content) content.classList.add('show');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach((el) => observer.observe(el));

// =========================================
// CONTACT FORM LOGIC (MAILTO)
// =========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    // 1. Stop the page from reloading/submitting to a server
    e.preventDefault();

    // 2. Get the values from the form
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    // 3. Construct the email subject and body
    // %0D%0A represents a line break in URLs
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    // 4. Create the mailto link
    // encodeURIComponent protects special characters in the message
    const mailtoLink = `mailto:edgardetiennejean@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // 5. Open the user's mail client
    window.location.href = mailtoLink;
    
    // Optional: clear form after sending
    contactForm.reset();
});