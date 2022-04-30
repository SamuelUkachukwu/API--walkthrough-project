const API_KEY = "OmWQIUTUiTbpNysy9uvweUHiZ7M";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById('checksform'))
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
    } else {
        throw new Error(data.error);
    };
}

async function getStatus() {
    const querryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(querryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data)
    } else {
        throw new Error(data.error);
    };
}

function displayStatus(data) {
    document.getElementById('resultsModalTitle').innerText = "API Key Status";
    document.getElementById('results-content').innerHTML = `<p>Your Key is Valid Untill: ${data.expiry}</p>`;
    resultsModal.show();
}