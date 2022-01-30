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

# Prisma

```zsh
npm i -D prisma
npx prisma init
```

# PlanetScale

참고 `https://github.com/planetscale/cli`

```zsh
# install
brew install planetscale/tap/pscale
brew install mysql-client
```

### 사용가능 여부 확인하기

```zsh
pscale
pscale auth login
pscale region list
  NAME (6)                      SLUG           ENABLED
 ----------------------------- -------------- ---------
  US East - Northern Virginia   us-east        Yes
  US West - Oregon              us-west        Yes
  EU West - Dublin              eu-west        Yes
  Asia Pacific - Mumbai         ap-south       Yes
  Asia Pacific - Singapore      ap-southeast   Yes
  Asia Pacific - Tokyo          ap-northeast   Yes

```

### 데이터 베이스 생성하기

[생성확인](https://app.planetscale.com/)

```zsh
pscale database create [project's name] --region
```

### 데이터 베이스 연결하기

```zsh
pscale connect [project's name]
```

.env

```
DATABASE_URL="mysql://127.0.0.1:3306/project's name"
```

### 프리즈마 스키마 보내기

```zsh
npx prisma db push
```

```prisma
...
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"] //추가
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  referentialIntegrity = "prisma" //추가
}
...
```

테이블 확인하기

```zsh
npx prisma studio
```

### prisma model로 typescript Type 만들기

```zsh
npx prisma generate
```
