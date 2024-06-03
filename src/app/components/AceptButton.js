
export default function AceptButton ({ onClick, text}) {

    return (
        <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-700 mx-auto"
      >
       {text}
      </button>
    )
}