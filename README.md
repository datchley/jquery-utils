# jQuery Utils

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

  Where _property_name_ is the string name of the custom property or attribute
  and _value_ is a string of space separated names to check against.

+ **$.addCProp(property_name, value)**
 
  Where _property_name_ is the string name of the custom property or attribute
  and _value_ is a string of space separated names to add (append).
  
+ **$.removeCProp(property_name, value)**

  Where _property_name_ is the name of the custom property or attribute
  and _value_ is a string of space separated names to remove.
  
+ **$.toggleCProp(property_name [, value, flag])**

  Where _property_name_ is the string name of the custom property or attribute
  and _value_ is an optional, space separated string of names to toggle. If _value_
  is not passed, `toggleCProp()` will toggle the entire value of the property.
  If _flag_ is passed, it should be a boolean value determining whether the 
  property value is added (_true_) or removed (_false_).
  
  
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

+ **$.moveTo(container, location [, wrapper])**
 
  Move the element to the given _container_, which can be an HTML Element, query 
  selector string or jQuery object. The _location_ determines where in relation
  to the _container_ the element is moved, one of `inside`, `after` or `before`.
  If an optional _wrapper_ is passed, it should be an HTML Element, jQuery object
  or HTML string to use as a wrapping around the element once it has been moved.

+ **DOMChanged** Event

  The `DOMChanged` event is triggered when using any of the jQuery DOM manipulation
  methods that remove or place an element.  The type of method is passed in a data
  object as a parameter, ie., `{ 'method': 'append' }`.
  

