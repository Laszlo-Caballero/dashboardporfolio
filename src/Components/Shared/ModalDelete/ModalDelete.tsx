import { TrashIcon } from "@/Assets/TrashIcon";
import { env } from "@/Config/Env";
import { useUser } from "@/Context/UserContext";
import axios from "axios";
import { Modal, Toast, useMutation } from "componentsla";
import Load from "../Load/Load";

interface ModalDeleteProps {
  open?: boolean;
  id?: string;
  onClose?: (value: boolean) => void;
  url?: string;
}

export default function ModalDelete({
  id,
  onClose,
  open,
  url,
}: ModalDeleteProps) {
  const { user } = useUser();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`${env.urlBackNest}/${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      Toast.success("Eliminado correctamente");
      onClose?.(false);
    },
    onError: () => {
      Toast.error("Error al eliminar");
    },
  });
  return (
    <Modal setIsOpen={onClose} open={open}>
      <div className="bg-gray-700 w-xl  rounded-xl flex items-center justify-center flex-col gap-y-4">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 w-full">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Delete this element
          </h3>
          <TrashIcon className="w-10 h-10 text-red-500" strokeWidth={1} />

          <button
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onClose?.(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <h1 className="text-2xl text-gray-500 dark:text-gray-400 ">
          ¿Are you sure delete this element?
        </h1>

        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 w-full">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={mutate}
          >
            I accept
          </button>
          <button
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => onClose?.(false)}
          >
            Decline
          </button>
        </div>
      </div>

      {isLoading && <Load />}
    </Modal>
  );
}
