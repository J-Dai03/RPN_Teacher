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

export function createEmptyStackDisplay(scene, startY, x = StyleManager.getMargins().leftMarginVal, stackSize, styling = StyleManager.getStackElementStyle(), heightAvailable){
    let nextY = startY;
    let cellHeight = Math.floor(heightAvailable / stackSize);
    let toReturn = [];
    for (let i = 0; i < stackSize; i++){
        let cell = scene.add.rectangle(x, nextY, styling.cellDim.width, cellHeight).setOrigin(0);
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




import { ExpressionTree } from "./ExpressionTreeClass.js";

function treeDisplaySpacingGen(treeDepth, spaceWidth, spaceHeight){
    let totalNodeHeight = 0.8 * spaceHeight;
    let totalNodeWidth = 0.8 * spaceWidth;

    let maxPossibleTreeWidth = Math.pow(2,(treeDepth - 1));

    let toReturn = {
        node : {
            height  :   Math.floor(totalNodeHeight/treeDepth),
            width   :   Math.floor(totalNodeWidth/maxPossibleTreeWidth)
        },
        spacing : {
            height  :   0,
            width   :   0
        }
    }

    if (treeDepth != 1){
        toReturn.spacing.height = Math.floor((spaceHeight - totalNodeHeight)/(treeDepth - 1));
    }
    if (maxPossibleTreeWidth != 1){
        toReturn.spacing.width = Math.floor((spaceWidth - totalNodeWidth)/(maxPossibleTreeWidth - 1));
    }

    return toReturn;
}

export function treeDisplayGenPrecursor(scene, expression, x, y, width, height){
    let myTree = new ExpressionTree(expression);
    let dimensions = treeDisplaySpacingGen(myTree.treeDepth(myTree.rootNode), width, height);

    treeDisplayRecurse(
        scene, 
        myTree.rootNode, 
        x, 
        y, 
        width, 
        dimensions, 
        null
    ); 

    // Apply infix and postfix markings
    for(let i = 0; i < myTree.infixOrder.length; i++){
        myTree.infixOrder[i].displayNode.infixIndicator.text.setText((i + 1).toString());
        myTree.postfixOrder[i].displayNode.postfixIndicator.text.setText((i + 1).toString());
    }

    return myTree;
}

function treeDisplayRecurse(scene, currentNode, x, y, width, dimensions, originPoint){
    currentNode.displayNode = generateNodeDisplay(scene, 
        x + Math.floor(width / 2),
        y, 
        dimensions.node.width, 
        dimensions.node.height, 
        currentNode.nodeVal
    )
    //currentNode.displayNode.setOrigin(0.5, 0).setPosition(x + Math.floor(width / 2), y);

    generateLine(scene, originPoint, currentNode);

    let endPoints = generateEndpoints(currentNode.displayNode);
    //console.log(`Endpoints: ${JSON.stringify(endPoints)}`);

    let nextLayerY = y + dimensions.node.height + dimensions.spacing.height;
    let nextLayerWidth = Math.floor((width - dimensions.spacing.width) / 2);
    if (currentNode.left != null){
        treeDisplayRecurse(
            scene, 
            currentNode.left, 
            x, 
            nextLayerY, 
            nextLayerWidth, 
            dimensions, 
            endPoints.left
        ); 
    }
    if (currentNode.right != null){
        treeDisplayRecurse(
            scene, 
            currentNode.right, 
            x + nextLayerWidth + dimensions.spacing.width, 
            nextLayerY, 
            nextLayerWidth, 
            dimensions, 
            endPoints.right
        ); 
    }
}

/**
 * Generates a phaser object to represent the input value, 
 * within the alloted space defined by the width and height, 
 * to be placed in the scene,
 * along with the indicators for the postfix and infix traversal
 * x and y are the coordinates for the top middle of the container.
 * @param {*} scene 
 * @param {*} width 
 * @param {*} height 
 * @param {*} value 
 * @returns 
 */
function generateNodeDisplay(scene, x, y, width, height, value, graphStyle = StyleManager.getGraphStyle()){
    // TO DO
    const nodeRadius = Math.floor(Math.min(width, height) / 2);

    const toReturn = scene.add.container(x, y);

    const nodeShape = scene.add.circle(0, nodeRadius, nodeRadius, graphStyle.fillCol);
    nodeShape.setStrokeStyle(graphStyle.lineWidth, graphStyle.fontCol);

    const nodeText = scene.add.text(0, nodeRadius, value.toString(), {
        fontSize: graphStyle.fontSize,
        //fontSize: `${Math.floor(Math.min(width, height) * 0.6)}px`,
        fill: graphStyle.fontCol,
        fontStyle: 'bold'
    }).setOrigin(0.5);

    const indicatorRadius = Math.floor(Math.min(width, height) * 0.1);

    const infixIndicator = generateIndicator(scene, 0, 2 * nodeRadius, indicatorRadius, {fillCol: 0x339999})

    const postfixIndicator = generateIndicator(scene, nodeRadius, nodeRadius, indicatorRadius, {fillCol: 0x999933})

    toReturn.add([nodeShape, nodeText, infixIndicator, postfixIndicator]);

    toReturn.circle = nodeShape;
    toReturn.text = nodeText;
    toReturn.infixIndicator = infixIndicator;
    toReturn.postfixIndicator = postfixIndicator;
    toReturn.radius = nodeRadius;

    return toReturn;
}

function generateIndicator(scene, x, y, radius, style = {fillCol: 0xffff88}){
    const toReturn = scene.add.container(x, y);

    const circleShape = scene.add.circle(0, 0, radius, style.fillCol).setOrigin(0.5);

    const text = scene.add.text(0, 0, 'T', {fontSize: Math.floor(radius * 1.5)}).setOrigin(0.5);

    // TO DO: Add indicator styling

    toReturn.add([circleShape, text]);

    toReturn.text = text;

    return toReturn;
}

function generateEndpoints(nodeDisplay){
    const axisOffset = Math.floor(Math.sin(Math.PI / 4) * nodeDisplay.radius);

    const newY = nodeDisplay.y + nodeDisplay.radius + axisOffset;

    return {
        left:{
            x   :   nodeDisplay.x - axisOffset,
            y   :   newY
        },
        right:{
            x   :   nodeDisplay.x + axisOffset,
            y   :   newY
        }
    }
}

/**
 * Generates a line from the origin point to a point on top of the destination node
 * Used to connect nodes in the tree to their child nodes
 * @param {*} scene 
 * @param {*} originPoint 
 * @param {*} destinationNode 
 */
function generateLine(scene, originPoint, destinationNode){

    // Do nothing if we are missing a node or originPoint
    if (!originPoint || !destinationNode || !destinationNode.displayNode) return;

    const destPoint = destinationNode.displayNode;

    // Create a line using Phaser's Graphics
    const line = scene.add.graphics();
    line.lineStyle(2, 0x55bb11);
    line.lineBetween(originPoint.x, originPoint.y, destPoint.x, destPoint.y);

    //console.log(`Created line between ${originPoint.x}, ${originPoint.y} and ${destPoint.x}, ${destPoint.y}`)
}