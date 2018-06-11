import $ from 'jquery';
import shortid from 'shortid';

const BACK_SPACE_KEY = 8;
const ZERO_KEY = 48;
const Z_KEY = 90;
const SPACE_KEY = 32;
const MIN_INPUT_SIZE = 3;


class EformInputHelper {
    static createCustomizeNode(node, value) {

        $(node).on('keydown', function(evt) {
            var $this = $(this),
                size = parseInt($this.attr('size'));
            var inputValue = evt.which;
            if (evt.which === BACK_SPACE_KEY) {
                // backspace
                if(size>MIN_INPUT_SIZE){
                    $this.attr('size', size - 1);
                }
            } else if((inputValue >= ZERO_KEY && inputValue <= Z_KEY) && (inputValue != SPACE_KEY && inputValue != 0)){
                // all other keystrokes
                $this.attr('size', size + 1);
            } else{
                return;
            }
        });

        let inputSize = Math.max(MIN_INPUT_SIZE, value.length);
        let shortId = shortid.generate();
        node.setAttribute('type', 'text');
        node.setAttribute('autofocus', 'true');
        node.setAttribute('value', value);
        node.setAttribute('size', inputSize);
        node.setAttribute('data-eforminput', shortId);
        return node;
    }
}

export default EformInputHelper;
