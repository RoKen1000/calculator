import { FC, useState, useEffect } from "react";
import "../styles/CalculatorHistory.css"
import {v4 as uuid} from "uuid"

interface pastCalculations{
    pastCalculations: (number | string)[][]
}

export const CalculatorHistory: FC<pastCalculations> = ({pastCalculations}) => {

    return(
        <div className="calculator-history-section">
            <h2>Calculation History</h2>
            <div className="calculator-history-container">
                <ul className="calculator-history-list">
                    {pastCalculations.map((calculation) => {
                        return <li key={uuid()} data-testid="calcHistory"className="calculator-history-list-items">{calculation}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}