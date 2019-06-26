import React, { Component } from 'react';
import subtitleData from './subtitle.vtt'
const data = subtitleData;
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
    const vttSubtitle = "https://files.stvqa.tv/player/subtitles/coronation-street-20190508-2030.subs.vtt";
    const dashVideo = "http://manifest.prod.boltdns.net/manifest/v1/dash/live-hbbtv15/clear/1486976045/e3d9f1eb-2149-4b68-ae9f-e1be36d5320a/2s/manifest.mpd?fastly_token=NWQyNDYwNjlfYTlhMGRjN2RmMjg3YjY2NmYxMTQ1Y2FiOWRmOWM5ZWE3ZTU5ODUzMzhjNmEwMDhjNTdlNDg4NWI1OGM2YmFmZg%3D%3D";

    const mp4Video = "http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/2f01f4af-b73f-486a-a372-c85c8950fed4/high.mp4"
    const mp4VideoTwo = "http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/7940e661-abb7-4807-a221-b395d3afd4d4/high.mp4"
    const  dashVideoTwo ="http://manifest.prod.boltdns.net/manifest/v1/dash/live-hbbtv15/clear/1486976045/7940e661-abb7-4807-a221-b395d3afd4d4/2s/manifest.mpd?fastly_token=NWQzODQxMGFfOTI5MWE3OTZlY2QzNmYyZjYxY2M0YmE1NDFhOGYzY2MwNWM5NDlhOGNmMmY4YzdhZWMzZWQ4ZjU5YTMwZGIyYw%3D%3D"
    const vttSubtitleTwo = "https://files.stv.tv/player/subtitles/britains-got-talent-20190602-1930.subs.vtt"
    return (
      <figure id="videoContainer">
        <video id="video" controls preload="metadata" onloadedmeta='this.play()'crossorigin="anonymous" ref={event=>{this.video = event}} preload="auto">
          <source src={mp4VideoTwo} type="video/mp4" />
          <track id="subtitleTrack" kind="subtitles" label="English subtitles" src={data} srclang="en" default>
          </track>
        </video>
      </figure>
    )
  }
}

export default Welcome;
