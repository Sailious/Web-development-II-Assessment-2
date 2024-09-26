function fetchFundraiserDetails(id) {
    fetch(`http://localhost:3000/fundraiser/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const details = document.getElementById('details');
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
            console.error('Error loading the fundraiser details:', error);
            document.getElementById('details').innerHTML = '<p>Error loading the fundraiser details.</p>';
        });
}

function showDonationMessage() {
    alert("This feature is under construction.");
}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserId = urlParams.get('id');
    if (fundraiserId) {
        fetchFundraiserDetails(fundraiserId);
    }
}

document.addEventListener('DOMContentLoaded', init);

// 绑定捐赠按钮的点击事件
document.getElementById('donate-btn').addEventListener('click', showDonationMessage);