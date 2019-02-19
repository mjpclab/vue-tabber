import TabContainer from './tab-container';
import {tabPropsDefinition} from '../utility/props-definition';
import {invalidNormalizedPosition, normalizePosition} from '../utility/normalize-position';

const Tab = {
	name: 'VueTabberTab',
	props: tabPropsDefinition,
	created() {
		this.tabContext = {
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
				delayTriggerLatency,
				showHeaderLabelContainer,
				showFooterLabelContainer,

				triggerEvents,
				delayTriggerEvents,
				delayTriggerCancelEvents,

				fnSwitchTo: this.switchTo,

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
