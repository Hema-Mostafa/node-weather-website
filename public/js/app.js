
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value;
    messageOne.textContent = 'Loading...';
    messagetwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                messageOne.textContent = 'Unable to find location, Try another search !'
            else {
                messagetwo.textContent = data.forecast;
                messageOne.textContent = data.location
            }
        })
})
