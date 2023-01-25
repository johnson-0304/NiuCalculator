let btn = document.querySelectorAll('.btn');
let screen = document.getElementById('screen');
let smallScreen = document.getElementById('small-screen');
let delBtn = document.getElementById('delBtn');
let equalBtn = document.getElementById('equalBtn');
let resetBtn = document.getElementById('resetBtn');
let bombBtn = document.getElementById('bomb');
let biggestNiu = "0";

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

    if (screen.value === "") {
        screen.value = (screen.value + btnValue)
    } else {
        screen.value = (screen.value + "," + btnValue)
    }
}

/*Make Del Button Active*/

delBtn.addEventListener('click', delOneChar);

function delOneChar() {
    let screenDel = screen.value.replace(/,/g, "");
    // screen.value = screenDel.substr(0, screenDel.length - 1);

    if (screen.value.includes(",")) {
        screen.value = screen.value.substring(0, screen.value.length - 2);
    } else {
        screen.value = ""
        smallScreen.value = ""
    }
    if (screen.value === "") {
        screen.value = "";
    }
}

/*Make Reset Button Active*/

resetBtn.addEventListener('click', resetAll);

function resetAll() {
    screen.value = ""
    smallScreen.value = ""
}

//bomb func

function randomYesNo() {
    
    var t2 = window.setInterval(function () {
        var random_boolean = Math.random() < 0.5;
        console.log(random_boolean)
        if(random_boolean){
            screen.value  = "✅✅✅"
        } else {
            screen.value  = "❌❌❌"
        }
        
    }, Math.floor(Math.random() * 200))
    setTimeout(function() {
        window.clearInterval(t2)
      }, 2500);
    //window.clearInterval(t2)
}

//check element is number or not
function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}

function tenBase(noDupArr) {
    //validate three numbers are 3 or 6
    // if(noDupArr[0] == 0 || noDupArr[0] == 1 ){
    //     return false
    // }



}
//validate number if a number is a ten base number
function validateBase(number) {
    //console.log("number pass to validate base function" +number)
    if (number % 10 == 0) {
        return true;
    } else {
        return false
    }
}

//calculate equals ten

function calculateTenBaseIndex(noDupArrIndex, modArray) {
    amount3or6 = 0
    for (i in noDupArrIndex) {
        if (modArray[noDupArrIndex[i]] === 3 || modArray[noDupArrIndex[i]] === 6) {
            amount3or6 = amount3or6 + 1
        }
    }

    let total = 0;
    let non3or6Arr = [];
    switch (amount3or6) {
        case 0:
            for (i in noDupArrIndex) {
                total += modArray[noDupArrIndex[i]]
            }
            if (total % 10 == 0) {
                return true
            } else {
                return false
            }
            break;


        case 1:

            for (i in noDupArrIndex) {
                if (modArray[noDupArrIndex[i]] !== 3 && modArray[noDupArrIndex[i]] !== 6) {
                    non3or6Arr.push(modArray[noDupArrIndex[i]])
                }
            }
            for (i in non3or6Arr) {
                total += non3or6Arr[i]
            }
            if (validateBase(total + 6) || validateBase(total + 3)) {
                return true
            } else {
                return false
            }
            break;


        case 2:
            for (i in noDupArrIndex) {
                if (modArray[noDupArrIndex[i]] !== 3 && modArray[noDupArrIndex[i]] !== 6) {
                    non3or6Arr.push(modArray[noDupArrIndex[i]])
                }
            }
            for (i in non3or6Arr) {
                total += non3or6Arr[i]
            }
            console.log("total == " + total + "  , amount3or6 = " + amount3or6)
            if (validateBase(+total + 6) || validateBase(+total + 9) || validateBase(+total + 12)) {
                return true
            } else {
                return false
            }

            break;
        case 3:
            return false
            break;
        default:
            for (i in noDupArrIndex) {
                total += modArray[noDupArrIndex[i]]
            }
            if (total % 10 == 0) {
                return true
            } else {
                return false
            }
            break;
    }
}

