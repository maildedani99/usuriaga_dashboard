"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { getMessageById } from "../lib/getMessage";
import CancelButton from "./CancelButton";
import AcceptButton from "./AceptButton";

export default function AlertModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageId = searchParams.get("messageId");
  const messageFetch = searchParams.get("messageFetch");

  const { message, type } = getMessageById(messageId);

  const textStyle = type === "success" ? "text-text" : "text-red-800";

  const onAccept = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg my-auto mx-4 max-w-xl w-full">
        <div className={`flex text-center p-6 font-semibold ${textStyle}`}>
          <p className="text-lg mx-auto">{message}</p>
        </div>
        <div className="text-md mx-auto text-black">
          {messageFetch}
        </div>
        <div className="flex p-4">
        <AcceptButton
            type="submit"
            message="Aceptar"
          />
        </div>
      </div>
    </div>
  );
}
