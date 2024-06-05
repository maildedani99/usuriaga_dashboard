import { useRouter } from "next/navigation"

export default function AcceptButton ({ message, isDisabled = false}) {

  const router = useRouter()

  const onAccept = () => {
    router.back()
  }

    return (
      <button
      onClick={onAccept}
      type="btn"
      className={`inline-flex items-center px-8 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white rounded-lg focus:ring-4 mx-auto ${
        !isDisabled ? 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-200 dark:focus:ring-primary-900' : 'bg-gray-400 cursor-not-allowed'
      }`}
      disabled={isDisabled}
    >
      {message}
      </button>
    )
}