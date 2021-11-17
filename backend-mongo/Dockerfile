# BUILD
FROM node:14 AS BUILDER

WORKDIR /app
COPY . .
RUN npm install && npm run build


# RUN
FROM node:14-alpine

WORKDIR /app
COPY --from=BUILDER /app ./

EXPOSE 8001
EXPOSE 5672

CMD ["npm", "run", "start:listener"]

