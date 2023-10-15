"use client";
import React, { useState } from "react";

export default function Question({ num, ques, setAnswer }) {
  const type = ques.type;
  return (
    <div id={num} className="w-full">
      {type === "MCQ" ? (
        <MCQ num={num} ques={ques} update={(val) => setAnswer(num, val)} />
      ) : type === "TF" ? (
        <TF num={num} ques={ques} update={(val) => setAnswer(num, val)} />
      ) : (
        <FR num={num} ques={ques} update={(val) => setAnswer(num, val)} />
      )}
    </div>
  );
}

function MCQ({ num, ques, update }) {
  const { text, options } = ques;
  return (
    <div className="my-6">
      <h2 className="mt-4 mb-1 text-xl">
        {num + 1}. {text}
      </h2>
      {options.map((optionText, index) => {
        return (
          <div
            key={index}
            className="flex flex-row w-fit min-h-fit h-10 justify-center items-center"
          >
            <input
              type="radio"
              name={num}
              onChange={() => update(String.fromCharCode(index + 65))}
              className="relative m-3 h-5 w-5 appearance-none rounded-full border-2 border-solid border-purple before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-yellow checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-yellow checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] checked:shadow-focus hover:shadow-hover hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] hover:cursor-pointer"
            />
            <label className="text-gray w-fit h-fit">{optionText}</label>
          </div>
        );
      })}
    </div>
  );
}

function TF({ num, ques, update }) {
  const { text } = ques;
  return (
    <div className="my-6">
      <h2 className="mt-4 mb-1 text-xl">
        {num + 1}. {text}
      </h2>
      {["True", "False"].map((optionText, index) => {
        return (
          <div
            key={index}
            className="flex flex-row w-fit min-h-fit h-10 justify-center items-center"
          >
            <input
              type="radio"
              name={num}
              onChange={() => update(optionText.toLowerCase())}
              className="relative m-3 h-5 w-5 appearance-none rounded-full border-2 border-solid border-purple before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-yellow checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-yellow checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] checked:shadow-focus hover:shadow-hover hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]"
            />
            <label className="text-gray w-fit h-fit">{optionText}</label>
          </div>
        );
      })}
    </div>
  );
}

function FR({ num, ques, update }) {
  const { text } = ques;
  const [textResponse, setTextResponse] = useState("");

  const handleResponseChange = (e) => {
    setTextResponse(e.target.value);
  };
  return (
    <div className="my-6 flex flex-col justify-start w-full">
      <h2 className="mt-4 mb-1 text-xl">
        {num + 1}. {text}
      </h2>
      <textarea
        value={textResponse}
        onChange={handleResponseChange}
        placeholder="Your response here"
        rows="10"
        className="my-4 p-2 w-full border border-2 rounded bg-superdark text-gray border-purple focus:border-yellow focus:outline-none focus:shadow-focus"
      />
      <button
        className="place-self-center my-2 px-auto py-auto rounded-md w-20 h-8 border-solid border-2 text-purple border-purple hover:scale-102 hover:border-yellow hover:text-yellow hover:shadow-focus font-bold"
        onClick={() => update(textResponse)}
      >
        Save
      </button>
    </div>
  );
}
