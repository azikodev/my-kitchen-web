// react + hooks
import React, { useEffect, useState } from "react";

//rrd imports
import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

//react icons
import { FcGoogle } from "react-icons/fc";
import { BiLogInCircle } from "react-icons/bi";

//bg Video
import bgImg from "../assets/bg-login.mp4";

//custom hooks
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

//firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//react hot toast
import { Toaster, toast } from 'sonner'

//react icons
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineResetTv } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";



//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const [showPassword, setShowPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });
  const { loginUser, isPending } = useLogin();
  const { isPending: isPendingUseRegister, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      if (userData.email && userData.password && showPassword) {
        loginUser(userData.email, userData.password);
      }

      if (!showPassword && userData?.email) {
        sendPasswordResetEmail(auth, userData.email)
          .then(() => {
            toast.success("Parolni qayta tiklash manzili emailga jo'natildi");
            setShowPassword(true);
          })
          .catch((error) => {
            toast.error("Sms kod jo'natilmadi");
          });
      }

      if (!userData.email) {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error  border-[2px]" };
        });
        toast.warning("Iltimos emailni kiriting");
      } else {
        setErrorStatus(true)
      }

      if (!userData.password) {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error border-[2px]" };
        });
        toast.warning("Iltimos parolingizni kiriting")
      } else {
        setErrorStatus(false)
      }
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 w-full m-auto h-screen">
      <div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover absolute z-[-1] custom-blur"
          src={bgImg}
        ></video>
      </div>
      <div className="lg:w-[400px] xl:w-[400px] flex   items-center justify-center mx-auto h-screen md:w-96 w-[330px]">
        <div className="bg-slate-400/50 w-full max-w- mx-auto p-7 rounded-[15px]">
          <Form method="post" className="flex flex-col items-center gap-5">
            {showPassword && (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-[700]">Kirish</span>
                <BiLogInCircle className="text-4xl font-[900]" />
              </div>
            )} {!showPassword && (
              <div className="text-3xl font-[700] flex gap-2 items-center">
                <span>Qayta tiklash</span>
                <MdOutlineResetTv />
              </div>
            )}
            <FormInput
              type="email"
              label="Email"
              name="email"
              status={errorStatus.email}
              placeholder="example@gmail.com"
              className="input input-bordered max-w-full h-11"
              size="100%"
            />
            {showPassword && (
              <FormInput
                type="password"
                label="Parol"
                name="password"
                status={errorStatus.password}
                placeholder="•••••"
                className="input input-bordered max-w-full h-11"
                size="100%"

              />
            )}

            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary w-full">
                  {showPassword ? (
                    <>
                      <BiLogInCircle className="text-2xl" />
                      <p className="text-lg">Kirish</p>
                    </>
                  ) : (
                    <>
                      <BiMailSend className="text-2xl" />
                      <p className="text-lg">Jo'natish</p>
                    </>
                  )}
                </button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary w-full text-lg">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          <div className="w-full mt-5">
            {isPendingUseRegister && (
              <button
                disabled
                className="btn btn-accent w-full text-red-500 text-lg"
              >
                Loading ....
              </button>
            )}
            {!isPendingUseRegister && (
              <button
                onClick={registerWithGoogle}
                className="btn btn-block  text-red-500 text-lg"
              >
                <FcGoogle />
                Google
              </button>
            )}
          </div>
          <div className="mt-5 text-center">
            <span className="font-bold ">Ro'yhatdan o'tmaganmisiz,</span>{" "}
            <Link className="link link-primary font-[600]" to="/register">
              Ro'yhatdan o'tish
            </Link>
          </div>
          <div className="mt-5 text-center">
            <span className="font-bold">Parol esdan chiqdimi?</span>{" "}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-sm btn-ghost"
            >
              {showPassword ? (
                <span className="text-[14px] underline font-black ">
                  Qayta tiklash
                </span>
              ) : (
                <span className="text-[14px] underline font-black ">Parolni kiritish</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;