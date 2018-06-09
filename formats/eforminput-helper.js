class EformInputHelper {
  static createCustomizeNode(node, value) {
    node.setAttribute('type', 'text');
    node.style.width = value+"px";
      
    return node;
  }
}

export default EformInputHelper;
