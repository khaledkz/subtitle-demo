import React, { Component } from 'react';


class Welcome extends Component {
  componentDidMount(){
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.video.paused) {
        this.video.play();
      }else{
        this.video.pause();
      }
    })
  }

  render() {
    // cornation street 08 May
    // https://files.stvqa.tv/player/subtitles/coronation-street-20190508-2030.subs.vtt
    // https://files.stvqa.tv/player/subtitles/coronation-street-20190508-1930.subs.vtt

    // "http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/2f01f4af-b73f-486a-a372-c85c8950fed4/high.mp4"

    return (
      <figure id="videoContainer">
        <video id="video" controls preload="metadata" crossorigin="anonymous" ref={event=>{this.video = event}}>
          <source src="http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/2f01f4af-b73f-486a-a372-c85c8950fed4/high.mp4" type="video/mp4" />
          <track id="subtitleTrack" kind="subtitles" label="English subtitles" src="https://files.stvqa.tv/player/subtitles/coronation-street-20190508-2030.subs.vtt" srclang="en" default>
          </track>
          <track id="subtitleTrack" kind="subtitles" label="English UK subtitles" src="https://files.stvqa.tv/player/subtitles/coronation-street-20190508-1930.subs.vtt" srclang="en-uk" default>
          </track>
          </video>
      </figure>
    )
  }
}

export default Welcome;
