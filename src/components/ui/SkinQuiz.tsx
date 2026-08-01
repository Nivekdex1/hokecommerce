"use client";

import { Questions } from "@/lib/data";
import { Loader2, Check } from "lucide-react";
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
    <div className="px-4 md:px-8 py-6">
      <div className="text-center mb-12">
        <h2 className="font-fondamento text-3xl md:text-4xl text-hok-espresso mb-4">
          Let's find your perfect routine
        </h2>
        <div className="w-16 h-1 bg-hok-champagne mx-auto rounded-full" />
      </div>

      <div className="space-y-10">
        {Questions.map((q) => (
          <div key={q.id} className="mb-4">
            <h3 className="font-outfit mb-5 text-xl font-medium text-hok-espresso">
              <span className="text-hok-champagne mr-2 font-bold">{q.id}.</span> 
              {q.question}
            </h3>
            <div className="space-y-3">
              {q.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !isSubmitting && handleOptionSelect(q.id, index)}
                  className={`flex cursor-pointer items-center rounded-2xl border p-4 transition-all duration-300 ${
                    answers[q.id] === index
                      ? "bg-hok-ivory border-hok-champagne shadow-[0_4px_12px_rgba(212,168,83,0.15)]"
                      : "bg-white border-hok-mist hover:border-hok-stone/40 hover:bg-hok-linen/50"
                  } ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <div className="flex w-full items-center">
                    <div
                      className={`mr-4 h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                        answers[q.id] === index
                          ? "border-hok-champagne bg-hok-champagne text-white"
                          : "border-hok-mist bg-white"
                      }`}
                    >
                      {answers[q.id] === index && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className="font-outfit text-[1.05rem] text-hok-espresso font-light">
                      {option.text} {option.emoji}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          onClick={determineResults}
          disabled={
            isSubmitting || Object.keys(answers).length < Questions.length
          }
          className="w-full md:w-auto bg-hok-espresso font-outfit rounded-full px-12 py-7 text-[0.85rem] tracking-[0.2em] font-medium text-white transition-all duration-300 hover:bg-hok-espresso/90 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <div className="flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "ANALYZING..." : "SEE MY RESULTS"}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SkinQuiz;
