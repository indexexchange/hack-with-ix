FROM       ir.indexexchange.com:5000/node:6.9
EXPOSE     8000
ENTRYPOINT ["entrypoint-api.sh"]

RUN apt-get update
RUN apt-get install -y tar

RUN npm install uglify-js -g

ENV SRC_DIR /src
ENV BASE_DIR /opt/hackathon
ENV DEST_DIR $BASE_DIR/api
ENV ENV ${ENV:-development}
ENV NODE_ENV $ENV

RUN mkdir -p $DEST_DIR

COPY ./ $SRC_DIR

# Entrypoint copying section
COPY docker/entrypoint-api.sh /bin/entrypoint-api.sh
RUN chmod +x /bin/entrypoint-api.sh

RUN entrypoint-api.sh --deploy  &&  rm -rf $SRC_DIR
