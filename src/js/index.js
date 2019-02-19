import parseEntries from './feature/parse-entries';
import {publicPropsDefinition} from './utility/props-definition';
import normalizeEvents from './utility/normalize-events';

import Tab from './component/tab';
import Label from './component/label';
import Panel from './component/panel';

const Index = {
	Label,
	Panel,
	name: 'VueTabber',
	props: publicPropsDefinition,
	render(createElement) {
		const slotChildren = this.$slots.default;

		const {triggerEvents, delayTriggerEvents, delayTriggerCancelEvents} = this.$props;

		return createElement(Tab, {
			props: {
				...this.$props,
				entries: parseEntries(slotChildren),
				triggerEvents: normalizeEvents(triggerEvents),
				delayTriggerEvents: normalizeEvents(delayTriggerEvents),
				delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents)
			},
			on: this.$listeners
		});
	}
};

export default Index;
