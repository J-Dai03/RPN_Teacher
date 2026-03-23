class StyleManager {
    generateTextSizeOptions(s, m, l){
        return {
            's' :   s,
            'm' :   m,
            'l' :   l
        }
    }

    generateColOptions(darkCol, lightCol){
        return {
            'Dark': darkCol,
            'Light': lightCol
        }
    }

    constructor(){
        // Default colour scheme is Dark, and default textSize is medium
        this.currentColScheme = 'Dark';
        this.textScale = 'm';

        // The possible sizes and colour schemes
        this.textSizes = ['s', 'm', 'l'];
        this.colSchemes = ['Dark', 'Light'];
        
        this.styleData = {
            buttonStyles : {
                fontSize : this.generateTextSizeOptions('10px', '20px', '30px'),
                fontCol : this.generateColOptions('#ffffff', '#000000'),
                bgCol : this.generateColOptions('#4a4a4a', '#70c1c1'),
                bgHoverCol : this.generateColOptions('#6b6b6b', '#3f7070'),
                padding: { x: 15, y: 10 }
            },
            titleStyles : {
                fontSize : this.generateTextSizeOptions('16px', '32px', '48px'),
                fontCol : this.generateColOptions('#ffffff', '#ffb650')
            },
            textBoxStyling: {
                fontSize : this.generateTextSizeOptions('12px', '24px', '36px'),
                fontCol : this.generateColOptions('#ffffff', '#ffb650'),
                wordWrapWidth: 900,
                align: 'left'
            },
            spacing: {
                leftMarginVal: 50,
                topMarginVal: 50,
                verticalElementSpacing: 20,
                horizontalElementSpacing: 10
            },
            phaserConfig: {
                width : 1200,
                height : 800,
                bgCol : this.generateColOptions('#1a1a2e', '#ffb650')
            },
            stackCell: {
                fillCol: this.generateColOptions('#524545', '#70c1c1'),
                borderCol: this.generateColOptions('#ffffff', '#ffb650'),
                fontCol: this.generateColOptions('#ffffff', '#000000'),
                fontSize: this.generateTextSizeOptions('16px', '32px', '48px'),
                cellDimensions: {width : 150, height: 70}
            }
        }
    }

    getButtonStyle(){
        const data = this.styleData.buttonStyles;
        let toReturn = { 
            fontSize: data.fontSize[this.textScale], 
            fill: data.fontCol[this.currentColScheme], 
            backgroundColor: data.bgCol[this.currentColScheme], 
            padding: { x: 15, y: 10 } 
        };
        return toReturn;
    }
    getButtonHoverStyle(){
        const data = this.styleData.buttonStyles;
        return { 
            backgroundColor: data.bgHoverCol[this.currentColScheme], 
        };
    }
    getTitleStyle(){
        const data = this.styleData.titleStyles;
        return {
            fontSize: data.fontSize[this.textScale],
            fill: data.fontCol[this.currentColScheme],
            fontStyle: 'bold'
        };
    }
    getTextBoxStyle(){
        const data = this.styleData.textBoxStyling;
        return {
            fontSize: data.fontSize[this.textScale],
            fill: data.fontCol[this.currentColScheme],
            wordWrap: {width : data.wordWrapWidth},
            align: 'left'
        };
    }
    getMargins(){
        return this.styleData.spacing;
    }
    getRightMargin(scene){
        return scene.cameras.main.width - 50;
    }

    getColSchemes(){
        return this.colSchemes;
    }
    getTextSizes(){
        return this.textSizes;
    }
    setColScheme(input){
        if (this.colSchemes.includes(input)){
            this.currentColScheme = input;
        }
    }
    setTextScale(input){
        if (this.textSizes.includes(input)){
            this.textScale = input;
        }
    }

    getConfigStyle(){
        const data = this.styleData.phaserConfig;
        return {
            width : data.width,
            height : data.height,
            bgCol : data.bgCol[this.currentColScheme]
        };
    }

    getStackElementStyle(){
        const data = this.styleData.stackCell;
        return {
            fillCol: data.fillCol[this.currentColScheme],
            borderCol: data.borderCol[this.currentColScheme],
            fontCol: data.fontCol[this.currentColScheme],
            cellDim: data.cellDimensions,
            fontSize: data.fontSize[this.textScale]
        }
    }
}

export default new StyleManager();

export function hexStringToInt(hexStringInput){
    return parseInt(hexStringInput.slice(1), 16);
}