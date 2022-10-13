
//NullParser

let nullparser= input =>{
    input=input.trim()
    if(input.startsWith('null')){ 
        return [null , input.slice(4)]
    }
    return null
}
console.log(nullparser(' nullchetan'))
console.log(nullparser('chetannull'))



