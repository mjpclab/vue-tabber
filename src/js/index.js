import {h} from 'vue';
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
	inheritAttrs: false,
	props: publicPropsDefinition,
	render() {
		const slotChildren = this.$slots.default && this.$slots.default();

		const {entries, triggerEvents, delayTriggerEvents, delayTriggerCancelEvents} = this.$props;

		return h(Tab, {
			...this.$props,
			entries: parseEntries(entries, slotChildren),
			triggerEvents: normalizeEvents(triggerEvents),
			delayTriggerEvents: normalizeEvents(delayTriggerEvents),
			delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents)
		});
	}
};

export default Index;
