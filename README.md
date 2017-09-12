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

# Usage:
## Import VueTabber module
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

## Run application
Then just start the component:
```javascript
new Vue({
	el: '#app'
});
```

# Including CSS
By default, "vue-tabber" module do not have any CSS style applied, which means all tab pages are always visible on the page.
To hide non-active tab pages, just applying CSS by "inactive" class(controlled by property `pageItemInactiveClassName`) to hide them.

VueTabber provides default CSS styles if you don't want to make it yourself. It also provides default skin.
To use that, importing module `vue-tabber/with-css` instead of `vue-tabber`.
For global variable mode, referencing the '-with-css' bundle file.
