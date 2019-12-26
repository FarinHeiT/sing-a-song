 window.addEventListener('load', function () {
    const audio = document.getElementsByTagName('audio')[0];
  const startButton = document.querySelector('.start');
  const restartButton = document.querySelector('.restart');
  const lyrics = document.getElementsByTagName('pre')[0];
  let userLyrics = '';

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  // Return each phrase\word
  // recognition.interimResults = true;
  recognition.lang = 'en-US';

  function startSong () {
    if (audio.paused) {
      audio.play();
      startButton.innerHTML = 'Pause';
    } else {
      audio.pause();
      startButton.innerHTML = 'Start';
      // recognition.stop();
    }
  }

  function syncLyrics () {
    if (audio.currentTime <= 43) {
      lyrics.innerHTML = lyricsList[0];
    } else if (audio.currentTime <= 81) {
      lyrics.innerHTML = lyricsList[1];
    } else if (audio.currentTime <= 116){
      lyrics.innerHTML = lyricsList[2];
    } else if (audio.currentTime <= 168){
      lyrics.innerHTML = lyricsList[1];
    } else if (audio.currentTime <= 204){
      lyrics.innerHTML = lyricsList[3];
    } else {
      lyrics.innerHTML = lyricsList[1];
    }
  }


  startButton.addEventListener('click', () => startSong());
  // startButton.addEventListener('click', () => recognition.start(), {once : true});
  restartButton.addEventListener('click', () => {
    audio.currentTime = 0;
    userLyrics = '';
  });


  recognition.addEventListener('result', e => {
    userLyrics += e.results[0][0].transcript;
  });

  audio.addEventListener('pause', () => {
    recognition.stop();

  });

  audio.addEventListener('play', () => {
    recognition.start();
  });

  recognition.addEventListener('end', () => !audio.paused ? recognition.start() : '');

  audio.addEventListener('ended', alert(1));

  setInterval(() => {
    syncLyrics();
  }, 1000);

});