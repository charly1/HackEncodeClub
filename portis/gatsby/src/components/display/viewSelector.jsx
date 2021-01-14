import React from "react"
import Admin from './admin';

const selector = {
  admin: Admin,
};

export function ViewSelector({ view, ...props }) {
  const component = selector[view];
  console.log("🚀 ~ file: viewSelector.jsx ~ line 10 ~ ViewSelector ~ component", component)
  return component ? <component {...props} /> : null;
}