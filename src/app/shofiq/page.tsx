"use client";

import { useGetProjectsCatchallQuery } from "@/feature/projectCreate/projectCreateSlice";

type Project = {
  projectId: string;
  projectName: string;
  projectDescription: string;
};

export default function ProjectCards() {
  // This component will render a grid of project cards.

  const { data: projects } = useGetProjectsCatchallQuery("un");
  console.log(projects?.data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects?.data.map((project: Project) => (
        <div
          key={project.projectId}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold">{project.projectName}</h3>
          <p className="text-gray-600">{project.projectDescription}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
