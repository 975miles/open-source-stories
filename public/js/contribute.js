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
	$(`<a href="${this.getImg(true)}" download="oss-${String(Date.now()).slice(0,-3)}.jpg">d</a>`)[0].click();
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
changeType(book.defaultPageType.toLowerCase());

function updateTextLength() {
	$('#textLength').html($('#contributionText').val().length);
}
updateTextLength();

function submit() {
	let contribution = {
		page: Number($('#pageNum').html())
	};
	if ($('#textType').hasClass('active')) {
		contribution.type = 'Text';
		contribution.data = $('#contributionText').val();
	} else {
		contribution.type = 'Drawing';
		contribution.data = paper.getImg(true).slice('data:image/jpeg;base64,'.length);
	}
	console.log(contribution);
	$.post({
        url: '',
        contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(contribution),
		success: data => {
			console.log(data);
			if (typeof data == 'string')
				bootbox.alert(data);
			else if (data === true) {
				if ($('#newRandom').prop('checked'))
					window.location.replace('/b/random/write');
				else 
					window.location.replace('/')
			}
		}
	});
}