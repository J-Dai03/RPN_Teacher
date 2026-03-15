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

export const gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
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
        PracticeScene
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