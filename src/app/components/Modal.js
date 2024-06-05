export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-4 md:p-20 rounded-lg max-h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
