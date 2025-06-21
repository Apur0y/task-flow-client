"use client";

import { useState, useEffect } from "react";
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
import {
  useCancelProjectMutation,
  useGetProjectsCatchallQuery,
  useUpdateProjectMutation,
} from "@/feature/projectCreate/projectCreateSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Edit, X, Eye } from "lucide-react"; // Shadcn/Lucide icons
import AddIcon from "@mui/icons-material/Add";

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

type DetailData = {
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  deadline: string;
  projectValue: number;
  cancellationNote?: string;
  frontendRoleAssignedTo: string;
  backendRoleAssignedTo: string;
  uiRoleAssignedTo: string;
  lastUpdate: string;
  lastMeeting: string;
  projectStatus: string;
  estimatedDelivery: string;
  rating: string;
  clientStatus: string;
  figmaLink: string;
  backendLink: string;
  liveLink: string;
  deliveryDate: string;
  requirementDoc: string;
  projectDescription: string;
  notes: { noteProvider: string; noteText: string }[];
};

export default function ProjectCards() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsCatchallQuery("un");
  const [activeTab, setActiveTab] = useState("all");
  const [cancelProjectId, setCancelProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<DetailData | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  console.log("Projects Data:", projects?.data);

  const filteredProjects =
    activeTab === "all"
      ? projects?.data || []
      : projects?.data?.filter(
          (project: Project) => project.projectStatus === activeTab
        ) || [];

  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<FormData>();

  const [updateProject] = useUpdateProjectMutation();

  const handleUpdate = async (data: FormData) => {
    const projectId = getValues("projectId");
    if (!projectId) return toast.error("Project ID missing");

    const updateData = { ...data };
    delete updateData.cancellationNote;

    try {
      await updateProject({ projectId, data: updateData }).unwrap();
      toast.success("Project updated successfully");
      reset();
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Update error:", error);
    }
  };

  const [cancelProject] = useCancelProjectMutation();

  const handleCancel = async (data: { cancellationNote: string }) => {
    if (!cancelProjectId) return toast.error("No project selected to cancel");

    try {
      await cancelProject({
        projectId: cancelProjectId,
        cancellationNote: data.cancellationNote,
      }).unwrap();
      toast.success("Project cancelled successfully");
      setCancelProjectId(null);
    } catch (error) {
      toast.error("Failed to cancel project");
      console.error("Cancel error:", error);
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

  const openDetailsModal = (project: Project) => {
    console.log("Opening Details Modal for:", project.projectId);
    console.log("Available Projects Data:", projects?.data);
    const fullProject = projects?.data?.find(
      (p: Project) => p.projectId === project.projectId
    );
    if (fullProject) {
      console.log("Found Project:", fullProject);
      const detailedData: DetailData = {
        projectId: fullProject.projectId,
        projectName: fullProject.projectName,
        station: fullProject.station || "N/A",
        clientId: fullProject.clientId || "N/A",
        deadline: fullProject.deadline || "N/A",
        projectValue: fullProject.projectValue || 0,
        cancellationNote: fullProject.cancellationNote || "N/A",
        frontendRoleAssignedTo: "John Doe",
        backendRoleAssignedTo: "Jane Smith",
        uiRoleAssignedTo: "Alice Brown",
        lastUpdate: "2025-07-10T14:00:00.000Z",
        lastMeeting: "2025-07-08T11:00:00.000Z",
        projectStatus: fullProject.projectStatus,
        estimatedDelivery: fullProject.estimatedDelivery,
        rating: "noRating",
        clientStatus: "active",
        figmaLink: "https://www.figma.com/file/example",
        backendLink: "https://github.com/example/backend",
        liveLink: "https://example.com/project",
        deliveryDate: "2025-09-15T00:00:00.000Z",
        requirementDoc: "https://docs.google.com/document/d/example",
        projectDescription: fullProject.projectDescription,
        notes: [
          {
            noteProvider: "manager@example.com",
            noteText: "Make sure to complete UI by the end of this sprint.",
          },
          {
            noteProvider: "client@example.com",
            noteText: "Add integration with third-party health APIs.",
          },
        ],
      };
      setSelectedProject(detailedData);
      setIsDetailsOpen(true); // Explicitly open the modal
    } else {
      console.error("Project not found in data for ID:", project.projectId);
    }
  };

  useEffect(() => {
    console.log("Selected Project updated:", selectedProject);
  }, [selectedProject]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <h2 className="text-2xl font-semibold my-4">Project List</h2>
      <div className="bg-white  border border-gray-200 p-2 rounded-md mb-6 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap space-y-2 space-x-2 md:space-x-4 text- overflow-x-auto">
          {[
            "all",
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
              className={`px-4 py-2 rounded ${activeTab === tab ? "text-[#006666] underline underline-offset-4" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Create New Project Button */}
        <div className="">
          <a href="Projects/create-project" className="float-right">
            <Button className="bg-[#006666] text-white hover:bg-green-900  flex items-center">
              <AddIcon />
              Create New Project
            </Button>
          </a>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {isLoading ? (
            <p className="text-gray-500 text-lg">Loading projects...</p>
          ) : isError ? (
            <p className="text-red-500 text-lg">
              Error loading projects. Please try again.
            </p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project: Project) => (
              <motion.div
                key={project.projectId}
                className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl p-6 border border-gray-200"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ minHeight: "250px" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className=" text-md md:text-xl font-bold text-gray-800 bg-blue-100 px-3 py-1 w-fit rounded-full">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-600 text-md my-2 break-words overflow-hidden line-clamp-3">
                      {project.projectDescription}
                    </p>
                    <div className="space-y-2 ">
                      <p className="text-gray-700 text-md">
                        <span className="text-md ">ID:</span>{" "}
                        {project.projectId}
                      </p>

                      <p className="text-gray-500 text-md">
                        <span className="text-md">Deadline:</span>{" "}
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-500 text-md mt-2">
                      Delivery: {project.estimatedDelivery}
                    </p>
                    <p className="text-gray-700 text-md mt-2">
                      <span className="text-md ">Value:</span> $
                      {project.projectValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {project.projectStatus.toLowerCase() !== "cancelled" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:bg-blue-50"
                              onClick={() => openUpdateModal(project)}
                            >
                              <Edit className="h-5 w-5" />
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
                                <Label htmlFor="projectName">
                                  Project Name
                                </Label>
                                <Input
                                  id="projectName"
                                  {...register("projectName", {
                                    required: true,
                                  })}
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
                                <Label htmlFor="projectValue">
                                  Project Value
                                </Label>
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
                                <Label htmlFor="projectDescription">
                                  Description
                                </Label>
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
                                  {...register("projectStatus", {
                                    required: true,
                                  })}
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
                                  {...register("estimatedDelivery", {
                                    required: true,
                                  })}
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
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => openCancelModal(project.projectId)}
                            >
                              <X className="h-5 w-5" />
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
                                  {...register("cancellationNote", {
                                    required: true,
                                  })}
                                />
                              </div>
                              <Button
                                type="submit"
                                onClick={handleSubmit((data) =>
                                  handleCancel({
                                    cancellationNote:
                                      data.cancellationNote ?? "",
                                  })
                                )}
                              >
                                Confirm Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    <Dialog
                      open={isDetailsOpen}
                      onOpenChange={setIsDetailsOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:bg-gray-50"
                          onClick={() => {
                            openDetailsModal(project);
                            console.log(
                              "Selected Project after open:",
                              selectedProject
                            ); // Debug log
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Project Details</DialogTitle>
                          <DialogDescription>
                            View all details of the selected project.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                          {selectedProject && (
                            <>
                              <div>
                                <Label>Project ID</Label>
                                <Input
                                  value={selectedProject.projectId}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Project Name</Label>
                                <Input
                                  value={selectedProject.projectName}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Station</Label>
                                <Input
                                  value={selectedProject.station}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Client ID</Label>
                                <Input
                                  value={selectedProject.clientId}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Deadline</Label>
                                <Input
                                  value={selectedProject.deadline}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Project Value</Label>
                                <Input
                                  value={selectedProject.projectValue}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Cancellation Note</Label>
                                <Input
                                  value={selectedProject.cancellationNote}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Frontend Role Assigned To</Label>
                                <Input
                                  value={selectedProject.frontendRoleAssignedTo}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Backend Role Assigned To</Label>
                                <Input
                                  value={selectedProject.backendRoleAssignedTo}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>UI Role Assigned To</Label>
                                <Input
                                  value={selectedProject.uiRoleAssignedTo}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Last Update</Label>
                                <Input
                                  value={selectedProject.lastUpdate}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Last Meeting</Label>
                                <Input
                                  value={selectedProject.lastMeeting}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Project Status</Label>
                                <Input
                                  value={selectedProject.projectStatus}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Estimated Delivery</Label>
                                <Input
                                  value={selectedProject.estimatedDelivery}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Rating</Label>
                                <Input
                                  value={selectedProject.rating}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Client Status</Label>
                                <Input
                                  value={selectedProject.clientStatus}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Figma Link</Label>
                                <Input
                                  value={selectedProject.figmaLink}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Backend Link</Label>
                                <Input
                                  value={selectedProject.backendLink}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Live Link</Label>
                                <Input
                                  value={selectedProject.liveLink}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Delivery Date</Label>
                                <Input
                                  value={selectedProject.deliveryDate}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Requirement Doc</Label>
                                <Input
                                  value={selectedProject.requirementDoc}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Project Description</Label>
                                <Input
                                  value={selectedProject.projectDescription}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label>Notes</Label>
                                {selectedProject.notes.map((note, index) => (
                                  <div key={index} className="mb-2">
                                    <p>
                                      <strong>{note.noteProvider}</strong>:{" "}
                                      {note.noteText}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">
              No projects found for {activeTab} status.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
