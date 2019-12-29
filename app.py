from flask import Flask, render_template, request
import json
import configparser
from fuzzywuzzy import fuzz
from original_lyrics import lyrics


app = Flask(__name__)
storage = configparser.ConfigParser()
storage.read('storage.ini')


@app.route('/')
def index():
    sung_times = int(storage['DEFAULT']['SungTimesCounter'])
    return render_template('index.html', sung_times=sung_times)


@app.route('/submit_song', methods=('POST',))
def submit_song():

    userLyrics = json.loads(request.data)['data']
    print(userLyrics)
    percentage = fuzz.ratio(lyrics, userLyrics)
    print(percentage)

    # Increase the counter value
    if percentage > 70:
        storage['DEFAULT']['SungTimesCounter'] = \
            str(int(storage['DEFAULT']['SungTimesCounter']) + 1)
        with open('storage.ini', 'w') as configfile:
            storage.write(configfile)

    return {'percentage': percentage}


if __name__ == '__main__':
    app.run()
