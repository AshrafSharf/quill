let Parchment = Quill.import('parchment');
let Delta = Quill.import('delta');
let TableCell = Quill.import('blots/td');

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

    ['image'],

    ['translationMarker']
];

let quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                table: function (value) {
                    if(value && value.includes('newtable_')) {
                        let sizes = value.split('_');
                        let rows = Number.parseInt(sizes[1])
                        let columns = Number.parseInt(sizes[2])
                        let table = Parchment.create('table');
                        const range = this.quill.getSelection()
                        if (!range) return
                        const newLineIndex = getClosestNewLineIndex(this.quill.getContents(), range.index + range.length)
                        let changeDelta = new Delta().retain(newLineIndex)
                        changeDelta = changeDelta.insert('\n')
                        for (let i = 0; i < rows; i++) {
                            for (let j = 0; j < columns; j++) {
                                changeDelta = changeDelta.insert('\n', {
                                    td: true
                                })
                                if (j < columns - 1) {
                                    changeDelta = changeDelta.insert({ tdbr: true })
                                }
                            }
                            changeDelta = changeDelta.insert({ trbr: true })
                        }
                        this.quill.updateContents(changeDelta, Quill.sources.USER)
                        this.quill.setSelection(newLineIndex + 1)
                    } else {
                        // TODO
                    }
                },
                'table-insert-rows': function() {
                    let td = find_td('td')
                    if(td) {
                        let col_count = 0
                        td.parent.children.forEach(function (it) {
                            if (it instanceof TableCell) {
                                col_count++
                            }
                        })
                        let table = td.parent.parent;
                        let new_row = td.parent.clone()
                        for (var i = col_count - 1; i >= 0; i--) {
                            let td = Parchment.create('td');
                            new_row.appendChild(td);
                            new_row.appendChild(Parchment.create('tdbr'))
                        };
                        new_row.appendChild(Parchment.create('trbr'))
                        table.appendChild(new_row);
                    }
                },
                'table-insert-columns': function() {
                    let td = find_td('td')
                    if(td) {
                        let table = td.parent.parent;
                        td.parent.parent.children.forEach(function(tr) {
                            let td = Parchment.create('td');
                            tr.appendChild(td);
                            tr.appendChild(Parchment.create('tdbr'))
                        });
                    }
                }
            }

        },
        clipboard: {
            matchers: [
                ['TD, TH', function (node, delta) {
                    delta.insert("\n", { td: true })
                    delta.insert({ tdbr: true })
                    return delta
                }],
                ['TR', function (node, delta) {
                    delta.insert({ trbr: true })
                    return delta
                }],
            ]
        },
        keyboard: {
            bindings: {
                'backspaceTable': {
                    key: 8,
                    format: ['td'],
                    // offset: 0,
                    handler: function handleTableBackspace (range, context) {
                        var formats = quill.getFormat(range.index-1, 1)
                        if (formats.tdbr || formats.trbr) {
                            // prevent deletion of table break
                            return false
                        }
                        return true
                    }
                }
            }
        }
    },
    theme: 'snow'
});

function getClosestNewLineIndex (contents, index) {
    return index + contents.map(function (op) {
            return typeof op.insert === 'string' ? op.insert : ' '
        }).join('')
            .slice(index)
            .indexOf('\n')
}

function find_td(what) {
    let leaf = quill.getLeaf(quill.getSelection()['index']);
    let blot = leaf[0];
    for(;blot!=null && blot.statics.blotName!=what;) {
        blot=blot.parent;
    }
    return blot; // return TD or NULL
}