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
	[{'table': tableOptions}], // new table (cursor needs to be out of table)
	['table-insert-rows', 'table-insert-columns'], // cursor needs to be in the table
	// Extended toolbar buttons

	['bold', 'italic', 'underline', 'strike'],

	[{'list': 'ordered'}, {'list': 'bullet'}],
	[{'header': [1, 2, 3, 4, 5, 6, false]}],

	[{'color': []}, {'background': []}],
	[{'align': []}],

	['link'],

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
		imageDrop: true,

		clipboard: {
			matchVisual: true

		}
	},
	theme: 'snow'
});

quill.clipboard.options.matchVisual = false;

var translationMarkerMapper = {};

function getEformInputs() {
    let editor = $(".ql-editor").html();
    //let htmlTemp = editor[0].innerHtml;
    console.log(editor);
	let translateionMarkers = $(".ql-editor").find('.ql-translation-marker');
	translateionMarkers.each(function (i, value) {
		var key = $(this).attr('markerid'),
			value = $(this).text();
		translationMarkerMapper[key] = value;
	});
	console.log(translationMarkerMapper);
}

function loadEformInputs() {
	var templateHtml = '<p><br></p><hr class="divider" style="border-top: none; border-right: none; border-bottom: 2px solid lightgray; border-left: none; border-image: initial;">'
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
