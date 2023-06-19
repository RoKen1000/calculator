import { FC } from "react";
import { useState, useEffect } from "react";
import "../styles/Calculator.css";
import { calculateQuery } from "../functions/calculatorFunction";
import { CalculatorHistory } from "./CalculatorHistory";

export const Calculator: FC = () => {

    const [calculatorQuery, setCalculatorQuery] = useState<(number | string)[]>([])
    const [currentExpression, setCurrentExpression] = useState<number[]>([])
    const [result, setResult] = useState<number | null>(null)
    const [calculationInProgress, setCalculationInProgress] = useState(false)
    const [pastCalculations, setPastCalculations] = useState<(number | string)[][]>([])
    const [error, setError] = useState("")

    const handleButtonClick = (value: string | number) => {

        if(result !== null) setResult(null);
        if(error) setError("")

        const mathsOperators = ["+", "-", "*", "/"];

        if(mathsOperators.includes(value as string)){

            if(!calculatorQuery.length && !currentExpression.length){
                    setCalculatorQuery([value]);
                    return;
            }

            if(typeof calculatorQuery[calculatorQuery.length - 1] === "string" && !currentExpression.length){
                setCalculatorQuery([...calculatorQuery, value]);
                return;
            }

            setCalculatorQuery([...calculatorQuery, +currentExpression.join(""), value]);
            setCurrentExpression([]);
            return;
        }
        setCurrentExpression([...currentExpression, value as number]);
    }

    const handleClearExpression = () => setCurrentExpression([]);

    const handleClearAll = () => {
        setCurrentExpression([]);
        setCalculatorQuery([]);
        setResult(null);
    }

    const handleVerifyCalculation = () => {
        if(currentExpression.length === 0 || typeof calculatorQuery[0] === "string"){
            setError("Error");
            setCalculatorQuery([]);
            setCurrentExpression([])
            return;
        }
        for(let i = 0; i < calculatorQuery.length; i++){
            if(typeof calculatorQuery[i] === "string" && typeof calculatorQuery[i + 1] === "string"){
                setError("Error");
                setCalculatorQuery([]);
                setCurrentExpression([])
                return;
            }
        }
        setCalculatorQuery([...calculatorQuery, +currentExpression.join("")]);
        setCalculationInProgress(true);         
    }

    useEffect(() => {
        if(!calculationInProgress) return;
        setCurrentExpression([]);
        setResult(calculateQuery(calculatorQuery));
        setCalculationInProgress(false);
    }, [calculationInProgress])
    
    const updatePastCalculations = () => {
        if(calculatorQuery.length === 1) setPastCalculations([...pastCalculations, [...calculatorQuery]]);
        else setPastCalculations([...pastCalculations, [...calculatorQuery, "=", result as number]]);
    }

    useEffect(() => {
        if(result !== null){
            updatePastCalculations();
            setCalculatorQuery([]);
        }
    }, [result])

    return(
        <main className="calculator-content-container">
            <div className="calculator-box">
                <div className="calculator-display">
                    <div data-testid="calcDisplay" className="calculator-display-text" >
                        {error ? error : result !== null ? <strong>{result}</strong> : !calculatorQuery.length || calculationInProgress ? currentExpression : [calculatorQuery, currentExpression]}
                    </div>
                </div>
                <button onClick={() => handleButtonClick("+")}>+</button>
                <button id="minus-button" onClick={() => handleButtonClick("-")}>-</button>
                <button onClick={() => handleButtonClick("*")}>x</button>
                <button id="divide-button" onClick={() => handleButtonClick("/")}>÷</button>
                <button id="equals-button" onClick={handleVerifyCalculation}>=</button>
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
            <CalculatorHistory pastCalculations={pastCalculations}/>
        </main>
    )
}