import UploadSection from "./UploadSection";
import {
  FileUp,
  MessageCircleWarning,
  LoaderCircle,
  Repeat2,
} from "lucide-react";

function NewSession() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-start justify-center my-10 mx-5 h-full">
        <div>
          <ol className="text-gray-700 text-sm md:text-base mb-5 pr-3">
            <li className="mb-3 flex gap-4">
              <FileUp />
              Load your document
            </li>
            <li className="mb-3 flex gap-4">
              <MessageCircleWarning />
              Mention an aspect of your document you want to focus on
            </li>
            <li className="mb-3 flex gap-4">
              <LoaderCircle /> Wait for your cards to be generated (1-3 min)
            </li>
            <li className="mb-3 flex gap-4">
              <Repeat2 />
              Study from your cards
            </li>
          </ol>
        </div>
        <div>
          <UploadSection />
        </div>
        <div className="mb-3 flex gap-4 mt-5 text-sm italic text-gray-500 justify-center items-start max-w-lg">
          <p>
            {`You can mark a card as "learned", "useless", or simply delete it (you never know when you might need it)!`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewSession;
