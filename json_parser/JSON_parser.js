//code for each json types
let null_parser= input =>{
    input=input.trim()
    if(input.startsWith('null')){ 
        return [null , input.slice(4)]
    }
    return null
}

let boolean_parser = input =>{
     input=input.trim()
     if(input.startsWith('true')) return[true,input.slice(4)]
     if(input.startsWith('false')) return[false,input.slice(5)]
     return null
}

let number_parser = function(input){
    input=input.trim()
    let regex=/^-?([1-9]\d*|0)(\.\d+)?([Ee][-+]?\d+)?/
    regoutput = input.match(regex)
    if(regoutput === null) return null
    return[Number(regoutput[0]),input.slice(regoutput[0].length)]
}

function string_parser (input) {
    input=input.trim()
    if(!input.startsWith('"')) return null
    input=input.slice(1)
    parsedstring =''
    const esccharacters=['"','\\','/','b','f','n','r','t','u']
    const invalid=[9,10] //tab and linebreak
    let i=0
    while(!input[i].startsWith('"')){
        if(invalid.includes(input[i].charCodeAt(0)))return null
        if(input[i] === '\\'){
           if(!esccharacters.includes(input[i+1])) return null
            if(input[i+1] === 'u'){
                i +=4
            }
            i +=2
        }
        else i++
    }
    return [input.slice(0,i),input.slice(i+1)]
    }

function value_parser(input){
    input=input.trim()
    return null_parser(input) || boolean_parser(input) || number_parser(input) || string_parser(input) || array_parser(input) || object_parser(input)
}

function array_parser(input){
    input=input.trim()
    if(!input.startsWith('['))return null
    input =input.slice(1).trim() 
    let array=[]
    while(input[0] !==']'){
        input = value_parser(input)   
        if(input === null) return null
        array.push(input[0])
        input=input[1].trim()
        if(input[0] === ','){
            input=input.slice(1).trim()
            if(input[0] === ']') return null
        }    
    }
    return [array,input.slice(1)]
}

function object_parser(input){
    input=input.trim()
    if(!input.startsWith('{')) return null
    input=input.slice(1).trim()
    let object={}
    while(input[0] !== '}'){
        input=string_parser(input)
        if(input === null) return null
        let key = input[0]
        input=input[1].trim()
        if(!input.startsWith(':')) return null
        input=input.slice(1)
        input = value_parser(input)
        if(input === null) return null
        object[key] = input[0]
        input=input[1].trim()
        if(input[0] === ','){ 
            input=input.slice(1).trim()
            if(input[0] === '}') return null
        }
    }
    return [object,input.slice(1)]
}

function json_Parser(input){
    let parsevalue = array_parser(input) || object_parser(input)
    if(parsevalue === null || parsevalue[1].length > 0)return null 
    return parsevalue[0]
}

const fs = require('fs')//fail test cases
for( let i=1; i <= 33 ;i++ ){
    if(i !== 18 ){
        const data = fs.readFileSync(`./test/fail${i}.json`, 'utf8')
        console.log(`fail${i}`, json_Parser(data))
    }
}
 
for( let i=1 ; i <=5 ; i++){ //pass test cases
    const data=fs.readFileSync(`./test/pass${i}.json` ,'utf8')
    console.log(`pass${i}` , json_Parser(data))
}
