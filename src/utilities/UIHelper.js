import StyleManager from "../styling.js"
import { hexStringToInt } from "../styling.js";

export function createButton(scene, x, y, text, action, style = StyleManager.getButtonStyle()) {
    let button = scene.add.text(x, y, text, style).setOrigin(0).setInteractive();
    button.on('pointerdown', action);
    button.on('pointerover', () => button.setStyle(StyleManager.getButtonHoverStyle()));
    button.on('pointerout', () => button.setStyle(StyleManager.getButtonStyle()));
    return button;
}

export function createSceneNavButton(scene, x, y, text, destination, style = StyleManager.getButtonStyle()){
    return createButton(
        scene,
        x, 
        y, 
        text, 
        () => scene.scene.start(destination), 
        style
    );
}

export function titleGeneration(scene, y = StyleManager.getTitleStyle().topMarginVal){
    return scene.add.text(
        StyleManager.getMargins().leftMarginVal, 
        y, 
        scene.title, 
        StyleManager.getTitleStyle()
    ).setOrigin(0);
}

export function menuButton(scene){
    return createSceneNavButton(
        scene,
        StyleManager.getRightMargin(scene), 
        StyleManager.getMargins().topMarginVal, 
        'Menu', 
        'MenuScene', 
        StyleManager.getButtonStyle()
    ).setOrigin(1, 0);
    //toReturn.setPosition(StyleManager.getRightMargin(scene), StyleManager.getMargins().topMarginVal);
}

export function textBox(scene, y, text){
    return scene.add.text(
        StyleManager.getMargins().leftMarginVal, 
        y, 
        text, 
        StyleManager.getTextBoxStyle()
    ).setOrigin(0);
}

export function updateY(scene, element, vertSpace = StyleManager.getMargins().verticalElementSpacing){
    scene.nextY = element.y + element.height + vertSpace;
}

export function createEmptyStackDisplay(scene, startY, stackSize, styling = StyleManager.getStackElementStyle()){
    console.log(`createEmptyStackDisplay with stackSize ${stackSize}`);

    let nextY = startY;
    let x = StyleManager.getMargins().leftMarginVal;
    let toReturn = [];
    for (let i = 0; i < stackSize; i++){
        let cell = scene.add.rectangle(x, nextY, styling.cellDim.width, styling.cellDim.height).setOrigin(0);
        cell.setFillStyle(hexStringToInt(styling.fillCol));
        cell.setStrokeStyle(2, hexStringToInt(styling.borderCol));

        let textContents = scene.add.text(0, 0, "Placeholder", {
            fontSize: styling.fontSize,
            color: styling.fontCol,
            align: 'center'
        }).setOrigin(0.5);

        Phaser.Display.Align.In.Center(textContents, cell);

        toReturn.unshift(textContents);

        nextY += cell.height;
    }

    return toReturn;
}