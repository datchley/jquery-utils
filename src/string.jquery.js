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

    /**
     * parseUrl -  parse the current window url or a passed in url and
     * return an object that breaks the url down into its constituent parts,
     * including giving access to any query params
     * @param url=window.location.href {string} - the url to parse
     * @return  {object} - object with parts of url accessible via property keys
     */
    function parseUrl(url) {
        var _url = (url || window.location.href).match(/^(?:(https?:)\/\/)?([^\?\#\/\:]+)(?::(\d+))?([^\?\#]+)?(\?[^#]+)?(#[^\s]*)?$/),
            params = _url[5] || false;

        if (!_url.length) {
            // couldn't parse url string
            return false;
        }

        if (params && !/^$/.test(params)) {
            var pairs = params.replace(/^\?/,'').split('&');
            params = {};
            // console.log("pairs=%o", pairs);
            for (var i=0, l=pairs.length; i<l; i++) {
                var keyval = pairs[i].split('=');
                params[keyval[0]] = keyval[1];
            }
        }
        return {
            source: url,
            protocol: _url[1],
            host: _url[2],
            port: _url[3],
            path: _url[4],
            query: _url[5],
            hash: _url[6],
            params: params
        };
    }


    // Extend jQuery with utility methods
    $.extend({
        escapeHtml: escapeHtml,
        escapeRegExp: escapeRegExp,
        parseUrl: parseUrl
    });
}));
