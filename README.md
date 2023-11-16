# Vuexpress
Vue and Express project template

## 开发
```shell
# shell
cd vuexpress-frontend
npm install
npm run dev

# browser
# 127.0.0.1:5173

# other shell
cd vuexpress-backend
npm install
npm run dev
```

## 打包
```shell
cd vuexpress-frontend
npm run build

cd ..
rm -r vuexpress-backend/src/public/
cp -r vuexpress-frontend/dist/ vuexpress-backend/src/public/
```
