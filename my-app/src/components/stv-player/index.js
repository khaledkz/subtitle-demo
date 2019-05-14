import React, { Component } from 'react';
import PropTypes            from 'prop-types'

export default class Video extends Component {
    static propTypes = {
        // Standard HTML5 video properties
        src: PropTypes.string,
        type: PropTypes.string,
        playing: PropTypes.bool,
        controls: PropTypes.bool,
        muted: PropTypes.bool,
        preload: PropTypes.oneOf(['auto', 'metadata', 'none']),

        // STV custom properties
        cssClass: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        logging: PropTypes.bool,
        disabled: PropTypes.bool,
        emptySourceOnUnmount: PropTypes.bool,
        forciblyRemoveVideo: PropTypes.bool,
        startTime: PropTypes.number, // time in seconds where video should start from
        seekTime: PropTypes.number, // time in seconds where video should seek to
        originalSrc: PropTypes.string,

        // Standard HTML5 Event Handlers
        onAbort: PropTypes.func,
        onCanPlay: PropTypes.func,
        onCanPlayThrough: PropTypes.func,
        onDurationChange: PropTypes.func,
        onEmptied: PropTypes.func,
        onEncrypted: PropTypes.func,
        onEnded: PropTypes.func,
        onError: PropTypes.func,
        onLoadedData: PropTypes.func,
        onLoadedMetadata: PropTypes.func,
        onLoadStart: PropTypes.func,
        onPause: PropTypes.func,
        onPlay: PropTypes.func,
        onPlaying: PropTypes.func,
        onProgress: PropTypes.func,
        onRateChange: PropTypes.func,
        onSeeked: PropTypes.func,
        onSeeking: PropTypes.func,
        onStalled: PropTypes.func,
        onSuspend: PropTypes.func,
        onTimeUpdate: PropTypes.func,
        onVolumeChange: PropTypes.func,
        onWaiting: PropTypes.func,

        // STV custom Event Handlers
        onNormalisedTimeUpdate: PropTypes.func
    }

    static defaultProps = {
        src: "",
        type: "",
        playing: false,
        controls: false,
        muted: false,
        preload: 'auto',
        cssClass: "",
        logging: false,
        disabled: true,
        emptySourceOnUnmount: false,
        forciblyRemoveVideo: false,
        startTime: 0,
        seekTime: 0,
        originalSrc: ""
    }

    lastTimeUpdate = null
    lastNormalisedTimeUpdate = null

    videoRef = React.createRef()
    videoSourceRef = React.createRef()


    componentWillUnmount () {
        const { emptySourceOnUnmount, forciblyRemoveVideo } = this.props;
        const video = this.videoRef.current
        const videoSource = this.videoSourceRef.current

        // Freeview Play (Humax) sometimes continues to play the video even
        // after the component has been unmounted. Calling .pause() has no
        // effect, so we remove the source(s) forcefully.
        if (emptySourceOnUnmount) {
          video.src = '';
          video.load();
        }

        // YouView devices currently only fully support loading one HTML video element at a time.
        // While pre-loading multiple elements can be achieved, switching between them cannot be performed reliably.
        // When switching between two videos, it is important to make sure that the previous
        // video element is removed, along with any references to it in JavaScript,
        // to enable the garbage collector to free all resources associated with it
        if (forciblyRemoveVideo) {
            video.pause();
            videoSource.src = "";
            try {
                videoSource.removeAttribute("src");
                video.load()
            } catch(e) {}
        }
    }

    componentDidMount() {
        if (this.props.src) {
            this.play()
        }
    }

    componentDidUpdate (prevProps, prevState) {
        const video = this.videoRef.current
        const videoSource = this.videoSourceRef.current

        if (prevProps.src !== this.props.src) {
            log(this.props.logging)("Source change.")
            this.loadAndPlay(video)
        }

        // Resume from pause
        if (!prevProps.playing && this.props.playing) {
            this.play()
        }

        // Pause
        if (prevProps.playing && !this.props.playing) {
            this.pause()
        }

        // Seek to new time
        if (!prevProps.seekTime && this.props.seekTime) {
            video.currentTime = this.props.seekTime
        }

    }

