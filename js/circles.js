var Circles = function(options) {
	this.defaults = {
		numCircles : 10
	}

	this.settings = $.extend({}, this.defaults, options);
}

Circles.prototype.buildContainer = function() {
	var $mainContainer = $('<div />', {'id' : 'circles-container'});

	$mainContainer.css({
		'height': '100%',
		'width': '100%',
		'position': 'fixed',
		'left': 0,
		'top': 0
	});

	$('body').prepend($mainContainer);

	this.addCircles();
}

Circles.prototype.randomColor = function() {
	var chars = "0123456789ABCDEFabcdef",
		stringLength = 6,
		randomString = '';

	for (var i = 0; i < stringLength; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomString += chars.substring(rnum, rnum + 1);
	}
	
	return randomString;
}

Circles.prototype.animateCircles = function() {
	var randCircle = Math.round(Math.random() * $('.circle').length);

	$('.circle').eq(randCircle).animate({'opacity' : '.1', 'zoom' : '1.5'}, 1000, function() {
		$('.circle').eq(randCircle).animate({'opacity' : '0.05', 'zoom' : '1'}, 2000);
	});
}

Circles.prototype.addCircles = function() {
	var i,
		randNum,
		randPosX,
		randPosY,
		$circle = $('<div />', {'class' : 'circle'});

	$circle.css({
		'position': 'absolute',
		'border-radius': '100%',
		'opacity': '0.05',
		'transform': 'translateX(-50%) translateY(-50%)'
	});

	for (i = 0; i < this.settings.numCircles; i++) {
		randNum = Math.round(Math.random() * 500);
		randPosX = Math.round(Math.random() * 100);
		randPosY = Math.round(Math.random() * 100);
		randColor = this.randomColor();

		$('#circles-container').append($circle.clone(true).css({'background-color': '#' + randColor, 'height': randNum, 'width': randNum, 'top': randPosY + '%', 'left': randPosX + '%'}));
	}

	var timer = setInterval(this.animateCircles, 1000)
}

Circles.prototype.init = function() {
	this.buildContainer();
}

