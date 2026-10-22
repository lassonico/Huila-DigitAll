// =========================================
// LÓGICA PRINCIPAL (UI y Navegación)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smart Navbar (Ocultar/Mostrar con Glassmorphism)
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // 2. Acordeón de FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            
            // Cerrar todos
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.querySelector('.icon').textContent = '+';
            });
            
            // Abrir el seleccionado
            if (!isOpen) {
                header.setAttribute('aria-expanded', 'true');
                header.querySelector('.icon').textContent = '−';
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 3. Botones Magnéticos (Microinteracción premium)
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 4. Lógica del Menú Móvil
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinksItems = document.querySelectorAll('.nav-menu a');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            
            // Alternar clases
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Bloquear/Desbloquear el scroll del body por accesibilidad y UX
            document.body.style.overflow = isActive ? '' : 'hidden';
            mobileBtn.setAttribute('aria-expanded', !isActive);
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================
    // NAVEGACIÓN LIMPIA (Sin # en la URL)
    // =========================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Si el enlace es solo "#" (como el logo), evitar el comportamiento
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            // Buscar el elemento de destino
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Prevenir el comportamiento por defecto de inyectar el # en la URL
                e.preventDefault();

                // Calcular el desplazamiento (compensando la altura del navbar si es necesario)
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                // Realizar el scroll suave programático
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});