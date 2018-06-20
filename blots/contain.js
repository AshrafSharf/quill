import Parchment from 'parchment';
import Block, {BlockEmbed} from './block';
import Container from './container';

class ContainBlot extends Container {
    static create() {
        let tagName = 'contain';
        let node = super.create(tagName);
        return node;
    }

    insertBefore(blot, ref) {
        if (blot.statics.blotName == this.statics.blotName) {
            super.insertBefore(blot.children.head, ref);
        } else {
            super.insertBefore(blot, ref);
        }
    }

    static formats(domNode) {
        return domNode.tagName;
    }

    formats() {
        // We don't inherit from FormatBlot
        return {[this.statics.blotName]: this.statics.formats(this.domNode)}
    }

    replace(target) {
        if (target.statics.blotName !== this.statics.blotName) {
            let item = Parchment.create(this.statics.defaultChild);
            target.moveChildren(item);
            this.appendChild(item);
        }
        if (target.parent == null) return;
        super.replace(target)
    }
}

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];

export default ContainBlot;
