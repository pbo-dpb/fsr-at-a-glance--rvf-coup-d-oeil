export default class Year {
    constructor(payload) {
        this.indicators_headers = payload.indicators_headers;
        this.fsr_year = payload.fsr_year;
        this.fsr_url_en = payload.fsr_url_en;
        this.fsr_url_fr = payload.fsr_url_fr;
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

        this.regions = [];
    }

}