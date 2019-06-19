import React, { Component } from 'react';


class Welcome extends Component {
  componentDidMount(){
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.video.paused) {
        this.video.textTracks[0].mode = 'showing'
        this.video.play();
      }else{
        this.video.textTracks[0].mode = 'showing'

        this.video.pause();
      }
    })
  }

  render() {
    // cornation street 08 May
    // https://files.stvqa.tv/player/subtitles/coronation-street-20190508-2030.subs.vtt
    const vttSubtitle = "https://files.stvqa.tv/player/subtitles/coronation-street-20190508-2030.subs.vtt";
    const dashVideo = "http://manifest.prod.boltdns.net/manifest/v1/dash/live-hbbtv15/clear/1486976045/e3d9f1eb-2149-4b68-ae9f-e1be36d5320a/2s/manifest.mpd?fastly_token=NWQyNDYwNjlfYTlhMGRjN2RmMjg3YjY2NmYxMTQ1Y2FiOWRmOWM5ZWE3ZTU5ODUzMzhjNmEwMDhjNTdlNDg4NWI1OGM2YmFmZg%3D%3D";

    // "http://bcboltstv-a.akamaihd.net/media/v1/pmp4/static/clear/1486976045/2f01f4af-b73f-486a-a372-c85c8950fed4/high.mp4"

    return (
      <figure id="videoContainer">
        <video id="video" controls preload="metadata" crossorigin="anonymous" ref={event=>{this.video = event}}>
          <source src={dashVideo} type="video/mp4" />
          <track id="subtitleTrack" kind="subtitles" label="English subtitles" src={vttSubtitle} srclang="en" default>
          </track>
          </video>
      </figure>
    )
  }
}

export default Welcome;
