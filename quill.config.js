let maxRows = 10;
let maxCols = 5;
let tableOptions = [];
for (let r = 1; r <= maxRows; r++) {
    for (let c = 1; c <= maxCols; c++) {
        tableOptions.push('newtable_' + r + '_' + c);
    }
}
let toolbarOptions = [
    // Extended toolbar buttons
    [{ 'table': tableOptions }], // new table (cursor needs to be out of table)
    ['table-insert-rows', 'table-insert-columns'], // cursor needs to be in the table
    // Extended toolbar buttons
    
    ['bold', 'italic', 'underline', 'strike'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],

    ['image', 'divider', 'pagebreak'],

    ['translationmarker']
];

let quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: toolbarOptions
        },
        imageResize: {
            displaySize: true
        },
        imageDrop: true
    },
    theme: 'snow'
});

var translationMarkerMapper = {};

function getEformInputs() {
    let translateionMarkers = $(".ql-editor").find('.ql-translation-marker');
    translateionMarkers.each(function (i, value) {
        var key = $(this).attr('markerid'),
            value = $(this).text();
        translationMarkerMapper[key] = value;
    });
    console.log(translationMarkerMapper);
}

function loadEformInputs() {
    var templateHtml = '<p class="ql-align-center"><strong>Customer – Bank Account Information</strong></p><p><strong>Dear</strong> <em class="ql-translation-marker" markerid="H14vKV9-7">John Doe</em></p><p><strong>Customer number </strong>: <em class="ql-translation-marker" markerid="SyovtVcWQ">9100023020</em></p><p><br></p><p><br></p><p><br></p>';
    quill.clipboard.dangerouslyPasteHTML(templateHtml);
}

function clearEformInputs() {
    let translateionMarkers = $(".ql-editor").find('.ql-translation-marker');
    translateionMarkers.each(function (i, value) {
        $(this).text('--');
    });

    for (var prop in translationMarkerMapper) {
        translationMarkerMapper[prop] = ""
    }
    console.log(translationMarkerMapper);
}