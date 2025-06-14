import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithLabel() {
  return (
    <div>
        <h1 className="text-3xl font-semibold ml-6 mt-12  ">Project Create </h1>
     <div className=" w-full px-6 my-6  items-center gap-3">
      <Label htmlFor="email">Email</Label>
      <Input className="mt-2  mb-6" type="email" id="email" placeholder="Email" />
      <Label htmlFor="email">Email</Label>
      <Input className="mt-2" type="email" id="email" placeholder="Email" />
    </div>
        <div className="flex justify-between px-6 space-x-12 w-full">
            <div className="w-1/2">
                <Label htmlFor="email">Email</Label>
            <Input className="mt-2  mb-6" type="email" id="email" placeholder="Email" />
            </div>
           <div className="w-1/2">
             <Label htmlFor="email">Email</Label>
            <Input className="mt-2  mb-6" type="email" id="email" placeholder="Email" />
            
           </div>
        </div>
        <div className="flex justify-between px-6 space-x-12 w-full">
            <div className="w-1/2">
                <Label htmlFor="email">Email</Label>
            <Input className="mt-2  mb-6" type="email" id="email" placeholder="Email" />
            </div>
           <div className="w-1/2">
             <Label htmlFor="email">Email</Label>
            <Input className="mt-2  mb-6" type="email" id="email" placeholder="Email" />
            
           </div>
        </div>
            <div className="flex justify-end px-6 space-x-8 w-full">
                
            <Button className="px-10 py-5 bg-green-500 text-white hover:bg-green-600">
                Add Project
            </Button>
            <Button className="px-12 py-5" variant={"destructive"}>Cancel</Button>
            </div>
    </div>
  )
}
