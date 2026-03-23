export function buttonToChar(button){
    if (/^[a-z0-9\-+()]$/.test(button)) {
        return button;
    }     
    switch (button){
        case '*':
            return '×';
        case '/':
            return '÷';
        default:
            return '!';
    }
}