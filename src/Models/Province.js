import Localizer from "../Localizer";

export default class Province {
    constructor(o) {
        const language = Localizer.appLanguage;
        this.name = o[`name_${language}`];
        this.description = o[`description_${language}`];


        
        for (const [key, value] of Object.entries(o)) {
            this[key] = value
        }

        this.bullets = this.bullets.map((bul)=>{
            return bul[`content_${language}`];
        });

        
    }

}