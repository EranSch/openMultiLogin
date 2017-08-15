const EVENTS = {
    DOCUMENT_TITLE_SET: '9',
    DOCUMENT_COOKIE_SET: '7',
    DOCUMENT_COOKIE_GET: '8',
    INITIALIZE_TITLE_HANDLER: '5',
    RESET_SESSION: '3',
    ESTABLISH_NEW_SESSION_ID: '4',
};

var f = {},
    sessionReferences = [],
    l = [];
var q, useCount, r, s, t, u;

let activeTabId;
let activeWindowId;

purgeOldMultiLoginSessions('');

function onBrowserActionClick() {
    useCount++;
    var b = {};
    b.use = useCount;
    chrome.storage.sync.set(b);
    chrome.tabs.create({}, function(a) {
        storeNewSessionReference(a.id, a.id + "_@@@_")
    })
}

chrome.browserAction.onClicked.addListener(onBrowserActionClick);

function purgeOldMultiLoginSessions(b) {
    chrome.cookies.getAll({}, function(userCookies = []) {
        userCookies.forEach(currentCookie => {
            const name = currentCookie.name;
            null === b && 0 < name.indexOf("@@@") || "" === b && -1 == name.indexOf("@@@") || b && name.substring(0, b.length) != b || chrome.cookies.remove({
                url: (currentCookie.secure ? "https://" : "http://") + currentCookie.domain + currentCookie.path,
                name
            }, function() {})
        });
    })
}

function z() {
    chrome.cookies.getAll({}, function(b) {
        for (var a in b) {
            var c = b[a].name;
            if (!(0 > c.indexOf("_@@@_"))) {
                for (a in c = c.substr(0, c.indexOf("_@@@_")) + "_@@@_", sessionReferences) {
                    if (sessionReferences[a] == c) {
                        return
                    }
                }
            }
        }
    })
}

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    var c = A(removedTabId);
    storeNewSessionReference(addedTabId, c);
    delete sessionReferences[removedTabId];
    updateActionIconBadge(addedTabId, c)
});

chrome.tabs.onRemoved.addListener(function(b) {
    a: {
        var a = A(b);
        if (a) {
            delete sessionReferences[b];
            for (var c in sessionReferences) {
                if (sessionReferences[c] == a) {
                    break a
                }
            }
            purgeOldMultiLoginSessions(a)
        }
    }
    delete l[b]
});

chrome.tabs.onUpdated.addListener(function(b, a, c) {
    "loading" == c.status && storeNewSessionReference(b, A(b))
});

chrome.tabs.onCreated.addListener(function(b) {
    if (b) {
        var a = b.id;
        if (a && !(0 > a)) {
            if (!b.openerTabId) {
                var c = b.windowId;
                if (activeWindowId && activeTabId && activeWindowId != c) {
                    c = A(activeTabId);
                    storeNewSessionReference(a, c);
                    l[a] = !0;
                    return
                }
            }
            b.openerTabId && "chrome" != b.url.substr(0, 6) ? (c = A(b.openerTabId), storeNewSessionReference(a, c), "undefined" === typeof l[a] && (l[a] = b.openerTabId)) : l[a] = !0
        }
    }
});

chrome.windows.getCurrent({}, windowObject =>
    updateActiveViewIds(windowObject.id));

chrome.windows.onFocusChanged.addListener(focusedWindowId =>
    updateActiveViewIds(focusedWindowId));

chrome.tabs.onActivated.addListener((tabId, windowId) =>
    updateActiveViewIds(windowId));

function updateActiveViewIds(windowId) {
    if (!windowId) {
        return;
    }
    function handleWindowQuery(windowObject) {
        if (windowObject && "normal" == windowObject.type) {
            activeWindowId = windowId;
            chrome.tabs.query({
                active: true,
                windowId: activeWindowId
            }, function(activeTabs) {
                activeTabId = activeTabs[0].id
            })
        }
    }
    chrome.windows.get(windowId, {}, handleWindowQuery);
}

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
                type: '5'
            })
        } catch (c) {}
    }
}, {
    urls: ["http://*/*", "https://*/*"]
});

chrome.runtime.onConnect.addListener(function(contentScript) {
    contentScript.onMessage.addListener(function(event) {
        switch (event.type) {
            case EVENTS.RESET_SESSION:
                if (contentScript.sender.tab) {
                    contentScript.postMessage({
                        type: '4',
                        profile: A(contentScript.sender.tab.id)
                    });
                }
                break;
        }
    })
});

function A(b) {
    if (!(1 > b)) {
        return f[b] || !sessionReferences[b] ? "" : sessionReferences[b]
    }
}

function storeNewSessionReference(sessionNumber, sessionIdPrefix) {
    if (!sessionIdPrefix) {
        return;
    }
    sessionReferences[sessionNumber] = sessionIdPrefix;
    updateActionIconBadge(sessionNumber, sessionIdPrefix);
}

function updateActionIconBadge(sessionNumber, sessionIdPrefix) {
    if (!sessionIdPrefix) {
        return;
    }
    const badgeParams = {
        text: sessionNumber.toString(),
        tabId: sessionNumber
    };
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#006600",
        tabId: sessionNumber
    });
    chrome.browserAction.setBadgeText(badgeParams);
}

function openInNewSession(sourceElement) {
    var url = sourceElement.linkUrl || sourceElement.pageUrl;
    chrome.tabs.create({
        url
    }, function(a) {
        storeNewSessionReference(a.id, a.id + "_@@@_")
    })
}

chrome.contextMenus.create({
    title: "Duplicate Page in New Identity",
    contexts: ["page", "image"],
    onclick: openInNewSession
});

chrome.contextMenus.create({
    title: "Open Link in New Identity",
    contexts: ["link"],
    onclick: openInNewSession
});
