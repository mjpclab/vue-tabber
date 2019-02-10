function createEventHandler(events, handler) {
	const on = {};
	events && events.length && events.forEach(event => {
		on[event] = handler;
	});
	return on;
}


function createLabelItem(createElement, tabber, entry, index) {
	const {
		labelItemActiveClass,
		labelItemInactiveClass,
		labelItemDisabledClass,
		labelItemHiddenClass
	} = tabber;

	const {
		delayTriggerLatency,
		labelItemClass
	} = tabber.$props;

	const {
		currentIndex, delayTimeout,
		validTriggerEvents, validDelayTriggerEvents, validDelayTriggerCancelEvents,
	} = tabber.$data;

	const {label, key, disabled, hidden} = entry;

	let delayTriggerCancelEventHandlers;
	let delayTriggerEventHandlers;
	let triggerEventHandlers;
	if (!disabled && !hidden) {
		const doSwitch = () => {
			clearTimeout(delayTimeout);
			tabber.switchTo(index);
		};
		let localDelayTimeout;
		const delayDoSwitch = delayTriggerLatency <= 0 ?
			doSwitch :
			() => {
				clearTimeout(delayTimeout);
				localDelayTimeout = tabber.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
			};
		const cancelDelayDoSwitch = () => {
			if (localDelayTimeout === delayTimeout) {
				clearTimeout(localDelayTimeout);
			}
		};

		triggerEventHandlers = createEventHandler(validTriggerEvents, doSwitch);
		if (validDelayTriggerEvents && validDelayTriggerEvents.length) {
			delayTriggerEventHandlers = createEventHandler(validDelayTriggerEvents, delayDoSwitch);
			delayTriggerCancelEventHandlers = createEventHandler(validDelayTriggerCancelEvents, cancelDelayDoSwitch);
		}
	}

	const classes = [labelItemClass];
	classes.push(index === currentIndex ? labelItemActiveClass : labelItemInactiveClass);
	if (disabled) {
		classes.push(labelItemDisabledClass);
	}
	if (hidden) {
		classes.push(labelItemHiddenClass);
	}

	return createElement('div', {
		'class': classes,
		on: {
			...delayTriggerCancelEventHandlers,
			...delayTriggerEventHandlers,
			...triggerEventHandlers
		},
		key: key ? 'key-' + key : 'index-' + index,
	}, label);
}


function createLabelContainer(createElement, tabber, entries, side) {
	const labelItems = entries.map((entry, index) => createLabelItem(createElement, tabber, entry, index));

	const {mode, labelContainerClass} = tabber.$props;
	const classes = [
		labelContainerClass,
		labelContainerClass + '-' + side,
		labelContainerClass + '-' + mode,
		labelContainerClass + '-' + side + '-' + mode
	];

	return createElement('div', {
		'class': classes,
		key: 'label-container' + '-' + side
	}, labelItems);
}

export default createLabelContainer;
