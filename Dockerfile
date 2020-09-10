FROM nginx:1.15

ADD tools/docker /etc/nginx/nginx.conf
ADD dist/spa /usr/share/nginx/html/ebook/
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone
