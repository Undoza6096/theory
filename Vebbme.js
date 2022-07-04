import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "while (sky == liver);";
var name = "Vebbme";
var description = "wowoowowow";
var authors = "Undoza6096";
var version = 1;

var currency;

var init = () => {
    currency = theory.createCurrency("ρ", "\\rho");

     ///////////////////
    // Regular Upgrades
    
    // q1
    {
        let getDesc = (level) => "q_1=1.6^{" + level + "}";
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(0, currency, new ExponentialCost(5, Math.log2(5)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }
    
    // q2
    {
        let getDesc = (level) => "q_2=1.7^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(1, currency, new ExponentialCost(90, Math.log2(5)));
        q2.getDescription = (_) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }
}

var getSecondaryEquation = () => {
    let result = "";
    result += "\\rho = q_1"
    result += "q_2"
    return result;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getQ1(q1.level) * getQ2(q2.level);
}

var getPublicationMultiplier = (tau) => tau.pow(0.1) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.1}}{3}";

var getQ1 = (level) => BigNumber.from(1.6).pow(level);
var getQ2 = (level) => BigNumber.from(1.7).pow(level);


init();
