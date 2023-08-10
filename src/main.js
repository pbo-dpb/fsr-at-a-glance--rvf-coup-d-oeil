import { defineCustomElement, h, createApp, getCurrentInstance } from 'vue'
import App from "./App.ce.vue"
import { createPinia } from 'pinia'
const language = document.documentElement.lang;

const pinia = createPinia()
import stl from './index.css?inline'


const defineFsrCustomElement = (component) =>
    defineCustomElement({
        render: () => h(component),
        styles: [stl],
        props: {
            debug: { type: String, default: false },
        },
        setup() {
            const app = createApp()
            app.use(pinia)
            const inst = getCurrentInstance()
            Object.assign(inst.appContext, app._context)
            Object.assign(inst.provides, app._context.provides)
            return {
                language
            }
        }
    })

customElements.define('pbotool-fsr', defineFsrCustomElement(App))