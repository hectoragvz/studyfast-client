import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addSession } from "../sessionsApi";

function UploadSection() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await addSession(data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  return (
    <div className="flex flex-col justify-start">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="font-medium text-sm sm:text-base">
            Requirement
          </label>
          <textarea
            cols={2}
            rows={7}
            className="text-black mb-3 text-sm mt-2 rounded-md p-2 pl-2 border border-neutral-300"
            placeholder="I want you to focus on the introduction section..."
            {...register("requirement", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="file"
            className="font-medium mb-2 text-sm sm:text-base"
          >
            Your File
          </label>
          <input
            className="text-sm flex"
            type="file"
            onChange={(e) => {
              setValue("file", e.target.files[0]);
            }}
          />
        </div>
        {isLoading ? (
          <Button type="submit" onClick={onSubmit} className="mt-5 mb-5">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating your cards...
          </Button>
        ) : (
          <Button type="submit" onClick={onSubmit} className="mt-5 mb-5">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default UploadSection;
