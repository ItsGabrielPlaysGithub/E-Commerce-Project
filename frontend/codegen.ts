// frontend/codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'http://localhost:4000/graphql': {
      headers: {
        'apollo-require-preflight': 'true',
      },
    },
  },
  documents: ['src/**/*.{tsx,ts}'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;