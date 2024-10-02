// Function to handle the search for fundraisers
function searchFundraisers() {
    // Get values from the search form fields and trim any excess whitespace
    const organizer = document.getElementById('organizer').value.trim();
    const city = document.getElementById('city').value.trim();
    const category = document.getElementById('category').value.trim();
    
    // Check if none of the search fields are filled out
    if (!organizer && !city && !category) {
        // Alert the user to fill in at least one search criteria and return early
        alert("Please fill in at least one search criteria.");
        return; // Prevent further execution of the function
    }

    // Create a new URLSearchParams object to build the query string
    let queryParams = new URLSearchParams();
    if (organizer) queryParams.append('organizer', organizer);
    if (city) queryParams.append('city', city);
    if (category) queryParams.append('category', category);

    // Use the Fetch API to send a GET request to the server with the search parameters
    fetch(`http://localhost:3000/search?${queryParams}`)
        .then(response => {
            // Check if the response status is successful
            if (!response.ok) {
                // Throw an error if the response was not successful
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response body and return it
            return response.json();
        })
        .then(data => {
            // Get the element where the search results will be displayed
            const resultsList = document.getElementById('results-list');
            // Clear any previous results from the results list
            resultsList.innerHTML = '';

            // Check if the server returned any fundraisers
            if (data.length === 0) {
                // Create a paragraph element to display a 'no results' message
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'No fundraisers found.';
                // Style the message to be red and bold
                noResultsMessage.style.color = 'red';
                noResultsMessage.style.fontWeight = 'bold';
                // Append the no results message to the results list
                resultsList.appendChild(noResultsMessage);
            } else {
                // Loop through each fundraiser in the returned data
                data.forEach(fundraiser => {
                    // Create a div element to represent this search result
                    const item = document.createElement('div');
                    item.classList.add('search-result');
                    // Create a link element to view the fundraiser's details
                    const link = document.createElement('a');
                    link.href = `fundraiser.html?id=${fundraiser.FUNDRAISER_ID}`;
                    link.textContent = `View Details for ${fundraiser.ORGANIZER}`;
                    link.style.margin = '10px';
                    // Set the HTML content of the item to display the fundraiser's details
                    item.innerHTML = `
                        <h3>${fundraiser.ORGANIZER}</h3>
                        <p>${fundraiser.CAPTION}</p>
                        <p>Target: ${fundraiser.TARGET_FUNDING}</p>
                        <p>Current: ${fundraiser.CURRENT_FUNDING}</p>
                        <p>City: ${fundraiser.CITY}</p>
                        <p>Category: ${fundraiser.NAME}</p>
                    `;
                    // Append the link to the item
                    item.appendChild(link);
                    // Append the item to the results list
                    resultsList.appendChild(item);
                });
            }
        })
        .catch(error => {
            // Log any errors that occurred during the fetch operation to the console
            console.error('Error searching fundraisers:', error);
            // Display an error message in the results list if an error occurred
            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = '<p>Error loading the fundraisers.</p>';
        });
}

// Function to clear the search fields and the results
function clearCheckboxes() {
    // Clear the values of the search fields
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    document.getElementById('category').value = '';
    // Clear the inner HTML of the results list to remove any previous results
    document.getElementById('results-list').innerHTML = '';
}