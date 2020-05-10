let translateBtn = document.getElementById('translate-btn')
let showOriginalBtn = document.getElementById('show-original-btn')

function notifyTab(translationStatus) {
    if (typeof translationStatus != 'boolean') {
        return undefined
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0]
        chrome.tabs.sendMessage(currentTab.id, {doTranslation: translationStatus})
    })
}

translateBtn.onclick = function() {
    notifyTab(true)
}

showOriginalBtn.onclick = function() {
    notifyTab(false)
}
