import { defineCustomElement } from 'vue'
import App from "./App.ce.vue"

customElements.define('pbotool-fsr', defineCustomElement(App))