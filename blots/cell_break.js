import {BlockEmbed} from './block';

class CellBreak extends BlockEmbed {
    formats() {
        return { tdbr: true }
    }
}
CellBreak.blotName = 'tdbr'
CellBreak.tagName = 'td'
CellBreak.className = 'tdbr'


export default CellBreak;
