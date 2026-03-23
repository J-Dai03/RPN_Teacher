import {BaseExplainer} from '../scenes/BaseExplainerScene.js'

export default class PseudoWalkScene extends BaseExplainer {
    constructor(){
        super({ key: 'PseudoWalkScene' });
    }
    init(){
        super.init({
            pages: [
`
TO DO 1
`,
`
TO DO 2
`
            ],
            title: "Pseudocode walkthrough"
        });
    }
    create() {
        super.create();
    }
}