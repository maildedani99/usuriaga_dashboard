import Aside from "../components/Aside";




export default function Layout(props) {


    return (
        <div className= "flex  w-full  mt-60 " >
            <Aside />
            <div className="w-[300px]"></div>
            {props.children}
          

        </div>
    )
}