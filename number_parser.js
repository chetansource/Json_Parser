//Number parser
 
let numberparser = function(input){
    input=input.trim()
    let regex=/^-?([1-9](\d+)?|0)(\.\d+?)?([Ee][\-\+]?\d+)?/
        regoutput = input.match(regex)
        console.log(regoutput)
        if( regoutput !== null){
                return[regoutput[0],input.slice(regoutput[0].length)]
        }
        return null

}




console.log(numberparser('0e123chetan'))
