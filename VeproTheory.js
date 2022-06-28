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
}

init();
