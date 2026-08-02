import React from "react";
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us - The House of Korean Beauty",
  description: "Nigeria's #1 destination for trusted, dermatologist-backed K-Beauty innovation.",
};

export default function About() {
  return <AboutClient />;
}
