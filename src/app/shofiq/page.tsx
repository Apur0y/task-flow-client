import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithLabel() {
  return (
    <div>
      <h1 className=" text-xl lg:text-3xl font-semibold ml-3 lg:ml-8 mt-5   ">
        Project Create
      </h1>
      <div className="bg-white shadow-md px-6 mx-3 lg:mx-8 rounded-xl py-4 lg:py-6 mt-4   ">
        <div className=" w-full    items-center gap-3">
          <Label htmlFor="email">Project Name</Label>
          <Input
            className="mt-2 p-5 mb-4 lg:mb-6"
            type="text"
            id="name"
            placeholder="Project Name"
          />
          <Label htmlFor="email">Project ID</Label>
          <Input
            className="mt-2 p-5 mb-4 lg:mb-6 "
            type="text"
            id="text"
            placeholder="Enter your Project Id"
          />
        </div>
        <div className="lg:flex justify-between   p space-x-12 w-full">
          <div className=" w-full lg:w-1/2">
            <Label htmlFor="email">Client ID</Label>
            <Input
              className="mt-2 p-5   mb-4 lg:mb-6"
              type="text"
              id="text"
              placeholder="Enter Client ID "
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Label htmlFor="email">Source Station </Label>
            <Input
              className="mt-2 p-5   mb-4 lg:mb-6"
              type="text"
              id="text"
              placeholder="Enter Source Station "
            />
          </div>
        </div>
        <div className="lg:flex justify-between   space-x-12 w-full">
          <div className=" w-full lg:w-1/2">
            <Label htmlFor="email">Project Deadline</Label>
            <Input
              className="mt-2 p-5 mb-4 lg:mb-6"
              type="date"
              id="date"
              placeholder="Enter Client Deadline "
            />
          </div>

          <div className="w-full lg:w-1/2">
            <Label htmlFor="email">Project Value </Label>
            <Input
              className="mt-2 p-5  mb-4 lg:mb-6"
              type="number"
              id="number"
              placeholder="Enter Project Value"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4  lg:space-x-8 w-full">
          <Button className=" px-4 lg:px-10 py-2 lg:py-5  bg-green-500 text-white hover:bg-green-600">
            Add Project
          </Button>
          <Button
            className="px-4 lg:px-10 py-2 lg:py-5"
            variant={"destructive"}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
