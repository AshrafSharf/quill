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
	let translateionMarkers = $(".ql-editor").find('.ql-translation-marker');
	translateionMarkers.each(function (i, value) {
		var key = $(this).attr('markerid'),
			value = $(this).text();
		translationMarkerMapper[key] = value;
	});
	console.log(translationMarkerMapper);
}

function loadEformInputs() {
	var templateHtml = '<p><br></p><table><tr><td><p>Comp</p></td><td><p>Provility</p></td></tr></table><p><br></p>';
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
