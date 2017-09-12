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
	> .page-container
		> .page-item
		> .page-item
		> .page-item
		> .page-item
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
		<vue-tabber-label>title 1</vue-tabber-label>
		<vue-tabber-page>content of page 1</vue-tabber-page>

		<vue-tabber-label>title 2</vue-tabber-label>
		<vue-tabber-page>content of page 2</vue-tabber-page>
	</vue-tabber>
</div>
```
Both titles and pages can contain plain texts, regular HTML elements or Vue components.

## Run Application
Then just start the component:
```javascript
new Vue({
	el: '#app'
});
```

# Usage: implements render() manually for "runtime" Vue build
Since there is no template compiler in runtime build, we have to implement method `render()` on component manually who uses vue-tabber, including vue-tabber and any other HTML elements or components which should appear inside it.

If you are using Webpack for your project, maybe using `vue-loader` loader is a better solution for writing vue components. It will generate the final render() function for you.

Here is the example for rewriting the template to `render()` function:
```javascript
new Vue({
	el: '#app',
	render: function (createElement) {
		return createElement('vue-tabber', [
			createElement('vue-tabber-label', 'title 1'),
			createElement('vue-tabber-page', 'content of page 1'),
			createElement('vue-tabber-label', 'title 2'),
			createElement('vue-tabber-page', 'content of page 2')
		]);
	}
});
```

# Including CSS
By default, "vue-tabber" module do not have any CSS style applied, which means all tab pages are always visible on the page.
To hide non-active tab pages, just applying CSS by "inactive" class(controlled by property `pageItemInactiveClassName`) to hide them.

VueTabber provides default CSS styles if you don't want to make it yourself. It also provides default skin.
To use that, importing module `vue-tabber/with-css` instead of `vue-tabber`.
For global variable mode, referencing the '-with-css' bundle file.

# Properties
You can specify options by setting properties on `<react-tabber>` element.

## Behavior Properties
`trigger-events`  
Determine the types of events triggered on label-item that will make the page-item switched.
Default value is `click`.

`delay-trigger-events`  
Specify events on label-item that will trigger page switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delay-trigger-cancel-events`  
Specify events on label-item that will cancel delay switching.

`delay-trigger-latency`  
Specify how long (milliseconds) need to wait before trigger the delayed switching events.

`active-index`  
The default initial active index of the tab. Will be ignored if it can get value from `statusFieldSelector` or `statusHashTemplate`.

## UI Properties
### Tab
`tab-container-class`  
CSS class for tab container.

### Label

`label-container-class`  
CSS class for label container.

`show-top-label-container`  
Show label-container on top of the tab.

`show-bottom-label-container`  
Show label-container on bottom of the tab.

`top-label-container-class`  
CSS class for top label container.

`bottom-label-container-class`  
CSS class for bottom label container.

`label-item-class`  
CSS class for bottom label item.

`label-item-active-class`  
CSS class for active label item.

`label-item-inactive-class`  
CSS class for inactive label item.

### Page
`page-container-class`  
CSS class for page container.

`page-item-class`  
CSS class for page item.

`page-item-active-class`  
CSS class for active page item.

`page-item-inactive-class`  
CSS class for inactive page item.
