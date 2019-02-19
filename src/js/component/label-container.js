import createEventHandler from '../utility/create-event-handler';
import ClassNameSuffix from '../utility/class-name-suffix';

const LabelContainer = {
	name: 'VueTabberLabelContainer',
	props: {
		entries: {type: Array},
		mode: {type: String},
		labelContainerClass: {type: String},
		labelItemClass: {type: String},
		delayTriggerLatency: {type: Number},

		triggerEvents: {type: Array},
		delayTriggerEvents: {type: Array},
		delayTriggerCancelEvents: {type: Array},

		fnSwitchTo: {type: Function},

		tabContext: {type: Object},
		currentIndex: {type: Number},
		side: {type: String}
	},
	render(createElement) {
		const {
			entries,
			mode,
			labelContainerClass,
			labelItemClass,
			delayTriggerLatency,

			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,

			fnSwitchTo,

			tabContext,
			currentIndex,
			side,
		} = this.$props;

		const labelContainerAllClass = [
			labelContainerClass,
			labelContainerClass + '-' + side,
			labelContainerClass + '-' + mode,
			labelContainerClass + '-' + side + '-' + mode
		];

		const labelItemActiveClass = labelItemClass + '-' + ClassNameSuffix.active;
		const labelItemInactiveClass = labelItemClass + '-' + ClassNameSuffix.inactive;
		const labelItemDisabledClass = labelItemClass + '-' + ClassNameSuffix.disabled;
		const labelItemHiddenClass = labelItemClass + '-' + ClassNameSuffix.hidden;

		return createElement('div', {
			'class': labelContainerAllClass,
		}, entries.map((entry, index) => {
			const {label, key, disabled, hidden} = entry;
			const pos = {index, key};

			let delayTriggerCancelEventHandlers;
			let delayTriggerEventHandlers;
			let triggerEventHandlers;
			if (!disabled && !hidden) {
				const doSwitch = () => {
					clearTimeout(tabContext.delayTimeout);
					fnSwitchTo(pos);
				};
				let localDelayTimeout;
				const delayDoSwitch = delayTriggerLatency <= 0 ?
					doSwitch :
					() => {
						clearTimeout(tabContext.delayTimeout);
						localDelayTimeout = tabContext.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === tabContext.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				triggerEventHandlers = createEventHandler(triggerEvents, doSwitch);
				if (delayTriggerEvents && delayTriggerEvents.length) {
					delayTriggerEventHandlers = createEventHandler(delayTriggerEvents, delayDoSwitch);
					delayTriggerCancelEventHandlers = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
				}
			}

			const labelItemAllClass = [labelItemClass];
			labelItemAllClass.push(index === currentIndex ? labelItemActiveClass : labelItemInactiveClass);
			if (disabled) {
				labelItemAllClass.push(labelItemDisabledClass);
			}
			if (hidden) {
				labelItemAllClass.push(labelItemHiddenClass);
			}

			return createElement('div', {
				'class': labelItemAllClass,
				on: {
					...delayTriggerCancelEventHandlers,
					...delayTriggerEventHandlers,
					...triggerEventHandlers
				},
				key: key ? 'key-' + key : 'index-' + index,
			}, label);
		}));
	}
};

export default LabelContainer;
