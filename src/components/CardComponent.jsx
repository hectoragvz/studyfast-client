/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Eye, CircleCheckBig, Trash2 } from "lucide-react";
import { deleteCard, updateCardState } from "@/sessionsApi";

function CardComponent({ card, sessionId }) {
  const [answerHidden, setAnswerHidden] = useState(true);

  const showAnswer = () => {
    setAnswerHidden((prevState) => !prevState);
  };

  //will either be "pending", "useless", "done"

  const handleUpdateState = (newState) => {
    updateCardState(sessionId, card.id, newState);
  };

  let borderColor;

  if (card.state == "pending") {
    borderColor = "border-neutral-400";
  } else if (card.state == "useless") {
    borderColor = "border-red-500";
  } else {
    borderColor = "border-green-500";
  }

  return (
    <div
      className={`rounded-md bg-neutral-100 border-2 ${borderColor} mb-5 p-5`}
    >
      <div className="flex items-start flex-col mb-2 pb-2">
        <h3 className="mb-5">{card.question}</h3>
        {answerHidden ? (
          <Skeleton className="h-3 w-[350px] bg-neutral-300" />
        ) : (
          <p className="text-neutral-500 italic">{card.answer}</p>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <Button onClick={showAnswer} variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => handleUpdateState("done")}
          variant="ghost"
          size="icon"
        >
          <CircleCheckBig className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => handleUpdateState("useless")}
          variant="ghost"
          size="icon"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => deleteCard(sessionId, card.id)}
          variant="ghost"
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default CardComponent;
