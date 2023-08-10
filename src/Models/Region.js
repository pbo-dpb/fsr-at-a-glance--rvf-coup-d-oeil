import Bullet from "./Bullet";
import Dataset from "./Dataset";
import Indicators from "./Indicators";
import blStrings from "../assets/regions.json?json";


export default class Region {
    constructor(payload) {

        this.id = payload?.id;
        if (!this.id) throw "ID must be provided to instanciate region.";
        this.name = blStrings[this.id];

        this.population_growth = payload?.population_growth
        this.senior_dependency_ratio = payload?.senior_dependency_ratio
        this.real_gdp_growth = payload?.real_gdp_growth
        this.employment_growth = payload?.employment_growth
        this.labour_productivity_growth = payload?.labour_productivity_growth
        this.nominal_gdp_growth = payload?.nominal_gdp_growth
        this.effective_interest_rate = payload?.effective_interest_rate
        this.revenue = payload?.revenue
        this.program_spending = payload?.program_spending
        this.primary_balance = payload?.primary_balance
        this.debt_interest_charges = payload?.debt_interest_charges
        this.net_debt = payload?.net_debt

        this.bullets = payload?.bullets ?? [];

        this.datasets = {
            net_debt: payload?.datasets?.net_debt,
            revenue: payload?.datasets?.revenue,
            program_spending: payload?.datasets?.program_spending
        }

        this.is_sustainable = payload?.is_sustainable;
        this.sustainability_label = payload.sustainability_label ? {
            en: payload?.sustainability_label?.en,
            fr: payload?.sustainability_label?.fr,
        } : null
    }


    static buildRegionsFromRows(indicators, sustainability, bullets, charts) {

        let regionsIso = sustainability.slice(1).map(row => row[0]);

        return regionsIso.map((iso) => {

            let regionIndicators = Indicators.initRegionIndicatorsFromRows(iso, indicators);
            let regionBullets = bullets.filter(row => row[0] === iso).map(row => new Bullet({ en: row[1], fr: row[2] }));
            let sustainabilityRow = sustainability.find(row => row[0] === iso);

            let region = new Region({
                id: iso,
                ...regionIndicators,
                bullets: regionBullets,
                is_sustainable: sustainabilityRow[1],
                sustainability_label: (sustainabilityRow[2] && sustainabilityRow[3]) ? { en: sustainabilityRow[2], fr: sustainabilityRow[3] } : null,
                datasets: {
                    net_debt: Dataset.initRegionDatasetsFromRows(iso, charts, "net_debt"),
                    revenue: Dataset.initRegionDatasetsFromRows(iso, charts, "revenue"),
                    program_spending: Dataset.initRegionDatasetsFromRows(iso, charts, "program_spending")
                }
            });


            return region;
        });

    }



}