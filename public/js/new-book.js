function allowedPagesChanged() {
    if ($('#allowText').prop('checked')) {
        $('#maxPageLength').slideDown();
    } else {
        $('#maxPageLength').slideUp();
    }

    if ($('#allowText').prop('checked') && $('#allowDrawing').prop('checked')) {
        $('#defaultPageType').slideDown();
    } else {
        $('#defaultPageType').slideUp();
        if ($('#allowText').prop('checked')) {
            $('#defaultPageTypeSelect').val('Text');
        } else if ($('#allowDrawing').prop('checked')) {
            $('#defaultPageTypeSelect').val('Drawing');
        }
    }
}

allowedPagesChanged();

function submit() {
    $('#submitButton').attr('disabled', ''); //disable the button to prevent double-clicks

    $.post({
        url: '',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            title: $('#bookTitle').val(),
            pages: Number($('#pageAmount').val()),
            maxPagesPerPerson: Number($('#maxPagesPerPerson').val()),
            allowText: $('#allowText').prop('checked'),
            allowDrawing: $('#allowDrawing').prop('checked'),
            defaultPageType: $('#defaultPageTypeSelect').val(),
            maxPageLength: Number($('#maxPageLengthInput').val()),
            viewDistance: Number($('#viewDistance').val()),
            public: $('#publicCheck').prop('checked'),
            titleAlwaysVisible: $('#titleAlwaysVisible').prop('checked'),
        }),
        success: data => {
            if (typeof data == 'string') {
                $('#submitButton').removeAttr('disabled') //re-enable the submit button
                bootbox.alert(data);
            } else if (data === true) {
                window.location.replace('/my/books');
            }
        }
    });
}