// Function to fetch and display details of a specific fundraiser by ID
function fetchFundraiserDetails(id) {
    // Use the Fetch API to get data from the server for the given fundraiser ID
    fetch(`http://localhost:3000/fundraiser/${id}`)
        .then(response => {
            // Check if the response status is OK (status code 200-299)
            if (!response.ok) {
                // Throw an error if the response was not successful
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response body
            return response.json();
        })
        .then(data => {
            // Get the element where the details will be displayed
            const details = document.getElementById('details');
            // Update the HTML content of the 'details' element with the fetched data
            details.innerHTML = `
                <h3>${data.ORGANIZER}</h3>
                <p><strong>Caption:</strong> ${data.CAPTION}</p>
                <p><strong>Target Funding:</strong> ${data.TARGET_FUNDING}</p>
                <p><strong>Current Funding:</strong> ${data.CURRENT_FUNDING}</p>
                <p><strong>City:</strong> ${data.CITY}</p>
                <p><strong>Category:</strong> ${data.NAME}</p>
                <p><strong>Active:</strong> ${data.ACTIVE ? 'Yes' : 'No'}</p>
            `;
        })
        .catch(error => {
            // Log any errors that occurred during the fetch to the console
            console.error('Error loading the fundraiser details:', error);
            // Display an error message in the 'details' element if an error occurred
            document.getElementById('details').innerHTML = '<p>Error loading the fundraiser details.</p>';
        });
}

// Function to show a message when the donation button is clicked
function showDonationMessage() {
    // Display an alert indicating that the donation feature is under construction
    alert("This feature is under construction.");
}

// Initialization function that runs when the DOM content is fully loaded
function init() {
    // Parse the current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    // Get the 'id' parameter from the URL
    const fundraiserId = urlParams.get('id');
    // If an ID is present, fetch and display the fundraiser details
    if (fundraiserId) {
        fetchFundraiserDetails(fundraiserId);
    }
}

// Add an event listener for the 'DOMContentLoaded' event to call the 'init' function
document.addEventListener('DOMContentLoaded', init);

// Bind a click event listener to the donation button to show the donation message
document.getElementById('donate-btn').addEventListener('click', showDonationMessage);