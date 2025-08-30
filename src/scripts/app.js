// This file contains the JavaScript code for the website. It handles user interactions, form submissions, and any dynamic content updates on the webpage.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-child-form');
    const messageContainer = document.getElementById('message-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const childName = document.getElementById('child-name').value;
        const childDescription = document.getElementById('child-description').value;

        if (childName && childDescription) {
            // Simulate sending data to a server
            messageContainer.innerHTML = `<p>Thank you for reporting. We are looking for ${childName}.</p>`;
            form.reset();
        } else {
            messageContainer.innerHTML = '<p>Please fill in all fields.</p>';
        }
    });
});