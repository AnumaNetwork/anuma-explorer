# --- multistage docker build: stage #1: build stage
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

ENV REACT_APP_API="http://95.216.144.139:8000"
ENV REACT_APP_SOCKET="ws://95.216.144.139:8001"

# Copy package.json and package-lock.json to work directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# --- multistage docker build: stage #2: runtime image
FROM node:alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy only the build output from the previous stage
COPY --from=build /app/build /app/build

# Expose port 3000
EXPOSE 3000

# Command to run explorer
CMD ["serve", "-s", "build", "-l", "3000"]