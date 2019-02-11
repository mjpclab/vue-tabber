const RE_TAG_LABEL = /[Vv]ue-?[Tt]abber-?[Ll]abel/;
const RE_TAG_PANEL = /[Vv]ue-?[Tt]abber-?[Pp]anel/;

function isLabel(vNode) {
	return vNode.componentOptions && RE_TAG_LABEL.test(vNode.componentOptions.tag);
}

function isPanel(vNode) {
	return vNode.componentOptions && RE_TAG_PANEL.test(vNode.componentOptions.tag);
}

function parseEntries(vNodes) {
	const entries = [];
	let key, disabled, hidden;

	let labelVNodes = [];
	let panelVNodes = [];

	const pushEntry = () => {
		entries.push({
			label: labelVNodes,
			panel: panelVNodes,
			key,
			disabled,
			hidden
		});
	};

	vNodes.forEach((vNode, index) => {
		if (isLabel(vNode)) {
			if (labelVNodes.length) {
				pushEntry();
			}
			labelVNodes = [];
			labelVNodes.push(...vNode.componentOptions.children);
			panelVNodes = [];
			key = vNode.key;
			const {disabled: itemDisabled, hidden: itemHidden} = vNode.componentOptions.propsData;
			disabled = Boolean(itemDisabled);
			hidden = Boolean(itemHidden);
		} else {
			if (!labelVNodes.length) {
				labelVNodes.push('');
			}
			if (isPanel(vNode)) {
				panelVNodes.push(...vNode.componentOptions.children);
			} else if (vNode.tag) {
				panelVNodes.push(vNode);
			}
		}
	});

	if (labelVNodes.length) {
		pushEntry();
	}

	return entries;
}

export default parseEntries;
