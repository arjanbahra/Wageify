// Selecting all FAQ headers
const faqItems = document.querySelectorAll('.faq-item');

// Adding event listener to toggle the display of answers on click
faqItems.forEach(item => {
    const button = item.querySelector('.faq-toggle-btn');
    const answer = item.querySelector('.faq-answer');
    const header = item.querySelector('.faq-header');

    header.addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');

        // Toggle the 'expanded' class to show/hide the answer
        item.classList.toggle('expanded');
        
        // Keep the "+" icon but rotate it on expansion
        if (isExpanded) {
            button.textContent = '+';
        } else {
            button.textContent = '+'; // This will remain X once clicked
        }
    });
});
