import { render, fireEvent, cleanup } from "@testing-library/react";
import { Calculator } from "../components/Calculator";
import { CalculatorHistory } from "../components/CalculatorHistory";

describe("CalculatorHistory rendering", () => {
    afterEach(cleanup)
    test("When a calculation is made, it sends the calculation query along with the answer to the CalculatorHistory component", () => {
        const {getAllByTestId, getByRole} = render(
        <>
            <Calculator/>
            <CalculatorHistory pastCalculations={[]}/>
        </>)
        const additionButton = getByRole("button", {name: "+"})
        const numberButton2 = getByRole("button", {name: "2"})
        const equalsButton = getByRole("button", {name: "="})

        fireEvent.click(numberButton2)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton2)
        fireEvent.click(equalsButton)

        const calcHistory = getAllByTestId("calcHistory");
        
        expect(calcHistory).toHaveLength(1)
        expect(calcHistory[0].textContent).toBe("2+2=4")
    })
    test("Multiple calculations can be sent into the CalculatorHistory component", () => {
        const {getAllByTestId, getByRole} = render(
        <>
            <Calculator/>
            <CalculatorHistory pastCalculations={[]}/>
        </>)
        const additionButton = getByRole("button", {name: "+"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton4 = getByRole("button", {name: "4"})
        const equalsButton = getByRole("button", {name: "="})

        fireEvent.click(numberButton2)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton2)
        fireEvent.click(equalsButton)
        fireEvent.click(numberButton4)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton4)
        fireEvent.click(equalsButton)

        const calcHistory = getAllByTestId("calcHistory");

        expect(calcHistory).toHaveLength(2)
        expect(calcHistory[0].textContent).toBe("2+2=4")
        expect(calcHistory[1].textContent).toBe("4+4=8")
    })
    test("If a single number is passed, then only that number will appear without any maths operators", () => {
        const {getAllByTestId, getByRole} = render(
        <>
            <Calculator/>
            <CalculatorHistory pastCalculations={[]}/>
        </>)
        
        const numberButton4 = getByRole("button", {name: "4"})
        const equalsButton = getByRole("button", {name: "="})

        fireEvent.click(numberButton4)
        fireEvent.click(equalsButton)

        const calcHistory = getAllByTestId("calcHistory");

        expect(calcHistory).toHaveLength(1)
        expect(calcHistory[0].textContent).toBe("4")
    })
})