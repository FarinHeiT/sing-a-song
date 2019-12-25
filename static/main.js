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


  startButton.addEventListener('click', () => startSong());
  // startButton.addEventListener('click', () => recognition.start(), {once : true});
  restartButton.addEventListener('click', () => {
    audio.currentTime = 0;
    userLyrics = '';
//     lyrics.innerHTML = `No more champagne
// And the fireworks are through
// Here we are, me and you
// Feeling lost and feeling blue
// It's the end of the party
// And the morning seems so grey
// So unlike yesterday
// Now's the time for us to say`
  });


  recognition.addEventListener('result', e => {

    userLyrics += e.results[0][0].transcript;
    console.log(userLyrics)

  });

  audio.addEventListener('pause', () => {
    recognition.stop();

  });

  audio.addEventListener('play', () => {
    recognition.start();
  });

  recognition.addEventListener('end', () => !audio.paused ? recognition.start() : '');

  setInterval(() => {

    if (audio.currentTime <= 43) {
      lyrics.innerHTML = lyricsList[0];
    } else if (audio.currentTime <= 81) {
      lyrics.innerHTML = lyricsList[1];
    } else {
      lyrics.innerHTML = lyricsList[2];
    }
  }, 1000);

});