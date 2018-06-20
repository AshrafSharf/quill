/**
 * Created by ashraf on 6/20/18.
 */
import Toolbar from './toolbar';


function defaultToolbarOptions() {
    return [
        // Extended toolbar buttons
        ['td'], // new table (cursor needs to be out of table)
        [{ 'table': 'append-row' }], // cursor needs to be in the table
        [{ 'table': 'append-col' }], // cursor needs to be in the table
        [{ 'table': 'remove-row' }], // cursor needs to be in the table
        [{ 'table': 'remove-col' }], // cursor needs to be in the table
        [{ 'table': 'remove-table' }], // cursor needs to be in the table
        // [{ 'table': 'cell-background' }], // cursor needs to be in the table

        // Default toolbar buttons
        ['bold', 'italic', 'underline', 'strike'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],

        ['image'],

        ['eforminput']
    ];
}


Toolbar.DEFAULTS = Object.assign(Toolbar.DEFAULTS, {
    container: defaultToolbarOptions(),
    handlers: {
        table: function(value) {
            if(value == 'append-row') {
                this.quill.getModule('table_handler').appendRow();
            } else if(value == 'append-col') {
                this.quill.getModule('table_handler').appendCol();
            } else if(value == 'remove-row') {
                this.quill.getModule('table_handler').removeRow();
            } else if(value == 'remove-col') {
                this.quill.getModule('table_handler').removeCol();
            } else if(value == 'remove-table') {
                this.quill.getModule('table_handler').removeTable();
            } else if(value == 'cell-background') {
                let bgColor = prompt('Background color?');
                if(bgColor != null) {
                    this.quill.getModule('table_handler').cellBackground(bgColor);
                }
            } else {
                this.quill.format('table', value);
            }
        }
    }
});


export default Toolbar;
