const withVideos = require('next-videos')

 
module.exports = withVideos()

module.exports = {
    env: {
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        PROJECT_ID: process.env.PROJECT_ID,
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID
    }
  };
  