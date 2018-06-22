import Parchment from 'parchment';
import shortid from 'shortid';

function match(node, prefix) {
    let className = node.getAttribute('class') || '';
    return className.split(/\s+/).filter(function (name) {
        return name.indexOf(`${prefix}-`) === 0;
    });
}


class TranslationMarkerClassAttributor extends Parchment.Attributor.Attribute {

    static keys(node) {
        return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
            return name
                .split('-')
                .slice(0, -1)
                .join('-');
        });
    }

    add(node, value) {
        if (!this.canAdd(node, value)) return false;
        this.remove(node);
        node.classList.add(`${this.keyName}-${value}`);
        node.setAttribute("markerId", shortid.generate());
        return true;
    }

    remove(node) {
        let matches = match(node, this.keyName);
        matches.forEach(function (name) {
            node.classList.remove(name);
        });
        if (node.classList.length === 0) {
            node.removeAttribute('class');
        }
    }

    value(node) {
        let result = match(node, this.keyName)[0] || '';
        let value = result.slice(this.keyName.length + 1); // +1 for hyphen
        return this.canAdd(node, value) ? value : '';
    }
}

let TranslationMarker = new TranslationMarkerClassAttributor('translation', 'ql-translation', {
    whitelist: ['marker'],
    scope: Parchment.Scope.INLINE
});

export {TranslationMarker};
