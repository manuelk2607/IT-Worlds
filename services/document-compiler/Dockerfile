FROM ghcr.io/typst/typst:0.15.1@sha256:032e292249bcd378480cc7c142cfa324b63ef8aadeb88d7e7230320c4c9c422f AS typst
FROM node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d
RUN apt-get update && apt-get install -y --no-install-recommends texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-xetex texlive-bibtex-extra biber poppler-utils fonts-lmodern lmodern && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y --no-install-recommends texlive-lang-german texlive-fonts-recommended && rm -rf /var/lib/apt/lists/*
COPY --from=typst /bin/typst /usr/local/bin/typst
COPY container.ts /opt/it-worlds/container.ts
ENV HOME=/work TZ=UTC SOURCE_DATE_EPOCH=1767225600
USER 65532:65532
WORKDIR /work
ENTRYPOINT ["node", "--experimental-strip-types", "/opt/it-worlds/container.ts"]
