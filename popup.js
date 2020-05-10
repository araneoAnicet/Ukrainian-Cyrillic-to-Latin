let translateBtn = document.getElementById('translate-btn')
var btnIsActive = false

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
    if (btnIsActive) {
        translateBtn.classList.remove('btn-danger')
        translateBtn.classList.add('btn-success')
        translateBtn.innerText = 'Translate!'
    } else {
        translateBtn.classList.remove('btn-success')
        translateBtn.classList.add('btn-danger')
        translateBtn.innerText = 'Show original'
    }
    btnIsActive = !btnIsActive
    notifyTab(btnIsActive)
}