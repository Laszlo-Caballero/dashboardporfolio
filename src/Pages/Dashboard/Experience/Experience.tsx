import Load from "@/Components/Shared/Load/Load";
import ModalDelete from "@/Components/Shared/ModalDelete/ModalDelete";
import { env } from "@/Config/Env";
import { ExperienceResponsive, Responsive } from "@/Interfaces/types";
import axios from "axios";
import { Table, useQuery } from "componentsla";
import { useState } from "react";
import { Link } from "react-router";

export default function Experience() {
  const [open, setOpen] = useState({
    open: false,
    id: "",
  });

  const { data, isLoading, isError } = useQuery<
    Responsive<ExperienceResponsive[]>
  >({
    queryFn: async () => {
      const res = await axios.get(`${env.urlBackNest}/experience`);
      return res.data;
    },
    dependencies: [open],
  });

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
    <div className="w-full flex flex-col p-6">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Experience
        </h2>

        <Link
          to="create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500"
        >
          Create
        </Link>
      </div>

      <Table
        className={{
          table:
            " h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-hidden overflow-x-auto",
          header: {
            thead:
              "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
            th: "px-6 py-3",
          },
          body: {
            tr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200",
            td: "h-full px-6 py-4 max-w-[500px] truncate",
          },
          container: "overflow-y-auto relative",
        }}
        data={data.body}
        columns={[
          {
            header: "Title",
            cell({ row }) {
              return (
                <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.title}
                </span>
              );
            },
          },
          {
            header: "Description",
            cell({ row }) {
              return (
                <span className="max-w-[100px] text-wrap truncate">
                  {row.description}
                </span>
              );
            },
          },
          {
            header: "Company Image",
            cell({ row }) {
              return (
                <img
                  src={row.urlImage}
                  alt={row.title}
                  className="max-w-20 object-cover"
                />
              );
            },
          },
          {
            header: "Company",
            cell({ row }) {
              return (
                <span className="font-medium flex items-center justify-center text-gray-900 whitespace-nowrap dark:text-white ">
                  {row.company}
                </span>
              );
            },
          },
          {
            header: "Time",
            accessorKey: "time",
          },
          {
            header: "Actions",
            cell({ row }) {
              return (
                <div className="flex items-center justify-center">
                  <Link
                    to={`/experience/${row.experienceId}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    onClick={() => {
                      setOpen({ open: true, id: row.experienceId });
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            },
          },
        ]}
      />

      <ModalDelete
        open={open.open}
        onClose={(value) => {
          setOpen({
            id: "",
            open: value,
          });
        }}
        id={open.id}
        url="experience"
      />
    </div>
  );
}
