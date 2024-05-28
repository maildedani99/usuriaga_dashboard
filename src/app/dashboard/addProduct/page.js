import AddProductForm from "../../components/AddProductForm";
import { UploadPhotoProvider } from "../../lib/UploadPhotoContext";

export default function AddProduct() {
  return (
    <div className="flex w-full justify-center pb-20">
      <UploadPhotoProvider>
        <AddProductForm />
      </UploadPhotoProvider>
    </div>
  );
}
