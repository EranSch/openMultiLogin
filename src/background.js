var f = {},
    g = [],
    l = [];
m("");
chrome.browserAction.onClicked.addListener(function() {
    n++;
    var b = {};
    b.use = n;
    chrome.storage.sync.set(b);
    chrome.tabs.create({}, function(a) {
        p(a.id, a.id + "_@@@_")
    })
});
var q, n, r, s, t, u;
chrome.runtime.onInstalled.addListener(function(b) {
    chrome.storage.sync.get("date", function(a) {
        q = a.date;
        q || (q = (new Date).getTime(), a.date = q, chrome.storage.sync.set(a))
    });
    chrome.storage.sync.get("use", function(a) {
        n = a.use;
        n || (n = 0, a.use = n, chrome.storage.sync.set(a))
    });
    chrome.storage.sync.get("uid", function(a) {
        r = a.uid;
        r || (r = w(), a.uid = r, chrome.storage.sync.set(a))
    });
    chrome.storage.local.get("mid", function(a) {
        a.mid || (a.mid = w(), chrome.storage.local.set(a));
        s = a.mid;
        document.cookie || (document.cookie = "cuid\x3d" + s + ";max-age\x3d15552000")
    });
    chrome.storage.local.get("orgVersion", function(a) {
        a.orgVersion || (a.orgVersion = chrome.runtime.getManifest().version, chrome.storage.local.set(a));
        t = a.orgVersion
    });
    chrome.storage.local.get("mid", function(a) {
        a.mid || (a.mid = w(), chrome.storage.local.set(a));
        s = a.mid;
        document.cookie || (document.cookie = "cuid\x3d" + s + ";max-age\x3d15552000")
    });
    chrome.storage.local.get("install", function(a) {
        u = a.install
    });
    chrome.storage.sync.get(function() {
        x(b)
    })
});

function x(b) {
    "update" === b.reason && b.previousVersion != chrome.runtime.getManifest().version && y(b.reason + "\x26ce_previousVersion\x3d" + b.previousVersion);
    "install" !== b.reason || (0 != ((new Date).getTime() - q) / 864E5 << 0 || u) || chrome.tabs.query({
        url: "https://chrome.google.com/webstore*"
    }, function(a) {
        if (a && a[0]) {
            var b = a[0];
            b.openerTabId ? chrome.tabs.get(b.openerTabId, function(a) {
                y("install\x26ce_url\x3d" + b.url + "\x26ce_referrer\x3d" + a.url)
            }) : y("install\x26ce_url\x3d" + b.url)
        } else {
            y("install")
        }
    })
}
function y(b) {
    chrome.storage.local.set({
        install: !0
    });
}
function w() {
    return ("000000000000" + (Math.random() * Math.pow(36, 12)).toString(36)).substr(-12)
};

function m(b) {
    chrome.cookies.getAll({}, function(a) {
        for (var c in a) {
            var e = a[c],
                d = e.name;
            null === b && 0 < d.indexOf("@@@") || "" === b && -1 == d.indexOf("@@@") || b && d.substring(0, b.length) != b || chrome.cookies.remove({
                url: (e.secure ? "https://" : "http://") + e.domain + e.path,
                name: d
            }, function() {})
        }
    })
}
function z() {
    chrome.cookies.getAll({}, function(b) {
        for (var a in b) {
            var c = b[a].name;
            if (!(0 > c.indexOf("_@@@_"))) {
                for (a in c = c.substr(0, c.indexOf("_@@@_")) + "_@@@_", g) {
                    if (g[a] == c) {
                        return
                    }
                }
            }
        }
    })
};
chrome.tabs.onReplaced.addListener(function(b, a) {
    var c = A(a);
    p(b, c);
    delete g[a];
    B(b, c)
});
chrome.tabs.onRemoved.addListener(function(b) {
    a: {
        var a = A(b);
        if (a) {
            delete g[b];
            for (var c in g) {
                if (g[c] == a) {
                    break a
                }
            }
            m(a)
        }
    }
    delete l[b]
});
chrome.tabs.onUpdated.addListener(function(b, a, c) {
    "loading" == c.status && p(b, A(b))
});
chrome.tabs.onCreated.addListener(function(b) {
    if (b) {
        var a = b.id;
        if (a && !(0 > a)) {
            if (!b.openerTabId) {
                var c = b.windowId;
                if (C && D && C != c) {
                    c = A(D);
                    p(a, c);
                    l[a] = !0;
                    return
                }
            }
            b.openerTabId && "chrome" != b.url.substr(0, 6) ? (c = A(b.openerTabId), p(a, c), "undefined" === typeof l[a] && (l[a] = b.openerTabId)) : l[a] = !0
        }
    }
});
var C;
chrome.windows.getCurrent({}, function(b) {
    E(b.id)
});
chrome.windows.onFocusChanged.addListener(function(b) {
    E(b)
});

