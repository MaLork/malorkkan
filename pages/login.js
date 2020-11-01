import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import style from "../styles/register.module.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { authContext } from "../lib/userContext";
import { loginUser } from "../lib/userFunction";

const login = () => {
  let [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  let [loginFailed, setLoginFailed] = useState("");

  const authUser = useContext(authContext).user;

  if (authUser) {
    router.push("/", undefined, { shallow: true });
    return null;
  }

  return (
      <Layout login>
    <div className="flex flex-col">
        <div class="">
        <div
          class="m-auto relative"
          style={{ width: "40%", fontFamily: "Quark-Bold", fontSize: "36px" }}
        >
          <p className="items-center mt-2">{loginFailed}</p>
          <p
            class="mt-6 mb-2"
            style={{ fontFamily: "Roboto-Regular", fontSize: "60px" }}
          >
            Ma-lork together!
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const status = await loginUser(
                formState.email,
                formState.password
              );

              if (status === "Success") {
                router.push("/", undefined, { shallow: true });
                return;
              }

              setLoginFailed(status.message);
            }}
          >
            <div>
              <div>
                <p htmlFor="email">Email </p>
                <input
                  type="text"
                  className={style.input}
                  onChange={(event) =>
                    setFormState({
                      email: event.target.value,
                      password: formState.password,
                    })
                  }
                ></input>
              </div>
              <div>
                <p htmlFor="password">Password </p>
                <input
                  type="password"
                  className={style.input}
                  onChange={(event) =>
                    setFormState({
                      email: formState.email,
                      password: event.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <div className="flex items-center justify-center pt-8">
              <div class="pt-4 flex absolute left-0">
                <p
                  className="pr-2"
                  style={{ fontFamily: "Quark-Bold", fontSize: "14px" }}
                >
                  Forget password?
                </p>
                <Link href="/contacts">
                  <a
                    className="text-blue-600 hover:underline pr-32"
                    style={{ fontFamily: "Quark-Bold", fontSize: "14px" }}
                  >
                    Contact Us
                  </a>
                </Link>
              </div>
              <div class="absolute right-0">
                <Link href="/register">
                  <a
                    className="hover:underline inline-block"
                    style={{ fontFamily: "Quark-Bold", fontSize: "14px" }}
                  >
                    Register
                  </a>
                </Link>
                <button
                  type="submit"
                  value="Submit"
                  className="ml-4 inline-block rounded-lg"
                  style={{ backgroundColor: "#52C587" }}
                >
                  <p
                    class="text-center px-2 text-white select-none cursor-pointer"
                    style={{ fontFamily: "Mitr-Light", fontSize: "24px" }}
                  >
                    Login
                  </p>
                </button>
              </div>
            </div>
          </form>
        </div></div>
    </div>
      </Layout>
  );
};

export default login;

// export async function getStaticProps() {
//   let user = await getUserData()
//   return {
//     props: {
//       user,
//     },
//   }
// }
