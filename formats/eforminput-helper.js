class EformInputHelper {
    static createCustomizeNode(node, value) {
        const widthAddingValue = 10;
        let width = value.length * widthAddingValue;
        node.setAttribute('type', 'text');
        node.setAttribute('value', value);
        node.style.width =  width+"px";
        return node;
    }
}

export default EformInputHelper;
