/**
 * Created by ashraf on 6/20/18.
 */
import Parchment from 'parchment';
import Container from './container';

class TableHead extends Container {
    static create() {
        let tagName = 'th';
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
            if (!(currentBlot instanceof TableHead)) {
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

TableHead.blotName = 'th';
TableHead.tagName = 'th';
TableHead.scope = Parchment.Scope.BLOCK_BLOT;
TableHead.defaultChild = 'td';

export  default TableHead;
