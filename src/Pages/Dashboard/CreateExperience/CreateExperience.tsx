import { Input } from "@/Components/Ui/Input/Input";
import { TextArea } from "@/Components/Ui/TextArea/TextArea";
import { ExperienceBody } from "@/Interfaces/types";
import { ExperienceSchema } from "./Schema/Experience.schema";
import isEmpty from "@/utils/is-empty";
import { useForm, ValidateReturn } from "componentsla";

export default function CreateExperience() {
  const { register, errors, handleSubmit, setValue } = useForm<ExperienceBody>({
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

      if (data.image.file === undefined && !isEmpty(data.image.url)) {
        errors.image = "Image is required";
      }
      return errors;
    },
  });
  const onSubmit = (data: ExperienceBody) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="w-full max-w-1/2 flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create Experience
          </h2>
        </div>
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
        />

        <button
          type="submit"
          className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
}
