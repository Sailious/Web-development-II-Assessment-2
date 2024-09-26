function searchFundraisers() {
    const organizer = document.getElementById('organizer').value.trim();
    const city = document.getElementById('city').value.trim();
    const category = document.getElementById('category').value.trim();
    
    // 检查是否至少有一个字段被填写
    if (!organizer && !city && !category) {
        alert("Please fill in at least one search criteria.");
        return; // 阻止表单提交
    }

    let queryParams = new URLSearchParams();
    if (organizer) queryParams.append('organizer', organizer);
    if (city) queryParams.append('city', city);
    if (category) queryParams.append('category', category);

    fetch(`http://localhost:3000/search?${queryParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'No fundraisers found.';
                noResultsMessage.style.color = 'red';
                noResultsMessage.style.fontWeight = 'bold';
                resultsList.appendChild(noResultsMessage);
            } else {
                data.forEach(fundraiser => {
                    const item = document.createElement('div');
                    const link = document.createElement('a');
                    link.href = `fundraiser.html?id=${fundraiser.FUNDRAISER_ID}`;
                    link.textContent = `View Details for ${fundraiser.ORGANIZER}`;
                    link.style.margin = '10px';
                    item.innerHTML = `
                        <h3>${fundraiser.ORGANIZER}</h3>
                        <p>${fundraiser.CAPTION}</p>
                        <p>Target: ${fundraiser.TARGET_FUNDING}</p>
                        <p>Current: ${fundraiser.CURRENT_FUNDING}</p>
                        <p>City: ${fundraiser.CITY}</p>
                        <p>Category: ${fundraiser.NAME}</p>
                    `;
                    item.appendChild(link);
                    resultsList.appendChild(item);
                });
            }
        })
        .catch(error => {
            console.error('Error searching fundraisers:', error);
            const resultsList = document.getElementById('results-list');
            resultsList.innerHTML = '<p>Error loading the fundraisers.</p>';
        });
}

function clearCheckboxes() {
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    document.getElementById('category').value = '';
    document.getElementById('results-list').innerHTML = '';
}