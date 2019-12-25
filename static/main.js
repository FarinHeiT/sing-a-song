window.addEventListener('load', function () {
  const audio = document.getElementsByTagName('audio')[0];
  const startButton = document.querySelector('.start');
  const restartButton = document.querySelector('.restart');


  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  function startSong () {
    if (audio.paused) {
      audio.play();
      startButton.innerHTML = 'Pause'
    } else {
      audio.pause();
      startButton.innerHTML = 'Start'
    }
  }


  startButton.addEventListener('click', () => startSong())
  restartButton.addEventListener('click', () => audio.currentTime = 0)


  recognition.addEventListener('result', e => {
    console.log(e)

      if (e.results[0].isFinal) {
        console.log('this is the end')
      }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();
});