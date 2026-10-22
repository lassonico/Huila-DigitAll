// =========================================
// ANIMACIONES Y EFECTOS AVANZADOS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer para Animaciones Reveal (Scroll)
    const revealElements = document.querySelectorAll('.reveal, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Efecto Tilt 3D en Hover para Elementos Premium
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotación 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            el.style.transition = 'transform 0.5s ease';
            setTimeout(() => el.style.transition = '', 500); // Reset transition
        });
    });

    // 3. Parallax Effect para Tarjetas Flotantes y Cursor Glow
    const cursorGlow = document.getElementById('cursor-glow');
    const parallaxElements = document.querySelectorAll('.parallax');

    document.addEventListener('mousemove', (e) => {
        // Cursor Glow Follow
        if(cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }

        // Parallax Movement
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.05;
            const x = mouseX * 1000 * speed;
            const y = mouseY * 1000 * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});