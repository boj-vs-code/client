const data = require('./data');

function toLanguage(extension) {
    for (let [k, v] of Object.entries(data)) {
        if (v.indexOf(extension) !== -1) {
            return k;
        }
    }
}

module.exports = {
    toLanguage: toLanguage,
}