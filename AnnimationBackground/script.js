let backroundList = ['girl0.jpg', 'girl1.jpg', 'girl2.jpg', 'girl3.jpg', 'girl4.jpg', ]

$(document).ready(()=> {
	setInterval(()=> {
		(()=> {
			let backgroundImage = $('.background-image');
			let backgroundImageUnder = $('.background-image-under');

			let currentImage = backgroundImage.css('background-image')
			let listSplit = currentImage.split('/');
			listSplit = listSplit[listSplit.length - 1]
			listSplit = listSplit.replace(/\"\)/g, "");

			currentImage = listSplit;
			// console.log(currentImage)
			let imageIndex = backroundList.indexOf(currentImage);
			if (imageIndex == 4){
				imageIndex = 0;
			}
			else {
				imageIndex += 1;
			}

			currentImage = 'url("images/' + backroundList[imageIndex] + '")';
			// console.log(currentImage)

			backgroundImage.css({
				'background-image': currentImage,
				'display': 'none',
			});

			backgroundImage.fadeIn(2000, ()=>{
				backgroundImageUnder.css({
					'background-image': currentImage,
				});
			});
		

		})();
	}, 3000);
});