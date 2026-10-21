"use client"
import { useSearchParams } from "next/navigation"


export default function Bookingpage(){

    const params = useSearchParams();
    const id = params.get("id");
    return(<>
     <h1>{id && id}</h1></>)
}