//compare niu
function compareNiu(niuVal) {
    curBiggetNiu = biggestNiu
    curOdd = 0
    niuOdd = 0

    if (curBiggetNiu.charAt(0) === 'n') {
        curOdd = 0
    } else if (curBiggetNiu.charAt(0) === 'N') {
        curOdd = 1
    } else if (curBiggetNiu.charAt(0) === 'D') {
        curOdd = 2
    } else if (curBiggetNiu.charAt(0) === 'T') {
        curOdd = 3
    } else if (curBiggetNiu.charAt(0) === '-') {
        curOdd = 5
    } else {

    }

    if (niuVal.charAt(0) === 'n') {
        niuOdd = 0
    } else if (niuVal.charAt(0) === 'N') {
        niuOdd = 1
    } else if (niuVal.charAt(0) === 'D') {
        niuOdd = 2
    } else if (niuVal.charAt(0) === 'T') {
        niuOdd = 3
    } else if (niuVal.charAt(0) === '-') {
        niuOdd = 5
    } else {

    }

    //console.log("slice" + curBiggetNiu.slice(-1))
    if (curBiggetNiu === 'o') {
        biggestNiu = niuVal
        screen.value = niuVal
    } else if (niuOdd > curOdd) {
        biggestNiu = niuVal
        screen.value = niuVal
    } else if (niuOdd === curOdd) {
        //JQK
        curBiggestNiuNumber = curBiggetNiu.slice(-1)
        curNiuNumber = niuVal.slice(-1)
        if (curBiggestNiuNumber === '0') {
            curBiggestNiuNumber = 10
        }
        if (curNiuNumber === '0') {
            curNiuNumber = 10
        }
        // console.log("curBiggestNiuNumber == " + curBiggestNiuNumber)
        // console.log("curNiuNumber == " + curNiuNumber)
        if (curBiggestNiuNumber === curNiuNumber) {
            return;
        }
        if (isNumeric(curBiggestNiuNumber) && isNumeric(curNiuNumber)) {
            if (curNiuNumber > curBiggestNiuNumber) {
                biggestNiu = niuVal
                screen.value = niuVal
            }
        } else {
            if ((!isNumeric(curBiggestNiuNumber) && curBiggestNiuNumber != 'A') && isNumeric(curNiuNumber)) {
                return;
            } else if (isNumeric(curBiggestNiuNumber) && (!isNumeric(curNiuNumber) && curNiuNumber != 'A')) {
                biggestNiu = niuVal
                screen.value = niuVal
            } else if (!isNumeric(curBiggestNiuNumber) && !isNumeric(curNiuNumber)) {
                if (curBiggestNiuNumber === 'J') {
                    curBiggestNiuNumber = 11
                } else if (curBiggestNiuNumber === 'Q') {
                    curBiggestNiuNumber = 12
                } else if (curBiggestNiuNumber === 'K') {
                    curBiggestNiuNumber = 13
                }

                if (curNiuNumber === 'J') {
                    curNiuNumber = 11
                } else if (curNiuNumber === 'Q') {
                    curNiuNumber = 12
                } else if (curNiuNumber === 'K') {
                    curNiuNumber = 13
                }

                if (curNiuNumber > curBiggestNiuNumber) {
                    biggestNiu = niuVal
                    screen.value = niuVal
                }

            }
        }


    }

}

function countNiuPoint(number) {
    let returnVal;
    if (number > 9) {
        returnVal = number % 10
    } else {
        return number
    }
    if (returnVal === 0) {
        return 10
    } else {
        return returnVal
    }
}

