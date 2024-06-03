

import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function AddButton({  link = "" }) {
  return (
    <Link
    href={link}
      type="button"
      className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-700"
    >
      <FaPlus />
    </Link>
  );
}
