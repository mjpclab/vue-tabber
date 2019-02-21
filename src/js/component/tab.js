import TabContainer from './tab-container';
import {tabPropsDefinition} from '../utility/props-definition';
import {getNextTabContainerId} from '../utility/get-id';
import {invalidNormalizedPosition, normalizePosition} from '../utility/normalize-position';

const SWITCH_DIRECTION = {
	BACKWARD: 0,
	FORWARD: 1
};

const Tab = {
	name: 'VueTabberTab',
	props: tabPropsDefinition,
	created() {
		this.tabContext = {
			tabberId: getNextTabContainerId(),
			delayTimeout: 0
		};
		this.prevPosition = invalidNormalizedPosition;
		this.currentPosition = invalidNormalizedPosition;
		this.updateTargetPosition();
	},
	data() {
		return {
			manageTargetPosition: true,
			targetPosition: -1,
		};
	},
	methods: {
		updateTargetPosition() {
			const {activePosition} = this;
			if (
				activePosition === undefined ||
				activePosition === null ||
				(typeof activePosition === 'number' && !isFinite(activePosition))
			) {
				this.manageTargetPosition = true;
			} else {
				this.targetPosition = activePosition;
				this.manageTargetPosition = false;
			}
		},
		updateCurrentPosition() {
			const {prevPosition, currentPosition} = this;
			if (prevPosition.index !== currentPosition.index) {
				this.$emit('switched', prevPosition, currentPosition);
			}
			this.prevPosition = currentPosition;
		},
		switchTo(normalizedPosition) {
			if (this.manageTargetPosition) {
				this.targetPosition = normalizedPosition.index;
			} else {
				this.$emit('updateActivePosition', normalizedPosition);
			}

			return normalizedPosition;
		},
		_switchNeighbor(fromIndex, direction, options) {
			let includeDisabled, includeHidden, loop, exclude;
			if (options) {
				includeDisabled = options.includeDisabled;
				includeHidden = options.includeHidden;
				loop = options.loop;
				exclude = options.exclude;
			}

			const entries = this.$props.entries;
			const excludeIndecies = exclude ? exclude.map(pos => normalizePosition(entries, pos).index) : [];

			const itemCount = entries.length;

			let maxIterationCount = -1;
			if (loop) {
				if (fromIndex >= 0 && fromIndex < itemCount) {
					maxIterationCount = itemCount - 1;
				} else {
					maxIterationCount = itemCount;
				}
			} else if (direction === SWITCH_DIRECTION.BACKWARD) {
				maxIterationCount = fromIndex;
			} else if (direction === SWITCH_DIRECTION.FORWARD) {
				maxIterationCount = itemCount - fromIndex - 1;
			}

			const iterationStep = direction === SWITCH_DIRECTION.BACKWARD ? -1 : 1;

			for (let i = 1; i <= maxIterationCount; i++) {
				const tabItemIndex = (fromIndex + i * iterationStep + itemCount) % itemCount;

				if (excludeIndecies.indexOf(tabItemIndex) >= 0) {
					continue;
				}

				const {disabled, hidden} = entries[tabItemIndex];

				if (
					(!disabled && !hidden) ||
					(includeDisabled && !hidden) ||
					(!disabled && includeHidden) ||
					(includeDisabled && includeHidden)
				) {
					return this.switchTo(normalizePosition(entries, tabItemIndex));
				}
			}
		},
		switchPrevious(options) {
			return this._switchNeighbor(this.currentPosition.index, SWITCH_DIRECTION.BACKWARD, options);
		},
		switchNext(options) {
			return this._switchNeighbor(this.currentPosition.index, SWITCH_DIRECTION.FORWARD, options);
		},
		switchFirst(options) {
			return this._switchNeighbor(-1, SWITCH_DIRECTION.FORWARD, options);
		},
		switchLast(options) {
			return this._switchNeighbor(this.$props.entries.length, SWITCH_DIRECTION.BACKWARD, options);
		}
	},
	watch: {
		activePosition(value) {
			this.updateTargetPosition(value);
		}
	},
	beforeUnmount() {
		clearTimeout(this.delayTimeout);
	},
	render(createElement) {
		const {
			entries,
			mode,
			tabContainerClass,
			labelContainerClass,
			labelItemClass,
			panelContainerClass,
			panelItemClass,
			keyboardSwitch,
			delayTriggerLatency,
			showHeaderLabelContainer,
			showFooterLabelContainer,

			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,

		} = this.$props;

		const {tabContext, prevPosition: normalizedPrevPosition} = this;
		const {index: prevIndex} = normalizedPrevPosition;

		const {targetPosition} = this.$data;
		const normalizedTargetPosition = normalizePosition(entries, targetPosition);
		const {index: targetIndex} = normalizedTargetPosition;


		const entryCount = entries.length;
		let currentIndex;
		if (targetIndex === -1) {
			currentIndex = entryCount > 0 ? 0 : -1;
			this.currentPosition = normalizePosition(entries, currentIndex);
		} else if (targetIndex < entryCount) {
			currentIndex = targetIndex;
			this.currentPosition = normalizedTargetPosition;
		} else {
			currentIndex = entryCount - 1;
			this.currentPosition = normalizePosition(entries, currentIndex);
		}

		if (prevIndex !== currentIndex) {
			this.$emit('switching', normalizedPrevPosition, this.currentPosition);
		}

		return createElement(TabContainer, {
			props: {
				entries,
				mode,
				tabContainerClass,
				labelContainerClass,
				labelItemClass,
				panelContainerClass,
				panelItemClass,
				keyboardSwitch,
				delayTriggerLatency,
				showHeaderLabelContainer,
				showFooterLabelContainer,

				triggerEvents,
				delayTriggerEvents,
				delayTriggerCancelEvents,

				fnSwitchTo: this.switchTo,
				fnSwitchPrevious: this.switchPrevious,
				fnSwitchNext: this.switchNext,
				fnSwitchFirst: this.switchFirst,
				fnSwitchLast: this.switchLast,

				tabContext,
				currentIndex
			}
		});
	},
	mounted() {
		this.updateCurrentPosition();
	},
	updated() {
		this.updateCurrentPosition();
	}
};

export default Tab;
