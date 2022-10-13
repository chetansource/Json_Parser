//Boolean parser

let booleanparser = input =>{
    input=input.trim()
     if(input.startsWith('true')) return[true,input.slice(4)]
     if(input.startsWith('false')) return[false,input.slice(5)]
     return null
}
console.log(booleanparser(' truechetan'))
console.log(booleanparser('chetantrue'))
console.log(booleanparser('falsechetan'))
console.log(booleanparser('chetanfalse'))
