export default class Dataset {
    constructor(payload) {
        this.variable = payload?.variable;
        this.range = payload?.range;
        this.values = payload?.values;
    }

    static initRegionDatasetsFromRows(region, rows, variable) {

        let range = rows[0].slice(2);

        let values = rows.find(row => (row[0] === region && row[1] === variable)).slice(2);

        if (!values) throw `Values cannot be found for given region/variable.`;

        return new Dataset({
            variable,
            range,
            values
        });

    }

}