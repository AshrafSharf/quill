import Parchment from 'parchment';
import Container from './container';

class TableRow extends Container {
    static create() {
        let tagName = 'tr';
        let node = super.create(tagName);
        return node;
    }

    optimize() {
        super.optimize();
        var parent = this.parent
        if (parent != null && parent.statics.blotName != 'table') {
            this.processTable()
        }
    }

    processTable() {
        var currentBlot = this
        var rows = []
        while (currentBlot) {
            if (!(currentBlot instanceof TableRow)) {
                break
            }
            rows.push(currentBlot)
            currentBlot = currentBlot.next
        }
        let mark = Parchment.create('block');
        this.parent.insertBefore(mark, this.next);
        let table = Parchment.create('table');
        rows.forEach(function (row) {
            table.appendChild(row)
        })
        table.replace(mark)
    }
}

TableRow.blotName = 'tr';
TableRow.tagName = 'tr';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'td';

export  default TableRow;
