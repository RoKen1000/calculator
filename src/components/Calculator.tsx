import { FC } from "react";
import { useState, useEffect } from "react";
import "../styles/Calculator.css";
import { calculateQuery } from "../functions/calculatorFunction";

export const Calculator: FC = () => {

    const [calculatorQuery, setCalculatorQuery] = useState<(number | string)[]>([])
    const [currentNumber, setCurrentNumber] = useState<number[]>([])
    const [calculation, setCalculation] = useState<number>(0)
    const [calcInProgress, setCalcInProgress] = useState(false)

    const handleButtonClick = (value: string | number) => {

        if(calculation) setCalculation(0);

        const mathsOperators = ["+", "-", "*", "/", "="];

        if(mathsOperators.includes(value as string)){
            if(!calculatorQuery.length){
                setCalculatorQuery([+currentNumber.join(""), value]);
                setCurrentNumber([]);
                return;
            }
            setCalculatorQuery([...calculatorQuery, +currentNumber.join(""), value]);
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

    const handleCommenceCalculate = () => {
        setCalculatorQuery([...calculatorQuery, +currentNumber.join("")]);
        setCalcInProgress(true);         
    }

    useEffect(() => {
        if(!calcInProgress) return;
        setCurrentNumber([]);
        setCalculation(() => calculateQuery(calculatorQuery));
        setCalculatorQuery([]);
        setCalcInProgress(false);
    }, [calcInProgress])

    return(
        <main>
            <div className="calculator-box">
                <div className="calculator-display">
                    <div data-testid="calcDisplay" className="calculator-display-text" >
                        {calculation ? <strong>{calculation}</strong> : !calculatorQuery.length || calcInProgress ? currentNumber : [calculatorQuery, currentNumber]}
                    </div>
                </div>
                <button onClick={() => handleButtonClick("+")}>+</button>
                <button id="minus-button" onClick={() => handleButtonClick("-")}>-</button>
                <button onClick={() => handleButtonClick("*")}>x</button>
                <button id="divide-button" onClick={() => handleButtonClick("/")}>÷</button>
                <button id="equals-button" onClick={handleCommenceCalculate}>=</button>
                <button id="clear-button" onClick={handleClearAll}>C</button>
                <button id="clear-entry-button" onClick={handleClearExpression}>CE</button>
                <button onClick={() => handleButtonClick(7)}>7</button>
                <button onClick={() => handleButtonClick(8)}>8</button>
                <button onClick={() => handleButtonClick(9)}>9</button>
                <button onClick={() => handleButtonClick(4)}>4</button>
                <button onClick={() => handleButtonClick(5)}>5</button>
                <button onClick={() => handleButtonClick(6)}>6</button>
                <button onClick={() => handleButtonClick(1)}>1</button>
                <button onClick={() => handleButtonClick(2)}>2</button>
                <button onClick={() => handleButtonClick(3)}>3</button>
                <button id="zero-button" onClick={() => handleButtonClick(0)}>0</button>
                <button id="decimal-button" onClick={() => handleButtonClick(".")}>.</button>
            </div>
        </main>
    )
}