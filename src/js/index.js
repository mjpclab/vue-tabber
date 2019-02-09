import Vue from 'vue';
import registerLabelTo from './label/register';
import registerPageTo from './page/register';
import registerTabberTo from './tabber/register';

import LabelComponent from './label/component';
import PageComponent from './page/component';
import TabberComponent from './tabber/component';

function registerTo(Vue) {
	registerLabelTo(Vue);
	registerPageTo(Vue);
	return registerTabberTo(Vue);
}

const VueTabber = registerTo(Vue);
VueTabber.registerTo = registerTo;
VueTabber.LabelComponent = LabelComponent;
VueTabber.PageComponent = PageComponent;
VueTabber.TabberComponent = TabberComponent;

export default VueTabber;
