// Listen for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use the Fetch API to request a list of fundraisers from the server
    fetch('http://localhost:3000/fundraisers')
        .then(response => {
            // Check if the response status indicates a successful request (status code 200-299)
            if (!response.ok) {
                // Throw an error if the response status is not successful
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response body and return it
            return response.json();
        })
        .then(data => {
            // Get the element on the page where the list of fundraisers will be displayed
            const fundraiserList = document.getElementById('fundraiser-list');
            // Clear any existing content in the fundraiser list element
            fundraiserList.innerHTML = '';

            // Loop through each fundraiser in the data returned from the server
            data.forEach(fundraiser => {
                // Only process fundraisers where the ACTIVE property is 'Yes'
                if (fundraiser.ACTIVE) { 
                    // Create a new div element to represent this fundraiser
                    const item = document.createElement('div');
                    // Add a CSS class 'fundraiser' to the item for styling purposes
                    item.classList.add('fundraiser');
                    // Set the HTML content of the item to display the fundraiser's details
                    item.innerHTML = `
                        <h3>${fundraiser.ORGANIZER}</h3>
                        <p><strong>Caption:</strong> ${fundraiser.CAPTION}</p>
                        <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}</p>
                        <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                        <p><strong>City:</strong> ${fundraiser.CITY}</p>
                        <p><strong>Category:</strong> ${fundraiser.NAME}</p>
                        <p><strong>Active:</strong> ${fundraiser.ACTIVE ? 'Yes' : 'No'}</p>
                    `;
                    // Append the item to the fundraiser list element on the page
                    fundraiserList.appendChild(item);
                }
            });
        })
        .catch(error => {
            // Log any errors that occurred during the fetch operation to the console
            console.error('Error loading the fundraisers:', error);
            // Get the element on the page where the list of fundraisers will be displayed
            const fundraiserList = document.getElementById('fundraiser-list');
            // Display an error message in the fundraiser list element if an error occurred
            fundraiserList.innerHTML = '<p>Error loading the fundraisers.</p>';
        });
});