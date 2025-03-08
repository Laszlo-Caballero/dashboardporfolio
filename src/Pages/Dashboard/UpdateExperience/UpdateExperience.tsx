import { Input } from "@/Components/Ui/Input/Input";
import { TextArea } from "@/Components/Ui/TextArea/TextArea";
import {
  ExperienceBody,
  ExperienceResponsive,
  Responsive,
} from "@/Interfaces/types";
import { ExperienceSchema } from "./Schema/Experience.schema";
import isEmpty from "@/utils/is-empty";
import { Toast, useMutation, useQuery, ValidateReturn } from "componentsla";
import ButtonGroup from "@/Components/Ui/ButtonGroup/ButtonGroup";
import ButtonGruopItem from "@/Components/Ui/ButtonGroupItem/ButtonGruopItem";
import { PlusIcon } from "@/Assets/PlusIcon";
import { PhotoIcon } from "@/Assets/PhotoIcon";
import { useForm } from "@/hooks/useForms";
import { useEffect, useRef, useState } from "react";
import ModalGalery from "@/Components/Shared/ModalGalery/ModalGalery";
import { useUser } from "@/Context/UserContext";
import { uploadFile } from "@/Services/UploadFile";
import { env } from "@/Config/Env";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Load from "@/Components/Shared/Load/Load";

export default function UpdateExperience() {
  const [open, setOpen] = useState({
    open: false,
    type: "",
  });

  const params = useParams<{ id: string }>();

  const {
    data,
    isLoading: isLoadingData,
    isError,
  } = useQuery<Responsive<ExperienceResponsive>>({
    queryFn: async () => {
      const res = await axios.get(`${env.urlBackNest}/experience/${params.id}`);
      return res.data;
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  const { register, errors, handleSubmit, setValue, setValuesForm } =
    useForm<ExperienceBody>({
      zodSchema: ExperienceSchema,
      initialValues: {
        company: "",
        description: "",
        time: "",
        title: "",
        image: {
          file: undefined,
          url: "",
        },
      },
      validate(data) {
        const errors: ValidateReturn<ExperienceBody> = {};

        if (data.image.file === undefined && isEmpty(data.image.url)) {
          console.log("no valida");
          errors.image = "Image is required";
        }
        return errors;
      },
    });

  useEffect(() => {
    if (data?.body) {
      const { title, company, description, time, urlImage } = data.body;

      setValuesForm({
        title,
        company,
        description,
        time,
        image: {
          file: undefined,
          url: urlImage,
        },
      });
    }
  }, [data?.body]);

  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ExperienceBody) => {
      let file = "";

      if (data.image.file) {
        file = await uploadFile(data.image.file, user?.token);
      } else {
        file = data.image.url!;
      }

      await axios.patch(
        `${env.urlBackNest}/experience/${params.id}`,
        {
          title: data.title,
          description: data.description,
          time: data.time,
          company: data.company,
          urlImage: file,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    },

    onSuccess: () => {
      navigate("/experience");
      Toast.success("Experience update");
    },
    onError: () => {
      Toast.error("Error update experience");
    },
  });

  if (isLoadingData) {
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
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="w-full max-w-1/2 flex flex-col gap-y-4"
        onSubmit={handleSubmit(mutate)}
      >
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create Experience
          </h2>
        </div>
        <input
          type="file"
          className="hidden"
          ref={ref}
          onChange={(e) => {
            if (e.target.files) {
              setValue("image", {
                url: "",
                file: e.target.files[0],
              });
            }
          }}
          multiple={false}
        />
        <Input
          label="Title"
          htmlFor="title"
          placeholder="Workstation"
          {...register("title")}
          error={errors.title}
        />
        <Input
          label="Company"
          htmlFor="company"
          placeholder="Google"
          {...register("company")}
          error={errors.company}
        />
        <Input
          label="Time"
          htmlFor="time"
          placeholder="2021 - 2022"
          {...register("time")}
          error={errors.time}
        />
        <TextArea
          label="Description"
          htmlFor="description"
          placeholder="Description"
          error={errors.description}
          onChange={(e) => setValue("description", e.target.value)}
          value={data.body.description}
        />
        <ButtonGroup error={errors.image}>
          <ButtonGruopItem
            type="button"
            icon={<PhotoIcon />}
            onClick={() => {
              setOpen({
                open: true,
                type: "galery",
              });
            }}
          >
            Galery Upload
          </ButtonGruopItem>
          <ButtonGruopItem
            type="button"
            icon={<PlusIcon />}
            onClick={() => {
              ref.current?.click();
            }}
          >
            Add Image
          </ButtonGruopItem>
        </ButtonGroup>

        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Create
        </button>
      </form>

      {open.open && (
        <ModalGalery
          open={open.open}
          onClose={(value) => setOpen({ open: value, type: "" })}
          onSucess={(value) => {
            setValue("image", {
              url: value,
              file: undefined,
            });
            setOpen({ open: false, type: "" });
          }}
        />
      )}

      {isLoading && <Load />}
    </div>
  );
}
