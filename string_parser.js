function stringparser(input){
    input=input.trim()
    const regex= /^"(([^\*\\\t\n\u0000-\u001F]|\\["/\\\b\f\n\r\t]|\\u[0-9A-G]{4})*)"$/
    regexoutput=input.match(regex)
    console.log(regexoutput)
    if(regexoutput !==null){
        return [regexoutput[1],input.slice(regexoutput[0].length)]
    }
    return null
}

console.log(stringparser(' "hellochetan"'))