"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useCreateProjectMutation } from "@/feature/projectCreate/projectCreateSlice";
import { IProject } from "@/types/project";

const formSchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  projectId: z.string().min(1, "Project ID is required"),
  clientId: z.string().min(1, "Client ID is required"),
  station: z.string().min(1, "Source Station is required"),
  projectValue: z.number().min(0, "Project value amount is required"),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  projectDescription: z.string().optional(), // New optional field
});

type FormData = z.infer<typeof formSchema>;

export default function ProjectCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectId: "",
      clientId: "",
      station: "",
      projectValue: undefined,
      deadline: "",
      projectDescription: "", // Default value for new field
    },
  });

  const [createProject, { isLoading, isError, error }] =
    useCreateProjectMutation();

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    const projectData: Omit<
      IProject,
      "_id" | "notes" | "createdAt" | "updatedAt"
    > = {
      ...data,
      projectValue: data.projectValue || 0,
      cancellationNote: null,
      teamName: null,
      frontendRoleAssignedTo: null,
      backendRoleAssignedTo: null,
      uiRoleAssignedTo: null,
      lastUpdate: null,
      lastMeeting: null,
      projectStatus: "new",
      estimatedDelivery: null,
      rating: null,
      clientStatus: null,
      figmaLink: null,
      backendLink: null,
      liveLink: null,
      deliveryDate: null,
      requirementDoc: null,
      notes: [],
    };

    try {
      const result = await createProject(projectData).unwrap();
      console.log("Project created:", result);
      toast.success("Project created successfully!");
      reset();
    } catch (err) {
      toast.error((err as any)?.data?.message || "Failed to create project");
    }
  };

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-semibold ml-3 lg:ml-8 mt-5">
        Project Create
      </h1>
      <div className="bg-white shadow-md px-6 mx-3 lg:mx-8 rounded-xl py-4 lg:py-6 mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full items-center gap-3"
        >
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            className="mt-2 p-5 mb-4 lg:mb-6"
            type="text"
            id="projectName"
            placeholder="Project Name"
            {...register("projectName")}
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName.message}</p>
          )}
          <Label htmlFor="projectId">Project ID</Label>
          <Input
            className="mt-2 p-5 mb-4 lg:mb-6"
            type="text"
            id="projectId"
            placeholder="Enter your Project Id"
            {...register("projectId")}
          />
          {errors.projectId && (
            <p className="text-red-500 text-sm">{errors.projectId.message}</p>
          )}
          <div className="lg:flex justify-between space-x-12 w-full">
            <div className="w-full lg:w-1/2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                className="mt-2 p-5 mb-4 lg:mb-6"
                type="text"
                id="clientId"
                placeholder="Enter Client ID"
                {...register("clientId")}
              />
              {errors.clientId && (
                <p className="text-red-500 text-sm">
                  {errors.clientId.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              <Label htmlFor="station">Source Station</Label>
              <Input
                className="mt-2 p-5 mb-4 lg:mb-6"
                type="text"
                id="station"
                placeholder="Enter Source Station"
                {...register("station")}
              />
              {errors.station && (
                <p className="text-red-500 text-sm">{errors.station.message}</p>
              )}
            </div>
          </div>
          <div className="lg:flex justify-between space-x-12 w-full">
            <div className="w-full lg:w-1/2">
              <Label htmlFor="deadline">Project Deadline</Label>
              <Input
                className="mt-2 p-5 mb-4 lg:mb-6"
                type="date"
                id="deadline"
                {...register("deadline")}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              <Label htmlFor="projectValue">Project Value</Label>
              <Input
                className="mt-2 p-5 mb-4 lg:mb-6"
                type="number"
                id="projectValue"
                placeholder="Enter Project Value"
                {...register("projectValue", { valueAsNumber: true })}
              />
              {errors.projectValue && (
                <p className="text-red-500 text-sm">
                  {errors.projectValue.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Label htmlFor="projectDescription">Project Description</Label>
            <textarea
              className="mt-2 p-5 h-28 mb-4 lg:mb-6 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="projectDescription"
              placeholder="Enter Project Description"
              {...register("projectDescription")}
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-sm">
                {errors.projectDescription.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-4 lg:space-x-8 w-full">
            <Button
              className="px-4 lg:px-10 py-2 lg:py-5 bg-green-500 text-white hover:bg-green-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Project"}
            </Button>
            <Button
              className="px-4 lg:px-10 py-2 lg:py-5"
              variant="destructive"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          </div>
          {isError && (
            <p className="text-red-500 mt-2">
              Error:{" "}
              {(error as any)?.data?.message || "Failed to create project"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
