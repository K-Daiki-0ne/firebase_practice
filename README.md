# Firebase practice v9~ with Next

### アプリケーション概要
Firebaseを使用したTwitter cloneアプリケーション

### 作成理由
Firebase ver 9.0〜は以前まで(ver 8.0)と比べて大きな仕様変更が行われています。
なので、ver 9.0〜はver 8.0と比べて何がどのように変更されたのかを知りたかったので、実際に手を動かしながら開発を実施しました。

### 環境構築

```bash
# npm
npm install

# yarn
yarn install
```

```bash
# .envを作成する
# 下記項目がfirebaseから出力されるので、設定してください。
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGEINGSENDERID=
NEXT_PUBLIC_APPID=
NEXT_PUBLIC_MEASUREMENTID=
```

```bash
# npm
npm run dev

# yarn
yarn dev
```