/* global jasmine, describe, expect, it */
describe("String Utilities", function() {

    var chars = ["&","<",">",'"',"'","/"],
        escaped = ["&amp;","&lt;","&gt;",'&quot;','&#39;','&#x2F;'],
        // test URLs to parse
        urls = [
            "https://www.site.com",
            "http://local.www.site.com",
            "https://www.site.com:8080",
            "http://www.site.com/path/to/file",
            "http://www.site.com:8080/path/to/file",
            "https://www.site.com/path/to/file?no-cache=1&error=1",
            "http://www.site.com:8080/path/to/file#slide1",
            "https://www.site.com/path/to/file?no-cache=1&error=1#slide1",
        ],
        // Expected parsed URL results from above urls
        parsed_urls = [
            {   
                hash: undefined,
                host: "www.site.com",
                params: false,
                path: undefined,
                port: undefined,
                protocol: "https:",
                query: undefined,
                source: "https://www.site.com"
            },
            {   
                hash: undefined,
                host: "local.www.site.com",
                params: false,
                path: undefined,
                port: undefined,
                protocol: "http:",
                query: undefined,
                source: "http://local.www.site.com"
            },
            {   
                hash: undefined,
                host: "www.site.com",
                params: false,
                path: undefined,
                port: "8080",
                protocol: "https:",
                query: undefined,
                source: "https://www.site.com:8080"
            },
            {   
                hash: undefined,
                host: "www.site.com",
                params: false,
                path: "/path/to/file",
                port: undefined,
                protocol: "http:",
                query: undefined,
                source: "http://www.site.com/path/to/file"
            },
            {   
                hash: undefined,
                host: "www.site.com",
                params: false,
                path: "/path/to/file",
                port: "8080",
                protocol: "http:",
                query: undefined,
                source: "http://www.site.com:8080/path/to/file"
            },
            {   
                hash: undefined,
                host: "www.site.com",
                params: {
                    "no-cache": "1",
                    "error": "1"
                },
                path: "/path/to/file",
                port: undefined,
                protocol: "https:",
                query: "?no-cache=1&error=1",
                source: "https://www.site.com/path/to/file?no-cache=1&error=1"
            },
            {   
                hash: "#slide1",
                host: "www.site.com",
                params: false,
                path: "/path/to/file",
                port: "8080",
                protocol: "http:",
                query: undefined,
                source: "http://www.site.com:8080/path/to/file#slide1"
            },
            {   
                hash: "#slide1",
                host: "www.site.com",
                params: {
                    "no-cache": "1",
                    "error": "1"
                },
                path: "/path/to/file",
                port: undefined,
                protocol: "https:",
                query: "?no-cache=1&error=1",
                source: "https://www.site.com/path/to/file?no-cache=1&error=1#slide1"
            }
        ];

    jasmine.getEnv().addReporter(new jasmine.JSReporter2());

    it("provides methods on jQuery object", function() {
        expect($.escapeRegExp).toBeDefined();
        expect($.escapeHtml).toBeDefined();
        expect($.parseUrl).toBeDefined();
    });
    it("provide methods on native String object", function() {
        expect(String.prototype.escapeRegExp).toBeDefined();
        expect(String.prototype.escapeHtml).toBeDefined();
    });
    it("escapeHtml() properly esacpes special characters", function() {
        var start = chars.join(''),
            result = escaped.join('');

        expect($.escapeHtml(start)).toEqual(result);
        expect(start.escapeHtml()).toEqual(result);
    });
    it("escapeRegExp() properly esacpes meta characters", function() {
        var meta =  "/-[]{}()*+?.,^$",
            meta_escaped = "\\/\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\^\\$";

        expect($.escapeRegExp(meta)).toEqual(meta_escaped);
        expect(meta.escapeRegExp()).toEqual(meta_escaped);
    });
    it("parseUrl() properly parses url strings", function() {
        for (var i=0, l=urls.length; i<l; i++) {
            var parsed = $.parseUrl(urls[i]),
                expected = parsed_urls[i];
            expect(parsed).toEqual(expected);
        }
    });
});
