/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface FieldUploadProps {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}
const FieldUpload = ({ endpoint, onChange, value }: FieldUploadProps) => {
  const filetype = value?.split(".").pop();
  if (value && filetype !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} fill className="rounded-full" alt="" />
        <button
          onClick={() => onChange("")}
          type="button"
          className=" bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4 " />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
    />
  );
};

export default FieldUpload;
