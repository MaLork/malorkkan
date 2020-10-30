import { CopyToClipboard } from "react-copy-to-clipboard";

import React, { useState } from "react";
export default function Share({ topic, link, display, setDispaly}) {
  const [copyMessage, setCopyMessage] = useState("");
  return (
    <>
      <div
        class={"bg-gray-400 bg-opacity-50 cursor-pointer " + display}
        style={{
          zIndex: 2,
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0%",
          left: "0%",
        }}
        onClick={() => {
          setDispaly("hidden");
          setCopyMessage("");
        }}
      ></div>
      <div
        class={display}
        style={{
          zIndex: 3,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          class="bg-white flex justify-center items-center text-center"
          style={{ width: "989px", height: "397px" }}
        >
          <div>
            <div
              class="mb-4"
              style={{
                fontFamily: "Lato-Bold",
                fontSize: 36,
                color: "#AB3B61",
              }}
            >
              Share your interested discussion
            </div>
            <div
              class="mb-4 overflow-hidden px-4 pt-2 border-2 rounded-lg flex items-center"
              style={{
                borderColor: "#e6e6e6",
                fontFamily: "Quark-Bold",
                fontSize: 24,
                width: 908,
                height: 51,
              }}
            >
              {topic}
            </div>
            <div
              class="mb-2 overflow-hidden px-4 pt-2 border-2 rounded-lg flex"
              style={{
                borderColor: "#e6e6e6",
                fontFamily: "Quark-Bold",
                fontSize: 24,
                width: 908,
                height: 166,
              }}
            >
              {link}
            </div>
            <div class="float-right">
              <p class="inline mr-6">{copyMessage}</p>
              <CopyToClipboard text={link}>
                <button
                  class="inline focus:outline-none text-white px-4 bg-white  rounded-xl"
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: "#52C587",
                    fontFamily: "Mitr-Normal",
                    fontSize: 24,
                  }}
                  onClick={() => {
                    setCopyMessage("Copied to clipboard!");
                  }}
                >
                  Copy link
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
