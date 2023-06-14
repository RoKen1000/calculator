import { FC } from "react";
import { useState } from "react";
import "../styles/Calculator.css"

export const Calculator: FC = () => {

    const [calcualtorQuery, setCalculatorQuery] = useState<number | string[]>([])
    const [calculation, setCalculation] = useState<number>(0)
    
    return(
        <main>
        </main>
    )
}