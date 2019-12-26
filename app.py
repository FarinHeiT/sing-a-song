from flask import Flask, render_template, request
import json
from fuzzywuzzy import fuzz

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit_song', methods=('POST',))
def submit_song():

    userLyrics = json.loads(request.data)['data']
    print(userLyrics)
    lyrics = "No more champagne And the fireworks are through Here we are, me and you Feeling lost and feeling blue It's the end of the party And the morning seems so grey So unlike yesterday Now's the time for us to say Happy New Year Happy New Year May we all have a vision now and then Of a world where every neighbor is a friend Happy New Year Happy New Year May we all have our hopes, our will to try If we don't we might as well lay down and die You and I Sometimes I see How the brave new world arrives And I see how it thrives In the ashes of our lives Oh yes, man is a fool And he thinks he'll be okay Dragging on, feet of clay Never knowing he's astray Keeps on going anyway Happy New Year Happy New Year May we all have a vision now and then Of a world where every neighbor is a friend Happy New Year Happy New Year May we all have our hopes, our will to try If we don't we might as well lay down and die You and I Seems to me now That the dreams we had before Are all dead, nothing more Than confetti on the floor It's the end of a decade In another ten years time Who can say what we'll find What lies waiting down the line In the end of eighty-nine Happy New Year Happy New Year May we all have a vision now and then Of a world where every neighbor is a friend Happy New Year Happy New Year May we all have our hopes, our will to try If we don't we might as well lay down and die You and I"
    percentage = fuzz.ratio(lyrics, userLyrics)
    print(percentage)
    return {'percentage': percentage}


if __name__ == '__main__':
    app.run()
