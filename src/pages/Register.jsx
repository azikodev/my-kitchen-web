// react + hook
import React, { useEffect } from "react";

//rrd imports
import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

//custom hooks
import { useRegister } from "../hooks/useRegister";

//react icons
import { FcGoogle } from "react-icons/fc";
import { BiLogInCircle } from "react-icons/bi";

//bg Video
import bgImg from "../assets/bg-register.mp4";


//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");

  return { email, password, displayName, photoURL };
};

function Register() {
  const userData = useActionData();
  const { register, isPending, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      register(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);
  return (
    <div className="h-screen">
      <div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover absolute z-[-1] custom-blur-just"
          src={bgImg}
        ></video>
      </div>
      <div className="lg:max-w-[750px] w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:max-w-sm m-auto items-center justify-center mx-auto h-screen md:m-auto">
        <div className="w-full h-[596px] hidden lg:block border-none">
          <video
            autoPlay
            loop
            muted
            src={bgImg}
            className="h-full object-cover rounded-bl-[14px] rounded-tl-[14px] border-none flex "
          ></video>
        </div>
        <div className="bg-slate-400/50 lg:w-96 xl:w-96 md:w-96 w-[340px]  mx-auto rounded-[14px] p-[26px] lg:rounded-br-[14px] lg:rounded-tr-[14px] border-none sm:rounded-[14px] lg:rounded-tl-[0] lg:rounded-bl-[0] ">
          <Form method="post" className="flex flex-col items-center gap-1" >
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormInput size='100%' type="text" label="Display Name" name="displayName" placeholder="Tom" className="input input-bordered max-w-full h-11" />
            <FormInput size='100%' type="url" label="Photo URL" name="photoURL" placeholder="https://picsum.photos/250" className="input input-bordered max-w-full h-11" />
            <FormInput size='100%' type="email" label="Email" name="email" placeholder="example@gmail.com" className='input input-bordered max-w-full h-11' />
            <FormInput size='100%' type="password" label="Password" name="password" placeholder="●●●●●●" className="input input-bordered max-w-full h-11" />
            <div className="w-full mt-5">
              {!isPending && (
                <button className="btn btn-primary btn-block text-lg">
                  <BiLogInCircle />Register</button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block text-lg">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          {isPending && (
            <div className="w-full mt-2">
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block text-lg"
              >
                Loading...
              </button>
            </div>
          )}
          {!isPending && (
            <div className="w-full mt-2">
              <button
                onClick={registerWithGoogle}
                className="btn btn-block text-red-500 text-lg"
              >
                <FcGoogle />
                Google
              </button>
            </div>
          )}
          <div className="mt-5 text-center text-white">
            If you have an account,{" "}
            <Link className="link link-primary text-[#39cd54]" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;