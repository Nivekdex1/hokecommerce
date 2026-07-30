"use client";

import { Questions } from "@/lib/data";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import QuizResults from "./QuizResults";
import { Button } from "./button";

const SkinQuiz = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [skinType, setSkinType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const determineResults = async () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < Questions.length) {
      alert("Please answer all questions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if all answers are option 1 (index 0) for dry skin
      const allOptionOne = Object.values(answers).every(
        (answer) => answer === 0,
      );
      if (allOptionOne) {
        setSkinType("dry-skin");
        setSubmitted(true);
        return;
      }

      // Check if all answers are option 2 (index 1) for normal skin
      const allOptionTwo = Object.values(answers).every(
        (answer) => answer === 1,
      );
      if (allOptionTwo) {
        setSkinType("normal-skin");
        setSubmitted(true);
        return;
      }

      // Check if all answers are option 3 (index 2) for oily skin
      const allOptionThree = Object.values(answers).every(
        (answer) => answer === 2,
      );
      if (allOptionThree) {
        setSkinType("oily-skin");
        setSubmitted(true);
        return;
      }

      // If no exact match, determine based on most common answer
      const answerCounts = {
        dry: 0, // count of option 1 (index 0)
        normal: 0, // count of option 2 (index 1)
        oily: 0, // count of option 3 (index 2)
      };

      Object.values(answers).forEach((answer) => {
        if (answer === 0) answerCounts.dry++;
        else if (answer === 1) answerCounts.normal++;
        else if (answer === 2) answerCounts.oily++;
      });

      // Find the skin type with the highest count
      const maxCount = Math.max(
        answerCounts.dry,
        answerCounts.normal,
        answerCounts.oily,
      );

      if (answerCounts.dry === maxCount) {
        setSkinType("dry-skin");
      } else if (answerCounts.normal === maxCount) {
        setSkinType("normal-skin");
      } else {
        setSkinType("oily-skin");
      }

      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setSkinType("");
  };

  if (submitted) {
    return (
      <QuizResults
        skinType={skinType}
        resetQuiz={resetQuiz}
        answers={answers}
      />
    );
  }

  return (
    <div className="my-8 px-6 md:px-12 py-8">
      <h2 className="font-playfair text-5xl lg:text-6xl">
        Personalized <br /> Skincare Quiz
      </h2>
      <p className="font-montserrat text-hokBlack mt-5 text-lg">
        Find out your skin type and #DISCOVER the best of Korean Skincare for
        your skin
      </p>
      <div className="bg-[#73512C] font-montserrat mt-10 w-fit max-w-fit rounded-[28px] px-5 py-[10px] text-lg font-semibold text-white">
        Answer the Questions
      </div>
      {Questions.map((q) => (
        <div key={q.id} className="mb-8 rounded-lg py-6">
          <h3 className="font-montserrat mb-4 text-lg font-semibold">
            {q.id}. {q.question}
          </h3>
          <div className="space-y-3">
            {q.options.map((option, index) => (
              <div
                key={index}
                onClick={() => !isSubmitting && handleOptionSelect(q.id, index)}
                className={`flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 transition-colors ${answers[q.id] === index
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-50 hover:bg-gray-100"
                  } ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <div className="flex w-full items-center">
                  <div
                    className={`mr-3 h-4 w-4 flex-shrink-0 rounded-full border ${answers[q.id] === index
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                      }`}
                  ></div>
                  <span className="font-montserrat">
                    {option.text} {option.emoji}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={determineResults}
        disabled={
          isSubmitting || Object.keys(answers).length < Questions.length
        }
        className="bg-[#73512C] font-montserrat mt-6 rounded-[28px] px-8 py-3 font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "SUBMIT"}
        </div>
      </Button>
    </div>
  );
};

export default SkinQuiz;
