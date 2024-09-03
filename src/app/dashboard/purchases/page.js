"use client"
import useSWR from "swr";
import Error from "../../components/Error";
import PurchasesForm from "../../components/PurchasesForm";
import { fetcher } from "../../utils/fetcher";
import Spinner from "../../components/Spinner";

export default function Purchases() {

  const { data: allData, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}data/all`, fetcher);

  if (error) return <Error />;

  console.log(allData)


  return (
    <div className="flex flex-col mx-auto w-8/12 min-h-[80vh]">
      {allData ?
        <PurchasesForm allData={allData} />
        :
        <Spinner />
      }
    </div>
  );
}
