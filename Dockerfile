# Use Cypress included image (only supports Electron)
FROM cypress/included:14.3.0

WORKDIR /

# Copy the package files
COPY package*.json ./
RUN npm install

# Copy the rest of your project
COPY . .

# Run Cypress tests
CMD ["npx", "cypress", "run"]
