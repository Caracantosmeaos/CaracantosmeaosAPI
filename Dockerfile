# ===========================
# Stage 1: Build
# ===========================
FROM node:20-bookworm AS builder

WORKDIR /app

# Copia package.json de root y subapp para cache de deps
COPY package*.json ./
COPY ProClubsAPI/package*.json ./ProClubsAPI/

# Instala dependencias
RUN npm install
RUN cd ProClubsAPI && npm install

# Copia todo el código
COPY . .

# Build subapp y root
RUN cd ProClubsAPI && npm run build
RUN npm run build

# ===========================
# Stage 2: Runtime
# ===========================
FROM node:20-bookworm

# Instala Chromium y deps del sistema
RUN apt-get update \
    && apt-get install -y \
        chromium \
        fonts-ipafont-gothic \
        fonts-wqy-zenhei \
        fonts-thai-tlwg \
        fonts-khmeros \
        fonts-kacst \
        fonts-freefont-ttf \
        libxss1 \
        dbus \
        dbus-x11 \
        --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r pptruser \
    && useradd -rm -g pptruser -G audio,video pptruser

USER pptruser
WORKDIR /app

# Copia node_modules completos y código
COPY --from=builder /app ./

# Puppeteer config
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Ejecuta TS directamente con ts-node + tsconfig-paths
CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "src/app.ts"]
