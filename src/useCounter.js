import { useState } from "react";

export const useCounter = () => {
    const [makeCal , setMakeCal]= useState(0);

    const addNumber = () => {
        setMakeCal(makeCal+1)
    }
    const subNumber = () => {
        setMakeCal(makeCal-1)
    }
    const resetCal =() =>{
        setMakeCal(0)
    }

    return [makeCal , addNumber , subNumber , resetCal]
}