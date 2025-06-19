import React from 'react';
import { AlertTriangle } from 'lucide-react'; // Optional: if you're using Lucide or any icon lib

export default function TeamAccessRequired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4 text-yellow-500">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Team Access Required
        </h2>
        <p className="mt-2 text-gray-600">
          You have to be in a team to access the Dashboard.
        </p>
      </div>
    </div>
  );
}
