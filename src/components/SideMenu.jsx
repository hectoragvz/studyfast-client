/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { LogOut, AlignLeft, FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SessionCard from "./SessionCard";
import { useNavigate } from "react-router-dom";

function SideMenu({ toggleNavBar, sessions }) {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-neutral-50 p-5 flex flex-col h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-5">
          {" "}
          <Button
            variant="outline"
            className="font-bold flex-grow"
            onClick={() => {
              navigate("/home");
            }}
          >
            <FilePlus2 className="mr-2 h-4 w-4" />
            Load New
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={toggleNavBar}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 flex flex-col justify-start items-start flex-grow overflow-hidden">
          <div className="">
            <h1 className="text-neutral-600">Your Sessions</h1>
          </div>
          <div className="mt-3 flex-grow overflow-auto w-full small-scrollbar2">
            <ol>
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  selectedSessionId={id}
                />
              ))}
            </ol>
          </div>
        </div>
        <div className="flex flex-col">
          <Button variant="secondary">
            <LogOut className="mr-2 h-4 w-4" />
            <Link to={"/logout"}>Logout</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default SideMenu;
