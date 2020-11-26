FROM node:lts
COPY . /app
WORKDIR /app
RUN npm install && npm run build && npm i serve -g
RUN cp -r build/ cpbuild && cp -r cpbuild/ build/color-convert
EXPOSE 3000
CMD serve -l 3000 build
