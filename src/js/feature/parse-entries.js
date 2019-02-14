import Label from '../component/label';
import Panel from '../component/panel';

function isLabel(vNode) {
	return vNode.componentOptions &&
		vNode.componentOptions.Ctor &&
		vNode.componentOptions.Ctor.extendOptions === Label;
}

function isPanel(vNode) {
	return vNode.componentOptions &&
		vNode.componentOptions.Ctor &&
		vNode.componentOptions.Ctor.extendOptions === Panel;
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

	vNodes.forEach((vNode) => {
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
