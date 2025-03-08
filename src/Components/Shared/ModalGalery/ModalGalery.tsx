import { useUser } from "@/Context/UserContext";
import { ImagesResponsive, Responsive } from "@/Interfaces/types";
import axios from "axios";
import { Modal, useQuery } from "componentsla";
import Load from "../Load/Load";
import { env } from "@/Config/Env";
import { useState } from "react";
import { TrashIcon } from "@/Assets/TrashIcon";

export default function ModalGalery({
  onClose,
  open,
  onSucess,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  onSucess?: (url: string) => void;
}) {
  const { user } = useUser();
  const [selected, setSelected] = useState("");

  const { data, isLoading, isError } = useQuery<Responsive<ImagesResponsive[]>>(
    {
      queryFn: async () => {
        const res = await axios.get(`${env.urlBackNest}/files`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        return res.data;
      },
    }
  );

  if (isLoading) {
    return <Load />;
  }

  if (!data || isError) {
    return (
      <div className="w-full h-full p-6">
        <h1 className="text-2xl font-semibold text-red-500 dark:text-red-400">
          Error
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Error al cargar los datos
        </p>
      </div>
    );
  }

  return (
    <Modal open={open} setIsOpen={onClose}>
      <div className="w-2xl h-[550px] py-2 bg-white flex items-center flex-col rounded-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between w-full py-6 px-10">
          <h3 className="text-2xl text-white font-medium">Galery</h3>

          <button
            className="bg-blue-600 font-medium text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
        <div className="w-full overflow-y-scroll overflow-x-hidden">
          <div className="w-full grid grid-cols-4  gap-4 place-items-center ">
            {data.body.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center relative"
                onClick={() => {
                  setSelected(image.url);
                }}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-contain"
                />
                {selected === image.url && (
                  <div
                    className="bg-blue-950 p-2 rounded-xl cursor-pointer left-1/2 absolute translate-x-full bottom-1/2 -translate-y-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected("");
                    }}
                  >
                    <TrashIcon className="text-white w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          className="bg-blue-600 font-medium text-white px-4 py-2 rounded-lg cursor-pointer mt-4"
          onClick={() => {
            onClose(false);
            onSucess?.(selected);
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
