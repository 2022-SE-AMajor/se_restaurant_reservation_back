module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
         // typescript 표준 규칙 모음
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // import 관련 규칙 모음

        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",
        "plugin:react/recommended",
         // prettier 관련 규칙 모음
    ],
    settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },    
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        project: ["./tsconfig.json"],
                jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'react',
      '@typescript-eslint',
    ],
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'react/no-unstable-nested-components': [
        'off',
        { allowAsProps: true },
      ],
      'global-require': 0,
      'import/no-unresolved': ['error'],
      // 'linebreak-style': ['error', 'windows'],
      'linebreak-style': 0,
      allowTemplateLiterals: 0,
    },
  };