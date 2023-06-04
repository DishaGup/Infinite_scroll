/** @type {import('next').NextConfig} */
const nextConfig = {
    babel: {
        presets: ['next/babel'],
        plugins: [['transform-react-jsx', { pragma: 'React.createElement' }]],
      },
}

module.exports = nextConfig
