import type { NextConfig } from 'next';

// `eslint.dirs` only ever scoped `next lint`, which this repo does not use —
// the lint script is a flat `eslint .`. Next 16 removes the key from
// NextConfig entirely, so keeping it fails typecheck (TS2353) the moment the
// framework is bumped, for a setting that was already inert.
const nextConfig: NextConfig = {};

export default nextConfig;
