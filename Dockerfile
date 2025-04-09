FROM node:20-alpine3.20

COPY dist /opt/dist/
COPY storage /opt/storage/
COPY \
  package-lock.json \
  package.json \
  /opt/

WORKDIR /opt

RUN npm ci --omit=dev

ENV \
  NODE_ENV=production \
  API_PORT=80 \
  API_STORAGE=storage/users.json

EXPOSE 80

CMD ["dist/server.js"]
