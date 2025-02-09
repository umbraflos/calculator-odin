let exprArray = []
const calKeys = "0123456789.+-×÷"

let displayExpr = document.querySelector(".display-expr")
let displayResult = document.querySelector(".display-result")

const alterExpr = function(elem)
{
    let eleme = String(elem)
    if (eleme === "delete")
    {
        exprArray.pop()
        displayExpr.innerHTML = exprArray.join('')
    }
    else if (eleme === "reset")
    {
        exprArray = []
        displayExpr.innerHTML = exprArray.join('')
        displayResult.innerHTML = ''
    }
    else
    {
        exprArray.push(eleme)
        displayExpr.innerHTML = exprArray.join('')
    }
}

const operateExpr = function()
{
    const combinators = '+-*/'
    const highPrioCombinators = '*/'
    const lowPrioCombinators = '+-'
    let result = exprArray.map(function(elem){
        if (elem === '×') {return '*'}
        else if (elem === '÷') {return '/'}
        else {return elem}
    //this is the algorithm for correcty splitting the array and evaluate it, I was pretty proud of myself the first time I figured this out :)
    }).map(elem => combinators.includes(elem) ? [',',elem,','] : elem)
    .flat().join('').split(',')
    .map(elem => combinators.includes(elem) ? elem : Number(elem))
    .reduce(function (acc,elem,index,arr) 
            {
              if(highPrioCombinators.includes(elem))
              {
                let a = acc.pop()
                let b = arr[index + 1]
                if (elem === '*') {acc.push(a * b)}
                if (elem === '/') {acc.push(a / b)}
                return acc
              }
              else if (highPrioCombinators.includes(arr[index-1])){return acc}
              else{acc.push(elem);return acc}
            },[])
    .reduce(function (acc,elem,index,arr) 
            {
              if(lowPrioCombinators.includes(elem))
              {
                let a = acc.pop()
                let b = arr[index + 1]
                if (elem === '+') {acc.push(a + b)}
                if (elem === '-') {acc.push(a - b)}
                return acc
              }
              else if (lowPrioCombinators.includes(arr[index-1])){return acc}
              else{acc.push(elem);return acc}
            },[])
    if (isNaN(result))
    {
        displayResult.innerHTML = "INVALID INPUT"
    }
    else 
    {
        displayResult.innerHTML = Math.round(result * 100)/100
    }
}

const keyPad = document.querySelector(".cal-keypad")
keyPad.addEventListener("click",function (event) 
                        {
                            let target = event.target
                            if (calKeys.includes(String(target.innerHTML)))
                                {alterExpr(String(target.innerHTML))}
                            else if (target.id === "del-key") 
                                {alterExpr("delete")}
                            else if (target.id === "reset-key")
                                {alterExpr("reset")}
                            else if (target.id === "equal-op")
                                {operateExpr()}
                        })