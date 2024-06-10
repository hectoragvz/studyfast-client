/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSession } from "../sessionsApi";
import { toast } from "sonner";

function SessionCard({ session, selectedSessionId }) {
  const formattedDate = new Date(session.created_at).toLocaleDateString(
    "en-US"
  );

  const navigate = useNavigate();

  const confirmAndDeleteSession = async (sessionId, onSuccess) => {
    return new Promise((resolve, reject) => {
      toast("Are you sure you want to delete this session?", {
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              await deleteSession(sessionId);
              if (onSuccess) onSuccess();
              resolve();
            } catch (error) {
              reject(error);
            }
          },
        },
      });
    });
  };

  const onDeleteDepending = async (id) => {
    if (session.id == selectedSessionId) {
      console.log("Same");
      try {
        await confirmAndDeleteSession(id, () => navigate("/home"));
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    } else {
      try {
        await confirmAndDeleteSession(id);
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    }
  };

  return (
    <div
      className={`flex hover:bg-neutral-200 ${
        session.id == selectedSessionId ? `bg-neutral-200` : ``
      } text-neutral-500 hover:cursor-pointer text-sm rounded-md items-center justify-center`}
    >
      <div
        className="p-1 flex flex-col"
        onClick={() => {
          navigate(`/sessions/${session.id}`);
        }}
      >
        <h3 className="mb-1 text-sm">{session.description}</h3>
        <p className="text-neutral-400">{formattedDate}</p>
      </div>
      <div className="self-end">
        <Button
          variant="ghost"
          size="icon"
          className="m-1"
          onClick={() => onDeleteDepending(session.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SessionCard;
