#!/bin/bash

# Pull new changes from git
git pull

# Run the build command
npm run build

# Copy the build folder to the web server directory
sudo cp -R build/ /var/www/html/my-react-app/

# Test nginx configuration and reload
sudo nginx -t && sudo systemctl reload nginx

