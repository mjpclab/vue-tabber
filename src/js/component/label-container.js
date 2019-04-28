import createEventHandler from '../utility/create-event-handler';
import ClassNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

const UP = 'Up';
const DOWN = 'Down';
const LEFT = 'Left';
const RIGHT = 'Right';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

const TAB = 'Tab';
const HOME = 'Home';
const END = 'End';
const SPACE = ' ';
const ENTER = 'Enter';

const LabelContainer = {
	name: 'VueTabberLabelContainer',
	props: {
		entries: {type: Array},
		mode: {type: String},
		keyboardSwitch: {type: Boolean},
		labelContainerClass: {type: String},
		labelItemClass: {type: String},
		delayTriggerLatency: {type: Number},

		triggerEvents: {type: Array},
		delayTriggerEvents: {type: Array},
		delayTriggerCancelEvents: {type: Array},

		fnSwitchTo: {type: Function},
		fnSwitchPrevious: {type: Function},
		fnSwitchNext: {type: Function},
		fnSwitchFirst: {type: Function},
		fnSwitchLast: {type: Function},

		tabContext: {type: Object},
		currentIndex: {type: Number},
		side: {type: String}
	},
	methods: {
		onKeyDown(e, pos) {
			const {fnSwitchTo, fnSwitchPrevious, fnSwitchNext, fnSwitchFirst, fnSwitchLast} = this.$props;

			let switchResult;

			if (e.key) {
				switch (e.key) {
					case UP:
					case LEFT:
					case ARROW_UP:
					case ARROW_LEFT:
						switchResult = fnSwitchPrevious();
						break;
					case DOWN:
					case RIGHT:
					case ARROW_DOWN:
					case ARROW_RIGHT:
						switchResult = fnSwitchNext();
						break;
					case TAB:
						switchResult = e.shiftKey ? fnSwitchPrevious() : fnSwitchNext();
						if (switchResult) {
							e.preventDefault();
						}
						break;
					case HOME:
						switchResult = fnSwitchFirst();
						break;
					case END:
						switchResult = fnSwitchLast();
						break;
					case SPACE:
					case ENTER:
						switchResult = fnSwitchTo(pos);
						break;
				}
			}

			if (switchResult) {
				const targetNode = e.currentTarget.parentNode.childNodes[switchResult.index];
				targetNode && targetNode.focus && targetNode.focus();
				e.preventDefault();
			}
		}
	},
	render(createElement) {
		const {
			entries,
			mode,
			keyboardSwitch,
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

		const {tabberId} = tabContext;

		return createElement('div', {
			'class': labelContainerAllClass,
			attrs: {
				role: 'tablist'
			},
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

			const isActive = index === currentIndex;
			const labelItemAllClass = [labelItemClass];
			labelItemAllClass.push(isActive ? labelItemActiveClass : labelItemInactiveClass);
			if (disabled) {
				labelItemAllClass.push(labelItemDisabledClass);
			}
			if (hidden) {
				labelItemAllClass.push(labelItemHiddenClass);
			}


			const attrs = {
				tabIndex: 0,
				id: getLabelItemId(tabberId, side, index),
				role: 'tab',
				'aria-controls': getPanelItemId(tabberId, index),
				'aria-selected': isActive,
				'aria-expanded': isActive
			};

			const on = {
				...delayTriggerCancelEventHandlers,
				...delayTriggerEventHandlers,
				...triggerEventHandlers
			};
			if (keyboardSwitch) {
				on.keydown = e => this.onKeyDown(e, pos)
			}

			return createElement('div', {
				'class': labelItemAllClass,
				attrs,
				on,
				key: key ? 'key-' + key : 'index-' + index,
			}, label);
		}));
	}
};

export default LabelContainer;
