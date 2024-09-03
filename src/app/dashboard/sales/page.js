"use client"
import useSWR from "swr";
import Error from "../../components/Error";
import SalesForm from "../../components/SalesForm";
import { fetcher } from "../../utils/fetcher";


export default function Sales() {

    const { data: allStock, error :allStockError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}products/allStock`, fetcher);

    const { data: stock, error :stockError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}stock/all`, fetcher);

    const { data: sizesColors, error: sizesColorsError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}data/sizesColors`, fetcher);



    if (allStockError || stockError || sizesColorsError) return <Error />
    console.log(stock)


    return (
        allStock && stock &&
        <SalesForm allStock={allStock} stock={stock} sizesColors={sizesColors} />
    )
}