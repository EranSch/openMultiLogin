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
    var titleScript = `
        (function() {
            var ____t = document.title;
            var ce = CustomEvent;
            document.__defineSetter__("title", function(t) {
                ____t = t;
                var e = new ce("9", {
                    "detail": t
                });
                document.dispatchEvent(e)
            });
            document.__defineGetter__("title", function() {
                return ____t
            });
        })()`;
    var b = document.createElement("script");
    b.appendChild(document.createTextNode(titleScript));
    (document.head || document.documentElement).appendChild(b);
    b.parentNode.removeChild(b)
}
function r() {
    var cookieScript = `
        (function() {
            var ce = CustomEvent;
            document.__defineSetter__("cookie", function(c) {
                var event = new ce("7", {
                    "detail": c
                });
                document.dispatchEvent(event)
            });
            document.__defineGetter__("cookie", function() {
                var event = new ce("8");
                document.dispatchEvent(event);
                var c;
                try {
                    c = localStorage.getItem("@@@cookies");
                    localStorage.removeItem("@@@cookies")
                } catch (e) {
                    c = document.getElementById("@@@cookies").innerText
                }
                return c
            })
        })()`;
    var b = document.createElement("script");
    b.appendChild(document.createTextNode(cookieScript));
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