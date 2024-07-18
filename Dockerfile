FROM node  
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 8081
CMD ["node", "dist/app.js"]