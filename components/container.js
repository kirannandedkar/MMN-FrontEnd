"use client"
import React from "react";

const Container = ({ children, className = "" }) => {
  return <div className={`container mx-auto ${className} max-w-[1440px]`}>{children}</div>;
};

export default Container;
