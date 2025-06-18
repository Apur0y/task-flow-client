"use client";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "@/feature/projectCreate/projectCreateSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type ProjectFormData = {
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  deadline: string;
  projectValue: number;
  projectDescription: string;
  projectStatus: string;
  estimatedDelivery: string;
};

export default function ProjectListPage() {
  const [createProject, { isLoading, isError, error }] =
    useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      projectId: "",
      projectName: "",
      station: "",
      clientId: "",
      deadline: "",
      projectValue: 0,
      projectDescription: "",
      projectStatus: "new",
      estimatedDelivery: "thisWeek",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createProject(data).unwrap();
      toast.success("Project created successfully");
      console.log("Project created successfully");
      reset(); // Reset form after successful submission
    } catch (err) {
      toast.error("Failed to create project");
      console.error("Failed to create project:", err);
    }
  };

  // Reset form fields and errors
  const handleReset = () => {
    reset(); // Use react-hook-form's reset method
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
            placeholder="e.g., Perry Rodgers"
            {...register("projectName", {
              required: "Project Name is required",
            })}
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName.message}</p>
          )}
          <Label htmlFor="projectId">Project ID</Label>
          <Input
            className="mt-2 p-5 mb-4 lg:mb-6"
            type="text"
            id="projectId"
            placeholder="e.g., PRJ124"
            {...register("projectId", { required: "Project ID is required" })}
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
                placeholder="e.g., CLI124"
                {...register("clientId", { required: "Client ID is required" })}
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
                placeholder="e.g., Rem in odio deserunt"
                {...register("station", {
                  required: "Source Station is required",
                })}
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
                type="datetime-local"
                id="deadline"
                {...register("deadline", { required: "Deadline is required" })}
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
                placeholder="e.g., 200000"
                {...register("projectValue", {
                  required: "Project Value is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Value must be positive" },
                })}
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
              placeholder="e.g., Let me know if you want it spaced out (40-50 chars)"
              {...register("projectDescription", {
                required: "Description is required",
              })}
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-sm">
                {errors.projectDescription.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="projectStatus">Project Status</Label>
            <select
              className="mt-2 p-5 mb-4 lg:mb-6 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="projectStatus"
              {...register("projectStatus", { required: "Status is required" })}
            >
              <option value="new">New</option>
              <option value="ui/ux">UI/UX</option>
              <option value="wip">WIP</option>
              <option value="qa">QA</option>
              <option value="delivered">Delivered</option>
              <option value="revision">Revision</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.projectStatus && (
              <p className="text-red-500 text-sm">
                {errors.projectStatus.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
            <select
              className="mt-2 p-5 mb-4 lg:mb-6 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="estimatedDelivery"
              {...register("estimatedDelivery", {
                required: "Estimated Delivery is required",
              })}
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="nextMonth">Next Month</option>
            </select>
            {errors.estimatedDelivery && (
              <p className="text-red-500 text-sm">
                {errors.estimatedDelivery.message}
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
              onClick={handleReset}
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
