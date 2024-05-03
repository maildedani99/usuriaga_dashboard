
export default function Modal({ children }) {


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" >
            <div className="bg-white p-20 rounded-8 container h-[90%] overflow-auto">
                {children}
            </div>
        </div>
    )
}



