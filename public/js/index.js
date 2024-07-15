const responseElement = document.getElementById('response');
const inputElement = document.getElementById('input');
const formElement = document.getElementById('form');
const SentiScore = document.getElementById('score');
const EmojiElement = document.getElementById('s-emote');
const cardElement = document.getElementById('analysis-card');
const faceEmoteElement = document.getElementById('face-emote');

let debounceTimeout;

function updateEmoji(sentiment) {
        // Remove all possible classes first
        EmojiElement.classList.remove('fa-hand-pointer', 'fa-face-smile', 'fa-face-sad-cry');
        
        // Always add the 'fa-solid' class
        EmojiElement.classList.add('fa-solid');
        
        // Add the appropriate emoji class based on sentiment
        if (sentiment === 'POSITIVE') {
            EmojiElement.classList.add('fa-face-smile');
            faceEmoteElement.innerText = 'wow ! positive vibes';
        } else {
            EmojiElement.classList.add('fa-face-sad-cry');
            faceEmoteElement.innerText = 'Eww, Negative vibes !';
        }
}

function updateCard(sentiment){
    setTimeout(() => {
        if(sentiment === 'POSITIVE'){
            cardElement.classList.remove('negative');
            cardElement.classList.add('positive');
        } else {
            cardElement.classList.remove('positive');
            cardElement.classList.add('negative');
        }

        updateEmoji(sentiment);
    }, 500);
}

function handleInput(event) {
    // Clear any existing timeout
    clearTimeout(debounceTimeout);

    // Get the input value
    const value = event.target.value;

    if (value.length === 0) {
        // Reset everything to default state
        responseElement.innerText = '';
        SentiScore.innerText = '';
        EmojiElement.className = 'fa-solid fa-hand-pointer';
        cardElement.classList.remove('positive', 'negative');
        faceEmoteElement.innerText = '';
        return;
    }

    if (value.length > 0) {
        // Set a new timeout to send the request after 500ms
        debounceTimeout = setTimeout(() => {
                // Send the fetch request
                fetch('/', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    text: inputElement.value
                })
            }).then(res => res.json())
            .then(res => {
                if(res[0].label === 'POSITIVE'){
                    responseElement.innerText = 'POSITIVE';
                    SentiScore.innerText = res[0].score.toFixed(2);
                    updateCard('POSITIVE');
                }else{
                    responseElement.innerText = 'NEGATIVE';
                    SentiScore.innerText = res[0].score.toFixed(2);
                    updateCard('NEGATIVE');
                }
            }).catch(error => {
                console.log(error);
                alert("An error occured while analysing the sentiment");
            });
        }, 500);
    }
}

inputElement.addEventListener('input', handleInput);

