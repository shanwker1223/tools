module.exports = {
  "extends": ["../../../.eslintrc.js"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "semi": ["error","always"],
        "arrow-body-style": ["error", "as-needed"],
        "autofix/no-unused-vars": [
          "error",
          {
            "argsIgnorePattern": "^_",
            "ignoreRestSiblings": true,
            "destructuredArrayIgnorePattern": "^_"
          }
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            "prefer": "type-imports"
          }   
        ],
        "import/order": [
          "error",
          {        
            "groups": [
              "builtin",
              "external",
              "parent",
              "sibling",
              "index",
              "object",   
              "type"
            ],
            "pathGroups": [
              {
                "pattern": "@/**/**",
                "group": "parent",
                "position": "before"
              }
            ],
            "alphabetize": { "order": "asc" }
          }
        ],
        "no-restricted-imports": [
          "error",
          { 
            "patterns": ["../"] 
          }
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
};
