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

## DOM Utilities
Some useful extensions for manipulating and managing the DOM.

This extension provides:
    + $.moveTo() - for moving elements to another element
    + $.isElement() - to check if objects are HTMLElements or DOMNodes
    + `DOMChanged` event - triggered when using jQuery DOM manipulation methods

