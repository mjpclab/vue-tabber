const TabPropsDefinition = {
	mode: {
		validator(value) {
			return ['horizontal', 'vertical'].indexOf(value) >= 0
		},
		default: 'horizontal'
	},
	triggerEvents: {type: [Array, String], default: 'click'},
	delayTriggerEvents: {type: [Array, String]},
	delayTriggerCancelEvents: {type: [Array, String]},
	delayTriggerLatency: {type: [Number, String], default: 200},
	activeIndex: {type: [Number, String], default: 0},

	tabContainerClass: {type: String, default: 'tab-container'},

	labelContainerClass: {type: String, default: 'label-container'},
	showHeaderLabelContainer: {type: Boolean, default: true},
	showFooterLabelContainer: {type: Boolean, default: false},
	labelItemClass: {type: String, default: 'label-item'},

	panelContainerClass: {type: String, default: 'panel-container'},
	panelItemClass: {type: String, default: 'panel-item'}
};

const TabContainerPropsDefinition = {
	...TabPropsDefinition,
	entries: {type: Array, default: []},
};

export {
	TabPropsDefinition,
	TabContainerPropsDefinition
};
