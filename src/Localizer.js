import rawStrings from "./assets/strings.json?raw";

export default class Localizer {
    constructor() {
        this.language = this.constructor.appLanguage;

        let strings = JSON.parse(rawStrings);
       
        for (const [key, value] of Object.entries(strings)) {
            this[key] = value[this.language]
        }
    }

    __(key, replace={}) {
        let s = this[key];
        for (const replaceKey in replace) {
            s = s.replaceAll(`:${replaceKey}`, `${replace[replaceKey]}`)
          }
        return s;
    }


    static get appLanguage() {
        const url = new URL(window.location.href);
        let language;
        if(url.searchParams && ['fr', 'en'].includes(url.searchParams.get('lang')))
            language = url.searchParams.get('lang');
        else
            language = document.documentElement.lang;
      return language;
    }
}