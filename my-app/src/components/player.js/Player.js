import React, { Component } from 'react';


class Welcome extends Component {
  render() {
    // "http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/f44e8fe0-7900-44d9-84a6-decf7d83edf8/high.mp4"
    // https://files.stvqa.tv/player/subtitles/emmerdale-emmerdale-ep-1352019-23413.subs.vtt
    return (
      <figure id="videoContainer">
        <video id="video" controls preload="metadata" poster="img/poster.jpg">
          <source src="http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/f44e8fe0-7900-44d9-84a6-decf7d83edf8/high.mp4" type="video/mp4" />
          <track id="subtitleTrack" kind="subtitles" label="English subtitles" src="https://files.stvqa.tv/player/subtitles/emmerdale-emmerdale-ep-1352019-23413.subs.vtt" srclang="en" default>
          </track>
          <track id="subtitleTrack" kind="subtitles" label="Arabic subtitles" src="https://files.stvqa.tv/player/subtitles/emmerdale-emmerdale-ep-1352019-23413.subs.vtt" srclang="ar" default>
          </track>
          <track id="subtitleTrack" kind="subtitles" label="France subtitles" src="https://files.stvqa.tv/player/subtitles/emmerdale-emmerdale-ep-1352019-23413.subs.vtt" srclang="fr" default>
          </track>
          </video>
      </figure>
    )
  }
}

export default Welcome;
