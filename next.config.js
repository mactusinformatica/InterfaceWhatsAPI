const nextConfig = {
    publicRuntimeConfig: {
        NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
        NEXT_PUBLIC_SERVER_CHAT: process.env.NEXT_PUBLIC_SERVER_CHAT,
        NEXT_PUBLIC_API_FINANCEIRO: process.env.NEXT_PUBLIC_API_FINANCEIRO,
      }
  }
  
module.exports = nextConfig