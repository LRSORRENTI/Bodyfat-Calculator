'use client'
import { BFCalcForm } from "@/components/BFCalcForm";
import FormCalc from '@/components/FormCalc'

export default function Home() {
  return (
    <>
   <div className="flex justify-center align-middle mt-20 ">
   {/* <BFCalcForm/> */}
   <FormCalc/>
   </div>
   </>
  );
}
