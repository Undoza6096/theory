import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "theory";
var name = "Theory Dimenos";
var description = "i Sorry i do get impossible...";
var authors = "Undoza6096";
var version = 1;

var currency;

var init = () => {
    currency = theory.createCurrency();
}

var getTau = () => currency.value;

init();
