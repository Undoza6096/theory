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
    
    // a2
    {
        let getDesc = (level) => "a_2=" + getA2(level).toString(0);
        a2 = theory.createUpgrade(1, currency, new ExponentialCost(100, Math.log2(3)));
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));
        a2.getInfo = (amount) => Utils.getMathTo(getDesc(a2.level), getDesc(a2.level + amount));
    }
    
    // a3
    {
        let getDesc = (level) => "a_3=4^{" + level + "}";
        let getInfo = (level) => "a_3=" + getA3(level).toString(0);
        a3 = theory.createUpgrade(2, currency, new ExponentialCost(900, Math.log2(20)));
        a3.getDescription = (_) => Utils.getMath(getDesc(a3.level));
        a3.getInfo = (amount) => Utils.getMathTo(getInfo(a3.level), getInfo(a3.level + amount));
    }
    
    // q1
    {
        let getDesc = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(3, currency, new ExponentialCost(1e11, Math.log2(10)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getDesc(q1.level), getDesc(q1.level + amount));
    }
    
    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 1e15);
    theory.createAutoBuyerUpgrade(2, currency, 1e40);
    
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "You Played!", "i think alsos hete...", () => true);
    achievement2 = theory.createAchievement(1, "I should", "I mean Buy a2?", () => a2.level > 0);
    achievement3 = theory.createAchievement(2, "Five levels", "I mean Buy 5 a2?", () => a2.level > 4);
    achievement4 = theory.createAchievement(3, "Kilo levels", "I mean Buy 20 a2?", () => a2.level > 19);
    achievement5 = theory.createAchievement(4, "Kilo High levels", "I mean Buy 70 a2?", () => a2.level > 69);
    achievement6 = theory.createSecretAchievement(5, "You played in sercet achievements!", "woowowowoowowo", "i think so get know here.", () => true);
    achievement7 = theory.createSecretAchievement(6, "Q1?", "Qol theory forever haha", "hahaha i ao get qol.", () => q1.level > 0);

    
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getA1(a1.level) * getA2(a2.level) * getA3(a3.level) * getQ1(q1.level)
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = a_1";

    result += "a_2";
    
    result += "a_3";
    
    result += "q_1";

    return result;
}


var getPublicationMultiplier = (tau) => tau.pow(0.309) / BigNumber.from(4);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.309}}{4}";
var getTau = () => currency.value.pow(0.369);

var getA1 = (level) => Utils.getStepwisePowerSum(level, 3, 10, 0);
var getA2 = (level) => Utils.getStepwisePowerSum(level, 5, 6, 1);
var getA3 = (level) => BigNumber.from(4).pow(level);
var getQ1 = (level) => Utils.getStepwisePowerSum(level, 3, 20, 1);

init();
