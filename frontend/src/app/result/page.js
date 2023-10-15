"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Result() {
  const [result, setResult] = useState(undefined);
  const [response, setResponse] = useState(undefined);

  useEffect(() => {
    let res = JSON.parse(localStorage.getItem("exaimination-result"));
    let resp = JSON.parse(localStorage.getItem("exaimination-response"));
    if (res !== undefined) {
      setResult(res);
    }
    if (resp !== undefined) {
      setResponse(resp);
    }
    console.log(res, resp);
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center overflow-y-auto">
      <h1 className="text-2xl font-bold mt-10 text-yellow">Result</h1>
      {result !== undefined ? (
        <>
          {result.qs.map((ques, index) => {
            return (
              <div className="my-4 w-[90%]">
                <p className="text-purple my-2">
                  {index + 1}. {ques.text}
                </p>
                <p className="text-gray ml-6">
                  Your answer:{" "}
                  {response.responses[index].ans +
                    (ques.type === "MCQ" &&
                    response.responses[index].ans.length > 0
                      ? ". " +
                        result.qs[index].options[
                          response.responses[index].ans.charCodeAt(0) - 65
                        ]
                      : "")}
                </p>
                <p className="text-gray ml-6 text-yellow">
                  Correct answer:{" "}
                  {ques.type === "TF"
                    ? result.as[index].answer === "A"
                      ? "true"
                      : "false"
                    : result.as[index].answer +
                      (ques.type === "MCQ"
                        ? ". " +
                          result.qs[index].options[
                            result.as[index].answer.charCodeAt(0) - 65
                          ]
                        : "")}
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
      <Link href="/input">
        <button
          type="submit"
          className="mx-auto px-4 py-2 rounded-md w-fit h-fit my-10 border-solid border-2 text-purple border-purple  hover:scale-105 hover:border-yellow hover:text-yellow hover:shadow-focus font-bold"
        >
          Generate a new quiz!
        </button>
      </Link>
    </div>
  );
}
