# vue-tabber
A Vue.js Tab sheet component.

# Generated Html Structure
```
.tab-container
	> .label-container
		> .label-item
		> .label-item
		> .label-item
		> .label-item
		> ...
	> .panel-container
		> .panel-item
		> .panel-item
		> .panel-item
		> .panel-item
		> ...
```

# Usage: template mode for "full" Vue build
## Import VueTabber Module
*Import in ES6 module environment*  
```javascript
import {Tab, TabLabel, TabPanel} from 'vue-tabber';
```

*Import in commonjs environment*  
```javascript
const {Tab, TabLabel, TabPanel} = require('vue-tabber');
```

*Import in AMD environment*  
```javascript
require(['vue-tabber'], function(VueTabber){
	// VueTabber.Tabber
	// VueTabber.TabberLabel
	// VueTabber.TabberPanel
});
```

*Using global variable mode*  
Just importing vue-tabber by `<script>` tag. Components are under global variable `VueTabber`.

## Prepare Template
Put tab information in the app or component's template like below:
```html
<div id="app">
	<tab>
		<tab-label key="optional-key-1">title 1</tab-label>
		<tab-panel>content of panel 1</tab-panel>
		<tab-panel>another content of panel 1</tab-panel>

		<tab-label key="optional-key-2">title 2</tab-label>
		<tab-panel>content of panel 2</tab-panel>
		<tab-panel><p>tab-panel tag is optional if wrapped by another tag.</p></tab-panel>
		<p>tab-panel tag is optional if wrapped by another tag.</p>
	</tab>
</div>
```
Both labels and panels can contain plain texts, regular HTML elements or Vue components.

Label items can have an optional key attribute, which can reduce DOM changes when items are dynamically changed.

## Register Components and Run Application
*Register to global*
```javascript
import Vue from 'vue';
import {Tab, TabLabel, TabPanel} from 'vue-tabber';
Vue.component('Tab', Tab);
Vue.component('TabLabel', TabLabel);
Vue.component('TabPanel', TabPanel);

new Vue({
	el: '#app'
});
```

*Register to local component*
```javascript
import Vue from 'vue';
import {Tab, TabLabel, TabPanel} from 'vue-tabber';
new Vue({
	components: {
		Tab,
		TabLabel,
		TabPanel
	}
});
```

# Usage: implements render() manually for "runtime" Vue build
Since there is no template compiler in runtime build, we have to implement method `render()` on component manually who uses vue-tabber, including vue-tabber and any other HTML elements or components which should appear inside it.

If you are using Webpack for your project, maybe using `vue-loader` loader is a better solution for writing vue components. It will generate the final render() function from template for you.

Here is the example for rewriting the template into `render()` function:
```javascript
import Vue from 'vue';
import {Tab, TabLabel, TabPanel} from 'vue-tabber';
new Vue({
	el: '#app',
	render: function (createElement) {
		return createElement(Tab, [
			createElement(TabLabel, {key: 'optional-key-1'}, 'title 1'),
			createElement(TabPanel, 'content of panel 1'),
			createElement(TabLabel, {key: 'optional-key-2'}, 'title 2'),
			createElement(TabPanel, 'content of panel 2')
		]);
	}
});
```

# Including CSS
vue-tabber provides default CSS styles if you don't want to make from scratch. Make sure CSS class name options are not customized.

## Importing by module
```javascript
import 'vue-tabber/src/js/theme/gray';
import 'vue-tabber/src/js/theme/effect/fade'; // optional fade effect when switching, must load after theme
```

## Use standalone CSS file
Copying or referencing CSS files from `dist/theme/` directory.


## Vertical labels
To use vertical labels, specify property `mode` to "vertical".  
Notice that vertical style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.```html
```vue
<vue-tabber mode="vertical">
	......
</vue-tabber>
```

# Properties
You can specify options by setting properties on `<vue-tabber>` element.

## Behavior Properties
`trigger-events`  
Determine the types of events triggered on label-item that will make the panel-item switched.
Default value is `click`.

`delay-trigger-events`  
Specify events on label-item that will trigger panel switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delay-trigger-cancel-events`  
Specify events on label-item that will cancel delay switching.

`delay-trigger-latency`  
Specify how long (in milliseconds) need to wait before trigger the delayed switching events.

`active-index`  
The initial active index of the tab.
There are two ways to get informed of current index changed. Subscribing event `switching` or prop update of `activeIndex`

`switching(oldIndex, newIndex)`  
A `switching` event will be emitted with parameters `oldIndex` and `newIndex` when switching to another panel item.
Subscribe this event if you want to know a switching is performed as early as possible.

`switched(oldIndex, newIndex)`  
A `switched` event will be emitted with parameters `oldIndex` and `newIndex` when switched to another panel item.
Subscribe this event if you want to do some work based on result of switching(e.g. get the height of the component).

`update:activeIndex(newIndex)`  
An `update:activeIndex` event will be emitted with parameter `newIndex` when switched to another panel item.
This is convenient for prop binding with `.sync` modifier:
```html
<div id="app">
	<vue-tabber :active-index.sync="index">
		<!-- ... -->
	</vue-tabber>
</div>
```
```javascript
new Vue({
	el: '#app',
	data: {
		index: 0
	}
});
```

## UI Properties
### Tab
`tab-container-class`  
CSS class for tab container. Default value is 'tab-container'.

### Label

`label-container-class`  
CSS class for label container. Default value is 'label-container'.

`show-header-label-container`  
If show label container before tab panel. Default value is true.

`show-footer-label-container`  
If show label container after tab panel. Default value is false.

`label-item-class`  
CSS class for bottom label item. Default value is 'label-item'.

### Panel
`panel-container-class`  
CSS class for panel container. Default value is 'panel-container'.

`panel-item-class`  
CSS class for panel item. Default value is 'panel-item'.
