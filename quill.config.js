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
    /*let editor = quill.getContents();
    let htmlTemp = $(".ql-editor").html();
    console.log(editor);
    console.log(htmlTemp);*/
	let translateionMarkers = $(".ql-editor").find('.ql-translation-marker');
	translateionMarkers.each(function (i, value) {
		var key = $(this).attr('markerid'),
			value = $(this).text();
		translationMarkerMapper[key] = value;
	});
	console.log(translationMarkerMapper);
}

function loadEformInputs() {
	var templateHtml = '<p>Hello <strong>World!</strong></p><hr class="ql-divider"><p>Test <strong>World!</strong></p><hr class="ql-divider">'
	quill.clipboard.dangerouslyPasteHTML(templateHtml);
    /*var delta = [
     { insert: 'Hello ' },
     { insert: 'World!', attributes: { bold: true } },
     { insert: '\n' },
     { insert: '\n', attributes: { divider: true } },
     { insert: 'Test ' },
     { insert: 'World!', attributes: { bold: true } },
     { insert: '\n' },
     { insert: '\n', attributes: { divider: true } }
     ]
    quill.setContents(delta);*/
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
