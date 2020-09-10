const format = document.getElementById('format');
const save = document.getElementById('save');
const status = document.getElementById('status');

function save_options() {
    chrome.storage.sync.set({
        'format': format.value
    }, () => {
        let msg = document.createElement('div');
        msg.innerText = 'Options saved';
        status.appendChild(msg);
        setTimeout(() => {
            status.removeChild(msg);
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        'format': DEFAULT_FORMAT
    }, items => {
        format.value = items.format;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
save.addEventListener("click", save_options);
