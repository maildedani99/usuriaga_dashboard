import Image from "next/image";


export default function Navbar () {


    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex w-full items-center ">
            <Image src="/logogrisprueba.png" width={250} height={150} alt='logo' className='mx-auto p-1'/>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}