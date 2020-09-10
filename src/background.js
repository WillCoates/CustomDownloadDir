const specifiers = {
    '%': () => '%',
    'y': item => new Date(item.startTime).getFullYear().toString(),
    'm': item => (new Date(item.startTime).getMonth() + 1).toString().padStart(2, '0'),
    'd': item => new Date(item.startTime).getDate().toString().padStart(2, '0'),
    'h': item => new Date(item.startTime).getHours().toString().padStart(2, '0'),
    'M': item => new Date(item.startTime).getMinutes().toString().padStart(2, '0'),
    's': item => new Date(item.startTime).getSeconds().toString().padStart(2, '0'),
    'f': item => item.filename
}

function formatFilename(downloadItem, format) {
    let filename = "";

    for (let last = 0, next = 0; next != -1; last = next + 2) {
        next = format.indexOf('%', last);
        filename += format.substring(last, next == -1 ? undefined : next);
        if (next != -1) {
            let char = format.charAt(next + 1);
            if (char == '') {
                console.error('Format specifier at end of string', format);
            } else {
                let formatter = specifiers[char];
                if (formatter == undefined) {
                    console.error('Formatter', f, 'at index', next + 1, 'is invalid', format);
                } else {
                    filename += formatter(downloadItem);
                }
            }
        }
    }

    return filename;
}

function determineFilename(downloadItem, suggest) {
    chrome.storage.sync.get({
        'format': DEFAULT_FORMAT
    }, items => {
        suggest({filename: formatFilename(downloadItem, items.format)});
    });
    return true;
}

if (typeof chrome != 'undefined') {
    chrome.downloads.onDeterminingFilename.addListener(determineFilename);
} else {
    exports.determineFilename = determineFilename;
    exports.formatFilename = formatFilename;
    exports.specifiers = specifiers;
}
