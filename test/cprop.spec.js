/* global describe, expect, it, beforeEach, loadFixtures */
describe("Class-like Properties", function() {
    var $elm;

    beforeEach(function() {
        // Reset the element used for testing
        loadFixtures('dom-fixtures.html');
        $elm = $('#cprop-test');
        $elm.attr('test-prop', 'a b c');
    });

    it("should allow checking for cprop value", function() {
        expect($elm.hasCProp('test-prop', 'a')).toBe(true);
        expect($elm.hasCProp('test-prop', 'd')).toBe(false);
    });

    it("should allow for adding cprop values (single & multiple)", function() {
        $elm.addCProp('test-prop', 'd');
        $elm.addCProp('test-prop', 'e f');
        expect($elm.hasCProp('test-prop', 'd')).toBe(true);
        expect($elm.hasCProp('test-prop', 'e f')).toBe(true);
    });

    it("should allow for removing cprop values (single & multiple)", function() {
        $elm.removeCProp('test-prop', 'a');
        expect($elm.hasCProp('test-prop', 'a')).toBe(false);
        $elm.removeCProp('test-prop', 'b c');
        expect($elm.hasCProp('test-prop', 'b c')).toBe(false);
    });

    it("should allow for toggling of cprop values", function() {
        // entire cprop value
        $elm.toggleCProp('test-prop');
        expect($elm.attr('test-prop')).toEqual("");
        $elm.toggleCProp('test-prop');
        expect($elm.attr('test-prop')).toEqual("a b c");

        // singel cprop value
        $elm.toggleCProp('test-prop', 'b');
        expect($elm.attr('test-prop')).toEqual("a c");
        $elm.toggleCProp('test-prop', 'b');
        expect($elm.attr('test-prop')).toEqual("a c b");
    });

    it("should allow for chaining of methods", function() {
        var has_props = 'a b d f',
            hasnt_props = 'c e';

        $elm.toggleCProp('test-prop', 'c')
             .addCProp('test-prop', 'd e f')
             .removeCProp('test-prop', 'e');
        expect($elm.hasCProp('test-prop', has_props)).toBe(true);
        expect($elm.hasCProp('test-prop', hasnt_props)).toBe(false);
    });
});