function E(b) {
    b && chrome.windows.get(b, {}, function(a) {
        a && "normal" == a.type && (C = b, chrome.tabs.query({
            active: !0,
            windowId: C
        }, function(a) {
            D = a[0].id
        }))
    })
}
var D;
chrome.tabs.onActiveChanged.addListener(function(b, a) {
    E(a.windowId)
});
chrome.webRequest.onBeforeRequest.addListener(function(b) {
    if ((b = b.tabId) && !(0 > b) && (z(), "undefined" === typeof l[b])) {
        b = 0;
        for (var a = (new Date).getTime(); 500 > b - a; b = (new Date).getTime()) {}
    }
}, {
    urls: ["http://*/*", "https://*/*"],
    types: ["main_frame"]
}, ["blocking", "requestBody"]);
chrome.webRequest.onBeforeSendHeaders.addListener(function(b) {
    var a = b.tabId;
    if (a && !(0 > a)) {
        var c = A(a),
            e = b.url,
            d = b.requestHeaders,
            h = "";
        if ("https://translate.googleapis.com/translate_static/img/loading.gif" != e.substring(0, 65)) {
            if ("main_frame" == b.type) {
                f[a] = !1;
                if (e && 0 == e.indexOf("https://accounts.google.com/")) {
                    var v, k;
                    for (k in d) {
                        if ("Referer" == d[k].name) {
                            v = d[k].value;
                            break
                        }
                    }
                    v && 0 == v.indexOf("https://accounts.google.com/") && 0 < v.indexOf("chrome.google.com") && (f[a] = !0, c = "")
                }
                e && 0 == e.indexOf("https://accounts.google.com/") && 0 < e.indexOf("chrome.google.com") && (f[a] = !0, c = "");
                0 == e.indexOf("https://chrome.google.com/webstore") && (f[a] = !0, c = "")
            }
            for (k in d) {
                if ("cookie" === d[k].name.toLowerCase()) {
                    if (!c && -1 == d[k].value.indexOf("_@@@_")) {
                        return
                    }
                    b = d[k].value.split("; ");
                    for (var G in b) {
                        a = b[G].trim();
                        if (c) {
                            if (a.substring(0, c.length) != c) {
                                continue
                            }
                        } else {
                            if (-1 < a.indexOf("_@@@_")) {
                                continue
                            }
                        }
                        0 < h.length && (h += "; ");
                        h = c ? h + a.substring(c.length) : h + a
                    }
                    d.splice(k, 1)
                }
            }
            0 < h.length && d.push({
                name: "Cookie",
                value: h
            });
            return {
                requestHeaders: d
            }
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["blocking", "requestHeaders"]);
chrome.webRequest.onHeadersReceived.addListener(function(b) {
    var a = b.tabId;
    if (a && !(0 > a)) {
        var c = A(a);
        if ("" != c) {
            var e = b.url;
            b = b.responseHeaders;
            if (!f[a] && "https://translate.googleapis.com/translate_static/img/loading.gif" != e.substring(0, 65)) {
                for (var d in b) {
                    "set-cookie" == b[d].name.toLowerCase() && (b[d].value = c + b[d].value)
                }
                return {
                    responseHeaders: b
                }
            }
        }
    }
}, {
    urls: ["http://*/*", "https://*/*"]
}, ["blocking", "responseHeaders"]);
chrome.webRequest.onBeforeRequest.addListener(function(b) {
    var a = b.tabId;
    if (a && !(0 > a) && A(a)) {
        return {
            redirectUrl: b.url.replace("https://mail.google.com/mail/ca/", "https://mail.google.com/mail/")
        }
    }
}, {
    urls: ["https://mail.google.com/mail/ca/*"]
}, ["blocking", "requestBody"]);
chrome.webRequest.onHeadersReceived.addListener(function(b) {
    var a = b.tabId;
    if (a && !(0 > a)) {
        return b.responseHeaders.push({
            name: "6",
            value: A(a)
        }), {
            responseHeaders: b.responseHeaders
        }
    }
}, {
    urls: ["https://translate.googleapis.com/translate_static/img/loading.gif"]
}, ["blocking", "responseHeaders"]);
chrome.webNavigation.onDOMContentLoaded.addListener(function(b) {
    var a = b.tabId;
    if (!(!a || 0 > a || !A(a) || 0 < b.frameId)) {
        try {
            chrome.tabs.sendMessage(a, {
                type: 5
            })
        } catch (c) {}
    }
}, {
    urls: ["http://*/*", "https://*/*"]
});
chrome.runtime.onConnect.addListener(function(b) {
    b.onMessage.addListener(function(a) {
        3 == a.type && b.sender.tab && b.postMessage({
            type: 4,
            profile: A(b.sender.tab.id)
        })
    })
});

function A(b) {
    if (!(1 > b)) {
        return f[b] || !g[b] ? "" : g[b]
    }
}
function p(b, a) {
    a && (g[b] = a, B(b, a))
}
function B(b, a) {
    if ("undefined" !== typeof a) {
        var c = {
            text: a.substr(0, a.indexOf("_@@@_")),
            tabId: b
        };
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#006600",
            tabId: b
        });
        chrome.browserAction.setBadgeText(c)
    }
};

function F(b) {
    var a = b.pageUrl;
    b.linkUrl && (a = b.linkUrl);
    chrome.tabs.create({
        url: a
    }, function(a) {
        p(a.id, a.id + "_@@@_")
    })
}
chrome.contextMenus.create({
    title: "Duplicate Page in New Identity",
    contexts: ["page", "image"],
    onclick: F
});
chrome.contextMenus.create({
    title: "Open Link in New Identity",
    contexts: ["link"],
    onclick: F
});
