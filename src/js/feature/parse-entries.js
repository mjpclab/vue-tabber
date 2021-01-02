import parseBooleanProp from './parse-boolean-prop';
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

function parseEntries(propEntries, vNodes) {
	const entries = [];

	// prop entries
	if (propEntries && propEntries.length) {
		entries.push(...propEntries);
	}

	// children
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

	vNodes && vNodes.length && vNodes.forEach((vNode) => {
		if (isLabel(vNode)) {
			if (labelVNodes.length) {
				pushEntry();
			}
			labelVNodes = vNode.componentOptions.children;
			panelVNodes = [];
			key = vNode.key;
			const {disabled: itemDisabled, hidden: itemHidden} = vNode.componentOptions.propsData;
			disabled = parseBooleanProp(itemDisabled);
			hidden = parseBooleanProp(itemHidden);
		} else {
			if (!labelVNodes.length) {
				labelVNodes.push('');
			}
			if (isPanel(vNode)) {
				panelVNodes.push(...vNode.componentOptions.children);
			} else {
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
