FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production

# ARG REACT_APP_FACEBOOK_APP_ID
# ARG REACT_APP_NOTE_KEEPER_API

WORKDIR /app
COPY --from=builder /app/build ./
COPY cert.pem key.pem ./

RUN npm install -g http-server

ENV PORT=443
EXPOSE 443

CMD ["http-server", "-S"]