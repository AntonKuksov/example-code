import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const compat = new FlatCompat({
  baseDirectory: DIRNAME,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ["**/dist", "**/.eslintrc.cjs", "**/output.css"]
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended"
    )
  ),
  {
    "env": {
      node: true
    },
    plugins: {
      "react-refresh": reactRefresh,
      react: react
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser
    },

    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true
        }
      ],

      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "never"],
      "react/jsx-indent": ["error", 2],

      indent: [
        "error",
        2,
        {
          SwitchCase: 1,

          ignoredNodes: [
            "TaggedTemplateExpression > TemplateLiteral > ArrowFunctionExpression",
            "TaggedTemplateExpression > TemplateLiteral > ArrowFunctionExpression > BlockStatement"
          ]
        }
      ],

      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "max-len": [
        "error",
        {
          code: 120,
          ignoreUrls: true,
          ignorePattern: "App.tsx"
        }
      ],

      "space-before-function-paren": ["error", "never"],

      "object-property-newline": [
        "error",
        {
          allowAllPropertiesOnSameLine: true
        }
      ],

      "lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true
        }
      ],

      "multiline-comment-style": ["error", "starred-block"],
      "arrow-body-style": ["error", "as-needed"],

      complexity: [
        "error",
        {
          max: 15
        }
      ],

      "max-params": ["error", 6],
      "object-curly-spacing": ["error", "always"],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase"]
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"]
        },
        {
          selector: "typeLike",
          format: ["PascalCase"]
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["UPPER_CASE", "camelCase"]
        }
      ],

      "prefer-destructuring": [
        "error",
        {
          object: true,
          array: false
        }
      ],

      "no-useless-constructor": "error",

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],

      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1],
          enforceConst: true
        }
      ],

      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-expressions": ["error", { allowShortCircuit: true }],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-require-imports": "off"
    }
  }
];
