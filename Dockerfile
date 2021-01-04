FROM node:12
RUN apt-get update -y
RUN mkdir /lmsbackendproject
WORKDIR /lmsbackendproject
COPY . .
RUN npm install phantomjs-prebuilt@2.1.13 --ignore-scripts
RUN npm install -g typescript
RUN npm i --S mongodb
ENV S3_ACCESS_KEY AKIAS6IFASFK6CHMO565
ENV S3_SECRET_KEY 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
ENV FE_URL https://lms.sameera.sayerameshbabu.com
ENV MONGO_DB mongodb+srv://dbuser:dbuser12@cluster0.pfxgr.mongodb.net/dbuser?retryWrites=true&w=majority
ENV S3_BUCKET sameera-s3-bucket
CMD ["npm","run","dev"]
EXPOSE 3000


