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
    
    // a1
    {
        let getDesc = (level) => "q_1=1.6^{" + level + "}";
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(0, currency, new ExponentialCost(5, Math.log2(5)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }
}

var getSecondaryEquation = () => {
    let result = "";
    result += "\\rho=q_1"
    return result;
}
var getQ1 = (level) => BigNumber.from(1.6).pow(level);


init();