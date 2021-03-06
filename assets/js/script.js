const API_KEY = "OmWQIUTUiTbpNysy9uvweUHiZ7M";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));

function processOptions(form) {
    let temparry = [];
    for (entry of form.entries()) {
        if (entry[0] == 'options') {
            temparry.push(entry[1]);
        }
    }
    form.delete('options');
    form.append('option', temparry.join());
    return form;
}

async function postForm(e) {
    const form = processOptions(new FormData(document.getElementById('checksform')));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });
    const data = await response.json();
    if (response.ok) {
        displayError(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    };
}

function displayError(data) {
    let heading = `JSHint result for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<di class="no_errors">No errors Reported!</di></di>`
    } else {
        results = `<di>Total Errors <span class="error_count">${data.total_errors}</span></di>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>`;
            results += ` column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;
    resultsModal.show();
}

async function getStatus() {
    const querryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(querryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data)
    } else {
        displayException(data);
        throw new Error(data.error);
    };
}

function displayStatus(data) {
    document.getElementById('resultsModalTitle').innerText = "API Key Status";
    document.getElementById('results-content').innerHTML = `<p>Your Key is Valid Untill: ${data.expiry}</p>`;
    resultsModal.show();
}

function displayException(data){
    let heading = "An Exception occured";
    results = `<div>The API returned status code ${data.status_code} </div>`;
    results += `<div>Error number <strong>${data.error_no}</strong></div>`;
    results += `<div>Error Text: <strong>${data.error}</strong></div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;
    resultsModal.show();

}