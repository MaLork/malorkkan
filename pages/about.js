import Layout from "../components/Layout"
import React, { useState, useContext, useEffect } from 'react'
import { authContext } from '../lib/userContext'
export default function about() {
    const [display,setDisplay] = useState("hidden")
    const username = useContext(authContext)
    return(
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
          setDisplay("hidden");
        }}
      ></div>
       <img
       src="../images/promptPay.jpg"
        class={display}
        style={{
          zIndex: 3,
          position: "fixed",
          top: "50%",
          width:400,
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      ></img>
        <Layout username={username.displayName} admin={username.admin}>
        <div class="text-center">
            <div class="flex justify-center">
            <img src="../images/Joseph.jpg" style={{width:150}}></img>
            </div>
            <p style={{fontFamily:"Priyati",fontSize:"30px"}}>The aim of argument, or of discussion, should not be victory, but progress</p>
            <p class="-mt-2" style={{fontFamily:"Quark-Bold",fontSize:"20px"}}>- Joseph Joubert</p>
        </div>
        <div class="mx-40">
        <p style={{fontFamily:"Quark-Bold",fontSize:"20px"}}>How Does Malork Work?</p>
        <div class="flex items-center justify-between">
            <div class="bg-white rounded-xl w-64 p-4 pt-2">
                <div class="flex items-center">
                <img class="inline" style={{width:40}} src="../images/mypost-blue.svg"></img>
                <p class="pt-4 ml-4 inline" style={{fontFamily:"Mitr-Medium",fontSize:24}}>Post</p>
                </div>
                <p class="pt-2" style={{fontFamily:"Mitr-Light",fontSize:12}}>The community can share content by posting stories, links, images</p>
            </div>
            <div class="bg-white rounded-xl w-64 p-4 pt-2">
                <div class="flex items-center">
                <img class="inline" style={{width:40}} src="../images/commentIcon.svg"></img>
                <p class="pt-4 ml-4 inline" style={{fontFamily:"Mitr-Medium",fontSize:24}}>Comment</p>
                </div>
                <p class="pt-2" style={{fontFamily:"Mitr-Light",fontSize:12}}>Comments provide discussion and often humor</p>
            </div>
            <div class="bg-white rounded-xl w-64 p-4 pt-2">
                <div class="flex items-center">
                <img class="inline" style={{width:40}} src="../images/check.svg"></img>
                <p class="pt-4 ml-4 inline" style={{fontFamily:"Mitr-Medium",fontSize:24}}>Best answer</p>
                </div>
                <p class="pt-2" style={{fontFamily:"Mitr-Light",fontSize:12}}>Comments can be chosen. The certified comment rises</p>
            </div>
        </div>
        <p class="mt-8 mb-2"style={{fontFamily:"Quark-Bold",fontSize:"20px"}}>Contact and Support us!</p>
        <img class="inline mr-4" style={{width:40}} src="../images/email.svg"></img>
        <p class="inline"style={{fontFamily:"Quark-Bold",fontSize:"20px"}}>malorktogether@malork.org</p>
        </div>
        <div class="px-40 flex items-center justify-center pt-4" onClick={()=>{setDisplay("block")}}>
            <button class="pt-2 text-white rounded-xl focus:outline-none"style={{width:"100%",fontFamily:"Quark-Bold",fontSize:48,backgroundColor:"#52C587"}}>Wanna support us, it’s all set HERE!!</button>
        </div>
        </Layout>
        </>
    )
}