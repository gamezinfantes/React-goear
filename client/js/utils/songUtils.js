export default {
	secondsToMinutes: function(seconds){
		seconds = Math.floor(seconds);
		let min = Math.floor(seconds/60),
			sec = Math.floor(seconds%60);
		// format whith leading 0
		let fsec = (sec < 10) ? ("0" + sec) : sec;
		return `${min}:${fsec}`;
	},
	toPercentage: function(value, over){
		if (over==0)
			return 0
		return 100*value/over;
	}
}