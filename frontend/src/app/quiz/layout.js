"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import Quiz from "./page";
import { useRouter } from "next/navigation";
import axios from "axios";

// const API_ENDPOINT = "http://localhost:5000/submit-form";
const API_ENDPOINT = "https://hub.dummyapis.com/delay?seconds=5";

export default function Layout() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  let quesData = undefined;

  const load = async () => {
    const postData = localStorage.getItem("exAImination-input");
    if (postData == undefined) {
      router.push("/");
      return;
    }
    console.log(postData);
    const result = await axios
      .get(API_ENDPOINT)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // console.log(result.data);
    // quesData = result.data;
    //answer = result.data;
  };

  useEffect(() => {
    load();
  });
  return <>{isLoading ? <Loading /> : <Quiz quesData={quesData} />}</>;
}
