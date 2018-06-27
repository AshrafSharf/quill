/**
 * Created by ashraf on 6/21/18.
 */

import BlockEmbed from './block';
import $ from 'jquery';

class DividerBlot extends BlockEmbed {
    static create() {
        let node = super.create();
        $(node).css({
            border : 'none',
            borderBottom : '2px solid lightgray',
        });
        return node;
    }
}
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';
DividerBlot.className = 'divider';
export default DividerBlot;
