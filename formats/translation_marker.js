import Parchment from 'parchment';

function match(node, prefix) {
	let className = node.getAttribute('class') || '';
	return className.split(/\s+/).filter(function(name) {
		return name.indexOf(`${prefix}`) === 0;
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

	constructor(attrName, keyName, options = {}) {
		super(attrName, keyName, options);
	}

	add(node, value) {
		if(node.getAttribute('markerId')){
			this.remove(node);
			return false;
		}
		node.classList.add(`${this.keyName}`);
		node.setAttribute('markerId', value);
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
		node.removeAttribute('markerId');
	}

	value(node) {
		let result = match(node, this.keyName)[0] || '';
		let value = result.slice(this.keyName.length + 1); // +1 for hyphen
		return this.canAdd(node, value) ? value : '';
	}
}

let TranslationMarker = new TranslationMarkerClassAttributor('translationMarker', 'ql-translation-marker', {
	scope: Parchment.Scope.INLINE
});

export {TranslationMarker};
