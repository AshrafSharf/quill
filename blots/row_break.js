import {BlockEmbed} from './block';

class RowBreak extends BlockEmbed {
    formats() {
        return { trbr: true }
    }
}
RowBreak.blotName = 'trbr'
RowBreak.tagName = 'td'
RowBreak.className = 'trbr'


export default RowBreak;
