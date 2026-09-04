import { resolve as defaultResolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier === '$' || specifier === 'vite-plugin-monkey/dist/client') {
    const mockPath = defaultResolve(fileURLToPath(import.meta.url), '../mockUserscript.mjs');
    return nextResolve(pathToFileURL(mockPath).href, context);
  }
  if (specifier.startsWith('.') || specifier.startsWith('file:')) {
    try {
      return await nextResolve(specifier, context);
    } catch (err) {
      if (context.parentURL) {
        const parentPath = fileURLToPath(context.parentURL);
        const basePath = defaultResolve(parentPath, '..', specifier);
        for (const ext of ['.ts', '.tsx', '.mjs', '.js', '/index.ts', '/index.js']) {
          const testPath = basePath + ext;
          if (existsSync(testPath)) {
            return nextResolve(pathToFileURL(testPath).href, context);
          }
        }
      }
      throw err;
    }
  }
  return nextResolve(specifier, context);
}
