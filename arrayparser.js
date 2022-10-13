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
        return [array,value.slice(1)]
    }
    return null
}

console.log(array_parser('[ "chetan", 123 ]'))

