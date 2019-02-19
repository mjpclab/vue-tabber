const sharedPropsDefinition = {
	mode: {
		validator(value) {
			return ['horizontal', 'vertical'].indexOf(value) >= 0
		},
		default: 'horizontal'
	},
	delayTriggerLatency: {type: [Number, String], default: 200},
	activePosition: {type: [Number, String]},

	tabContainerClass: {type: String, default: 'tab-container'},

	labelContainerClass: {type: String, default: 'label-container'},
	showHeaderLabelContainer: {type: Boolean, default: true},
	showFooterLabelContainer: {type: Boolean, default: false},
	labelItemClass: {type: String, default: 'label-item'},

	panelContainerClass: {type: String, default: 'panel-container'},
	panelItemClass: {type: String, default: 'panel-item'}
};

const publicPropsDefinition = {
	...sharedPropsDefinition,
	triggerEvents: {type: [Array, String], default: 'click'},
	delayTriggerEvents: {type: [Array, String]},
	delayTriggerCancelEvents: {type: [Array, String]}
};

const tabPropsDefinition = {
	...publicPropsDefinition,
	entries: {type: Array, default: []},
	triggerEvents: {type: Array},
	delayTriggerEvents: {type: Array},
	delayTriggerCancelEvents: Array
};

export {
	publicPropsDefinition,
	tabPropsDefinition
};
