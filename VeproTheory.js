import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "vepro";
var name = "Vepro Theory";
var description = "Ok is based which veprogames.";
var authors = "Undoza6096";
var version = "1.0.0";

var currency;

var init = () => {
    currency = theory.createCurrency();
    
    ///////////////////
    // Regular Upgrades

    // a1
    {
        let getDesc = (level) => "a_1=" + getA1(level).toString(0);
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(2.2))));
        a1.getDescription = (_) => Utils.getMath(getDesc(a1.level));
        a1.getInfo = (amount) => Utils.getMathTo(getDesc(a1.level), getDesc(a1.level + amount));
    }
    
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 1e15);
    theory.createAutoBuyerUpgrade(2, currency, 1e40);
    
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));
    
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getA1(a1.level)
}

var getPublicationMultiplier = (tau) => tau.pow(0.309) / BigNumber.from(4);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.309}}{4}";
var getTau = () => currency.value;

var getA1 = (level) => Utils.getStepwisePowerSum(level, 3, 10, 0);

init();
