import SideMenu from "@/components/SideMenu";
import NewSession from "@/components/NewSession";
import { AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SessionView from "@/components/SessionView";
import { useSessionsStore } from "../store";
import { getSessions } from "../sessionsApi";

function Test() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(true);
  const sessions = useSessionsStore((state) => state.sessions);

  useEffect(() => {
    getSessions();
  }, []);

  const { id } = useParams();

  const toggleNavBar = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex h-screen w-screen">
        {mobileDrawerOpen ? (
          <div className="block">
            <SideMenu toggleNavBar={toggleNavBar} sessions={sessions} />
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleNavBar}>
            <AlignLeft className="h-4 w-4" />
          </Button>
        )}
        <div
          className={`flex-1 ${mobileDrawerOpen ? "hidden sm:flex" : "flex"}`}
        >
          {id ? (
            <div className="flex flex-col items-center px-2-5 h-full w-full notebook-background">
              <SessionView />
            </div>
          ) : (
            <div className="flex flex-col items-center px-2-5 h-full w-full notebook-background">
              <NewSession />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Test;
