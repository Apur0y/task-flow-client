export default function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Example Project Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold">Project Name</h3>
        <p className="text-gray-600">Project description goes here.</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          View Details
        </button>
      </div>
      {/* Add more project cards as needed */}
    </div>
  );
}
