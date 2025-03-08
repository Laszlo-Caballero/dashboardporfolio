import { DownloadIcon } from "@/Assets/DownloadIcon";
import { TrashIcon } from "@/Assets/TrashIcon";
import { env } from "@/Config/Env";
import { useUser } from "@/Context/UserContext";
import axios from "axios";
import { Button, Modal, useDrop, useMutation } from "componentsla";
import { useState } from "react";
import Load from "../Load/Load";
interface ModalUploadProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function ModalUpload({ onClose, open }: ModalUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const { ParentProps } = useDrop({
    captureFile(file) {
      setFiles((prev) => [...prev, ...file]);
    },
  });

  const { user } = useUser();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ files }: { files: File[] }) => {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          await axios.post(`${env.urlBackNest}/files`, formData, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
        })
      );
    },
    onSuccess: () => {
      setFiles([]);
      onClose(false);
    },
  });

  return (
    <Modal open={open} setIsOpen={onClose}>
      {isLoading && <Load />}

      <div className="w-2xl h-[550px] py-2 bg-white flex items-center flex-col rounded-lg shadow-sm dark:bg-gray-700">
        <div className="p-6 space-y-4 h-full  w-full">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Upload image
          </h1>
          <div className="w-full h-full" {...ParentProps()}>
            {files.length == 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <DownloadIcon className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center py-2"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full max-w-16 max-h-16 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 max-w-6 max-h-6 cursor-pointer"
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          className="text-white bg-blue-600 cursor-pointer"
          onClick={() => {
            if (files.length === 0) return;

            mutate({ files });
          }}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
}
