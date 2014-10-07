/* global jasmine, describe, expect, it, beforeEach, afterEach, spyOnEvent, loadFixtures */
describe("DOM Utility Extension", function() {
    var $moveable, $container;

    // set fixture path
    jasmine.getFixtures().fixturesPath = 'test/fixtures';

    beforeEach(function() {
        loadFixtures('dom-fixtures.html');
        // Reset the element used for testing
        $moveable = $('.moveable');
        $container = $('.move-container');
        // $container.empty();
        // $moveable.prependTo('body');
    });

    it("should provide .moveTo() method", function() {
        expect($moveable.moveTo).toBeDefined();
        expect($.isFunction($moveable.moveTo)).toBe(true);
    });

    it("should allow moving 'before' an element", function() {
        $moveable.moveTo($container, 'before');
        var hasit = $container.prev('.moveable');
        expect(hasit.length).toEqual(1);
    });

    it("should allow moving 'after' an element", function() {
        $moveable.moveTo($container, 'after');
        var hasit = $container.next('.moveable');
        expect(hasit.length).toEqual(1);
    });

    it("should allow moving 'inside' an element", function() {
        $moveable.moveTo($container, 'inside');
        var hasit = $container.find('.moveable');
        expect(hasit.length).toEqual(1);
    });

    describe("should allow wrapping of moved element", function() {
        it("with an HTML string", function() {
            $moveable.moveTo($container, 'inside', '<div id="wrapper"></div>');
            var wrap = $moveable.parent('#wrapper');
            expect(wrap.length).toEqual(1);
        });
        it("with an Element string", function() {
            var wrapper = $('<div id="wrapper"></div>')[0];
            $moveable.moveTo($container, 'inside', wrapper);
            var wrap = $moveable.parent('#wrapper');
            expect(wrap.length).toEqual(1);
        });
        it("with an jQuery object", function() {
            var wrapper = $('<div id="wrapper"></div>');
            $moveable.moveTo($container, 'inside', wrapper);
            var wrap = $moveable.parent('#wrapper');
            expect(wrap.length).toEqual(1);
        });
    });

    describe("provide a 'DOMChanged' event", function() {
        var spyEvent, 
            count,
            data,
            handler = function(ev, params) {
                count++;
                data = params;
            };

        beforeEach(function() {
            count = 0;
            data = undefined;
            spyEvent = spyOnEvent(document, 'DOMChanged');
            $(document).on('DOMChanged', handler);
        });

        afterEach(function() {
            // remove DOMChanged handler after each spec
            $(document).off('DOMChanged', handler);
        });

        it("that should fire (once) when appending", function() {
            $moveable.appendTo($container);
            expect(spyEvent).toHaveBeenTriggered();
            expect(count).toEqual(1);
        });
        it("that should fire (once) when prepending", function() {
            $moveable.prependTo($container);
            expect(spyEvent).toHaveBeenTriggered();
            expect(count).toEqual(1);
        });
        it("that should fire (once) when inserting after", function() {
            $moveable.insertAfter($container);
            expect(spyEvent).toHaveBeenTriggered();
            expect(count).toEqual(1);
        });
        it("that should fire (once) when inserting before", function() {
            $moveable.insertBefore($container);
            expect(spyEvent).toHaveBeenTriggered();
            expect(count).toEqual(1);
        });
    });
});
