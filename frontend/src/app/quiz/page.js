"use client";
import { useState } from "react";
import Question from "./Question";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_ENDPOINT_BASE from "./../api";

const API_ENDPOINT = API_ENDPOINT_BASE + "/responses";
const SAMPLE_RESULT = {
  qs: [
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
  ],
  as: [
    {
      id: 1,
      answer: "A",
    },
    {
      id: 2,
      answer: "C",
    },
    {
      id: 3,
      answer: "C",
    },
    {
      id: 4,
      answer: "A",
    },
    {
      id: 5,
      answer: "A",
    },
    {
      id: 6,
      answer:
        "By calculating the speed at which an object is moving away from us and using other known factors, such as the speed of light, astronomers can determine the distance of the object from Earth.",
    },
  ],
};
export default function Quiz({ quesData }) {
  const router = useRouter();
  const [response, setResponse] = useState(
    quesData.map((ques) => {
      return {
        id: ques.num,
        ans: "",
      };
    })
  );

  const setAnswer = (id, newVal) => {
    const updatedState = response.map((val, index) => {
      if (id === index) {
        val.ans = newVal;
      }
      return val;
    });
    setResponse(updatedState);
  };

  const handleSubmitResponse = () => {
    const responseJSON = { responses: response };
    localStorage.setItem("exaimination-response", JSON.stringify(responseJSON));
    // const result = axios
    // .post(API_ENDPOINT, responseJSON)
    // .then((res) => {
    // console.log(res);
    // localStorage.setItem("exaimination-result", JSON.stringify(res.data));
    localStorage.setItem("exaimination-result", JSON.stringify(SAMPLE_RESULT));
    router.push("/result");
    // })
    // .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 overflow-y-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4 text-yellow">Questions</h1>
      <div className="w-[80%]">
        {quesData.map((ques, index) => (
          <Question key={index} num={index} ques={ques} setAnswer={setAnswer} />
        ))}
      </div>
      <button
        type="submit"
        className=" my-6 px-auto py-auto rounded-md w-32 h-12 my-10 border-solid border-2 text-purple border-purple  hover:scale-105 hover:border-yellow hover:text-yellow hover:shadow-focus font-bold"
        onClick={handleSubmitResponse}
      >
        Submit
      </button>
    </div>
  );
}
