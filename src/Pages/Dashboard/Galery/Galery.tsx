import { TrashIcon } from "@/Assets/TrashIcon";
import Load from "@/Components/Shared/Load/Load";
import ModalDelete from "@/Components/Shared/ModalDelete/ModalDelete";
import ModalUpload from "@/Components/Shared/ModalUpload/ModalUpload";
import { env } from "@/Config/Env";
import { useUser } from "@/Context/UserContext";
import { ImagesResponsive, Responsive } from "@/Interfaces/types";
import axios from "axios";
import { useQuery } from "componentsla";
import { useState } from "react";

export default function Galery() {
  const { user } = useUser();

  const [open, setOpen] = useState({
    open: false,
    id: "",
  });

  const [openModal, setOpenModal] = useState(false);

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
      dependencies: [open.id, openModal],
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
    <div className="flex flex-col w-full h-full p-6">
      <div className="w-full flex in-checked: justify-between py-4">
        <h1 className="text-2xl text-white font-semibold">Galery</h1>
        <button
          className="bg-blue-600 font-medium text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Upload
        </button>
      </div>

      <div className="w-full grid grid-cols-7  gap-4 place-items-center">
        {data.body.map((image, index) => (
          <div
            key={index}
            className="w-32 h-32 flex items-center justify-center relative"
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-contain"
            />
            <div
              className="bg-blue-950 p-2 rounded-xl cursor-pointer left-1/2 absolute translate-x-full bottom-1/2 -translate-y-full"
              onClick={() => {
                setOpen({ open: true, id: image.name });
              }}
            >
              <TrashIcon className="text-white w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <ModalDelete
        open={open.open}
        onClose={(value) => setOpen({ open: value, id: "" })}
        id={open.id}
        url="files"
      />
      <ModalUpload open={openModal} onClose={setOpenModal} />
    </div>
  );
}
