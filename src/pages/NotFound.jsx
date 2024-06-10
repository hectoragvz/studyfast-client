import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFound() {
  const { "*": unmatchedPath } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-semibold">404</h1>
      <p className="text-gray-500 text-2xl mt-5">Not Found: /{unmatchedPath}</p>
      <Button asChild className="mt-10">
        <Link to="/home">Back Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
