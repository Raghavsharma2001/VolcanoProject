import React from "react";

export default function Logout() {
  console.log("token");

  localStorage.removeItem("token");
}
