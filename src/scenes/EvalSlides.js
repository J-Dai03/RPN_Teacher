import { BaseStackSlide } from "./BaseStackSlideScene.js";
import { evalRPNSlide } from "../utilities/SlideGenerator.js";

export default class EvalSlidesScene extends BaseStackSlide {
    constructor(){
        super({ key: 'EvalSlidesScene' });
    }
    init(data){
        let processedData = evalRPNSlide(data.expression);
        super.init({
            title: `Evaluating ${data.expression}`,
            maxStack: processedData.maxStackSize,
            slides: processedData.slideData
        });
    }
    create() {
        super.create();
    }
}