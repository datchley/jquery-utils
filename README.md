# jQuery Utils  
[![Build Status](https://travis-ci.org/datchley/jquery-utils.svg?branch=master)](https://travis-ci.org/datchley/jquery-utils)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/datchley.svg)](https://saucelabs.com/u/datchley)

Supports jQuery **1.8.x** to latest **1.11.x**

This is a collection of jQuery extensions that provide for a number of
actions that I repeat often in jQuery based apps; or have been useful
things that were needed that would probably benefit the jQuery user 
community at some point.

Though some of the concepts are mine; a number were the idea of a co-worker,
Tom Bremer.

You can install the modules together or separately, based on need. There are
currently two main extensions:

+ Class-like Properties extension
+ DOM Utilities for manipulation

## Class-like Properties
This extension lets you treat an attribute's value as a collection of names/strings, 
just like the 'class' attribute. 

For example, given a custom attribute called `test-prop`, you can do the following:

```html
<div  id="my-element" test-prop="a b c"></div>
<script>
    var $elm = $('#my-element');

    // Check for cprop values
    if ($elm.hasCProp('test-prop', 'a')) {
        // Append cprop values
        $elm.addCProp('test-prop', 'd e f');
    }
    else {
        if ($elm.hasCProp('test-prop', 'x y x')) {
            // Remove cprop values
            $elm.removeCProp('test-prop', 'x');
        }
    }

    // toggle a cprop value
    $(document).on('click', function() {
        $elm.toggleCProp('test-prop', 'b');
    });

</script>
```

+ **$.hasCProp(property_name, value)**

  Check if the custom property name _property_name_ has any of the names
  contained in value.
  - **property_name** `{string}` - is the string name of the custom property or attribute
  - **value** `{string}` - is a string of space separated names to check against.

+ **$.addCProp(property_name, value)**
 
  Append the names contained in _values_ to the custom property _property_name_. Will not
  duplicate if already exists.
  - **property_name** `{string}` - is the string name of the custom property or attribute
  - **value** `{string}` - is a string of space separated names to check against.
  
+ **$.removeCProp(property_name, value)**

  Remove the names contained in _values_ from the custom property _property_name_.
  - **property_name** `{string}` - is the string name of the custom property or attribute
  - **value** `{string}` - is a string of space separated names to check against.
  
+ **$.toggleCProp(property_name [, value, flag])**

  Add or remove one or more names from the value of the _property_name_ custom property for each 
  element in the set of matched elements, depending on either the name's presence or the value of the flag argument.
  - **property_name** `{string}` - is the string name of the custom property or attribute
  - **value** `{string}` - is a string of space separated names to add or remove
  - **flag** `{boolean}` - a boolean value determining whether the names in _value_ are added (_true_)
    or removed (_false).
  
  
## DOM Utilities
Some useful extensions for manipulating and managing the DOM.

This extension provides:
+ $.moveTo() - for moving elements to another element
+ $.isElement() - to check if objects are HTMLElements or DOMNodes
+ `DOMChanged` event - triggered when using jQuery DOM manipulation methods

For example:

```html
<div id="m1" class="moveable">Item</div>
<div id="m2" class="moveable">Item</div>
<div id="m3" class="moveable">Item</div>
<div id="container"></div>

<script>
    var locations = ['inside','before','after'],
        $container = $('#container'),
        $moveables = $('.moveable'),
        i = 0;

    $moveables.each(function() {
        if ($.isElement(this)) {
            $(this).moveTo($container, locations[i++]);
        }
    });
</script>
```
+ **$.isElement(object)**

  Retruns _true_ if the _object_ passed in is an HTMLElement or DOM Node. Returns
  _false_ otherwise.
  - **object** `{mixed}` - the object to test

+ **$.moveTo(container, location [, wrapper])**
 
  Move every element in the set of matched elements in relation to the target
  _container_, based on the passed _location_ and optionally wrapped by _wrapper_.
  - **container** `{Selector|HTML|Element|jQuery}` - the target element in or around
    which the elements will be moved.
  - **location** `{string}` - one of `inside`, to move the elements inside the target
    as the first child, `after` to move them directly after the target,  or `before` 
    to move them directly before the target container.
  - **wrapper** `{Selector|HTML|Element|jQuery}` - optional wrapper element to wrap
    all the match elements after they are moved.

+ **DOMChanged** Event

  The `DOMChanged` event is triggered when using any of the jQuery DOM manipulation
  methods that remove or place an element.  The type of method is passed in a data
  object as a parameter, ie., `{ 'method': 'append' }`.
  