    pause () {
        log(this.props.logging)("calling pause()")
        const video = this.videoRef.current
        try {
            video.pause()
        } catch(e) {
            log(this.props.logging)(e)
        }
    }

    play () {
        log(this.props.logging)("calling play()")
        const video = this.videoRef.current
        try {
            video.play()
        } catch(e) {
            log(this.props.logging)(e)
        }
    }

    loadAndPlay = (video) => {
        try {
            video.load()
            video.play()
        } catch (e) {
            console.log(e)
        }
    }

    handleOnAbort = (event) => {
        log(this.props.logging)("Event: abort", event)
        if (this.props.onAbort) {
            this.props.onAbort(event)
        }
    }

    handleOnCanPlay = (event) => {
        log(this.props.logging)("Event: canplay", event)
        if (this.props.onCanPlay) {
            this.props.onCanPlay(event)
        }
    }

    handleOnCanPlayThrough = (event) => {
        log(this.props.logging)("Event: canplaythrough", event)
        if (this.props.onAbort) {
            this.props.onAbort(event)
        }
    }

    handleOnDurationChange = (event) => {
        if (event.target.duration === Infinity) return;
        log(this.props.logging)("Event: durationchange", event)
        if (this.props.onDurationChange) {
            this.props.onDurationChange(event)
        }
    }

    handleOnEmptied = (event) => {
        log(this.props.logging)("Event: emptied", event)
        if (this.props.onEmptied) {
            this.props.onEmptied(event)
        }
    }

    handleOnEncrypted = (event) => {
        log(this.props.logging)("Event: encrypted", event)
        if (this.props.onEncrypted) {
            this.props.onEncrypted(event)
        }
    }

    handleOnEnded = (event) => {
        log(this.props.logging)("Event: ended", event)
        if (this.props.onEnded) {
            this.props.onEnded(event)
        }
    }

    handleOnError = (event) => {
        event.persist()
        log(this.props.logging)("Event: error", event)
        if (this.props.onError) {
            this.props.onError(event)
        }
    }

    handleOnLoadedData = (event) => {
        log(this.props.logging)("Event: loadeddata", event)
        if (this.props.onLoadedData) {
            this.props.onLoadedData(event)
        }
    }

    handleOnLoadedMetadata = (event) => {
        const { logging, onLoadedMetadata, startTime } = this.props
        log(logging)("Event: loadedmetadata", event)
        const video = this.videoRef.current
        if (onLoadedMetadata) {
            onLoadedMetadata(event)
        }
        if (startTime > 0) {
            log(logging)("Setting start time to: ", startTime)
            video.currentTime = startTime
        }
    }

    handleOnLoadStart = (event) => {
        log(this.props.logging)("Event: loadstart", event)
        if (this.props.onLoadStart) {
            this.props.onLoadStart(event)
        }
    }

    handleOnNormalisedTimeUpdate = (event) => {
        const normalisedTime = Math.floor(event.target.currentTime)
        const notZero = normalisedTime > 0
        const notIdentical = normalisedTime !== this.lastNormalisedTimeUpdate

        if (notIdentical && notZero) {
            if (this.props.onNormalisedTimeUpdate) {
                const normalisedEvent = {
                    target: event.target,
                    normalTime: normalisedTime
                }
                this.props.onNormalisedTimeUpdate(normalisedEvent)
            }
            this.lastNormalisedTimeUpdate = normalisedTime
        }
    }

    handleOnPause = (event) => {
        if (this.props.onPause) {
            this.props.onPause(event)
        }
    }

    handleOnPlay = (event) => {
        log(this.props.logging)("Event: play", event)
        if (this.props.onPlay) {
            this.props.onPlay(event)
        }
    }

