import Vue from 'vue';
import registerLabelTo from './label/register';
import registerPanelTo from './panel/register';
import registerTabberTo from './tabber/register';

import LabelComponent from './label/component';
import PanelComponent from './panel/component';
import TabberComponent from './tabber/component';

function registerTo(Vue) {
	registerLabelTo(Vue);
	registerPanelTo(Vue);
	return registerTabberTo(Vue);
}

const VueTabber = registerTo(Vue);
VueTabber.registerTo = registerTo;
VueTabber.LabelComponent = LabelComponent;
VueTabber.PanelComponent = PanelComponent;
VueTabber.TabberComponent = TabberComponent;

export default VueTabber;
