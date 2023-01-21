FROM node:18-alpine

WORKDIR /frontend

COPY . .

RUN npm ci && \
    npm run build && \
    npm install --global serve

EXPOSE 3000

CMD ["serve", "build"]
