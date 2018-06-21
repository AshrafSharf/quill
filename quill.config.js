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

    ['image', 'divider'],

    ['translationMarker']
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

