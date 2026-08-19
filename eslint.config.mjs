import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      // Unused code is a smell in a portfolio repo — fail the lint, don't warn.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Type-only imports must be explicit (pairs with verbatimModuleSyntax).
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },

  // Scripts and verification harnesses report to a terminal — console is their
  // output device, not a leftover debug statement.
  {
    files: ["scripts/**/*.mjs", "docs/verification/**/*.mjs"],
    rules: { "no-console": "off" },
  },

  // Prettier last: turns off every stylistic rule that would fight the formatter.
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
]);

export default eslintConfig;
