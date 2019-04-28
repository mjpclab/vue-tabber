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
# Import Tab Component
## Import in ES6 module environment  
```javascript
import Tab from 'vue-tabber';
```

## Import in commonjs environment  
```javascript
const Tab = require('vue-tabber');
```

## Import in AMD environment
```javascript
require(['vue-tabber'], function(Tab) {
});
```

## Using global variable mode  
Just importing vue-tabber by `<script>` tag. Tab Component are under global variable `VueTabber`.

# Register Component
## Register as global component
```javascript
import Vue from 'vue';
import Tab from 'vue-tabber';

Vue.component('Tab', Tab);
Vue.component('TabLabel', Tab.Label);
Vue.component('TabPanel', Tab.Panel);
````

## Register as local component
```javascript
import Vue from 'vue';
import Tab from 'vue-tabber';

new Vue({
	components: {
		Tab: Tab,
		TabLabel: Tab.Label,
		TabPanel: Tab.Panel
	}
});
```

# Usage
## Template mode for "full" Vue build
Put tab information in the app or component's template like below:
```html
<div id="app">
	<tab>
		<tab-label key="optional-key-1">title 1</tab-label>
		<tab-panel>content of panel 1</tab-panel>
		<tab-panel>another content of panel 1</tab-panel>

		<tab-label key="optional-key-2">title 2</tab-label>
		<tab-panel>content of panel 2</tab-panel>
	</tab>
</div>
```
```javascript
new Vue({
	el: '#app'
});
```

Both labels and panels can contain plain texts, regular HTML elements or Vue components.

Label items can have an optional key attribute, which can reduce DOM changes when items are dynamically changed.
In some APIs, `key` can be used instead of `index` which represents a tab item position.

Continues multiple Panels are allowed, they are just belongs to the same closest Label. Panel element can be omitted if inside contents has another element to wrap them.

## Use .vue file format
If you have setup a packaging development environment(like Webpack, etc), and configured corresponding "loader" for process `.vue` file,
then usage may look like below: 
```vue
<template>
<tab>
	<tab-label key="optional-key-1">title 1</tab-label>
	<tab-panel>content of panel 1</tab-panel>

	<tab-label key="optional-key-2">title 2</tab-label>
	<tab-panel>content of panel 2</tab-panel>
</tab>
</template>

<script>
import Tab from 'vue-tabber';
export default {
	components: {
		Tab: Tab,
		TabLabel: Tab.Label,
		TabPanel: Tab.Panel
	}
}
</script>
```

## Implements render() manually for "runtime" Vue build
Since there is no template compiler in runtime build, we have to implement method `render()` on component manually who uses vue-tabber, including vue-tabber and any other HTML elements or components which should appear inside it.

Here is the example for rewriting the template into `render()` function:
```javascript
import Vue from 'vue';
import Tab from 'vue-tabber';

new Vue({
	el: '#app',
	render: function (createElement) {
		return createElement(Tab, [
			createElement(Tab.Label, {key: 'optional-key-1'}, 'title 1'),
			createElement(Tab.Panel, 'content of panel 1'),
			createElement(Tab.Label, {key: 'optional-key-2'}, 'title 2'),
			createElement(Tab.Panel, 'content of panel 2')
		]);
	}
});
```
If you have registered component, you can also use component id instead of component definition.

## Specify data structure instead of templating
For all 3 rendering methods above, you can specify tab data structure directly instead of filling inside labels and panels in the Tab. 
The limitation is label and panel content can only have strings, which means no elements could be put in.
Prop `entries` accepts the data structure. `label` represents label content, `panel` represents panel content, `key` is optional.
```html
<div id="app">
	<tab :entries="entries" />
</div>
```
```javascript
new Vue({
	el: '#app',
	data: {
		entries: [
			{label: 'label1', panel: 'content 1', key: 'tab1'},
			{label: 'label2', panel: 'content 2', key: 'tab2'}
		]
	}
});
```

## Controlling the active tab item
There are 2 ways to control the active tab item.

### Controlled by tabber component itself
The active tab item position is managed by tabber component itself.
Not specifying prop `activePosition` or its value is `undefined` or `null` will go this way. 

### Controlled by outside component
The active tab item position is managed by outside component.
Specifying a value which is neither `undefined` nor `null` to prop `activePosition`. if the tabber component wish to change it,
for example the end user clicked another tab item, event `updateActivePosition({index, key})` will be triggered to request
a change of active position.

# Including CSS
vue-tabber provides default CSS styles if you don't want to make from scratch. Make sure CSS class name options are not customized.

## Importing by module
```javascript
import 'vue-tabber/dist/theme/gray.css';
import 'vue-tabber/dist/theme/effect/fade.css'; // optional fade effect when switching, must load after theme
```

## Use standalone CSS file
Copying or referencing CSS files from `dist/theme/` directory.


## Vertical labels
To use vertical labels, specify property `mode` to "vertical".  
Notice that vertical style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```vue
<tab mode="vertical">
	......
</tab>
```

# Properties
You can specify options by setting properties on `<tab>` element.

## Behavior Properties
`entries`  
Specify tab entries you want to render as a tab, should be an array of rendering items, which has property `label`, `panel` and optional `key`.
`label` will be shown on tab label container. `panel` is the content of the tab. `key` is used to identify different tab labels and panels.

`keyboard-switch`  
Specify if active tab item could be switched by keyboard when label item has focus.
If enabled, end user could use arrow keys and Tab key to (request) switch active tab item. Defaults to `true`.

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

`active-position`  
The initial active index or key of the tab.

`v-on:switching(from:{index, key}, to:{index, key})`  
A `switching` event will be emitted with parameters `oldIndex` and `newIndex` when switching to another panel item.
Subscribe this event if you want to know a switching is performed as early as possible.

`v-on:switched(from:{index, key}, to:{index, key})`  
A `switched` event will be emitted with parameters `oldIndex` and `newIndex` when switched to another panel item.
Subscribe this event if you want to do some work based on result of switching(e.g. get the height of the component).

`v-on:updateActivePosition({index, key})`  
An `updateActivePosition` event will be emitted with new position `{index, key}` when request to change active position.

## UI Properties
### Tab
`mode`  
Specify label container layout. Can be `horizontal` (default) or `vertical`.

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
