import { myStyles } from "../styling.js";

export function createButton(scene, x, y, text, action, style) {
    let button = scene.add.text(x, y, text, style).setOrigin(0).setInteractive();
    button.on('pointerdown', action);
    button.on('pointerover', () => button.setStyle({ backgroundColor: myStyles.buttonHover.backgroundColor }));
    button.on('pointerout', () => button.setStyle({ backgroundColor: myStyles.buttonStyle.backgroundColor }));
    return button;
}

export function createNavButton(scene, x, y, text, destination, style){
    return createButton(
        scene,
        x, 
        y, 
        text, 
        () => scene.scene.start(destination), 
        style
    );
}

export function titleGeneration(scene){
    return scene.add.text(
        myStyles.spacing.leftMargin, 
        myStyles.spacing.topMargin, 
        scene.title, 
        myStyles.titleStyling
    ).setOrigin(0);
}

export function menuButton(scene){
    return createNavButton(
        scene,
        myStyles.menuButton.x, 
        myStyles.menuButton.y, 
        'Menu', 
        'MenuScene', 
        myStyles.buttonStyle
    );
}

export function textBox(scene, y, text){
    return scene.add.text(
        myStyles.spacing.leftMargin, 
        y, 
        text, myStyles.textBoxStyling
    ).setOrigin(0);
}