    handleOnPlaying = (event) => {
        log(this.props.logging)("Event: playing", event)
        if (this.props.onPlaying) {
            this.props.onPlaying(event)
        }
    }

    handleOnProgress = (event) => {
        log(this.props.logging)("Event: progress", event)
        if (this.props.onProgress) {
            this.props.onProgress(event)
        }
    }

    handleOnRateChange = (event) => {
        log(this.props.logging)("Event: ratechange", event)
        if (this.props.onRateChange) {
            this.props.onRateChange(event)
        }
    }

    handleOnSeeked = (event) => {
        log(this.props.logging)("Event: seeked", event)
        if (this.props.onSeeked) {
            this.props.onSeeked(event)
        }
    }

    handleOnSeeking = (event) => {
        log(this.props.logging)("Event: seeking", event)
        if (this.props.onSeeking) {
            this.props.onSeeking(event)
        }
    }

    handleOnStalled = (event) => {
        log(this.props.logging)("Event: stalled", event)
        if (this.props.onStalled) {
            this.props.onStalled(event)
        }
    }

    handleOnSuspend = (event) => {
        log(this.props.logging)("Event: suspend", event)
        if (this.props.onSuspend) {
            this.props.onSuspend(event)
        }
    }

    handleOnTimeUpdate = (event) => {
        log(this.props.logging)("Event: timeupdate", event.target.currentTime, event)
        const notZero = event.target.currentTime > 0
        const notIdentical = event.target.currentTime !== this.lastTimeUpdate
        const hasSrc = Boolean(event.target.currentSrc)

        if (notZero && notIdentical && hasSrc) {
            if (this.props.onTimeUpdate) {
                this.props.onTimeUpdate(event)
            }
            this.handleOnNormalisedTimeUpdate(event)
            this.lastTimeUpdate = event.target.currentTime
        }
    }

    handleOnVolumeChange = (event) => {
        log(this.props.logging)("Event: volumechange", event)
        if (this.props.onVolumeChange) {
            this.props.onVolumeChange(event)
        }
    }

    handleOnWaiting = (event) => {
        log(this.props.logging)("Event: waiting", event)
        if (this.props.onWaiting) {
            this.props.onWaiting(event)
        }
    }

    render () {
        const { cssClass, src, type, preload, muted, originalSrc } = this.props;

        return (
            <video
                ref={this.videoRef}
                className={cssClass}
                preload={preload}
                muted={muted}
                data-original-src={originalSrc}
                onAbort={this.handleOnAbort}
                onCanPlay={this.handleOnCanPlay}
                onCanPlayThrough={this.handleOnCanPlayThrough}
                onDurationChange={this.handleOnDurationChange}
                onEmptied={this.handleOnEmptied}
                onEncrypted={this.handleOnEncrypted}
                onEnded={this.handleOnEnded}
                onError={this.handleOnError}
                onLoadedData={this.handleOnLoadedData}
                onLoadedMetadata={this.handleOnLoadedMetadata}
                onLoadStart={this.handleOnLoadStart}
                onPause={this.handleOnPause}
                onPlay={this.handleOnPlay}
                onPlaying={this.handleOnPlaying}
                onProgress={this.handleOnProgress}
                onRateChange={this.handleOnRateChange}
                onSeeked={this.handleOnSeeked}
                onSeeking={this.handleOnSeeking}
                onStalled={this.handleOnStalled}
                onSuspend={this.handleOnSuspend}
                onTimeUpdate={this.handleOnTimeUpdate}
                onVolumeChange={this.handleOnVolumeChange}
                onWaiting={this.handleOnWaiting}
            >{
                src && type &&
                <source src={src} type={type} ref={this.videoSourceRef} />
            }</video>
        );
    }
}

const log = shouldLog => shouldLog ? (...args) => console.log(...args) : () => {}