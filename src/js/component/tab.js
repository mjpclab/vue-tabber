import parseEntries from '../feature/parse-entries';
import TabContainer from './tab-container';
import {TabPropsDefinition} from '../utility/props-definition';

const Tab = {
	name: 'Tab',
	props: TabPropsDefinition,
	render(createElement) {
		const slotChildren = this.$slots.default;
		if (!slotChildren || !slotChildren.length) {
			return null;
		}

		const entries = parseEntries(slotChildren);

		return createElement(TabContainer, {
			props: {
				...this.$props,
				entries
			}
		});
	}
};

export default Tab;
