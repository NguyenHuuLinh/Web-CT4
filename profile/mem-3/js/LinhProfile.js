$(document).ready(()=> {
	let dropDown = $('.slide-down');
	dropDown.click(()=> {
		let under = $('.under').slideToggle("2000");
	});

	let button = $('.visibility');
	button.click(()=> {
		$('#overlay').fadeIn(500);
		dropDown.hide(0);

		
	});

	let overlay = $('#overlay');
	overlay.click(()=> {
		$('#overlay').fadeOut(500);
		$('.logo').attr('src', '');
		dropDown.show(0);
	});
});


