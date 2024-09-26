document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/fundraisers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const fundraiserList = document.getElementById('fundraiser-list');
            fundraiserList.innerHTML = ''; // Clear previous results

            data.forEach(fundraiser => {
                if (fundraiser.ACTIVE) { // 只展示 ACTIVE 状态为 'Yes' 的活动
                    const item = document.createElement('div');
                    item.innerHTML = `
                        <h3>${fundraiser.ORGANIZER}</h3>
                        <p><strong>Caption:</strong> ${fundraiser.CAPTION}</p>
                        <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}</p>
                        <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                        <p><strong>City:</strong> ${fundraiser.CITY}</p>
                        <p><strong>Category:</strong> ${fundraiser.NAME}</p>
                        <p><strong>Active:</strong> ${fundraiser.ACTIVE ? 'Yes' : 'No'}</p>
                    `;
                    fundraiserList.appendChild(item);
                }
            });
        })
        .catch(error => {
            console.error('Error loading the fundraisers:', error);
            const fundraiserList = document.getElementById('fundraiser-list');
            fundraiserList.innerHTML = '<p>Error loading the fundraisers.</p>';
        });
});