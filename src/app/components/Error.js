import { BiSolidError } from "react-icons/bi";
import { ColorRing } from "react-loader-spinner";


export default function Error() {

    return (
        <div className="flex w-full  ">
            <div className="mx-auto">

                <BiSolidError size={200} color="#dac895" className="mx-auto" />
                <span className="text-primary text-3xl">Algo ha salido mal</span>
            </div>
        </div>

    )
}