import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "node_modules/**",
      "*.log",
      "errors*.txt",
      "ts_out.txt",
      "ts-error*.log",
      "original_page.tsx",
      "refactor-*.js",
      "remove-*.js",
      "fix-*.js",
      "check-ts.js",
      "transform-settings.js",
    ],
  },
  ...nextVitals,
  {
    rules: {
      // Réduit le bruit historique pour industrialiser le lint progressivement.
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
