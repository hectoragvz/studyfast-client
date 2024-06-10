import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CardComponent from "./CardComponent";
import { useSessionsStore } from "../store";
import { getSessionCards } from "../sessionsApi";

function SessionView() {
  const { id } = useParams();
  const cards = useSessionsStore((state) => state.cards);

  useEffect(() => {
    getSessionCards(id);
  }, [id]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-start justify-center my-10 w-full overflow-auto">
        <div className="overflow-auto w-full max-w-2xl mx-auto small-scrollbar px-5">
          {cards.length == 0 && (
            <p className="font-semibold text-center">
              No cards for the current session
            </p>
          )}
          {cards.map((card) => (
            <CardComponent key={card.id} card={card} sessionId={id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SessionView;
