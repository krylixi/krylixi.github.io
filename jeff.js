

function videoScroll() {
	if ( document.querySelectorAll('video[autoplay]').length > 0) {
		var windowHeight = window.innerHeight,
		videoEl = document.querySelectorAll('video[autoplay]');

		for (var i = 0; i < videoEl.length; i++) {

			var thisVideoEl = videoEl[i],
			videoHeight = thisVideoEl.clientHeight,
			videoClientRect = thisVideoEl.getBoundingClientRect().top;


			if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
				thisVideoEl.play();
				mutebtn.hidden = !thisVideoEl.muted;
			} else {
				thisVideoEl.pause();
			}

		}
	}

}


var context = document.querySelector('.js-loop'),
clones = context.querySelectorAll('.is-clone'),
mutebtn2,
disableScroll = false,
isScrolling = false,
scrollHeight = 0,
scrollPos = 0,
clonesHeight = 0,
i = 0;

function getScrollPos () {
	return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
	context.scrollTop = pos;
}

function getClonesHeight () {
	clonesHeight = 0;

	for (i = 0; i < clones.length; i += 1) {
		clonesHeight = clonesHeight + clones[i].offsetHeight;
	}

	return clonesHeight;
}

function reCalc () {
	scrollPos = getScrollPos();
	scrollHeight = context.scrollHeight;
	clonesHeight = getClonesHeight();
	sectionHeight = clones[0].offsetHeight;

	if (scrollPos <= 0) {
		setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
	}
}

function scrollUpdate () {
	if (!disableScroll) {
		scrollPos = getScrollPos();

		if (clonesHeight + scrollPos >= scrollHeight) {
			// Scroll to the top when you’ve reached the bottom
			setScrollPos(sectionHeight); // Scroll down 1 pixel to allow upwards scrolling
			window.setTimeout(true, 40);
			disableScroll = true;
		} else if (scrollPos <= 0) {
			// Scroll to the bottom when you reach the top
			setScrollPos(scrollHeight - clonesHeight - sectionHeight);
			disableScroll = true;
		}
	}

	if (disableScroll) {
		// Disable scroll-jumping for a short time to avoid flickering
		window.setTimeout(function () {
			disableScroll = false;
		}, 100);
		// disableScroll = false;
	}
}

function init () {
	mutebtn = document.getElementById("mutebtn");
	reCalc();
	setScrollPos(window.innerHeight);
	
	context.addEventListener('scroll', function () {
		window.requestAnimationFrame(scrollUpdate);
		videoScroll();
		window.setTimeout(true, 100);
	}, false);

	window.addEventListener('load', videoScroll);
}

if (document.readyState !== 'loading') {
	init()
} else {
	document.addEventListener('DOMContentLoaded', init, false)
}