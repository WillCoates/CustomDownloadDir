'use strict';

const specifiers = Object.freeze({
    '%': () => '%',
    'y': item => new Date(item.startTime).getFullYear().toString(),
    'm': item => (new Date(item.startTime).getMonth() + 1).toString().padStart(2, '0'),
    'd': item => new Date(item.startTime).getDate().toString().padStart(2, '0'),
    'h': item => new Date(item.startTime).getHours().toString().padStart(2, '0'),
    'M': item => new Date(item.startTime).getMinutes().toString().padStart(2, '0'),
    's': item => new Date(item.startTime).getSeconds().toString().padStart(2, '0'),
    'f': item => item.filename,
    'H': item => new URL(item.url).hostname,
    'p': item => { const path = new URL(item.url).pathname; return path.substring(1, Math.max(path.lastIndexOf('/'), 1)); }
});

const ifCond = (value, pred, newValue) => pred(value) ? newValue : value;

const formatFilename = (downloadItem, format) => 
    format.length === 0 ?
        "" :
        format.charAt(0) === '%' ? 
            // If specifier can't be found, insert an empty string
            ifCond(specifiers[format.charAt(1)], x => x == undefined, () => '')(downloadItem)
                + formatFilename(downloadItem, format.substring(2)) :
            format.indexOf('%') === -1 ?
                format :
                format.substring(0, format.indexOf('%')) + formatFilename(downloadItem, format.substring(format.indexOf('%')));

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
