import React from "react";
import Hero from "./_components/Hero";
import Proposition from "./_components/Proposition";
import CreateYourCase from "./_components/CreateYourCase";

const Home = () => {
  return (
    <div className="bg-slate-50 grainy-light">
      <Hero />
      <Proposition />
      <CreateYourCase />
    </div>
  );
};

export default Home;
