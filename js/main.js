document.addEventListener('DOMContentLoaded', () => {

    // Glitter effect on mouse move
    document.addEventListener('mousemove', (e) => {
        createGlitter(e.clientX, e.clientY);
    });

    function createGlitter(x, y) {
        const glitterContainer = document.getElementById('glitter-container');
        if (!glitterContainer) {
            console.error('Glitter container not found.');
            return;
        }

        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.left = `${x}px`;
        glitter.style.top = `${y}px`;
        
        glitterContainer.appendChild(glitter);

        gsap.to(glitter, {
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => {
                gsap.to(glitter, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.in",
                    onComplete: () => {
                        glitter.remove();
                    }
                });
            }
        });
    }

    // Contact form submission
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Simulate a successful form submission
        setTimeout(() => {
            responseMessage.textContent = 'Your message has been sent successfully!';
            responseMessage.style.color = '#5f23ad'; // Success color

            // Optionally, clear the form fields
            form.reset();

            // Optionally, animate the response message
            gsap.from(responseMessage, {
                opacity: 0,
                duration: 1,
                y: -20,
                ease: 'ease-out'
            });
        }, 1000); // Simulate a delay for form submission
    });

  
});
