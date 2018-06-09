import Link from '../formats/link';

class EformInputHelper {
    static createCustomizeNode(node, value) {
        node.setAttribute('type', 'text');
        node.setAttribute('value', value);
        return node;
    }
}

export default EformInputHelper;
