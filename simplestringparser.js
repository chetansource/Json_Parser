
// console.log(stringparser('"\uCAFE\uBABE\uAB98\uFCDE\ubcda\uef4A"'))
console.log(stringparser('" chetan"'))


// function string_parser(input){
//     input=input.trim()
//     // let outputstring=''
//     const esccharacters=['"','\\','/','b','f','n','r','t','u']
//     if(!input.startsWith('"'))return null
//         let i=1
//         while(input[i] !== '"'){
//             if(input.match(/[\u0000-\u001F]/i)) return null
//             if(input[i] ==='\\'){
//                 if(!esccharacters.includes(input[i+1]))return null
//                 if(input[i+1] === 'u'){
//                     i = i + 4
//                 }
//                 i = i + 2
//             } 
//             else i++
        
//         }
//      return [input.slice(1,i) , input.slice(i+1)]

// }
























