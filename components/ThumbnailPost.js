import React, { useState } from "react";
import Link from "next/link";
import Share from "../components/Share.js";
import {url,apiEndPoint,month} from "../lib/constant.js";
export default function ThumbnailPost({ data, status, width, admin }) {
  const [display, setDisplay] = useState("hidden");
  const [stat, setStat] = useState(status);
  let date = new Date(data.time);
  return (
    <>
      <Share
        topic={data.topic}
        link={
          url +
          "/" +
          (stat == null
            ? "post/" + data.id
            : stat == "accepted"
            ? "post/" + data.postId
            : "pending/" + data.id)
        }
        display={display}
        setDisplay={setDisplay}
      ></Share>
      <div class="pt-4">
        <div class="relative my-1 pr-2 flex items-center">
          <div>
            {stat ? (
              <div
                class="rounded-l-lg py-3 w-6 absolute left-0 h-full"
                style={{
                  backgroundColor:
                    stat == "pending"
                      ? "#F7CB73"
                      : stat == "accepted"
                      ? "#52C587"
                      : "#AB3B61",
                }}
              ></div>
            ) : null}

            <div
              class={stat ? "pl-8" : ""}
              style={{ width: width, wordWrap: "break-word" }}
            >
              <Link
                href={
                  stat == null
                    ? "post/" + data.id
                    : stat == "accepted"
                    ? "post/" + data.postId
                    : "pending/" + data.id
                }
              >
                <a>
                  <div class="mb-1 relative">
                    {stat ? null : (
                      <div
                        class="text-white w-6 h-6 text-center absolute"
                        style={{
                          backgroundColor: "#AB3B61",
                          "border-radius": "50%",
                        }}
                      >
                        <p
                          class="text-lg font-semibold"
                          style={{ "line-height": "22px" }}
                        >
                          {data.user[0].toUpperCase()}
                        </p>
                      </div>
                    )}
                    <p
                      class={"inline " + (stat ? "" : "ml-8")}
                      style={{
                        color: "#8E8E8E",
                        fontFamily: "Mitr-Medium",
                        fontSize: "18px",
                      }}
                    >
                      {data.user}
                    </p>
                    {data.havePickedAnswer ? (
                      <>
                        <p
                          class="inline ml-6 mr-2"
                          style={{
                            color: "#158D1A",
                            fontFamily: "Mitr-Medium",
                            fontSize: "20px",
                          }}
                        >
                          Certified
                        </p>
                        <img
                          class="inline"
                          src="/images/check.svg"
                          style={{
                            height: "24px",
                            transform: "translate(0 , -15%)",
                          }}
                        ></img>
                      </>
                    ) : null}
                  </div>

                  <p style={{ fontFamily: "Quark-Bold", fontSize: "18px" }}>
                    {data.topic + (data.topic.length == 95 ? "..." : "")}
                  </p>
                  <p style={{ fontFamily: "Mitr-Light", fontSize: "12px" }}>
                    {data.content + (data.content.length == 150 ? "..." : "")}
                  </p>
                </a>
              </Link>
            </div>

            <div class={stat ? "pl-8 -mt-1" : "-mt-1"}>
              <Link
                href={
                  stat == null
                    ? "post/" + data.id
                    : stat == "accepted"
                    ? "post/" + data.postId
                    : "pending/" + data.id
                }
              >
                <a
                  class="mr-2"
                  style={{ fontFamily: "Mitr-Medium", fontSize: 12, color: "#AB3B61" }}
                >
                <img class = "inline" src = "../images/commentIcon.svg" style={{width:15,marginRight:4}}></img>
                  comment
                </a>
              </Link>
              <button
                class="mr-2"
                onClick={() => setDisplay("block")}
                style={{ fontFamily: "Mitr-Medium", fontSize: 12, color: "#123D6A" }}
              >
                <img class = "inline" src = "../images/shareIcon.svg" style={{width:15,marginRight:4}}></img>
                share
              </button>
              <p
                class="inline"
                style={{
                  fontFamily: "Quark-Light",
                  fontSize: 12,
                  color: "#8E8E8E",
                }}
              >
                {date.getDate() +
                  " " +
                  month[date.getMonth()] +
                  " " +
                  date.getFullYear() +
                  " " +
                  (date.getHours() < 10 ? "0" : "") +
                  date.getHours() +
                  ":" +
                  (date.getMinutes() < 10 ? "0" : "") +
                  date.getMinutes()}
              </p>
            </div>
          </div>{" "}
          {admin ? (
            stat == "pending" ? (
              <div class="float-right">
                <button
                  class="shadow-md focus:outline-none text-white rounded-xl mr-4"
                  style={{
                    backgroundColor: "#04EB84",
                    height: 60,
                    width: 220,
                    fontFamily: "Quark-Bold",
                    fontSize: 30,
                  }}
                  onClick={() => update(data.id, true, stat, setStat,data)}
                >
                  Approve
                </button>
                <button
                  class="shadow-md focus:outline-none text-white rounded-xl"
                  style={{
                    backgroundColor: "#AB3B61",
                    height: 60,
                    width: 220,
                    fontFamily: "Quark-Bold",
                    fontSize: 30,
                  }}
                  onClick={() => update(data.id, false, stat, setStat,data)}
                >
                  Reject
                </button>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </>
  );
}
const update = async (id, approve, stat, updateStat,data) => {

  
  const res = await fetch(apiEndPoint + "/pending/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
    body: JSON.stringify({ approve }),
  });
  if (res.status == 200) {
    if (approve) {
      updateStat("accepted");  data.status="accepted"
    } else {
      updateStat("rejected");  data.status="rejected"
    }
  }
};
