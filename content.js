const EVENTS = {
    DOCUMENT_TITLE_SET: '9',
    DOCUMENT_COOKIE_SET: '7',
    DOCUMENT_COOKIE_GET: '8',
    INITIALIZE_TITLE_HANDLER: '5',
    RESET_SESSION: '3',
    ESTABLISH_NEW_SESSION_ID: '4',
};

let sessionIdPrefix = null;
let sessionNumber;

(function connectToBackgroundPage() {
    const runtimeMessanger = chrome.runtime.connect({
        name: EVENTS.RESET_SESSION
    });
    runtimeMessanger.onMessage.addListener(a => {
        if (a.type === EVENTS.ESTABLISH_NEW_SESSION_ID) {
            if (typeof a.profile === 'undefined') {
                window.location.reload();
            }
            setSessionId(a.profile);
        }
    });
    runtimeMessanger.postMessage({
        type: EVENTS.RESET_SESSION
    });
    runtimeMessanger.onDisconnect.addListener(() => {});
    if (!runtimeMessanger) {
        throw 'Failed to create runtime event handler'
    }
    injectCookieScript();
})();

function injectDocumentTitleScript() {
    const titleScript = `
        (function() {
            let ____t = document.title;
            const ce = CustomEvent;
            document.__defineSetter__('title', function(newTitle) {
                ____t = newTitle;
                const event = new ce('${EVENTS.DOCUMENT_TITLE_SET}', {
                    'detail': newTitle
                });
                document.dispatchEvent(event);
            });
            document.__defineGetter__('title', function() {
                return ____t;
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
            const ce = CustomEvent;
            document.__defineSetter__('cookie', function(cookies) {
                const event = new ce(${EVENTS.DOCUMENT_COOKIE_SET}, {
                    detail: cookies
                });
                document.dispatchEvent(event);
            });
            document.__defineGetter__('cookie', function() {
                const event = new ce(${EVENTS.DOCUMENT_COOKIE_GET});
                document.dispatchEvent(event);
                let c;
                try {
                    c = localStorage.getItem("@@@cookies");
                    localStorage.removeItem("@@@cookies");
                } catch (e) {
                    c = document.getElementById("@@@cookies").innerText;
                }
                return c;
            });
        })()`;
    const scriptElm = document.createElement('script');
    scriptElm.appendChild(document.createTextNode(cookieScript));
    (document.head || document.documentElement).appendChild(scriptElm);
    scriptElm.parentNode.removeChild(scriptElm)
}

function setSessionId(newId) {
    if (null !== newId) {
        sessionIdPrefix = newId;
        sessionNumber = sessionIdPrefix.substr(0, sessionIdPrefix.indexOf('_@@@_'));
    }
}

document.addEventListener(EVENTS.DOCUMENT_COOKIE_GET, function onCookieGet(event) {
    const value = event.detail || '';
    return document.cookie === sessionIdPrefix
        ? value : sessionIdPrefix + value.trim();
});

document.addEventListener(EVENTS.DOCUMENT_COOKIE_SET, function onCookieSet() {
    const documentCookies = document.cookie.split('; ');
    let currentSessionCookies = [];
    if (documentCookies.length) {
        documentCookies.forEach(cookie => {
            const cookieMatchesCurrentSession =
                sessionIdPrefix &&
                cookie.substring(0, sessionIdPrefix.length) !== sessionIdPrefix.toString();
            const cookieContainsOtherSession = -1 < cookie.indexOf('_@@@_');
            if (cookieMatchesCurrentSession ||cookieContainsOtherSession ) {
                return;
            }
            currentSessionCookies.push(sessionIdPrefix ? cookie.substring(sessionIdPrefix.length) : cookie);
        });
    }
    const cookiesToStore = currentSessionCookies.join('; ');
    localStorage.setItem("@@@cookies", cookiesToStore);
});

document.addEventListener(EVENTS.DOCUMENT_TITLE_SET, event =>
    updateDocumentTitle(event.detail));

function updateDocumentTitle(requestedTitle) {
    if (!sessionNumber) {
        return;
    }
    const isTitleSet = requestedTitle.substr(0, sessionNumber.length + 2) === `[${sessionNumber}]`;
    if (isTitleSet) {
        document.title = requestedTitle;
        return;
    }
    document.title = `[${sessionNumber}] ${requestedTitle} [${sessionNumber}]`;
}

function restoreOriginalDocumentTitle() {
    document.title = document.title.replace(/\s*\[\d*\]\s*/g, "")
}

chrome.runtime.onMessage.addListener(function(a) {
    switch (a.type) {
        case EVENTS.INITIALIZE_TITLE_HANDLER:
            injectDocumentTitleScript();
            updateDocumentTitle(document.title);
            break;
        case EVENTS.RESET_SESSION:
            setSessionId('');
            restoreOriginalDocumentTitle();
            break;
    }
});

window.onunload = restoreOriginalDocumentTitle;