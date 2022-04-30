const API_KEY = "OmWQIUTUiTbpNysy9uvweUHiZ7M";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", ()=>{
    getStatus();
});
async function getStatus(){
    const querryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(querryString);

    const data = await response.json();

    if(response.ok){
        displayStatus(data)
    }else{
        throw new Error(data.error);
    };
}
function displayStatus(data){
    document.getElementById('resultsModalTitle').innerText = "API Key Status";
    document.getElementById('results-content').innerHTML = `<p>Your Key is Valid Untill: ${data.expiry}</p>`;

    resultsModal.show();
}