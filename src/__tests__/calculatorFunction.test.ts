import { calculateQuery } from "../functions/calculatorFunction";

describe("calculateQuery function", () => {
    test("When passed an array with a single number, function returns that number", () => {
        const calculatorFunction = calculateQuery([5])

        expect(calculatorFunction).toBe(5)
    })
    test("When passed two numbers and a maths operator, function can return the calculated value", () => {
        const multiplication = calculateQuery([5, "*", 5])
        const division = calculateQuery([5, "/", 5])
        const subtraction = calculateQuery([5, "-", 5])
        const addition = calculateQuery([5, "+", 5])

        expect(multiplication).toBe(25)
        expect(division).toBe(1)
        expect(subtraction).toBe(0)
        expect(addition).toBe(10)
    })
    test("Function can handle having more than two numbers put into the passed array", () => {
        const additon = calculateQuery([5, "+", 5, "+", 20])
        const subtraction = calculateQuery([20, "-", 5, "-", 5])
        const multiplication = calculateQuery([5, "*", 5, "*", 5])
        const division = calculateQuery([100, "/", 2, "/", 2])

        expect(additon).toBe(30)
        expect(subtraction).toBe(10)
        expect(multiplication).toBe(125)
        expect(division).toBe(25)
    })
    test("Function can be passed a query with two different operators and adhere to BIDMAS", () => {
        const query1 = calculateQuery([10, "+", 2, "*", 10])
        const query2 = calculateQuery([10, "/", 2, "-", 2])
        const query3 = calculateQuery([10, "*", 2, "+", 5, "*", 2])
        const query4 = calculateQuery([10, "+", 8, "/", 4, "+", 5])

        expect(query1).toBe(30)
        expect(query2).toBe(3)
        expect(query3).toBe(30)
        expect(query4).toBe(17)
    })
    test("Complex querys of any length can accurately be computed by the function while still following BIDMAS", () => {
        const query1 = calculateQuery([1000, "-", 999, "*", 500, "*", 5, "*", 5])
        const query2 = calculateQuery([9999, "*", 32, "/", 4, "+", 6000, "/", 32, "-", 300, "/", 2])
        const query3 = calculateQuery([5000, "+", 6000, "/", 20, "*", 5, "+", 400, "/", 5, "*", 2])
        const query4 = calculateQuery([56, "*", 20, "*", 32, "/", 9, "*", 32657, "/", 2, "*", 5])

        expect(query1).toBe(-12486500)
        expect(query2).toBe(80029.5)
        expect(query3).toBe(6660)
        expect(query4).toBe(325118577.777777778)
    })
})