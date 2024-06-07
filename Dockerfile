FROM node:18
workdir /app

COPY ./src ./src
COPY ./test ./test
COPY ./public ./public

COPY index.html .babelrc .eslintrc.cjs .eslintrc.json package.json package-lock.json jest.config.cjs playwright-environment.ts playwright.config.ts tsconfig.json tsconfig.node.json vite.config.ts ./

# Install the npm dependencies
RUN npm ci
RUN npm install @rollup/rollup-linux-x64-gnu
RUN npx playwright install
RUN npm install -g serve
RUN npx playwright install-deps

# Set the default command to run when the container starts
CMD ["sh"]
