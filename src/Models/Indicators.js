export default class Indicators {
    constructor(payload) {
        this.indicators_headers = payload?.indicators_headers;
        this.population_growth = payload?.population_growth;
        this.senior_dependency_ratio = payload?.senior_dependency_ratio;
        this.real_gdp_growth = payload?.real_gdp_growth;
        this.employment_growth = payload?.employment_growth;
        this.labour_productivity_growth = payload?.labour_productivity_growth;
        this.nominal_gdp_growth = payload?.nominal_gdp_growth;
        this.effective_interest_rate = payload?.effective_interest_rate;
        this.revenue = payload?.revenue;
        this.program_spending = payload?.program_spending;
        this.primary_balance = payload?.primary_balance;
        this.debt_interest_charges = payload?.debt_interest_charges;
        this.net_debt = payload?.net_debt;
    }

    static initRegionIndicatorsFromRows(region, indicators) {
        let indicators_headers = indicators[0].slice(2);
        let regionIndicators = indicators.filter(cols => cols[0] === region).reduce((accumulator, item) => {
            accumulator[item[1]] = item.slice(2);
            return accumulator;
        }, {});

        return new Indicators({
            indicators_headers,
            ...regionIndicators
        });

    }


    static structure = {
        "demographics": ["population_growth", "senior_dependency_ratio"],
        "economics": ["real_gdp_growth", "employment_growth", "labour_productivity_growth", "nominal_gdp_growth", "effective_interest_rate"],
        "fiscal": ["revenue", "program_spending", "primary_balance", "debt_interest_charges", "net_debt"]
    }

}