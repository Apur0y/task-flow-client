"use client";

import { useGetProjectsCatchallQuery } from "@/feature/projectCreate/projectCreateSlice";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const stripePromise = loadStripe("pk_test_your_publishable_key_here"); // Replace with your actual Stripe publishable key

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

export default function ClientProjects() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsCatchallQuery("un");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loginClientId, setLoginClientId] = useState<string | null>(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem("loginClientId");
    if (storedClientId) {
      setLoginClientId(storedClientId);
    } else {
      setLoginClientId("CLI001"); // Default value if not found
    }
  }, []);

  const clientProjects =
    projects?.data?.filter(
      (project: Project) => project.clientId === loginClientId
    ) || [];

  const handleDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handlePay = async (project: Project) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    const response = await fetch(
      "https://taskflow-server-pi.vercel.app/api/payment/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.projectId,
          amount: project.projectValue * 100, // Amount in cents
          clientId: loginClientId,
        }),
      }
    );

    const data = await response.json();
    console.log("API Response:", data); // Debug purpose

    if (response.ok && data.data && data.data.url) {
      window.location.href = data.data.url; // Redirect to Stripe Checkout URL
    } else {
      console.error(
        "Checkout session URL not received:",
        data.error || "Unknown error"
      );
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[1560px] mx-auto p-6 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6  pb-2">
          My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-gray-500 text-lg">Loading projects...</p>
          ) : isError ? (
            <p className="text-red-500 text-lg">
              Error loading projects. Please try again.
            </p>
          ) : clientProjects.length > 0 ? (
            clientProjects.map((project: Project) => (
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
                  <h3 className="text-md md:text-xl font-bold text-gray-800 bg-blue-100 px-3 py-1 rounded-full">
                    {project.projectName}
                  </h3>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      project.projectStatus.toLowerCase() === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {project.projectStatus}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {project.projectDescription}
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold ">ID:</span>{" "}
                    {project.projectId}
                  </p>
                  <p className="text-gray-700 text-md">
                    <span className="font-semibold ">Value:</span> $
                    {project.projectValue.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Deadline:</span>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => handleDetails(project)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className={`bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white transition-all ${
                      project.projectStatus.toLowerCase() === "cancelled"
                        ? "bg-gray-300 text-black opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handlePay(project)}
                    disabled={
                      project.projectStatus.toLowerCase() === "cancelled"
                    }
                  >
                    Pay
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">
              No projects found for this client.
            </p>
          )}
        </div>

        {selectedProject && (
          <Dialog open={true} onOpenChange={() => setSelectedProject(null)}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Project Details
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                View the details of the selected project.
              </DialogDescription>
            </DialogHeader>
            <DialogContent className="max-w-2xl">
              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Project ID:</span>{" "}
                  {selectedProject.projectId}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedProject.projectName}
                </p>
                <p className="text-gray-700 max-w-prose break-words">
                  <span className="font-semibold block">Description:</span>{" "}
                  {selectedProject.projectDescription}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Value:</span> $
                  {selectedProject.projectValue.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(selectedProject.deadline).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Estimated Delivery:</span>{" "}
                  {selectedProject.estimatedDelivery}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedProject.projectStatus}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
