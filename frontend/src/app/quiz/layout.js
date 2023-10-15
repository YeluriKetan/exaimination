"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import Quiz from "./page";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_ENDPOINT = "http://localhost:6969/api/inputtext";
//const API_ENDPOINT = "https://hub.dummyapis.com/delay?seconds=5";

export default function Layout() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [quesData, setQuesData] = useState(undefined);

  const load = async () => {
    const postData = localStorage.getItem("exAImination-input");
    if (postData == undefined) {
      router.push("/");
      return;
    }
    console.log("Posting to backend", postData);
    const result = await axios
      .post(API_ENDPOINT, JSON.parse(postData))
      .then((res) => {
        console.log(res);
        setLoading(false);
        setQuesData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    load();
  });
  return <>{isLoading ? <Loading /> : <Quiz quesData={quesData} />}</>;
}
