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
import 'vue-tabber';
```

*Import in commonjs environment*  
```javascript
require('vue-tabber');
```

*Import in AMD environment*  
```javascript
require(['vue-tabber']);
```

*Using global variable mode*  
Just importing vue-tabber by `<script>` tag.

## Prepare Template
Put tab information in the app or component's template like below:
```html
<div id="app">
	<vue-tabber>
		<vue-tabber-label key="optional-key-1">title 1</vue-tabber-label>
		<vue-tabber-panel>content of panel 1</vue-tabber-panel>
		<vue-tabber-panel>another content of panel 1</vue-tabber-panel>

		<vue-tabber-label key="optional-key-2">title 2</vue-tabber-label>
		<vue-tabber-panel>content of panel 2</vue-tabber-panel>
		<vue-tabber-panel><p>vue-tabber-panel tag is optional if wrapped by another tag.</p></vue-tabber-panel>
		<p>vue-tabber-panel tag is optional if wrapped by another tag.</p>
	</vue-tabber>
</div>
```
Both labels and panels can contain plain texts, regular HTML elements or Vue components.

Label items can have an optional key attribute, which can reduce DOM changes when items are dynamically changed.

## Run Application
Then just start the component:
```javascript
new Vue({
	el: '#app'
});
```

# Usage: implements render() manually for "runtime" Vue build
Since there is no template compiler in runtime build, we have to implement method `render()` on component manually who uses vue-tabber, including vue-tabber and any other HTML elements or components which should appear inside it.

If you are using Webpack for your project, maybe using `vue-loader` loader is a better solution for writing vue components. It will generate the final render() function from template for you.

Here is the example for rewriting the template into `render()` function:
```javascript
new Vue({
	el: '#app',
	render: function (createElement) {
		return createElement('vue-tabber', [
			createElement('vue-tabber-label', {key: 'optional-key-1'}, 'title 1'),
			createElement('vue-tabber-panel', 'content of panel 1'),
			createElement('vue-tabber-label', {key: 'optional-key-2'}, 'title 2'),
			createElement('vue-tabber-panel', 'content of panel 2')
		]);
	}
});
```

# vue-tabber/components module
The `vue-tabber/components` module provide methods for special environment usage.

## Register VueTabber components
For module environment, it is possible to use a specific build of vue, like `vue/dist/vue.runtime.esm`.
The VueTabber only registers related components to Vue from default `vue` module, which means `vue-tabber` component is not available on that special Vue.
It is possible to configure the alias for 'vue' to module system, see Vue.js official installation guide.
Another solution is to register VueTabber components explicitly, like below:
```javascript
import Vue from 'vue/dist/vue.esm';
import {registerTo} from 'vue-tabber';
registerTo(Vue);
```

## Get Component
Maybe you want to register VueTabber components locally, inside a single component, especially has global component names conflict with other libraries.
```javascript
import {LabelComponent, PanelComponent, TabberComponent} from 'vue-tabber';
new Vue({
	components: {
		LabelComponent,
		PanelComponent, 
		TabberComponent,
		// otherComponents...
	}
});
```

# Including CSS
vue-tabber provides default CSS styles if you don't want to make from scratch. Make sure CSS class name options are not customized.

## Importing by module
```javascript
import 'vue-tabber/src/css';
```

## Use standalone CSS file
Copying or referencing CSS files from `src/css/` directory.


## Vertical labels
To use vertical labels style from default CSS, set `tab-container-class` to 'tab-container-vert'.
Notice that this style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```html
<vue-tabber tab-container-class="tab-container-vert">
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

`header-label-container-class`  
Header label container CSS class. Default value is 'header-container'.

`footer-label-container-class`  
Footer label container CSS class. Default value is 'footer-container'.

`label-item-class`  
CSS class for bottom label item. Default value is 'label-item'.

`label-item-active-class`  
CSS class for active label item. Default value is 'label-active'.

`label-item-inactive-class`  
CSS class for inactive label item. Default value is 'label-inactive'.

### Panel
`panel-container-class`  
CSS class for panel container. Default value is 'panel-container'.

`panel-item-class`  
CSS class for panel item. Default value is 'panel-item'.

`panel-item-active-class`  
CSS class for active panel item. Default value is 'panel-active'.

`panel-item-inactive-class`  
CSS class for inactive panel item. Default value is 'panel-inactive'.
