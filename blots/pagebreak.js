import {BlockEmbed} from './block';
import $ from 'jquery';

const A4P_AGE_HEIGHT = 842;

function findHeightPosition(breakIndex) {
	return breakIndex * A4P_AGE_HEIGHT;
}

class PageBreakBlot extends BlockEmbed {
	static create(breakIndex) {
		let node = super.create();
		$(node).css({
			left: 0,
			top: findHeightPosition(breakIndex),
			position: 'absolute',
			width: '100%',
			border: '2px inset gray'
		});
		node.setAttribute("breakIndex", breakIndex);
		return node;
	}

	static value(domNode) {
		let value = domNode.getAttribute("breakIndex");
		return value;
	}

	static determineBreakIndex(quill) {
		let pageBreakIndexArray = [];
		let pageBreakMarkers = $(quill.root).find('.pagebreak');
		pageBreakMarkers.each(function () {
			var pageBreakIndex = $(this).attr('breakIndex');
			pageBreakIndexArray.push(pageBreakIndex);
		});

		pageBreakIndexArray = pageBreakIndexArray.sort();
		let existingIndex = 0;
		for (let i = 0; i < pageBreakIndexArray.length; i++) {
			if (existingIndex == pageBreakIndexArray[i] - 1) {
				existingIndex++;
			}
			else {
				break;
			}
		}
		return existingIndex + 1;
	}
}

PageBreakBlot.blotName = 'pagebreak';
PageBreakBlot.tagName = 'div';
PageBreakBlot.className = 'pagebreak';

export default PageBreakBlot;
