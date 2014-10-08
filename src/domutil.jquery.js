/* global require, define */

// DOM Utils
// Some DOM utilities to extend jQuery for common tasks

!function (factory) {
    if (typeof exports == 'object') {
        factory(require('jquery'));
    } else if (typeof define == 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    
   /**
    * after - AOP method to fire a function after an existing
    * function already defined in jQuery's $.fn environment.
    * @param method {string} - the name of the jQuery method 
    * @param fn {function} - the function to execute 'after' the jQuery method
    * @return {jQuery} - the standard context object of the call
    */
    function after(method, fn) {
        var _orig = $.fn[method];
        if (fn && _orig) {
            $.fn[method] = function() {
                var args = [].slice.call(arguments),
                    results;
                results = _orig.apply(this, args);
                fn.apply(this, args);
                return results;
            };
        }
    }
  
   /**
    * fireDOMChanged - fires a 'DOMChanged' event on the element
    * passing in an event data object denoting the type of method
    * called originally that triggered the event.
    * @param el {jQuery|selector} - the element to trigger the event on
    * @param type {string} - the original method name called that triggered the event
    * @return {jQuery} - object the event is fired on
    */
    function fireDOMChanged(el, method) {
        return $(el).trigger('DOMChanged', { 'method': method });
    }
  
    // jQuery manipulation methods to augment 
    var hooks = [
        'append', 
        'before', 
        'prepend', 
        'after', 
        'html', 
        'remove', 
        'empty'
    ];
  
    // Wrap each original jQuery method to call our fireDOMChanged() 
    // method after executing, passing the original method name
    hooks.forEach(function(hook) {
        after(hook, function() {
            return fireDOMChanged(this, hook);
        });
    });
  
    $.extend({
       /**
        * isElement - Check if an object is a DOM Node/Element
        * @param obj {mixed} - the object to check
        * @return {boolean} - true if obj is a DOM Element
        */
        isElement: function(obj) {
            try {
                return obj instanceof HTMLElement;
            } catch(e) {
                return (typeof obj === "object") &&
                    (obj['nodeType'] && obj.nodeType === 1) && 
                    (obj['style'] && typeof obj.style === "object");
            }
        }
    });

    $.fn.extend({

       /**
        * moveTo - move the element to another element, it's positioning
        * determined by the location passed in, either 'before', 'inside' 
        * or 'after'.
        * @param el {Selector|jQuery|HTML|Element} - the target element to move to
        * @param location {string} - one of inside, before or after
        * @param [wrap=undefined] {Selector|HTML|Element|jQuery} - optionally wrap the moved elements 
        * @return {jQuery} the original context
        */
        moveTo: function(el, location, wrap) {
            var mmap = {
                    'before': 'insertBefore',
                    'after': 'insertAfter',
                    'inside': 'appendTo'
                },
                method = mmap[location],
                target = el,
                source = this.detach();
        
            // console.log(">> typeof wrap = ", (typeof wrap));
            return (wrap && (wrap.jquery || jQuery.isElement(wrap) || typeof wrap === 'string')) 
                ? source[method](target).wrapAll(wrap)
                : source[method](target);
        }
    });
});
