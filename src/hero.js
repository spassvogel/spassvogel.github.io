

$(document).ready(function() { return
	var video = document.getElementById('hero-video');
	var current = 'idle';
	var idleTime = 0;
	// Assign random icon to appear
	var ICONS = ['icon_unity','icon_html5','icon_vr','icon_nodejs'];
	document.getElementById('icon1').classList.add(ICONS[Math.floor(Math.random() * ICONS.length)]);

	var time = {
		IDLE: { start: 4.15, end: 19.22 },
		DRINK: { start: 36, end: 44  },
		LOOKRIGHT: { start: 20, end: 26 },
		SCRATCH1: { start: 26, end: 28 },
		SCRATCH2: { start: 30, end: 32 }
	}

	video.addEventListener('timeupdate', function () {
		 //debug: 
		 document.title = current + ' ' + video.currentTime;
		switch(current){
			case 'idle':
			
				if(idleTime++ > 260){					
					playFragment('drink');					
				}
				else if (video.currentTime >= time.IDLE.end) {
					playFragment('idle');
				}
				break;
	
			case 'drink': 
				if (video.currentTime >= time.DRINK.end) {
					playFragment('idle');
				}
				break;
	
			case 'scratch0': 
				if (video.currentTime >= time.SCRATCH1.end) {
					playFragment('idle');
				}
				break;

			case 'scratch1': 
				if (video.currentTime >= time.SCRATCH2.end) {
					playFragment('idle');
				}
				break;
	
			case 'lookright':
				if (video.currentTime >= time.LOOKRIGHT.end) {
					playFragment('idle');
				}
				break;
		}
	}, false);
	
	video.addEventListener('mousedown', function(e) {
		playFragment('scratch' + Math.round(Math.random()));
		e.preventDefault();
	});
    $(video).on('contextmenu', function(e) {
		e.preventDefault();
		playFragment('scratch' + Math.round(Math.random()) + 1);
		
		return false;
	});
	
	function playFragment(fragment) {
		console.log(fragment)
		video.attributes.title = fragment;
		switch(fragment	){
			case 'idle':
				video.currentTime = time.IDLE.start;
				break;
			case 'drink':
				video.currentTime = time.DRINK.start;
				break;	
			case 'scratch0':
				video.currentTime = time.SCRATCH1.start;
				break;	
			case 'scratch1':
				video.currentTime = time.SCRATCH2.start;
				break;	
			case 'lookright':
				video.currentTime = time.LOOKRIGHT.start;
				break;	
		}
		current = fragment;
		if(fragment != 'idle'){
			idleTime = 0;
		}
	}

	var s = skrollr.init({
		render: function(data) {
			if(data.curTop > 200 && data.curTop < 300 && current !== 'lookright'){
				playFragment('lookright');
			}
		}
	});
	skrollr.menu.init(s);


});

