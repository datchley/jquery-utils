/* global require, define */

// Class-like Properties
// Implementation of class-like properties for jQuery objects, allowing
// a given property to be manipulated like the class attribute using 
// methods similar to jQuery's class related methods.

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
