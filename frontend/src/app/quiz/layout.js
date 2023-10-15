"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import Quiz from "./page";
import { useRouter } from "next/navigation";
import axios from "axios";
import API_ENDPOINT_BASE from "../api";

// const API_ENDPOINT = API_ENDPOINT_BASE + "/inputtext";
const DUMMY_DELAY = "https://hub.dummyapis.com/delay?seconds=6";
const sampleQuesData = [
  {
    num: 1,
    type: "MCQ",
    text: "What is redshift?",
    options: [
      "The change in color of an object due to its motion",
      "The change in size of an object due to its motion",
      "The change in shape of an object due to its motion",
      "The change in temperature of an object due to its motion",
    ],
  },
  {
    num: 2,
    type: "MCQ",
    text: "Who first observed the phenomenon of redshift?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Edwin Hubble",
      "Galileo Galilei",
    ],
  },
  {
    num: 3,
    type: "MCQ",
    text: "What is the main use of redshift in astronomy?",
    options: [
      "Determining the size of objects in the universe",
      "Measuring the temperature of objects in the universe",
      "Calculating the distance of objects in the universe",
      "Identifying the composition of objects in the universe",
    ],
  },
  {
    num: 4,
    type: "TF",
    text: "Redshift is caused by the Doppler effect.",
    options: [],
  },
  {
    num: 5,
    type: "TF",
    text: "The discovery of redshift led to the development of the Big Bang theory.",
    options: [],
  },
  {
    num: 6,
    type: "FR",
    text: "How does redshift help astronomers determine the distance of objects in the universe?",
    options: [],
  },
];

export default function Layout() {
  const router = useRouter();
  const [quesData, setQuesData] = useState(undefined);

  useEffect(() => {
    if (quesData !== undefined) {
      return;
    }
    const postData = localStorage.getItem("exAImination-input");
    if (postData == undefined) {
      router.push("/");
      return;
    }
    async function load() {
      return await axios
        // .post(API_ENDPOINT, JSON.parse(postData))
        .get(DUMMY_DELAY)
        .then((res) => {
          setQuesData(sampleQuesData);
        })
        .catch((err) => console.log(err));
    }
    load();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      {quesData !== undefined ? <Quiz quesData={quesData} /> : <Loading />}
    </Suspense>
  );
}
