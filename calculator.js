let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');
let delBtn = document.getElementById('delBtn');
let equalBtn = document.getElementById('equalBtn');
let resetBtn = document.getElementById('resetBtn');

/*Get Button Value and Print to Screen*/

btn.forEach(button => {
    button.addEventListener("click", getBtnValue);
});

function getBtnValue(event) {
    let btnValue = event.target.dataset.val;

    /*Prevent Keydown of '.' twice for One Operand*/

    if (btnValue === "." && screen.value.match(/[-+*\/]/g)) {

        let operandArr = screen.value.split(/[-+*\/]/g);
        for (i = 1; i < operandArr.length; i++)
            if (operandArr[(operandArr.length - 1)].includes(".")) {
                return false;
            }

            else if (operandArr[(operandArr.length - 1)] === "") {
                btnValue = event.target.dataset.val2;
            }
        return screen.value = (screen.value + btnValue).replace(/,/g, "");
    }

    else if (btnValue === "." && screen.value.includes(".")) {
        return;
    }

    else if (btnValue === "." && screen.value === "") {
        btnValue = event.target.dataset.val2;
    }

    /*Truncate Leading Zero*/

    if (btnValue === "0" && screen.value.match(/[-+*\/]/g)) {

        let operandArr = screen.value.split(/[-+*\/]/g);
        for (i = 1; i < operandArr.length; i++) {
            if (operandArr[(operandArr.length - 1)] === "") {
                return;
            }

            return screen.value = (screen.value + btnValue).replace(/,/g, "");
        }
    }

    else if (btnValue === "0" && screen.value === "") {
        return;
    }

    /*Check Invalid Operands*/

    if (btnValue.match(/[+*\/]/g) && screen.value.match(/[+*\/]/g)) {

        let operandArr = screen.value.split(/[+*\/]/g);
        for (i = 1; i < operandArr.length; i++) {
            if (operandArr[(operandArr.length - 1)] === "") {
                return;
            }

            return screen.value = (screen.value + btnValue).replace(/,/g, "");
        }
    }

    // else if (btnValue.match(/[-]/g) && screen.value.match(/[-+]/g)) {

    //     let operandArr = screen.value.split(/[-+*\/]/g);
    //     for (i = 1; i < operandArr.length; i++) {
    //         if (operandArr[(operandArr.length - 1)] === "") {
    //             return;
    //         }

    //         return screen.value = (screen.value + btnValue).replace(/,/g, "");
    //     }
    // }

    screen.value = (screen.value + btnValue).replace(/,/g, "");
}

/*Make Del Button Active*/

delBtn.addEventListener('click', delOneChar);

function delOneChar() {
    let screenDel = screen.value.replace(/,/g, "");
    screen.value = screenDel.substr(0, screenDel.length - 1);

    if (screen.value === "") {
        screen.value = "";
    }
}

/*Make Reset Button Active*/

resetBtn.addEventListener('click', resetAll);

function resetAll() {
    screen.value = "";
    screen.value = "";
}

//check element is number or not
function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  /*Evaluate Screen Value*/

equalBtn.addEventListener('click', evaluateScreenVal);

function evaluateScreenVal() {

    //get screen value and convert to array
    var screenValArr = screen.value.split('');

    //validate length of screenVal array
    if (screenValArr.length != 5) {
        screen.value = "Enter 5 Digit!"
        return
    }

    //validate 五公
    var wugong = true;
    for (i in screenValArr) {
        if (isNumeric(screenValArr[i])) {
            wugong = false;
        }
    }
    if (wugong == true) {
        screen.value = "五公";
        return;
    }

    //change JQK to 10 and change string to number
    for(i in screenValArr){
        if(!isNumeric(screenValArr[i])){
            screenValArr[i] = 10
        } else {
            screenValArr[i] = parseInt(screenValArr[i])
        }
    }

    //do the calculation
    for (x in screenValArr) {
        for (y in screenValArr) {
          for (z in screenValArr) {
            if (x == y || x == z || y == z){
                continue;
            }
            console.log("x="+x +",y= "+ y +",z= " + z)
          }
        }
      }
    

    console.log(screenValArr)

}