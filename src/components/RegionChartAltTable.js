import { h } from "vue"

export default {
    props: {
        datatable: Object,
    },
    render() {

        let rows = [];

        for (const [key, values] of Object.entries(this.datatable)) {

            let header = h("th", { 'scope': 'row', class: 'border border-gray-300 min-w-60 text-center' }, key);
            let columns = values.map((value) => {
                if (rows.length === 0) {
                    return h("th", { 'scope': 'col', 'class': 'min-w-20 border border-solid border-gray-300 text-center tabular-nums' }, value)
                }
                return h("td", { 'class': 'min-w-20 border border-solid border-gray-300 text-center' }, value)
            });

            rows.push(h('tr', { 'class': '' }, [
                header,
                ...columns
            ]))
        }


        return h('table', { class: ' table-fixed my-4 border border-solid border-gray-300 mr-1' }, rows)
    }
}