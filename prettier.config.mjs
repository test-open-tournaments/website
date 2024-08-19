/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {import("prettier-plugin-tailwindcss").TailwindConfig} TailwindConfig*/
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
export default {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  printWidth: 80,
  arrowParens: 'avoid',
  trailingComma: 'none',
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports'
  ],
  tailwindAttributes: ['className'],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@env|@api|@actions|@dataModel|@utils|@types)$',
    '',
    '^~/lib/(.*)$',
    '^~/components/ui/(.*)$',
    '^~/components/(.*)$',
    '^~/(.*)$',
    '^[./]',
    '',
    '<TYPES>',
    '<TYPES>^[.]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy']
}
