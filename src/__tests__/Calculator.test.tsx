import { render, fireEvent } from "@testing-library/react";
import { Calculator } from "../components/Calculator";
import { clear } from "console";

describe("Calculator component display rendering", () => {
    test("When calculator buttons are clicked, this should add a number into state", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton = getByRole("button", {name: "2"})

        fireEvent.click(numberButton)

        const query = getByTestId("query").textContent;

        expect(query).toBe("2")
    })
    test("Calculator buttons can insert multiple numbers into state", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})

        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)

        const query = getByTestId("query").textContent;

        expect(query).toBe("123")
    })
    test("Calculator buttons can produce and display a simple maths operation", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const additionButton = getByRole("button", {name: "+"})
        const numberButton2 = getByRole("button", {name: "2"})

        fireEvent.click(numberButton1)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton2)
        
        const query = getByTestId("query").textContent;

        expect(query).toBe("1+2")
    })
    test("Calculator can display a maths operation that will be made up of numbers with lengths greater than one", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const additionButton = getByRole("button", {name: "+"})

        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)

        const query = getByTestId("query").textContent;

        expect(query).toBe("123+123")
    })
    test("Calculator can display complex maths queries with multiple operators", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const numberButton4 = getByRole("button", {name: "4"})
        const numberButton5 = getByRole("button", {name: "5"})
        const numberButton6 = getByRole("button", {name: "6"})
        const additionButton = getByRole("button", {name: "+"})
        const multiplicationButton = getByRole("button", {name: "x"})
        const subtractionButton = getByRole("button", {name: "-"})

        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton1)
        fireEvent.click(numberButton6)
        fireEvent.click(multiplicationButton)
        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton5)
        fireEvent.click(subtractionButton)
        fireEvent.click(numberButton4)

        const query = getByTestId("query").textContent;

        expect(query).toBe("123+16*125-4")
    })
    test("Calculator display can display floating point numbers correctly", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const decimalPoint = getByRole("button", {name: "."})

        fireEvent.click(numberButton1)
        fireEvent.click(decimalPoint)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)

        const query = getByTestId("query").textContent;

        expect(query).toBe("1.23")
    })
    test("Calculator can form queries with multiple floating point numbers", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const decimalPoint = getByRole("button", {name: "."})
        const additionButton = getByRole("button", {name: "+"})

        fireEvent.click(numberButton1)
        fireEvent.click(decimalPoint)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton2)
        fireEvent.click(decimalPoint)
        fireEvent.click(numberButton3)

        const query = getByTestId("query").textContent;

        expect(query).toBe("1.23+2.3")
    })
    test("The CE button clears the currently forming number entry", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const additionButton = getByRole("button", {name: "+"})
        const clearExpression = getByRole("button", {name: "CE"})

        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(clearExpression)

        const query = getByTestId("query").textContent;

        expect(query).toBe("123+")
    })
    test("The C button clears the current calculator query entirely", () => {
        const {getByTestId, getByRole} = render(<Calculator />)
        const numberButton1 = getByRole("button", {name: "1"})
        const numberButton2 = getByRole("button", {name: "2"})
        const numberButton3 = getByRole("button", {name: "3"})
        const additionButton = getByRole("button", {name: "+"})
        const clearAll = getByRole("button", {name: "C"})

        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(additionButton)
        fireEvent.click(numberButton1)
        fireEvent.click(numberButton2)
        fireEvent.click(numberButton3)
        fireEvent.click(clearAll)

        const query = getByTestId("query").textContent;

        expect(query).toBe("")
    })
})