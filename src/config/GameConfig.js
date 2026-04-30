//import Phaser from 'phaser';
// Use the above when switching away from the cdn

import MenuScene from '../scenes/MenuScene.js';
import EvalExplanationScene from '../scenes/EvalExplanation.js';
import ConversionExplanationScene from '../scenes/ConversionExplanation.js';
import TreeExplanationScene from '../scenes/ExpressionTreesExplanation.js'
import BasicsScene from '../scenes/BasicsExplanation.js'
import PracticeScene from '../scenes/PracticeScene.js'
import SettingsScene from '../scenes/SettingsScene.js';
import StyleManager from '../styling.js'
import EvalSlidesScene from '../scenes/EvalSlides.js';
import ConvSlideScene from '../scenes/ConvSlides.js';
import TreeScene from '../scenes/ExpressionTreeScene.js';
import InteractivesScene from '../scenes/InteractivesScene.js'

let configStyling = StyleManager.getConfigStyle();

export const gameConfig = {
    type: Phaser.AUTO,
    width: configStyling.width,
    height: configStyling.height,
    parent: 'game-container',
    backgroundColor: configStyling.bgCol,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        MenuScene,
        EvalExplanationScene,
        ConversionExplanationScene,
        TreeExplanationScene,
        BasicsScene,
        PracticeScene,
        SettingsScene,
        EvalSlidesScene,
        ConvSlideScene,
        TreeScene,
        InteractivesScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true
    }
};

export default gameConfig;