import { FC } from "react";
import { useState } from "react";
import "../styles/Calculator.css"

export const Calculator: FC = () => {

    const [calcualtorQuery, setCalculatorQuery] = useState<(number | string)[]>([])
    const [currentNumber, setCurrentNumber] = useState<number[]>([])

    const [calculation, setCalculation] = useState<number>(0)

    const handleNumberButtonClick = (value: string | number) => {

        const mathsOperators = ["+", "-", "*", "/"];

        if(mathsOperators.includes(value as string)){
            if(!calcualtorQuery.length){
                setCalculatorQuery([+currentNumber.join(""), value]);
                setCurrentNumber([]);
                return;
            }
            setCalculatorQuery([...calcualtorQuery, +currentNumber.join(""), value]);
            setCurrentNumber([]);
            return;
        }
        setCurrentNumber([...currentNumber, value as number]);
    }

    const handleClearExpression = () => setCurrentNumber([]);

    const handleClearAll = () => {
        setCurrentNumber([]);
        setCalculatorQuery([]);
    }

    
    return(
        <main>
            <div className="calculator-box">
                
                <div className="calculator-display">
                    <div data-testid="query" className="calculator-display-text" >{!calcualtorQuery.length ? currentNumber : [calcualtorQuery, currentNumber]}</div>
                </div>

                <button onClick={() => handleNumberButtonClick("+")}>+</button>
                <button id="minus-button" onClick={() => handleNumberButtonClick("-")}>-</button>
                <button onClick={() => handleNumberButtonClick("*")}>x</button>
                <button id="divide-button" onClick={() => handleNumberButtonClick("/")}>÷</button>
                <button id="equals-button"  >=</button>
                <button id="clear-button" onClick={handleClearAll}>C</button>
                <button id="clear-entry-button" onClick={handleClearExpression}>CE</button>
                <button onClick={() => handleNumberButtonClick(7)}>7</button>
                <button onClick={() => handleNumberButtonClick(8)}>8</button>
                <button onClick={() => handleNumberButtonClick(9)}>9</button>
                <button onClick={() => handleNumberButtonClick(4)}>4</button>
                <button onClick={() => handleNumberButtonClick(5)}>5</button>
                <button onClick={() => handleNumberButtonClick(6)}>6</button>
                <button onClick={() => handleNumberButtonClick(1)}>1</button>
                <button onClick={() => handleNumberButtonClick(2)}>2</button>
                <button onClick={() => handleNumberButtonClick(3)}>3</button>
                <button id="zero-button" onClick={() => handleNumberButtonClick(0)}>0</button>
                <button id="decimal-button" onClick={() => handleNumberButtonClick(".")}>.</button>
            </div>
        </main>
    )
}