//pass in tenBaseArr and get the rest two value
function calculateNiu(tenBaseArr, screenValArr) {

    niuArr = []
    niuVal = "0"

    for (i in screenValArr) {
        if (i !== tenBaseArr[0] && i !== tenBaseArr[1] && i !== tenBaseArr[2]) {
            niuArr.push(screenValArr[i])
        }
    }


    console.log("NIU ARR : " + niuArr)
    //Double
    if (niuArr[0] == niuArr[1] && niuArr[1] != 'A') {
        if (niuArr[0] == 1) {
            niuVal = "TRIPLE " + 'A'
        } else {
            niuVal = "DOUBLE " + niuArr[0]
        }
    } else if (niuArr.includes('A')) {
        //Dong Gu
        let index = niuArr.indexOf("A");
        for (i in niuArr) {
            if (niuArr[0] == niuArr[1]) {
                niuVal = "TRIPLE " + 'A'
            }
            if (i === index) {
                continue
            }
            if (niuArr[i] === 'J' || niuArr[i] === 'Q' || niuArr[i] === 'K') {
                niuVal = "-💥DONGU💥-"

            }else if (niuArr[i] === '1') {
                niuVal = "TRIPLE " + 'A'
            }else if(isNumeric(niuArr[i])){
                if(niuArr[i] === '3' || niuArr[i] === '6' ){
                    niuVal = "Niu " + '7'
                }else{
                    niuVal = "Niu " + +(+niuArr[i]+1)
                }
            }
        }
    } else {
        tempNiuArr = niuArr
        for (i in tempNiuArr) {
            if (!isNumeric(tempNiuArr[i])) {
                if (tempNiuArr[i] === 'A') {
                    tempNiuArr[i] = 1
                } else {
                    tempNiuArr[i] = 10
                }
            }
        }

        //6 and 3
        if ((tempNiuArr[0] === '3' || niuArr[0] === '6') && (tempNiuArr[1] === '3' || tempNiuArr[1] === '6')) {
            niuVal = 'Niu 9'
        } else if (tempNiuArr.includes('3') || tempNiuArr.includes('6')) {
            let not3or6 = 0;
            for (i in tempNiuArr) {
                if (tempNiuArr[i] !== '3' && tempNiuArr[i] !== '6') {
                    not3or6 = tempNiuArr[i]
                }
            }
            tempTotal3 = countNiuPoint(+not3or6 + 3)
            tempTotal6 = countNiuPoint(+not3or6 + 6)
            niuVal = "Niu " + (+tempTotal3 > +tempTotal6 ? tempTotal3 : tempTotal6)

        } else {
            niuVal = "Niu " + countNiuPoint((+niuArr[0] + +niuArr[1]))
        }
    }





    console.log(niuVal)
    compareNiu(niuVal)

}




/*Evaluate Screen Value*/

equalBtn.addEventListener('click', evaluateScreenVal);

function evaluateScreenVal() {
    biggestNiu = "no";


    //get screen value and convert to array
    var screenValArr = screen.value.split(',');
    smallScreen.value = screen.value
    console.log(screenValArr)

    //validate length of screenVal array
    if (screenValArr.length != 5) {
        screen.value = "Enter 5 Digit!"
        return
    }
    screen.value = biggestNiu;
    //validate wugong
    var wugong = true;
    for (i in screenValArr) {
        if (isNumeric(screenValArr[i]) || screenValArr[i] === 'A') {
            wugong = false;
        }
    }
    if (wugong == true) {
        screen.value = "五公";
        return;
    }

    //change JQK to 10 and change string to number
    modArray = []
    for (i in screenValArr) {
        if (!isNumeric(screenValArr[i])) {
            if (screenValArr[i] === 'A') {
                modArray.push(1)
            } else {
                modArray.push(10)
            }
        } else {
            modArray.push(parseInt(screenValArr[i]))
        }
    }
    console.log(modArray)

    //do the calculation
    for (x in modArray) {
        for (y in modArray) {
            for (z in modArray) {
                if (x == y || x == z || y == z) {
                    continue;
                }
                //all the three numbers possiblity
                var noDupArrIndex = [x, y, z]

                //validate if its a ten base, if true it can be a ten base combo
                if (calculateTenBaseIndex(noDupArrIndex, modArray)) {
                    tenBaseArr = noDupArrIndex;
                    calculateNiu(tenBaseArr, screenValArr)
                }
                //loop end
            }
        }
    }


    console.log(modArray)

}