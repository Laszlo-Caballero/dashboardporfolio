import Load from "@/Components/Shared/Load/Load";
import { env } from "@/Config/Env";
import { ProyectResponsive, Responsive } from "@/Interfaces/types";
import axios from "axios";
import { useQuery, Table } from "componentsla";
import { Link } from "react-router";

export default function Proyects() {
  const { data, isLoading, isError } = useQuery<
    Responsive<ProyectResponsive[]>
  >({
    queryFn: async () => {
      const res = await axios.get(`${env.urlBackNest}/proyects`);
      return res.data;
    },
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
    <div className="w-full h-full p-6">
      <Table
        className={{
          table:
            "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
          header: {
            thead:
              "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
            th: "px-6 py-3",
          },
          body: {
            tr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200",
            td: "h-full px-6 py-4",
          },
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
            header: "Image Principal",
            cell({ row }) {
              return (
                <img src={row.urlImage} alt={row.title} className="w-20 h-20" />
              );
            },
          },
          {
            header: "Technologies",
            cell({ row }) {
              return (
                <div className="flex items-center w-full gap-x-2">
                  {row.tecnologies.map((values) => {
                    return (
                      <span className="bg-sky-950 w-[100px] justify-center gap-x-2  rounded-full py-2 flex items-center">
                        <img
                          src={values.urlImage}
                          alt={values.name}
                          className="w-6 h-6"
                        />
                        {values.name}
                      </span>
                    );
                  })}
                </div>
              );
            },
          },
          {
            header: "Actions",
            cell({ row }) {
              return (
                <div className="flex items-center justify-center">
                  <Link
                    to={`/proyects/${row.proyectId}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                    Remove
                  </button>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}
