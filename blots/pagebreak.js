import {BlockEmbed} from './block';

function findHeightPosition() {
	
}

class PageBreakBlot extends BlockEmbed {
	static create(id) {
		let node = super.create();
		node.dataset.id = id;
		return node;
	}

	static value(domNode) {
		return domNode.dataset.id;
	}
}
PageBreakBlot.blotName = 'pagebreak';
PageBreakBlot.tagName = 'div';
PageBreakBlot.className = 'pagebreak';

export default PageBreakBlot;
