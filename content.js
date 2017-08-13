var h = 6,
    userProfile = null,
    n;

(function init() {
    let runtimeMessanger;
    try {
        runtimeMessanger = chrome.runtime.connect({
            name: "3"
        });
        runtimeMessanger.onMessage.addListener(a => {
            4 == a.type && ('undefined' == a.profile && window.location.reload(), setProfile(a.profile))
        });
        runtimeMessanger.postMessage({
            type: "3"
        });
        runtimeMessanger.onDisconnect.addListener(() => {})
    } catch (q) {}
    if (!runtimeMessanger) {
        throw 'Failed to create runtime event handler'
    }
    injectCookieScript();
})();

function injectDocumentTitleScript() {
    const titleScript = `
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
    const scriptElm = document.createElement('script');
    scriptElm.appendChild(document.createTextNode(titleScript));
    (document.head || document.documentElement).appendChild(scriptElm);
    scriptElm.parentNode.removeChild(scriptElm)
}
function injectCookieScript() {
    const cookieScript = `
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
    const scriptElm = document.createElement('script');
    scriptElm.appendChild(document.createTextNode(cookieScript));
    (document.head || document.documentElement).appendChild(scriptElm);
    scriptElm.parentNode.removeChild(scriptElm)
}
function setProfile(profile) {
    if (null !== profile) {
        userProfile = profile;
        n = userProfile.substr(0, userProfile.indexOf('_@@@_'));
    }
}
document.addEventListener(7, function(a) {
    a = a.detail;
    document.cookie = null === userProfile ? a : userProfile + a.trim()
});
document.addEventListener(8, function() {
    var currentSessionCookies;
    var documentCookies = document.cookie.split('; ');
    currentSessionCookies = "";
    if (documentCookies.length) {
        documentCookies.forEach(cookie => {
            if (userProfile && cookie.substring(0, userProfile.length) != userProfile) {
                return;
            }
            if (-1 < cookie.indexOf('_@@@_')) {
                return;
            }
            currentSessionCookies && (currentSessionCookies += "; ");
            currentSessionCookies += userProfile ? cookie.substring(userProfile.length) : cookie
        });
    }
    try {
        localStorage.setItem("@@@cookies", currentSessionCookies)
    } catch (v) {
        document.getElementById("@@@cookies") || (f = document.createElement("div"), f.setAttribute("id", "@@@cookies"), document.documentElement.appendChild(f), f.style.display = "none"), document.getElementById("@@@cookies").a = currentSessionCookies
    }
});
document.addEventListener(9, function(a) {
    u(a.detail)
});

function u(a) {
    n ? a.substr(0, n.length + 2) != "[" + n + "]" && (document.title = "[" + n + "] " + a + " [" + n + "]") : document.title = a
}

chrome.runtime.onMessage.addListener(function(a) {
    5 == a.type && (injectDocumentTitleScript(), u(document.title));
    "3" == a.type && (setProfile(""), document.title = document.title.replace(/\s*\[\d*\]\s*/g, ""))
});

window.onunload = function() {
    document.title = document.title.replace(/\s*\[\d*\]\s*/g, "")
};