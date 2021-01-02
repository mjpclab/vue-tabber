import parseBooleanProp from './parse-boolean-prop';
import Label from '../component/label';
import Panel from '../component/panel';

function isLabel(vNode) {
	return vNode.type === Label;
}

function isPanel(vNode) {
	return vNode.type === Panel;
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
			labelVNodes = [];
			if (vNode.children && vNode.children.default) {
				labelVNodes.push(...vNode.children.default());
			} else {
				labelVNodes.push('');
			}
			panelVNodes = [];
			key = vNode.key;
			disabled = Boolean(vNode.props && parseBooleanProp(vNode.props.disabled));
			hidden = Boolean(vNode.props && parseBooleanProp(vNode.props.hidden));
		} else {
			if (!labelVNodes.length) {
				labelVNodes.push('');
			}
			if (isPanel(vNode) && vNode.children && vNode.children.default) {
				panelVNodes.push(...vNode.children.default());
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
