import Aside from "../components/Aside";




export default function Layout(props) {


    return (
        <div className= "flex  w-full  mt-60 " >
            <Aside />
            <div className="w-[255px] bg-red-500"></div>
            {props.children}
          

        </div>
    )
}