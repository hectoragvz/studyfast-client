import Navigation from "@/components/Navigation";
import hero from "../assets/heroimg.png";
import { X, Eye, CircleCheckBig, Trash2 } from "lucide-react";

function LandingPage() {
  return (
    <div className="pb-10 notebook-background">
      <Navigation />
      <div className="max-w-5xl mx-auto px-6 py-12 overflow-auto ">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-bold text-7xl mb-5">
            The shortest path to great studying.
          </h1>
          <p className="text-xl font-medium mb-5">
            We want you to study in the best and fastest way possible. Simply
            drop your documents and we´ll handle everything else for you to
            start studying{" "}
            <a
              className="bg-yellow-400 underline"
              target="_blank"
              href="https://www.sciencedirect.com/science/article/pii/S0165032724004245"
            >
              smart
            </a>
            . FINALLY!
          </p>
          <p className="text-xl font-medium">Simply:</p>
          <ol className="list-decimal ml-10 mt-4">
            <li className="mt-1">Load the document you want to study</li>
            <li className="mt-1">
              You will get 10 flashcards to study from based on a section of
              your document
            </li>
            <li className="mt-1">
              Try to answer the questions on your flashcards (see the answer if
              you fail to do so)
            </li>
            <li className="mt-1">
              Repeat <span className="italic">Ad infinitum</span>
            </li>
          </ol>
          <p className="text-xl font-medium mt-20 mb-5">
            Practice does not make perfect. Only perfect practice makes perfect.{" "}
            <span className="italic text-neutral-400 text-sm">
              - Vince Lombardi
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2 sm:mt-5 flex mx-10 rounded-lg flex-col justify-center items-center px-6 gray-background">
        <div className="flex flex-col items-center text-center justify-start w-full">
          <h2 className="pt-12 mt-5 mb-4 text-3xl sm:text-3xl md:text-4xl font-bold">
            The easiest way to improve your active recall
          </h2>
          <p className="mb-5 text-md sm:text-lg">
            Spend your time studying, not creating what you will study with.
          </p>
        </div>
        <div className="max-w-4xl flex flex-col justify-center items-center">
          <img
            src={hero}
            alt="hero"
            className="rounded-md w-full bg-transparent"
          />
          <p className="text-neutral-500 text-sm mt-5 mb-10 underline">
            Start studying in just two simple steps!
          </p>
        </div>
      </div>
      <div className="mt-2 sm:mt-10 flex flex-col max-w-5xl mx-auto px-6 py-12 overflow-auto ">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl mt-5 sm:text-3xl md:text-3xl font-bold">
            Handle your cards as you wish!
          </h2>
          <ol className="text-neutral-500 text-md  mt-5 mb-10 w-full">
            <li>
              <p className="flex gap-5 pb-3 ">
                <Eye />
                Get a sneak peek of your answer
              </p>
              <p className="flex gap-5 pb-3 ">
                <CircleCheckBig />
                Mark your card as learned!
              </p>
              <p className="flex gap-5 pb-3 ">
                <X />
                Mark your card as useless if studyfast didn´t come up with a
                good question
              </p>
              <p className="flex gap-5 pb-3">
                <Trash2 />
                Delete your card completely
              </p>
            </li>
          </ol>
        </div>
      </div>
      <div className="flex mx-10 rounded-lg flex-col justify-center items-center mt-10">
        <p>
          Powered by{" "}
          <span className="text-blue-600">
            <a
              href="https://docs.llamaindex.ai/en/stable/module_guides/loading/connector/llama_parse/"
              target="_blank"
            >
              LlamaParse,{" "}
            </a>
            <a href="https://www.bytescale.com/" target="_blank">
              Bytescale, and
            </a>{" "}
            OpenAI.
          </span>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
