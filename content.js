var e, h = 6,
    k, m = null,
    n;
try {
    k = chrome.runtime.connect({
        name: "3"
    }), k.onMessage.addListener(function(a) {
        4 == a.type && ("undefined" == a.profile && window.location.reload(), p(a.profile))
    }), k.postMessage({
        type: "3"
    }), k.onDisconnect.addListener(function() {})
} catch (q) {}
if (!k) {
    throw "port not found"
}
r();

function s() {
    var a;
    a = "(" +
    function() {
        eval(function(a, b, c, g, d, l) {
            d = function(a) {
                return (a < b ? "" : d(parseInt(a / b))) + (35 < (a %= b) ? String.fromCharCode(a + 29) : a.toString(36))
            };
            if (!"".replace(/^/, String)) {
                for (; c--;) {
                    l[d(c)] = g[c] || d(c)
                }
                g = [function(a) {
                    return l[a]
                }];
                d = function() {
                    return "\\w+"
                };
                c = 1
            }
            for (; c--;) {
                g[c] && (a = a.replace(RegExp("\\b" + d(c) + "\\b", "g"), g[c]))
            }
            return a
        }('11 e\x3d["\\F\\q\\D\\z\\y\\s\\G\\m\\F\\q\\X\\z\\p\\m\\y\\s\\Y\\k\\g\\G\\g\\M\\U\\k\\O\\i\\C\\D\\z\\O\\m\\F\\q\\9\\z\\Z\\q\\X\\k\\g\\10\\g\\M\\C\\g\\j\\g\\12\\O\\E\\i\\m\\y\\s\\V\\k\\9\\i\\E\\i\\m\\y\\s\\v\\k\\g\\G\\g\\M\\U\\k\\i\\C\\o\\q\\D\\E\\i\\m","\\b","\\I\\H\\x\\h\\a","\\j\\B\\o\\t\\P\\9\\f\\a\\b\\L\\p\\n\\b\\d\\d\\d\\d\\a\\b\\a\\h\\a\\x\\9\\b\\a\\b\\o\\9\\b\\v\\t\\f\\o\\a\\h\\B\\f\\b\\f\\9\\R\\b\\d\\d\\j\\9\\v\\h\\f\\9\\14\\9\\a\\a\\9\\n\\d\\d\\b\\b\\1d\\t\\I\\a\\B\\P\\Q\\L\\9\\f\\a\\b\\j\\h\\I\\H\\p\\a\\o\\1e\\Q\\L\\9\\f\\a\\b\\n\\9\\a\\t\\n\\f\\b\\j\\9\\a\\p\\h\\x\\b\\b\\d\\d\\j\\9\\v\\h\\f\\9\\13\\9\\a\\a\\9\\n\\d\\d","\\n\\9\\H\\x\\p\\o\\9","","\\W\\R\\1b","\\W\\V","\\15"];1c(A(w,J,c,r,l,N){l\x3dA(c){u c.K(17)};T(!e[5][e[4]](/^/,18)){S(c--){N[c.K(J)]\x3dr[c]||c.K(J)};r\x3d[A(l){u N[l]}];l\x3dA(){u e[6]};c\x3d1};S(c--){T(r[c]){w\x3dw[e[4]](1a 19(e[7]+l(c)+e[7],e[8]),r[c])}};u w}(e[0],16,16,e[3][e[2]](e[1]),0,{}));', 62, 77, "         x65 x74 x7C _0xdb7fx3 x5F _0x4b27 x6E x22 x69 x29 x64 x28 _0xdb7fx5 x3B x72 x63 x61 x20 _0xdb7fx4 x2E x75 return x66 _0xdb7fx1 x6C x30 x3D function x6F x7B x32 x7D x31 x33 x70 x73 _0xdb7fx2 toString x76 x2C _0xdb7fx6 x34 x6D x45 x77 while if x36 x62 x5C x35 x38 x37 x39 var x3A x47 x53 x67  36 String RegExp new x2B eval x43 x68".split(" "), 0, {}))
    } + ")()";
    var b = document.createElement("script");
    b.appendChild(document.createTextNode(a));
    (document.head || document.documentElement).appendChild(b);
    b.parentNode.removeChild(b)
}
function r() {
    var a;
    a = function() {};
    a = "(" +
    function() {
        eval(function(a, b, c, g, d, l) {
            d = function(a) {
                return (a < b ? "" : d(parseInt(a / b))) + (35 < (a %= b) ? String.fromCharCode(a + 29) : a.toString(36))
            };
            if (!"".replace(/^/, String)) {
                for (; c--;) {
                    l[d(c)] = g[c] || d(c)
                }
                g = [function(a) {
                    return l[a]
                }];
                d = function() {
                    return "\\w+"
                };
                c = 1
            }
            for (; c--;) {
                g[c] && (a = a.replace(RegExp("\\b" + d(c) + "\\b", "g"), g[c]))
            }
            return a
        }('1i h\x3d["\\K\\q\\U\\A\\s\\t\\y\\p\\H\\i\\d\\m\\d\\Q\\Z\\i\\c\\f\\C\\K\\q\\J\\A\\Y\\q\\U\\i\\d\\1d\\d\\Q\\C\\d\\B\\d\\19\\c\\x\\f\\t\\y\\p\\M\\i\\J\\f\\x\\f\\t\\y\\p\\P\\i\\d\\m\\d\\Q\\Z\\i\\f\\C\\K\\q\\J\\A\\Y\\q\\U\\i\\d\\1a\\d\\f\\t\\y\\p\\M\\i\\J\\f\\t\\K\\q\\c\\t\\e\\C\\c\\A\\X\\p\\j\\i\\d\\n\\n\\n\\N\\d\\f\\t\\X\\p\\r\\i\\d\\n\\n\\n\\N\\d\\f\\x\\u\\i\\9\\f\\C\\c\\A\\y\\p\\V\\i\\d\\n\\n\\n\\N\\d\\f\\p\\1m\\x\\l\\q\\c\\x\\f","\\a","\\G\\W\\u\\l\\b","\\s\\j\\c\\F\\r\\9\\e\\b\\a\\9\\w\\9\\e\\b\\a\\w\\m\\k\\a\\c\\j\\j\\V\\l\\9\\G\\a\\c\\9\\a\\H\\F\\e\\c\\b\\l\\j\\e\\a\\e\\9\\14\\a\\a\\a\\u\\j\\c\\m\\u\\10\\b\\j\\k\\m\\B\\9\\a\\c\\j\\j\\V\\l\\9\\a\\s\\l\\G\\W\\m\\b\\c\\P\\O\\w\\9\\e\\b\\a\\a\\1j\\F\\G\\b\\j\\r\\O\\w\\9\\e\\b\\a\\a\\o\\o\\s\\9\\H\\l\\e\\9\\10\\9\\b\\b\\9\\k\\o\\o\\a\\s\\9\\b\\m\\l\\u\\a\\o\\o\\s\\9\\H\\l\\e\\9\\17\\9\\b\\b\\9\\k\\o\\o\\a\\k\\9\\b\\F\\k\\e\\a\\l\\e\\e\\9\\k\\1h\\9\\1g\\b\\a\\B\\9\\b\\O\\u\\9\\r\\9\\e\\b\\1f\\11\\S\\s\\a\\c\\m\\b\\c\\P\\a\\k\\9\\r\\j\\w\\9\\S\\b\\9\\r\\a\\b\\k\\11\\a\\B\\9\\b\\S\\b\\9\\r","\\k\\9\\W\\u\\m\\c\\9","","\\16\\14\\1l","\\16\\M","\\B"];1k(E(D,L,g,z,v,R){v\x3dE(g){I g.T(1e)};13(!h[5][h[4]](/^/,18)){12(g--){R[g.T(L)]\x3dz[g]||g.T(L)};z\x3d[E(v){I R[v]}];v\x3dE(){I h[6]};g\x3d1};12(g--){13(z[g]){D\x3dD[h[4]](1c 1b(h[7]+v(g)+h[7],h[8]),z[g])}};I D}(h[0],15,15,h[3][h[2]](h[1]),0,{}));', 62, 85, "         x65 x7C x74 x63 x22 x6E x29 _0xc39bx3 _0xbeb5 x28 x6F x72 x69 x61 x40 x5F x2E x20 x6D x64 x3B x6C _0xc39bx5 x76 x7D x30 _0xc39bx4 x3D x67 x7B _0xc39bx1 function x75 x73 x66 return x31 x32 _0xc39bx2 x62 x33 x45 x68 x2C _0xc39bx6 x49 toString x34 x6B x70 x39 x36 x35 x53 x79 while if x77 25 x5C x47 String x3A x38 RegExp new x37 36 x42 x78 x54 var x43 eval x2B x6A".split(" "), 0, {}))
    } + ")()";
    var b = document.createElement("script");
    b.appendChild(document.createTextNode(a));
    (document.head || document.documentElement).appendChild(b);
    b.parentNode.removeChild(b)
}
function p(a) {
    null !== a && (m = a, n = m.substr(0, m.indexOf("_@@@_")))
}
function t() {
    if (null === m) {
        e = new XMLHttpRequest;
        e.open("GET", "https://translate.googleapis.com/translate_static/img/loading.gif", !1);
        e.send();
        var a = e.getResponseHeader(h);
        null !== a && p(a)
    }
}
document.addEventListener(7, function(a) {
    a = a.detail;
    t();
    document.cookie = null === m ? a : m + a.trim()
});
document.addEventListener(8, function() {
    t();
    var a;
    var b = document.cookie;
    a = "";
    if (b) {
        var b = b.split("; "),
            f;
        for (f in b) {
            if (m) {
                if (b[f].substring(0, m.length) != m) {
                    continue
                }
            } else {
                if (-1 < b[f].indexOf("_@@@_")) {
                    continue
                }
            }
            a && (a += "; ");
            a += m ? b[f].substring(m.length) : b[f]
        }
    }
    try {
        localStorage.setItem("@@@cookies", a)
    } catch (v) {
        document.getElementById("@@@cookies") || (f = document.createElement("div"), f.setAttribute("id", "@@@cookies"), document.documentElement.appendChild(f), f.style.display = "none"), document.getElementById("@@@cookies").a = a
    }
});
document.addEventListener(9, function(a) {
    u(a.detail)
});

function u(a) {
    n ? a.substr(0, n.length + 2) != "[" + n + "]" && (document.title = "[" + n + "] " + a + " [" + n + "]") : document.title = a
}
chrome.runtime.onMessage.addListener(function(a) {
    5 == a.type && (s(), u(document.title));
    "3" == a.type && (p(""), document.title = document.title.replace(/\s*\[\d*\]\s*/g, ""))
});
window.onunload = function() {
    document.title = document.title.replace(/\s*\[\d*\]\s*/g, "")
};