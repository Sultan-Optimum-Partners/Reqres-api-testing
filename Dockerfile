FROM mcr.microsoft.com/playwright:focal

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npx playwright install --with-deps

COPY . .

ENV BASE_URL=https://reqres.in

CMD ["npx", "playwright", "test"]
