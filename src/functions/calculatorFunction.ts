
export const calculateQuery = (queryArray: (number|string)[]): number => {

    if(queryArray.length === 1) return <number>queryArray[0];

    const finalOperation = [...queryArray]
    
    if(queryArray.includes("/") || queryArray.includes("*")){

        const operationsArray: (number | string)[][] = []
        let subOperation = []

        for(let i = finalOperation.length - 2; i >= 0; i--){
            if(finalOperation[i] === "*" || finalOperation[i] === "/"){
                if(!subOperation.length){
                    subOperation.push(finalOperation[i - 1], finalOperation[i], finalOperation[i + 1]);
                    finalOperation.splice(i - 1, 3, "#");
                }
                else subOperation.unshift(...finalOperation.splice(i - 1, 2));
            }else if(finalOperation[i] === "-" || finalOperation[i] === "+"){
                operationsArray.unshift(subOperation);
                subOperation = [];   
            }
            else if(!i && subOperation.length) operationsArray.unshift(subOperation);
        }
        
        operationsArray.forEach((operation) => {
            let calculatedValue = <number>operation[0]
            for(let i = 1; i < operation.length; i += 2){
                switch(operation[i]){
                    case "*":
                        calculatedValue = calculatedValue * <number>operation[i + 1];
                        break;
                    case "/":
                        calculatedValue = calculatedValue / <number>operation[i + 1];
                        break;
                }
            }
            for(let i = 0; i < finalOperation.length; i++){
                if(/#/.test(<string>finalOperation[i])){
                    finalOperation[i] = calculatedValue;
                    break;
                }
            }
        })
    }

    let finalValue = <number>finalOperation[0];

    for(let i = 1; i < finalOperation.length; i += 2){
        switch(finalOperation[i]){
            case "+":
                finalValue = finalValue + <number>finalOperation[i + 1];
                break;
            case "-":
                finalValue = finalValue - <number>finalOperation[i + 1];
                break;
            } 
    }
    return finalValue;
}