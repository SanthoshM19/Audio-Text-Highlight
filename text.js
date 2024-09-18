
const audio = document.getElementById('audio');

const lines = [
    { text: "Html is used for Structuring of Pages in the Web Application", time: 1, duration: 4 },
    { text: "CSS is used for styling of the web Pages.", time: 6, duration: 3 },
    { text: "Javascript adds interactivity to the Web Page.", time: 10, duration: 3 }
];


const textContainer = document.getElementById('text-container');
lines.forEach((line, index) => {
    const p = document.createElement('p');
    p.id = `line${index + 1}`;
    p.innerHTML = splitAndWrap(line.text);  
    textContainer.appendChild(p);
});


function splitAndWrap(text) {
    return text.split(' ').map(word => `<span>${word} </span>`).join(''); 
}

audio.addEventListener('timeupdate', () => {
    lines.forEach((line, index) => {
        const startTime = line.time;
        const endTime = line.time + line.duration;
        const sentenceDuration = line.duration; 

        if (audio.currentTime >= startTime && audio.currentTime <= endTime) {
            const currentTimeInSentence = audio.currentTime - startTime;
            const progressRatio = currentTimeInSentence / sentenceDuration; 
            const words = document.getElementById(`line${index + 1}`).querySelectorAll('span');
            const totalWords = words.length;
            const wordsToHighlight = Math.floor(progressRatio * totalWords); 
            words.forEach((word, i) => {
                if (i < wordsToHighlight) {
                    word.classList.add('highlight');  
                } else {
                    word.classList.remove('highlight'); 
                }
            });
        } else {
            const words = document.getElementById(`line${index + 1}`).querySelectorAll('span');
            words.forEach(word => word.classList.remove('highlight'));
        }
    });
});

