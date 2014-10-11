/* global jasmine, describe, expect, it */
describe("String Utilities", function() {

    var chars = ["&","<",">",'"',"'","/"],
        escaped = ["&amp;","&lt;","&gt;",'&quot;','&#39;','&#x2F;'];

    jasmine.getEnv().addReporter(new jasmine.JSReporter2());

    it("provide a global set of functions", function() {
        expect(window.escapeRegExp).toBeDefined();
        expect(window.escapeHtml).toBeDefined();
    });
    it("provide methods on native String object", function() {
        expect(String.prototype.escapeRegExp).toBeDefined();
        expect(String.prototype.escapeHtml).toBeDefined();
    });
    it("escapeHtml() properly esacpes special characters", function() {
        var start = chars.join(''),
            result = escaped.join('');

        expect(window.escapeHtml(start)).toEqual(result);
        expect(start.escapeHtml()).toEqual(result);
    });
    it("escapeRegExp() properly esacpes meta characters", function() {
        var meta =  "/-[]{}()*+?.,^$",
            meta_escaped = "\\/\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\^\\$";

        expect(window.escapeRegExp(meta)).toEqual(meta_escaped);
        expect(meta.escapeRegExp()).toEqual(meta_escaped);
    });
});
