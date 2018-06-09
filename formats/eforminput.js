
import Inline from '../blots/inline';
import EformInputHelper from '../formats/eforminput-helper';


const ATTRIBUTES = [
  'height',
  'width'
];

class EformInput extends Inline {
  static create(value) {
    let node = super.create(value);
    node = EformInputHelper.createCustomizeNode(node, value);
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(domNode) {
    return domNode.getAttribute('value');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
EformInput.blotName = 'eforminput';
EformInput.className = 'ql-eforminput';
EformInput.tagName = 'INPUT';


export default EformInput;
