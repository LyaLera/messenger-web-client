//Difference - does the functio return smth(pure) (+ does the function change other stuff (mutative))

//Pure functions
// map, filter
function multiply(a,b) {return a*b}
let multiplyResult = multiply(2,5)
console.log(multiplyResult)

function mutateResult() {
    multiplyResult *= 10
}
mutateResult()
console.log(multiplyResult)

//Mutative functions
//console.log, forEach

console.log("hello") // Log does something - it effects the outside world