import Aside from "../components/Aside";
import AuthGuard from "../components/AuthGuard";




export default function Layout(props) {


    return (
        <div className="flex  w-full  mt-60 " >
            <Aside />
            <div className="w-[255px] bg-red-500"></div>
            <AuthGuard >
                {props.children}
            </AuthGuard>


        </div>
    )
}