/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "*logo.clearbit.com",
                port: "",
                pathname: "**",
            },
        ],
    },
}

module.exports = nextConfig
