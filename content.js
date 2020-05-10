let stringOfOriginalDocument = document.documentElement.innerHTML
var stringOfModifiedDocument = ''
var documentHasBeenModified = false

let alphabet = {
    cyrillicCommon: 'АаБбВвГгҐґДдЕеЖжЗзИиІіЙйКкЛлМмНнОоПпРрСсТтУуФфЦцЧчШш',
    latinCommon: 'AaBbVvHhGgDdEeŽžZzYyIiJjKkLlMmNnOoPpRrSsTtUuFfCcČčŠš',
    specialCyrillic: {
        specialLetters: 'щЩхХ',
        'щ': 'šč',
        'Щ': 'Šč',
        'х': 'ch',
        'Х': 'Ch'
    },
    ioting: {
        iotingSymbols: "єЄюЮяЯїЇаіуеиоАІУЕИО' \n\t",
        lettersWhichCanBeIoted: 'єЄюЮяЯїЇ',
        twoLetters: {
            'є': {
                ioted: 'je',
                notIoted: 'ie'
            },
            'Є': {
                ioted: 'Je',
                notIoted: 'IE'
            },
            'ю': {
                ioted: 'ju',
                notIoted: 'iu'
            },
            'Ю': {
                ioted: 'Ju',
                notIoted: 'IU'
            },
            'я': {
                ioted: 'ja',
                notIoted: 'ia'
            },
            'Я': {
                ioted: 'Ja',
                notIoted: 'IA'
            },
            'ї': {
                ioted: 'ji',
                notIoted: ''
            },
            'Ї': {
                ioted: 'Ji',
                notIoted: ''
            }
        }
        
    },
    softLetters: {
        'ц': 'ć',
        'Ц': 'Ć',
        'л': 'ľ',
        'Л': 'Ľ',
        'д': 'ď',
        'Д': 'Ď',
        'н': 'ń',
        'Н': 'Ń',
        'с': 'ś',
        'С': 'Ś',
        'т': 'ť',
        'Т': 'Ť',
        'з': 'ź',
        'З': 'Ź'
    }
}

function cyrillicToLatin(ukrainianText) {
    if (typeof ukrainianText != 'string') {
        return undefined
    }
    var resultText = ''
    var previousLetterIsIoting = true
    for (var i = 0; i < ukrainianText.length; i++) {
        if (alphabet.cyrillicCommon.includes(ukrainianText[i])) {  // if is a common cyrillic letter
            if (i + 1 < ukrainianText.length) {  // if it is a soft letter
                if (ukrainianText[i + 1] == 'ь') {
                    resultText += alphabet.softLetters[ukrainianText[i]]  // append soft latin letter
                } else {
                    resultText +=  alphabet.latinCommon[alphabet.cyrillicCommon.indexOf(ukrainianText[i])]
                }
            } else {
                resultText +=  alphabet.latinCommon[alphabet.cyrillicCommon.indexOf(ukrainianText[i])]  // otherwise append hard latin letter
            }
        } else if (alphabet.ioting.lettersWhichCanBeIoted.includes(ukrainianText[i])) {
            if (previousLetterIsIoting) {
                console.log(`Current letter is ${ukrainianText[i]} and prev letter is ioting, current index is ${i}`)
                resultText += alphabet.ioting.twoLetters[ukrainianText[i]].ioted
            } else {
                console.log(`Current letter is ${ukrainianText[i]} and prev letter is NOT ioting, current index is ${i}`)
                resultText += alphabet.ioting.twoLetters[ukrainianText[i]].notIoted
            }
        } else {
            if (alphabet.specialCyrillic.specialLetters.includes(ukrainianText[i])) {
                resultText += alphabet.specialCyrillic[ukrainianText[i]]
            } else if (!("ьЬ'".includes(ukrainianText[i])))
            resultText += ukrainianText[i]
        }

        if (alphabet.ioting.iotingSymbols.includes(ukrainianText[i])) {
            previousLetterIsIoting = true
        } else {
            previousLetterIsIoting = false
        }
    }
    return resultText
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (typeof request.doTranslation == 'boolean')
    if (request.doTranslation) {
        if (!documentHasBeenModified) {
            stringOfModifiedDocument = cyrillicToLatin(stringOfOriginalDocument)
            documentHasBeenModified = true
        }
        document.documentElement.innerHTML = stringOfModifiedDocument
    } else {
        document.documentElement.innerHTML = stringOfOriginalDocument
    }

})