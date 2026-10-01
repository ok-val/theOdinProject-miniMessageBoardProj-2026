import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import html from '@html-eslint/eslint-plugin';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error'
    }
  },

  // // 2. New HTML Linting Configuration
  // {
  //   files: ['**/*.html'],
  //   plugins: {
  //     html
  //   },
  //   language: 'html/html',
  //   rules: {
  //     ...html.configs.recommended.rules, // Optional: Enables built-in recommended HTML rules
  //     'html/indent': ['error', 2], // Example style rule: enforces 2-space indentation
  //     'html/require-doctype': 'error' // Example structure rule: ensures <!DOCTYPE html> exists
  //   }
  // },

  // 3. Global Ignores
  {
    ignores: ['dist/', 'build/', 'node_modules/']
  }
]);
