import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "my_theory";
var name = "My Theory";
var description = "A basic theory.";
var authors = "Undoza6096";
var version = 1;

var currency;
var f, dt, g;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // f
    {
        let getDesc = (level) => "f=" + getF(level).toString(0);
        f = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(40, Math.log2(3))));
        f.getDescription = (_) => Utils.getMath(getDesc(f.level));
        f.getInfo = (amount) => Utils.getMathTo(getDesc(f.level), getDesc(f.level + amount));
    }

    // dt
    {
        let getDesc = (level) => "dt=3^{" + level + "}";
        let getInfo = (level) => "dt=" + getDT(level).toString(0);
        dt = theory.createUpgrade(1, currency, new ExponentialCost(1e6, Math.log2(10000)));
        dt.getDescription = (_) => Utils.getMath(getDesc(dt.level));
        dt.getInfo = (amount) => Utils.getMathTo(getInfo(dt.level), getInfo(dt.level + amount));
        dt.maxLevel = 10;
    }
    
    // g
    {
        let getDesc = (level) => "g=" + getG(level).toString(0);
        g = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(1e20, Math.log2(1e10))));
        g.getDescription = (_) => Utils.getMath(getDesc(g.level));
        g.getInfo = (amount) => Utils.getMathTo(getDesc(g.level), getDesc(f.level + amount));
        g.maxLevel = 10000;
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 1e25);
    theory.createAutoBuyerUpgrade(2, currency, 1e80);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "You played!", "play i think?", () => true);
    achievement2 = theory.createAchievement(1, "Every f 5 level to x10", "i so something go now?", () => f.level > 0);
    achievement3 = theory.createAchievement(2, "Are Think", "make should 2 f level?", () => f.level > 1);
    achievement4 = theory.createAchievement(3, "Mulitipler", "make should 10 f level?", () => f.level > 10);

    ///////////////////
    //// Story chapters

}


var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * getF(f.level) * getDT(dt.level) * getG(g.level);
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = f";

    result += "dt";
    
    result += "g";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.224);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{0.224}";
var getTau = () => currency.value;
var get2DGraphValue = () => 1;

var getF = (level) => Utils.getStepwisePowerSum(level, 10, 5, 0);
var getDT = (level) => BigNumber.THREE.pow(level);
var getG = (level) => Utils.getStepwisePowerSum(level, 5, 9, 1);

init();
