//import Phaser from 'phaser';
// Use the above when switching away from the cdn

import MenuScene from '../scenes/MenuScene.js';
import EvalExplanationScene from '../scenes/EvalExplanation.js';
import EvalAnimationScene from '../scenes/StackAnimation.js';
import ConversionExplanationScene from '../scenes/ConversionExplanation.js';
import TreeExplanationScene from '../scenes/ExpressionTreesExplanation.js'
import ExpressionTreeAnimScene from '../scenes/TreeAnimation.js';
import BasicsScene from '../scenes/BasicsExplanation.js'
import PseudoWalkScene from '../scenes/PseudocodeWalkthrough.js'
import PracticeScene from '../scenes/PracticeScene.js'
import SettingsScene from '../scenes/SettingsScene.js';
import StyleManager from '../styling.js'
import EvalEntryScene from '../scenes/EvalPreSlide.js';
import EvalSlidesScene from '../scenes/EvalSlides.js';
import ConvEntryScene from '../scenes/ConvPreSlide.js';
import ConvSlideScene from '../scenes/ConvSlides.js';

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
        EvalAnimationScene,
        ConversionExplanationScene,
        TreeExplanationScene,
        ExpressionTreeAnimScene,
        BasicsScene,
        PseudoWalkScene,
        PracticeScene,
        SettingsScene,
        EvalEntryScene,
        EvalSlidesScene,
        ConvEntryScene,
        ConvSlideScene
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