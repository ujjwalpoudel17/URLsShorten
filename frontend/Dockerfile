# Use nginx as the web server
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy your frontend files
COPY . /usr/share/nginx/html

# Expose nginx default port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]