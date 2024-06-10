# A React 2-D Physics Library

### Motivation
The intention for this project is to provide a common set of tools for creating a perpetually animated HTML element that is wrapped by a React functional component.

In other words, we can add 2-D physics to HTML elements and actively simulate it in the browser. 

For the programmer, a typical usage of the library would involve using one of the many built-in functional components part of the library (or perhaps I can find a way to build components dynamically?). For now, HTML elments are animated based on how pre-defined React components work. Visit [here](#code-example) for a code example.

### Supported HTML Elements
- \<svg\> with a \<rect\> element within via \<AnimatedRect\> functional component.

### Compiling, Testing, and Serving an Example App
View the package.json to view all the necessary scripts.
Additionally, there is a Playwright e2e test suite run by invoking the `npx playwright test` command.
My playwright tests depend on the `serve` library, so install `serve` (I did it globally for my system).

For reference, you can view my publically available GitLab CI / CD pipeline to learn how to run unit tests and playwright tests on a node 18 docker image (runs on Linux, but with some minor tweaks I've tested it on Windows, too).
https://gitlab.com/learningtcr/react-physics/-/blob/main/.gitlab-ci.yml?ref_type=heads

### Testing Structure
Admittedly, the structure of files/directories in the project is somewhat disorganized. However, most source files are in ./src and test files are organized by their granularity in ./test/unit as the lowest to ./test/e2e as the highest integration level test. To get an idea for the basic functionality, the e2e playwright tests describe the implemented functionality and expectation of the test.

### (Windows) How to run tests, which involves typical usage of a basic code example.
> For Linux, you will need to download the Linux rollup to execute the tests. An example of this is located in the Dockerfile. It will be suggested upon failure of text execution.
0) Install dependencies (as seen in the Dockerfile):
> RUN npm ci

> RUN npx playwright install

> RUN npm install -g serve

> RUN npx playwright install-deps

1) npx playwright test (this runs the build script and compiles the typescript and then serves the webpage for test execution)
### How to build

### Code Example
```
<AnimatedRect 
        ref={rect1} 
        velocityVector={vectorState} 
        moreProps={
          {
            "data-testid": "Box-1",
            transition: transitionState
          }
        }
/>
```
See App.tsx for a more fleshed-out example of a typical app featuring the react physics decoration and the e2e/AnimationTest.spec.tsx test.
