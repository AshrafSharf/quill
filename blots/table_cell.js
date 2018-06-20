import Parchment from 'parchment';
import Block, {BlockEmbed} from './block';
import ContainBlot from './contain';
import Container from  './container'
import RowBreak from './row_break';
import CellBreak from './cell_break';

class TableCell extends ContainBlot {

    format() {
        return 'td'
    }

    optimize() {
        super.optimize();
        let parent = this.parent;
        if (parent != null && parent.statics.blotName != 'tr') {
            this.processTR()
        }
        // merge same TD id
        let next = this.next;
        if (next != null && next.prev === this &&
            next.statics.blotName === this.statics.blotName &&
            next.domNode.tagName === this.domNode.tagName
        ) {
            next.moveChildren(this);
            next.remove();
        }
    }
    processTR () {
        // find next row break
        var currentBlot = this
        var rowItems = [this]
        while (currentBlot) {
            if (currentBlot.statics.tagName !== 'TD') {
                break
            }
            rowItems.push(currentBlot)
            if (currentBlot instanceof RowBreak) {
                break
            }
            currentBlot = currentBlot.next
        }
        // create row, add row items as TDs
        var cellItems = []
        var cells = []
        rowItems.forEach(function (rowItem) {
            cellItems.push(rowItem)
           if (rowItem instanceof CellBreak) {
                cells.push(cellItems)
                cellItems = []
            }
        })
        if (cellItems.length > 0) {
            cells.push(cellItems)
        }
        let mark = Parchment.create('block');
        this.parent.insertBefore(mark, this.next);
        // create row
        var row = Parchment.create('tr')
        cells.forEach(function (cell) {
            // add row elements
            cell.forEach(function (cellItem) {
                row.appendChild(cellItem)
            })
        })
        row.replace(mark)
    }
}


TableCell.blotName = 'td';
TableCell.tagName = 'td';
TableCell.scope = Parchment.Scope.BLOCK_BLOT;
TableCell.defaultChild = 'block';
TableCell.allowedChildren = [Block, BlockEmbed, Container];

Container.order = [
    'list', 'contain',   // Must be lower
    'td', 'tr', 'table'  // Must be higher
];

export default TableCell;
