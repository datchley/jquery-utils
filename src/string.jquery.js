/* global define, exports, module */
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
    this.escapeRegExp = escapeRegExp;
    this.escapeHtml = escapeHtml;
 
}));
