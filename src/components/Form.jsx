/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [loading, setLoading] = useState(false);
  const name = method === "login" ? "Login" : "Register";

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await api.post(route, data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="h-dvh px-4 py-10 md:py-20">
        <div className="text-center flex flex-col max-w-md mx-auto">
          <h1 className=" text-2xl font-semibold ">{name} to studyfast.io</h1>
          {name === "Register" && (
            <span className="mt-2 bg-yellow-400 mx-auto font-medium">
              The shortest, fastest, best way to practice active recall
            </span>
          )}
          <div className="flex flex-col mt-7 border-2 rounded-md pt-5 px-10 bg-white">
            <div className="flex justify-start">
              <label className="font-medium">Username</label>
            </div>

            <input
              className="text-black mb-3 text-sm mt-2 rounded-md p-2 border border-neutral-300"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />

            <div className="flex justify-start">
              <label className="font-medium">Password</label>
            </div>

            <input
              className="text-black mb-3 text-sm mt-2 rounded-md p-2 border border-neutral-300"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />

            {loading ? (
              <Button type="submit" onClick={onSubmit} className="mt-5 mb-5">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {name}
              </Button>
            ) : (
              <Button type="submit" onClick={onSubmit} className="mt-5 mb-5">
                {name}
              </Button>
            )}
          </div>
          {name === "Register" ? (
            <p className="mt-4 text-sm text-neutral-600">
              Have an account?
              <Link className="text-blue-600" to={"/login"}>
                {" "}
                Sign in
              </Link>{" "}
              or{" "}
              <Link className="text-blue-600" to={"/"}>
                Maybe next time
              </Link>
            </p>
          ) : (
            <p className="mt-4 text-sm text-neutral-600">
              Don´t have an account yet?
              <Link className="text-blue-600" to={"/register"}>
                {" "}
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
