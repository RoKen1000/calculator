import { FC } from "react";
import { useState } from "react";
import "../styles/Calculator.css"

export const Calculator: FC = () => {

    const [calcualtorQuery, setCalculatorQuery] = useState<(number | string)[]>([])
    const [currentNumber, setCurrentNumber] = useState<number[]>([])

    const [calculation, setCalculation] = useState<number>(0)

    const handleButtonClick = (value: string | number) => {

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
    
    return(
        <main>
            <div className="calculator-box">
                <div className="calculator-display" data-testid="query">{!calcualtorQuery.length ? currentNumber : [calcualtorQuery, currentNumber]}</div>
                    <button onClick={() => handleButtonClick("+")}>+</button>
                    <button onClick={() => handleButtonClick("-")}>-</button>
                    <button onClick={() => handleButtonClick("*")}>*</button>
                    <button onClick={() => handleButtonClick("/")}>/</button>
                    <button className="equals-button"  >=</button>
                    <button className="clear-button">x</button>
                    <button onClick={() => handleButtonClick(7)}>7</button>
                    <button onClick={() => handleButtonClick(8)}>8</button>
                    <button onClick={() => handleButtonClick(9)}>9</button>
                    <button onClick={() => handleButtonClick(4)}>4</button>
                    <button onClick={() => handleButtonClick(5)}>5</button>
                    <button onClick={() => handleButtonClick(6)}>6</button>
                    <button onClick={() => handleButtonClick(1)}>1</button>
                    <button onClick={() => handleButtonClick(2)}>2</button>
                    <button onClick={() => handleButtonClick(3)}>3</button>
            </div>
        </main>
    )
}