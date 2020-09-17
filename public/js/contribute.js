var paper = new DrawingBoard.Board('paper', {
	controls: [
		'Color',
		{ Size: { type: 'dropdown' } },
		'DrawingMode',
		'Navigation',
		'Download'
	],
	size: 1,
	webStorage: false,
});

paper.getImg = function(jpeg = false) {
	return this.canvas.toDataURL(jpeg ? 'image/jpeg' : 'image/png', jpeg ? 0.5 : undefined)
}

paper.downloadImg = function() {
	$(`<a href="${this.getImg(true)}" download="${String(Date.now()).slice(0,-3)}.jpg">d</a>`)[0].click();
}

const contributionTypes = ['text', 'drawing'];
var contributionType;

function changeType(activating) {
	//deactivate previously activated contribution type
	for (let i of contributionTypes) {
		$(`#${i}Type`).removeClass('active');
		$(`#${i}Contribution`).slideUp();
	}
	contributionType = activating;
	$(`#${activating}Type`).addClass('active');
	$(`#${activating}Contribution`).slideDown();
}

for (let i of contributionTypes)
	$(`#${i}Contribution`).hide();
changeType('text');