"use client";

import { useGetProjectsCatchallQuery } from "@/feature/projectCreate/projectCreateSlice"; // Keep for initial data fetch
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type Project = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  station: string;
  clientId: string;
  deadline: string;
  projectValue: number;
  estimatedDelivery: string;
};

type FormData = {
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  deadline: string;
  projectValue: number;
  projectDescription: string;
  projectStatus: string;
  estimatedDelivery: string;
  cancellationNote?: string;
};

export default function ProjectCards() {
  const { data: projects, refetch } = useGetProjectsCatchallQuery("un"); // Added refetch
  const [activeTab, setActiveTab] = useState("ui/ux");
  const [cancelProjectId, setCancelProjectId] = useState<string | null>(null);

  console.log("Projects Data:", projects?.data);

  const filteredProjects =
    projects?.data?.filter(
      (project: Project) => project.projectStatus === activeTab
    ) || [];

  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<FormData>();

  const handleUpdate = async (data: FormData) => {
    console.log("Before Update - Form Data:", getValues()); // Debug before call
    const projectId = getValues("projectId"); // Ensure we get it from form
    console.log("Handling Update - Project ID:", projectId);

    const token = localStorage.getItem("accessToken"); // Update this with your token source
    console.log("Token Used:", token); // Debug token

    if (projectId) {
      try {
        const updateData = { ...data };
        delete updateData.cancellationNote; // Remove cancellationNote property if present
        const response = await axios.patch(
          `https://taskflow-server-pi.vercel.app/api/project/${projectId}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token
            },
          }
        );
        console.log("Update Result:", response.data);
        reset();
        refetch(); // Refetch data after successful update
      } catch (err) {
        console.error("Update Error:", err.response?.data || err.message);
      }
    } else {
      console.error("Project ID is undefined, check form input");
    }
  };

  const handleCancel = async (data: { cancellationNote: string }) => {
    console.log("Handling Cancel - Project ID:", cancelProjectId);
    console.log(
      "Cancel API Call URL:",
      `/api/project/${cancelProjectId}/cancel`
    );
    if (cancelProjectId) {
      try {
        const response = await axios.patch(
          `https://taskflow-server-pi.vercel.app/api/project/${cancelProjectId}/cancel`,
          {
            cancellationNote: data.cancellationNote,
            projectStatus: "cancelled",
          }
        );
        console.log("Cancel Result:", response.data);
        setCancelProjectId(null);
      } catch (err) {
        console.error("Cancel Error:", err.response?.data || err.message);
      }
    } else {
      console.error("Cancel Project ID is undefined");
    }
  };

  const openUpdateModal = (project: Project) => {
    console.log("Opening Update Modal for:", project.projectId);
    setValue("projectId", project.projectId);
    setValue("projectName", project.projectName);
    setValue("station", project.station);
    setValue("clientId", project.clientId);
    setValue("deadline", project.deadline);
    setValue("projectValue", project.projectValue);
    setValue("projectDescription", project.projectDescription);
    setValue("projectStatus", project.projectStatus);
    setValue("estimatedDelivery", project.estimatedDelivery);
  };

  const openCancelModal = (projectId: string) => {
    console.log("Opening Cancel Modal for:", projectId);
    setCancelProjectId(projectId);
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {[
          "ui/ux",
          "wip",
          "new",
          "qa",
          "delivered",
          "revision",
          "cancelled",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project: Project) => (
            <div
              key={project.projectId}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
              <p className="text-gray-600">{project.projectDescription}</p>
              <p className="text-sm text-gray-500">
                Status: {project.projectStatus}
              </p>
              <div className="mt-2 flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUpdateModal(project)}
                    >
                      ✏️ Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Project</DialogTitle>
                      <DialogDescription>
                        Update the details of the selected project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="projectId">Project ID</Label>
                        <Input
                          id="projectId"
                          {...register("projectId", { required: true })}
                          defaultValue={getValues("projectId") || ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          {...register("projectName", { required: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="station">Station</Label>
                        <Input
                          id="station"
                          {...register("station", { required: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="clientId">Client ID</Label>
                        <Input
                          id="clientId"
                          {...register("clientId", { required: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input
                          id="deadline"
                          type="datetime-local"
                          {...register("deadline", { required: true })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectValue">Project Value</Label>
                        <Input
                          id="projectValue"
                          type="number"
                          {...register("projectValue", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectDescription">Description</Label>
                        <Input
                          id="projectDescription"
                          {...register("projectDescription", {
                            required: true,
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectStatus">Status</Label>
                        <select
                          id="projectStatus"
                          {...register("projectStatus", { required: true })}
                        >
                          <option value="ui/ux">UI/UX</option>
                          <option value="wip">WIP</option>
                          <option value="new">New</option>
                          <option value="qa">QA</option>
                          <option value="delivered">Delivered</option>
                          <option value="revision">Revision</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="estimatedDelivery">
                          Estimated Delivery
                        </Label>
                        <select
                          id="estimatedDelivery"
                          {...register("estimatedDelivery", { required: true })}
                        >
                          <option value="thisWeek">This Week</option>
                          <option value="thisMonth">This Month</option>
                          <option value="nextMonth">Next Month</option>
                        </select>
                      </div>
                      <Button
                        type="submit"
                        onClick={handleSubmit(handleUpdate)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openCancelModal(project.projectId)}
                    >
                      🚫 Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Project</DialogTitle>
                      <DialogDescription>
                        Provide a reason to cancel the selected project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 space-y-4">
                      <div>
                        <Label htmlFor="cancellationNote">
                          Cancellation Note
                        </Label>
                        <Input
                          id="cancellationNote"
                          {...register("cancellationNote", { required: true })}
                        />
                      </div>
                      <Button
                        type="submit"
                        onClick={handleSubmit((data) =>
                          handleCancel({
                            cancellationNote: data.cancellationNote ?? "",
                          })
                        )}
                      >
                        Confirm Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No projects found for {activeTab} status.
          </p>
        )}
      </div>
    </div>
  );
}
