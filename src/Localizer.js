export default class Localizer {
    constructor(strings) {
        this.strings = strings
    }

    __(key, replace = {}) {
        let s = this.strings[key];
        for (const replaceKey in replace) {
            s = s.replaceAll(`:${replaceKey}`, `${replace[replaceKey]}`)
        }
        return s;
    }



}