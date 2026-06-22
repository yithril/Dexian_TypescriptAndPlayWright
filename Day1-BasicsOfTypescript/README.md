# Day 1 - Basics of TypeScript

Day 1 is TypeScript fundamentals. We write small `.ts` files and run them straight
away with **ts-node** (no separate compile step) so we can experiment as we learn.

The practice exercises are in `TypeScript_Practice_Lab.pdf`.

## Prerequisites

[Node.js](https://nodejs.org/) (includes `npm`). Check it is installed:

```bash
node --version
npm --version
```

## One-time setup

From inside this `Day1-BasicsOfTypescript` folder:

```bash
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

That gives you TypeScript, the ts-node runner, Node's type definitions, and a
`tsconfig.json`.

## Running a file as we learn

Write a `.ts` file and run it directly - ts-node compiles and runs it in one step:

```bash
npx ts-node hello.ts
```

For example, create `hello.ts`:

```ts
const greet = (name: string): string => `Hello, ${name}!`;
console.log(greet('TypeScript'));
```

Then:

```bash
npx ts-node hello.ts
# Hello, TypeScript!
```

> Tip: add a script to `package.json` so you can run `npm start` instead of typing
> the path each time:
>
> ```json
> "scripts": { "start": "ts-node index.ts" }
> ```

That is all you need for Day 1 - create files, run them with `ts-node`, and work
through the practice lab.
