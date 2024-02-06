# Define Node.js image and version
FROM node:18.16

# Define working directory
WORKDIR /app/frontend

# Copy sourcecode from backend to the containter
COPY frontend/ /app/frontend

# Intall node.js dependencies
RUN npm install

# Expose same port where backend is listening
EXPOSE 5173

# Execute backend inside container
CMD ["npm", "start"]
