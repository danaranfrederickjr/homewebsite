const contactForm = document.getElementById('contactForm');
        const messageBox = document.getElementById('messageBox');

        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            const form = event.target;
            const formData = new FormData(form);
            const formUrl = form.action;

            try {
                const response = await fetch(formUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Crucial for Formspree's JSON response
                    }
                });

                if (response.ok) {
                    showMessage('Message sent successfully! We will get back to you shortly.', false);
                    form.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showMessage('Error: ' + data.errors.map(error => error.message).join(', '), true);
                    } else {
                        showMessage('An unexpected error occurred. Please try again.', true);
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                showMessage('Network error. Please check your connection and try again.', true);
            }
        });

        function showMessage(message, isError) {
            messageBox.textContent = message;
            messageBox.classList.remove('show', 'error'); // Reset classes
            if (isError) {
                messageBox.classList.add('error');
            }
            messageBox.classList.add('show');

            setTimeout(() => {
                messageBox.classList.remove('show');
            }, 5000); // Hide after 5 seconds
        }
