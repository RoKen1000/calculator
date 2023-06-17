import { FC } from "react";
import { useState } from "react";
import "../styles/Calculator.css"

export const Calculator: FC = () => {

    const [calcualtorQuery, setCalculatorQuery] = useState<number | string[]>([])
    const [calculation, setCalculation] = useState<number>(0)
    
    return(
        <main>
            <div className="calculator-box">
                <div className="calculator-display"></div>
                    <button value={"+"}>+</button>
                    <button value={"-"}>-</button>
                    <button value={"*"}>*</button>
                    <button value={"/"}>/</button>
                    <button className="equals-button"  >=</button>
                    <button className="clear-button">x</button>
                    <button value={7}>7</button>
                    <button value={8}>8</button>
                    <button value={9}>9</button>
                    <button value={4}>4</button>
                    <button value={5}>5</button>
                    <button value={6}>6</button>
                    <button value={1}>1</button>
                    <button value={2}>2</button>
                    <button value={3}>3</button>
            </div>
        </main>
    )
}