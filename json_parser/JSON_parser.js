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
    let regex=/^-?([1-9](\d+)?|0)(\.\d+?)?([Ee][\-\+]?\d+)?/
        regoutput = input.match(regex)
        // console.log(regoutput)
        if( regoutput !== null){
                return[regoutput[0],input.slice(regoutput[0].length)]
        }
        return null

}

function string_parser(input){
    input=input.trim()
    if(!input.startsWith('"'))return null
    let outputstring=''
    const esccharacters=['"','\\','/','b','f','n','r','t','u']
    input=input.slice(1)
    while(input.length){
        if(input[0] === '"'){
            return [outputstring,input.slice(1)]
        }
          else {
                if(input[0].match(/[\u0000-\u001f]/i)) return null
                if(input[0] === '\\'){
                    if(input[1].startsWith(esccharacters)){
                        outputstring +=input[1]
                        input=input.slice(2)
                    }
                    else if( input[1] === 'u'){
                        if(input.slice(2,6).match(/[\da-f]{4}/) === null) return null
                        outputstring += String.fromCharCode(parseInt(input.slice(2,6),16))
                        input=input.slice(6)
                    }
                    else {null}
                }
                else{
                    outputstring += input[0]
                    input=input.slice(1)
                }
            }

        }
     return null
}

function array_parser(input){
    input=input.trim()
    let array=[]
    if(!input.startsWith('['))return null
    let value =input.slice(1)
    while(!value.startsWith(']')){
        value = value.trim()
        value = value_parser(value)
        if(value === null) return null
        else{
            array.push(value[0])
            value=value[1].trim()
            // console.log(value)
            if(value.startsWith(',')){
                value=value.slice(1).trim()
                // value=value.slice(0).trim()
            }
        }    
        
    }
    return [array,value.slice(1)]
}
// console.log(array_parser('[  1, 12, ]'))

function object_parser(input){
    input=input.trim()
    let value=input.slice(1)
    let object={}
    if(!input.startsWith('{')) return null
    while(!value.startsWith('}')){
        value=value.trim()
        value=string_parser(value)
        if(value === null) return null
        let key = value[0]
        value=value[1].trim()
        if(!value.startsWith(':') ) return null
        value = value_parser(value.slice(1))
        if(value === null) return null
        object[key] = value[0]
        value=value[1].trim()
        if(value.startsWith(',')){
            value=value.slice(1).trim()
        } 
    
    }
    return [object,value.slice(1)]  

}
// console.log(object_parser('{"obj1":1,"obj2":2,"12":12, }'))

function value_parser(input){
    return null_parser(input) || boolean_parser(input) || number_parser(input) || string_parser(input) || array_parser(input) || object_parser(input)
}

function json_Parser(input){
    let parsevalue = array_parser(input) || object_parser(input)
    if(parsevalue === null )return null
    // console.log(parsevalue[1].length)
    return parsevalue[0]
}

const fs = require('fs')//fail test cases
for( let i=1; i <= 33 ;i++ ){
    if(i != 18){
        const data = fs.readFileSync(`./test/fail${i}.json`, 'utf8')
        console.log(`fail${i}`, json_Parser(data))
    }
}
 
for( let i=1 ; i <=5 ; i++){ //pass test cases
    const data=fs.readFileSync(`./test/pass${i}.json` ,'utf8')
    console.log(`pass${i}` , json_Parser(data))
}
