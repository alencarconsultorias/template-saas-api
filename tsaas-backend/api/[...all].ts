// Catch-all Vercel Serverless Function for all routes
// Re-exports the compiled Express/Nest handler from dist

// eslint-disable-next-line @typescript-eslint/no-var-requires
const handler = require('../dist/src/vercel').default;

export default handler;


