$('.page-author').each((i, e) => {
    e = $(e);
    let author = e.attr('data-author');
    $.getJSON(`${identificatorHost}/u/${author}/json`, data => {
        e.html(`<img class="rounded border border-dark" src="${data.avatarURL}?size=20">${data.name}`);
    });
});