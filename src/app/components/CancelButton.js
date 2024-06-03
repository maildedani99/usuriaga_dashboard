

export default function CancelButton ( { onClick, text} ) {

    return (
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700 mx-auto"
        >
          {text}
        </button>
    )
}