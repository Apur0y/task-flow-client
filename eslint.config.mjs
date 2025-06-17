import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Force specific rule overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
 rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "off",           // disables missing dependency warnings
    "@next/next/no-img-element": "off",             // disables <img> warning
    // Add more rules to disable here
  },
  },
];
export default eslintConfig;
