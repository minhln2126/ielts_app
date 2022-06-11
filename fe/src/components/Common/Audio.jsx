import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

function Audio(props, ref) {
  const { source } = props;

  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 5;
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 5;
    changeRange();
  }

  useImperativeHandle(ref, () => ({
    currentTime: () => Number(progressBar.current.value),
    listenFrom: (time) => {
      console.log(time)
      progressBar.current.value = time;
      changeRange();
    }
  }));

  return (
    <div className="audioPlayer audio">
      <audio
        ref={audioPlayer}
        src={source}
        preload="metadata">
      </audio>
      <div className="row">
        <button
          onClick={togglePlayPause}
          className="playPause play-btn"
        >
          {
            isPlaying
              ?
              <img src="/img/pause-button (1).png" alt="" />
              :
              <img src="/img/play-button.png" alt="" />
          }
        </button>

        {/* current time */}
        <div className="currentTime time current-time">{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div className='progress-container'>
          <input
            type="range"
            className="progressBar"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        {/* duration */}
        <div
          className="duration time">
          {(duration && !isNaN(duration)) && calculateTime(duration)}
        </div>
      </div>
      <div className="row action">
        <div className="forward-container">
          <button
            className="forwardBackward forward-btn"
            onClick={backThirty}
          >
            <img src="/img/audio-back.png" alt="" />
          </button>
          <button
            className="forwardBackward forward-btn"
            onClick={forwardThirty}>
            <img src="/img/audio-next.png" alt="" />
          </button>
        </div>
        <div className="volume-container">
          <button
          >
            <img src="/img/icon_volume.png" alt="" />
          </button>
          <input
            type="range"
            className="range"
            defaultValue={80}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Audio)
