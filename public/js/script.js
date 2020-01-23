const searchInput = document.getElementById('search');
const searchForm = document.getElementById('search-form');
const submit = document.getElementById('submit');

const messageOne = document.getElementById('message1');
const messageTwo = document.getElementById('message2');

let search = '';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    search = searchInput.value;
    fetch('/weather?address='+search).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `${data.location} ; ${data.address}`;
                messageTwo.textContent = data.summary;
            }
        })
    })
});


