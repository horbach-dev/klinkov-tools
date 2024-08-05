import {parse} from "papaparse";

export const createArrayBetweenNumbers = (start, end) => Array.from({ length: (end - start)/1 }, (_, i) => start + i*1)

export const compareArraysForBar = (arr1, arr2) =>
    arr1.map(num => {
        const pair = arr2.find(pair => pair[1] === num)

        return pair ? pair : 0
    })

export const sumForBuyLine = (arr1, max) =>
    arr1.reduce((acc, curr) => {
        if (!acc.length) {
            return [max - curr]
        }
        const prev = acc[acc.length - 1]
        return [...acc, prev - curr]
    }, [])

export const sumForSellLine = (arr1) =>
    arr1.reduce((acc, curr) => {
        if (!acc.length) {
            return [...acc, curr]
        }
        const prev = acc[acc.length - 1]
        return [...acc, prev + curr]
    }, [])

export const compareForLine = (arr1, arr2) => {
    return arr1.map((item, i) => item + arr2[i])
}

export const setParsedData = (res: any) => {
    return parse(res.data).data
        .sort((q, w) => Number(q[1]) - Number(w[1]))
        .map(item => [item[0], +Number(item[1]).toFixed(0), +Number(item[2]).toFixed(0)])
}