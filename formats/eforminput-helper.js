class EformInputHelper {
    static createCustomizeNode(node, value) {
        let width = value * 10;
        node.setAttribute('type', 'text');
        node.setAttribute('value', value);
        node.style.width =  width+"px";
        return node;
    }
}

export default EformInputHelper;
