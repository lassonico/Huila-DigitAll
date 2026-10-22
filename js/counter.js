// =========================================
// CONTADORES ANIMADOS (Estadísticas)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Ajusta para cambiar la velocidad de conteo

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const updateCount = () => {
                    const target = +targetEl.getAttribute('data-target');
                    const count = +targetEl.innerText;
                    
                    // Incremento dinámico basado en el target
                    const inc = target / speed;

                    if (count < target) {
                        targetEl.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        targetEl.innerText = target;
                    }
                };
                
                updateCount();
                observer.unobserve(targetEl); // Asegura que solo se ejecute una vez
            }
        });
    }, { threshold: 0.5 }); // Inicia cuando el 50% de la sección es visible

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});