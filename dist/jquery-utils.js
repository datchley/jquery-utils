/* global require, define */

// Class-like Properties
// Implementation of class-like properties for jQuery objects, allowing
// a given property to be manipulated like the class attribute using 
// methods similar to jQuery's class related methods.

!function (factory) {
    if (typeof exports == 'object') {
        // Node. Does not work with strict CommonJS
        factory(require('jquery'));
    } else if (typeof define == 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals 
        factory(jQuery);
    }
}(function($) {
    'use strict';
  
    $.fn.extend({

       /**
        * hasCProp - check if the class-like property has a value(s). 
        * @param cprop {string} - name of class-like property
        * @param [vals] {string} - space separated values to check for
        * @returns {boolean} - true if it has all the values, false otherwise
        */
        hasCProp: function(cprop, vals) {
            var _check = vals.split(/\s+/),
                _old = this.attr(cprop),
                value;

            for (var i=0, l=_check.length; i<l; i++) {
                value = _check[i];
                if (_old.indexOf(value) === -1) {
                    return false;
                }
            }
            return true;
        },

       /**
        * addCProp - add values to a class-like property of an element,
        * retaining existing property values.
        * @param cprop {string} - name of class-like property
        * @param [vals] {string} - space separated values to append to property
        * @returns {jQuery} - original jQuery object context
        */
        addCProp: function(cprop, vals) {
            if (!cprop) {
                throw Error('missing argument to $.addCProp');
            }
            var _old, 
                _add = vals.split(/\s+/);
            
            this.each(function() {
                _old = $(this).attr(cprop).split(/\s+/);
                for (var i=0, l = _add.length; i<l; i++) {
                    var value = _add[i];
                    if (_old.indexOf(value) === -1) {
                        _old.push(value);
                    }
                }
                $(this).attr(cprop, _old.join(' '));
            });
            return this;
        },

       /**
        * removeCProp - remove values from a class-like property of an element,
        * while retaining existing property values not in the list to be removed.
        * @param cprop {string} - name of class-like property
        * @param [vals] {string} - space separated values to remove from property
        * @returns {jQuery} - original jQuery object context
        */
        removeCProp: function(cprop, vals) {
            if (!cprop) {
                throw Error('missing argument to $.removeCProp');
            }
            var _old,
                _remove = vals.split(/\s+/);
            this.each(function() {
                _old = $(this).attr(cprop).split(/\s+/);
                for (var i=0, l = _remove.length; i<l; i++) {
                    var value = _remove[i],
                        idx = _old.indexOf(value);
                    if (idx > -1) {
                        _old.splice(idx, 1);
                    }
                }
                $(this).attr(cprop, _old.join(' '));
            });
            return this;
        },

       /**
        * toggleCProp - toggle an individual cprop value or
        * the full cprop attribute value.
        * @param cprop {string} - name of the class-like property
        * @param [values] {string} - the values to toggle, space separated
        * @param [state] {boolean} - flag to determine whether values should be added or removed
        * @return {jQuery} - original jQuery object context
        */
        toggleCProp: function(cprop, values, state) {
            var type = typeof values,
                reNoWS = /\S+/g;
            
            if (typeof state === 'boolean' && type === 'string') {
                return state ? this.addCProp(cprop, values) : this.removeCProp(cprop, values);
            }
            
            return this.each(function() {
                var $_this = $(this);
            
                if (type === "string") {
                    // Toggle individual cprop values
                    var i = 0,
                        cprops = values.match(reNoWS) || [],
                        cpropval;
            
                    while ((cpropval = cprops[i++])) {
                        // Check each cprop given, space separated list
                        if ( $_this.hasCProp(cprop, cpropval)) {
                            $_this.removeCProp(cprop, cpropval);
                        } else {
                            $_this.addCProp(cprop, cpropval);
                        }
                    }
                }
                else if (values === undefined || type === 'boolean') {
                    // Toggle entire cprop value
                    var cpropfull = $(this).attr(cprop);
                    if (cpropfull) {
                        // store the full value
                        $_this.data('__'+cprop+'__', cpropfull);
                    }
                    // toggle full value if it has a cprop, based on value
                    $_this.attr(cprop, (cpropfull || values === false) ? 
                        "" : 
                        $_this.data('__'+cprop+'__') || "");
                }
            });
        }
    });
});
;/* global require, define */

// DOM Utils
// Some DOM utilities to extend jQuery for common tasks

!function (factory) {
    if (typeof exports == 'object') {
        // Node. Does not work with strict CommonJS
        factory(require('jquery'));
    } else if (typeof define == 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals 
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
;/* global define, exports, module */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
 
    // Add entities to replace in HTML here
    var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        },

        // build matcher from entityMap
        reEntityMatch = new RegExp('[' + escapeRegExp(Object.keys(entityMap).join('')) + ']','g');
    
   /**
    * Escape meta characters in a string to be used in a regular expression
    * @param string {string} - the string to escape regexp meta characters in
    * @return {string} - escaped string
    */
    function escapeRegExp(string) {
        return string.replace(/[\/\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    // Allow "abc".escapeRegExp() on native string objects
    String.prototype.escapeRegExp = function() {
        return escapeRegExp(this.toString());
    };
    
   /**
    * Escape HTML markup in a string
    * @param string {string} - the string to escape 
    * @return {string} - escaped string
    */
    function escapeHtml(string) {
        return string.replace(reEntityMatch, function (s) {
            return entityMap[s];
        });
    }
    // Allow "abc".escapeHtml() on native string objects
    String.prototype.escapeHtml = function() {
        return escapeHtml(this);
    };
    
    // Assign global functions
    return {
        'escapeRegExp': escapeRegExp,
        'escapeHtml': escapeHtml
    };
 
}));
