import alt from '../alt'

class AudioActions {
  play() {
    let event = new CustomEvent("audio-play", {
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
    this.dispatch();
  }
  pause() {
    let event = new CustomEvent("audio-pause", {
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
    this.dispatch();
  }
  tooglePause() {
    let event = new CustomEvent("audio-tooglepause", {
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
    this.dispatch();
  }
  changeDuration(duration) {
    let event = new CustomEvent("audio-duration", {
			detail: {
				duration: duration,
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
    this.dispatch(duration);
  }
  changeVolume(volume) {
    let event = new CustomEvent("audio-volume", {
			detail: {
				volume: volume,
			},
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event)
    this.dispatch(volume);
  }

}

export default alt.createActions(AudioActions);
