var paper = LC.init($('#paper')[0], {
	imageURLPrefix: '/literallycanvas-0.4.13/img',
	backgroundColor: '#fff',
});

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

function getImg() {
	return new Promise((res, rej) => {
		let paperCanvas = paper.canvasForExport();
		let canvas = $(`<canvas width="${paperCanvas.width}" height="${paperCanvas.height}">`)[0];
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = '#ddd';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = $('.lc-drawing.with-gui').css('background-color');
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		console.log(ctx.fillStyle);
		let img = new Image();
		img.onload = () => {
			ctx.drawImage(img, 0, 0);
			res(canvas.toDataURL('image/jpeg', 0.5));
		};
		img.src = paperCanvas.toDataURL();
		//ctx.putImageData(paperCanvas.getContext('2d').getImageData(0, 0, paperCanvas.width, paperCanvas.height), 0, 0);
		//console.log(canvas.toDataURL());
	});
}

async function downloadImg() {
	$(`<a href="${await getImg()}" download="oss-${String(Date.now()).slice(0,-3)}.jpg">d</a>`)[0].click();
}

async function submit() {
	let contribution = {
		page: Number($('#pageNum').html())
	};
	if ($('#textType').hasClass('active')) {
		contribution.type = 'Text';
		contribution.data = $('#contributionText').val();
	} else {
		contribution.type = 'Drawing';
		contribution.data = (await getImg()).slice('data:image/jpeg;base64,'.length);
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