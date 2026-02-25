# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Install build dependencies
COPY package*.json ./

# --legacy-peer-deps ignores the version conflicts that cause the AJV error
RUN npm install --legacy-peer-deps

COPY . .

# Set NODE_OPTIONS to give the builder more memory (prevents crashes on large builds)
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Ensure you have your nginx.conf in the frontend folder
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
