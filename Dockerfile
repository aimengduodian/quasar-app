FROM nginx:1.15

ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html/ebook/
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' > /etc/timezone
