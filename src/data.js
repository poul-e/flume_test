import { proxy } from "valtio";

const attributes = proxy([
  { name: "finition", values: ["pure", "sport"], currentValue: "pure" },
  { name: "option", values: ["hype", "chic", "racing"], currentValue: "chic" },
  { name: "rims", values: ["rim1", "rim2"], currentValue: "rim2" },
]);

export default attributes;
