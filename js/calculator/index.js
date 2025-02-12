function appendValue(value) {
    document.getElementById('display').value += value;
}
function clearDisplay() {
    document.getElementById('display').value = '';
}
// function calculate() {
//     try {
//         let result = new Function('return ' + document.getElementById('display').value)();
//         document.getElementById('display').value = result;
//     } catch (e) {
//         document.getElementById('display').value = 'Error';
//     }
// }
function calculate() {
    try {
        let display = document.getElementById('display');
        
        let expression = display.value;
        let result = new Function('return ' + expression)();
        display.value = `${expression} = ${result}`;
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}