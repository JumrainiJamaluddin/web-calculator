//membuat object
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
 };

//update angka pada layar 
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
 }

//menghapus data pada kalkulator 
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
 }

 //memberikan nilai negative
function inverseNumber(){
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
    
}

//membuat fungsi operator +  dan -

function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else{
        alert("Operator Sudah Di Tetapkan");
    }
}

//melakukan kalkulasi terhadapa nilai yang terdapat pada oobject calculator 
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }
 // memasukkan angka ke dalam nilai display number 
 function inputDigit(digit){
     if(calculator.displayNumber === '0') {
         calculator.displayNumber = digit;
     }
     else{
         calculator.displayNumber += digit;
     }
 }

 //buat variabel buttons dengan menginissialisasikan nilai seluruh element button yang ada, dan berikan event click pada setiap elementnya
 const buttons = document.querySelectorAll(".button");
 for (let button of buttons) {
    button.addEventListener('click', function(event) {
  
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        // memanggil fungsi clearcalculator
        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        //memanggil fungsi negative 
        if(target.classList.contains('negative')){
            inverseNumber();

            updateDisplay();

            return;
        }

        //memanggil fungsi samadengan (=)
        if(target.classList.contains('equals')){
            performCalculation();

            updateDisplay();

            return;
        }

        //memanggil fungsi operator
        if(target.classList.contains('operator')){
            handleOperator(target.innerText);

            return;
        }


        inputDigit(target.innerText);
        updateDisplay()
    });
 }