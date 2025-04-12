// Project Data
const projects = [
    {
        id: 1,
        title: "Modern Residential Complex",
        description: "A contemporary residential development featuring sustainable materials and innovative design solutions.",
        images: ["photos/project1.jpg", "photos/project2.jpg", "photos/project3.jpg"]
    },
    {
        id: 2,
        title: "Urban Office Space",
        description: "A dynamic workplace designed to foster creativity and collaboration in the heart of the city.",
        images: ["photos/project4.jpg", "photos/project5.jpg", "photos/project6.jpg"]
    },
    // Add more projects as needed
];

// Populate Projects Grid
function populateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item fade-in';
        projectItem.innerHTML = `
            <img src="${project.images[0]}" alt="${project.title}">
            <div class="project-overlay">
                <h3>${project.title}</h3>
            </div>
        `;
        
        projectItem.addEventListener('click', () => openModal(project));
        projectGrid.appendChild(projectItem);
    });
}

// Modal Functionality
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <div class="project-images">
            ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('projectModal').style.display = 'none';
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.9) {
            element.classList.add('visible');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTop = () => {
        const firstSection = document.querySelector('#section1');
        if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const logo = document.querySelector('.logo-link');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToTop();
        });
    }

    populateProjects();
    handleScrollAnimation();
    const sections = document.querySelectorAll('.scroll-section');
    const contents = document.querySelectorAll('.content');
    const scrollContainer = document.querySelector('.scroll-container');

    // Function to check which section is in view
    function checkActiveSection() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const inView = (
                rect.top >= -rect.height / 2 &&
                rect.bottom <= window.innerHeight + rect.height / 2
            );
            
            if (inView) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Check active section on scroll
    scrollContainer.addEventListener('scroll', () => {
        checkActiveSection();
        
        contents.forEach(content => {
            const rect = content.parentElement.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                content.classList.add('visible');
            } else {
                content.classList.remove('visible');
            }
        });
    });

    // Initial check for active section
    checkActiveSection();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    const container = document.querySelector('.scroll-container');
    let isScrolling = false;
    let startY;

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (!isScrolling) {
            isScrolling = true;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const sections = document.querySelectorAll('.scroll-section');
            const currentSection = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= -100 && rect.top <= 100;
            });
            
            const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
            sections[nextIndex].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                isScrolling = false;
            }, 1200); // Increased timeout for slower transitions
        }
    }, { passive: false });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!startY) return;

        const yDiff = startY - e.touches[0].pageY;
        if (Math.abs(yDiff) > 20 && !isScrolling) {
            isScrolling = true;
            
            const direction = yDiff > 0 ? 1 : -1;
            const sections = document.querySelectorAll('.scroll-section');
            const currentSection = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= -100 && rect.top <= 100;
            });
            
            const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
            sections[nextIndex].scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                isScrolling = false;
            }, 1200); // Increased timeout for slower transitions
        }
    }, { passive: false });

    container.addEventListener('touchend', () => {
        startY = null;
    }, { passive: true });
});

window.addEventListener('scroll', handleScrollAnimation); 