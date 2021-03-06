 window.addEventListener('load', function () {
  const audio = document.getElementsByTagName('audio')[0];
  const startButton = document.querySelector('.start');
  const restartButton = document.querySelector('.restart');
  const lyrics = document.getElementsByTagName('pre')[0];
  let userLyrics = '';
  let result;

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

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

  function sendLyrics (data) {
    axios.post('/submit_song', {
      data,
    })
      .then(function (response) {
        result = response.data.percentage;
        showResult();
      })
  }


  function showResult () {
    const resultField = document.querySelector('#result');
    resultField.innerHTML = result;
    $(".Modal").modal();
  }


  startButton.addEventListener('click', () => startSong());
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

  audio.addEventListener('ended', () => {
    sendLyrics(userLyrics);
    audio.currentTime = 0;
  });

  setInterval(() => {
    syncLyrics();
  }, 1000);

});