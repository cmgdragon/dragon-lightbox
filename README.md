# Dragon LightBox
A lightweight, responsive and accessible lightbox library made in typescript

- [Features](#features)  
- [Demo](#demo)
- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Containers](#containers)
	- [Identifying container items](#identifying-container-items)
- [Configuration](#configuration)
	- [Adding cofiguration](#adding-cofiguration)
- [API](#api)
	- [Create an instance](#create-an-instance)
	- [The instance object](#the-instance-object)
	- [Custom events](#custom-events)
	- [Binding](#binding)
- [Extend and build](#extend-and-build)

## Features
- About 6 KB gzipped
- No third party libraries required
- Support for Youtube, Vimeo and Daylimotion
- And any kind of embed content (iframes)
- Swipe effect on touch screens
- Just one HTTP request through CDN
- Custom API
- Group of different resources creation
- Keyboard usable

## Demo
https://cmgdragon.github.io/dragon-lightbox/ 

## Installation
#### CDN / Script
Add the following script

``<script src="https://cdn.jsdelivr.net/gh/cmgdragon/dragon-lightbox@latest/dist/dragon-lightbox.js"></script>``

at the end of the `<body>` tag of your html file.

Or you can download the bundle file located in the `dist` folder of this repository and include it in your project!

```html
<script src="dragon-lightbox.js"></script>
```

#### NPM
Execute `npm install dragon-lightbox`

and then include the javascript:

```javascript
require('dragon-lightbox')
```
Or, if using ES6 modules:
```javascript
import 'dragon-lightbox'
```

## Basic usage

For getting started, add the `data-dlightbox` attribute to any resource you want to convert into a lightbox

```html
<img data-dlightbox src="image.jpg" />
```
The plugin will automatically deduct what type of resource you are targeting based on the html tag or the resource extension.

You can also specify the resource passing it as a value in the `data-dlightbox` attribute
```html
<any-tag data-dlightbox="resource.mp4"></any-tag>
```

## Containers
You can create a lightbox container adding the `data-dlightbox-container` attribute to an element containig a list of resources

```html
<div data-dlightbox-container>
	<a href="image.jpg">Image1</a>
	<img src="image.jpg">
	<a data-dlightbox="https://www.youtube.com/watch?v=rHLwG3ioD4Y">Video</a>
	<img src="image.png">
</div>
```

### Identifying container items
During the instance creation, each resource automatically receives a `data-id` attribute with an **integer** value. You can also preset this attribute that is used for opening the lightbox programatically and [bind new html elements](#binding).


## Configuration
This plugin allows to modify the configuration for lightbox resources:

|  Option |  Default |  Description  |
| ------------ | ------------ | ------------ |
| `lazy` | true | if true, the resources only download when the user access it. Otherwise, the resource download automatically on page load |
| `fireevent` | "click" | it allows to define the event that will open the lightbox |
| `autoplay` | false | if true, videos and iframe videos will play automatically |
| `autoscale` | false | if true, the resources will fill all the available space on the screen. If you specify a number, the resources will mantain a maximum width of that number in pixels. If false, the resources will keep their original size  |
| `type` | undefined | You can explicitly define the type of elements of the lightbox. **TYPES:  `image`, `video`, `embed`**   (the "video" only refers to resources containing video extensions like .mp4.  Youtube videos are of type "embed") |
| `attributes` | undefined | you can pass HTML attributes to the lightbox that will be applied to all its resources |


### Adding cofiguration
Define the configurations with the prefix `data-{config}`.

```html
<div data-dlightbox-container  data-autoscale="350" data-lazy="false">
	<a data-autoscale="true" href="image.jpg">Image1</a>
	<img src="image.jpg" aria-label="Image 2">
</div>
```

| Considerations  |
| ------------ |
|  The configurations set in the container will apply for all its resources, but you can override each of them |
|  For the `attributes`, the plugin will take any HTML attribute for all resources and copy them to the corresponding lightbox resource  |

## API
A `dragonLightBox` object is exposed to the window object, with a mehotd and a property:

| Method  |  Description |
| ------------ | ------------ |
|  `create` | allows the creation of lightbox objects programmatically  |

| Property  |  Description |
| ------------ | ------------ |
|  `instances` | returns a map with the active lightbox instances  |


### Create an instance
To create a new lightbox programatically, use `dragonLightBox.create`.

#### The easy way
Use `dragonLightBox.create( resourceUrl )` , where `resourceUrl` is the url of the resource you want to show in a lightbox.
```javascript
const instance = dragonLightBox.create('path/to/your/resource.jpg')
```
[**This will return an instance object.**](#the-instance-object)

#### With config
You can also pass configuration as a second param:

```javascript
const instance = dragonLightBox.create('path/to/your/resource.jpg', { autoscale: true })
```
#### Create a container
If you want to create a lightbox container, use an array of resources, where each resource is also an array:
```javascript
const resources = [  ['path/to/your/resource1.jpg'], ['path/to/your/resource2.mp4'] ]
const instance = dragonLightBox.create(resources, { autoscale: true })
```

#### Add attributes
Now, if you want to add attributes to the resources, you must use an array of `[ recource, attributes ]`, where the attributes is an array of objects `{ name, value }`

|  Attribute | Description  |
| ------------ | ------------ |
| `name`  | the name of the attribute (e. g.: "aria-hidden")  |
| `value`  | the value for the attribute  |

```javascript
const attributes = [{ name: 'aria-hidden', value: true }, { name: 'any-other-attr', value: 'any' }]
const resources = [  ['path/to/your/resource1.jpg', attributes] ] //one or more
const instance = dragonLightBox.create(resources, { autoscale: true })
```

- **Set attributes for [overriding the configurations](#adding-cofiguration) in each resource!**

### The instance object
You can get the instance by saving it in a variable when created with the `dragonLightBox.create` or accessing it with the `dragonLightBox.instances.get( id )`

The instance provides the following methods and properties:

|  Method | Description   |
| ------------ | ------------ |
|  `open( number? )` | open the lightbox by its `data-id`. If no id provided, open the first one  |
|  `close()` | close the lightbox  |
|  `listen( listener , cb )` | add a custom event listener and executes the callback provided [(more info)](#custom-events)  |
|  `bind( elements )` | bind html elements to the instance [(more info)](#binding) |
|  `remove()` | remove the instance and all its bindings. It does not remove the html elements  |

|  Property | Description   |
| ------------ | ------------ |
|  `elements` | provides a list with the elements that the plugin will follow for generating the lightbox. If the instance has been created with the `dragonLightBox.create`, those elements will need to be [binded](#binding) if you want yo access them through the HTML   |
|  `bindings` | provides a list with all the instance bindings  |


### Custom events
These are a set of custom events that will fire when certain actions are performed in the lightbox:

|  Event | Description  |
| ------------ | ------------ |
| `dlightbox:open`  | fires when the lightbox has been opened  |
| `dlightbox:close`  | fires when the lightbox has been closed  |
| `dlightbox:change`  | fires when the lightbox switch to the next or previous resource (only for containers) |

The lightbox events provides a set of data that you can retrieve from the `event.detail` object:

|  Detail | Description  |
| ------------ | ------------ |
| `config`  | the lightbox configuration  |
| `count`  | the number of resources of the lightbox  |
| `id`  |  id of the instance |
| `elements`  | elements that the lightbox will follow for generating itself |
| `selectedBox()`  |  a function that returns an object with information with the current lightbox resource element. It provides its `attributes`, the `resourceUrl`, the `element` and its own `config` |

```javascript
const instance = dragonLightBox.instances.get(0);
instance.listen('dlightbox:open', ({detail}) => console.log(detail));
```

### Binding
To bind a lightbox resource means that you are linking the resource with an HTML element that will open that resource with a DOM event.

When you are creating lightboxes declarativelly with the `data-dlightbox` attribute, those elements are being binded to the lightbox automatically.

If you need more, you can bind new HTML elements to the lightbox instances, and assign a custom event that will open the lightbox.

For it, use the `bind( elements )`

##### Bind without fireevent
As a only parameter, you can pass a `querySelector` of the elements to be binded.

```javascript
const instance = dragonLightBox.instances.get(0);
instance.bind( document.querySelector('#toBind') )
```

| Considerations  |
| ------------ |
|  By default, a `click` event is registered. |
|  When a `click` event is registered, automatically adds a `keydown (Enter)` event to the same HTML elements  |
|  The number of elements to bind must be equal to the number of resources in the lightbox!  |


#### Bind with a fireevent
Optionally, you can specify the event to listen. In that case you need to provide an object `{ elements, fireevent }` to the `bind()` method:

```javascript
const instance = dragonLightBox.instances.get(0);
const instanceEvents = { elements: document.querySelector('#toBind'), fireevent: 'dblclick' }
instance.bind( instanceEvents )
```

#### Using the `data-id` for binding
The binding process will match those elements that have the same `data-id` with the `data-id` of the resources. If no matching `data-id` is provided to the HTML element, it will bind the elements in list order.

```javascript
//this lightbox resources with `data-id`  "1" and "2"...
const resources = [
	['resource1.jpg', { name: 'data-id', value: 1 }],
	['resource2.jpg', { name: 'data-id', value: 2 }]
] 
const instance = dragonLightBox.create(resources);
instance.bind( document.querySelectorAll('#binding > div') )
```
```html
<!-- ...will bind the `data-id` of the following elements -->
<div id="binding">
	<div data-id="2">Bind2</div>
	<div data-id="1">Bind1</div>
</div>
```

## Extend and build
If you are interested of extending the project, clone it and execute
- `npm run dev`

This will start the development environment, that uses the `index.html` file located in the root folder

For building the plugin for production, just hit
- `npm run build`

This will create an optimized file inside the `dist` folder

Finally, do not hesitate to **fork** / **report issues** if you want to contribute!
