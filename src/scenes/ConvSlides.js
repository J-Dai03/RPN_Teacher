import { BaseStackSlide } from "./BaseStackSlideScene.js";
import { RPN2InfixSlide } from "../utilities/RPNToInfixConversion.js";

export default class ConvSlideScene extends BaseStackSlide {
    constructor(){
        super({ key: 'ConvSlidesScene' });
    }
    init(data){
        let processedData = RPN2InfixSlide(data.expression);
        super.init({
            title: `Converting ${data.expression}`,
            maxStack: processedData.maxStackSize,
            slides: processedData.slideData
        });
    }
    create() {
        super.create();
    }
}