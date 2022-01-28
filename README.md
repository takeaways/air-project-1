# React18 프로젝트 진행하기

React18 테스트용 프로젝트

# 패키지 버전 올리기

```zsh
npm i next@latest react@rc react-dom@rc
```

# 스타일 패키지 셋팅 (tailwindcss)

```zsh
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind 셋업 하기

```js
// tailwind.config.js
module.exports = {
  content: [
    // tailwind를 어디에 적용할 것인지 작성합니다.
    "./pages/**/*.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
