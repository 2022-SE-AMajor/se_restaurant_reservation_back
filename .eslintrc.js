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
        // tsconfig 파일의 경로를 참조 해줍니다. 
        // 기준은 root 입니다.
    },
    rules: {
            // 추가하고 싶은 rule을 더 추가해줍니다.
        }
};