import ThumbnailPost from "../components/ThumbnailPost";
import React, { useState } from "react";
import Layout from "../components/Layout.js";
import {apiEndPoint} from "../lib/constant";
export async function getStaticProps() {
  const posts = await (await fetch(apiEndPoint+ "/pendings")).json();
  // const posts = await (await fetch("http://localhost:3000/api/pendings")).json()
  const username = "username";
  return {
    props: {
      posts,
      username,
    },
  };
}
let time = null;
export default function myPost({ posts, username }) {
  const [choose, setChoose] = useState("pending");
  return (
    <>
      <Layout username={username}>
        <div
          style={{ "padding-left": "7.125rem", "padding-right": "7.125rem" }}
        >
          <p style={{ fontFamily: "Roboto-Regular", fontSize: "64px" }}>
            Admin Dashboard
          </p>
          <div
            class="mt-10 m-auto inline rounded-full h-40 w-40 flex items-center text-center justify-center font-semibold text-white"
            style={{ backgroundColor: "#AB3B61" }}
          >
            <p style={{ "font-size": "6rem" }}>{username[0].toUpperCase()}</p>
          </div>
          <p
            class="my-2 m-auto text-center"
            style={{ fontFamily: "Quark-Bold", fontSize: "36px" }}
          >
            {username}
          </p>

          <div
            class="border-solid border-b-2 border-gray-500 text-3xl relative mt-24"
            style={{ "margin-right": "-7.125rem" }}
          >
            <div
              class="absolute bottom-0 "
              style={{
                "margin-bottom": "-2px",
                fontFamily: "Quark-Bold",
                fontSize: "24px",
                width: "100%",
              }}
            >
              <div
                class={
                  "cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-" +
                  (choose == "all" ? "800" : "500")
                }
                onClick={() => {
                  time = null;
                  setChoose("all");
                }}
              >
                All
              </div>
              <div
                class={
                  "cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-" +
                  (choose == "pending" ? "800" : "500")
                }
                onClick={() => {
                  time = null;
                  setChoose("pending");
                }}
              >
                Pending
              </div>
              <div
                class={
                  "cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-" +
                  (choose == "accepted" ? "800" : "500")
                }
                onClick={() => {
                  time = null;
                  setChoose("accepted");
                }}
              >
                Approved
              </div>
              <div
                class={
                  "cursor-pointer select-none mr-16 inline mr-16 border-solid border-b-2 border-gray-" +
                  (choose == "rejected" ? "800" : "500")
                }
                onClick={() => {
                  time = null;
                  setChoose("rejected");
                }}
              >
                Rejected
              </div>
            </div>
          </div>

          <div class="my-8">
            {posts.map((data) => {
              return choose == data.status || choose == "all" ? (
                <div>
                  {datediff(data)}
                  <ThumbnailPost
                    data={data}
                    status={data.status}
                    width="40vw"
                    admin
                  ></ThumbnailPost>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

const isDateEqual = (a, b) => {
  return (
    a.getDate() == b.getDate() &&
    a.getMonth() == b.getMonth() &&
    a.getFullYear() == a.getFullYear()
  );
};

const datediff = (data) => {
  let tmp = new Date(data.time);
  if (time == null || !isDateEqual(tmp, time)) {
    time = new Date(data.time);
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (time.getDate() == today.getDate()) {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: "Quark-Bold", fontSize: 36 }}
        >
          Today
        </p>
      );
    } else if (time.getDate() == yesterday.getDate()) {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: "Quark-Bold", fontSize: 36 }}
        >
          Yesterday
        </p>
      );
    } else {
      return (
        <p
          class="mt-10 -mb-6"
          style={{ fontFamily: "Quark-Bold", fontSize: 36 }}
        >
          {time.getDate() +
            "/" +
            String(parseInt(time.getMonth()) + 1) +
            "/" +
            time.getFullYear()}
        </p>
      );
    }
  }
  return "";
};
