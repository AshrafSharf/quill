import Parchment from 'parchment';
import Container from './container';
import TableRow from './table_row';
import TableHead from './table_head';

class Table extends Container {
    optimize() {
        super.optimize();
        let next = this.next;
        if (next != null && next.prev === this &&
            next.statics.blotName === this.statics.blotName &&
            next.domNode.tagName === this.domNode.tagName
        ) {
            next.moveChildren(this);
            next.remove();
        }
    }
}

Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableHead, TableRow];

export default Table;
