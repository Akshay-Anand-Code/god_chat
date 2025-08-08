const { favicons } = require('favicons');
const fs = require('fs');
const path = require('path');

// Source image
const source = path.resolve(__dirname, 'public/companion.jpg');

// Configuration
const configuration = {
  path: "/", // Path for overriding default icons path
  appName: "Companion.ai", // Your application's name
  appShortName: "Companion", // Your application's short name
  appDescription: "Chat with AI companions", // Your application's description
  developerName: "Companion.ai", // Your (or your developer's) name
  developerURL: null, // Your (or your developer's) URL
  background: "#000000", // Background color for flattened icons
  theme_color: "#00ff9d", // Theme color for browser chrome
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false
  }
};

// Generate the favicon
(async () => {
  try {
    const response = await favicons(source, configuration);
    
    // Create the favicon.ico file
    await fs.promises.writeFile(
      path.resolve(__dirname, 'public/favicon.ico'),
      response.images.find(image => image.name === 'favicon.ico').contents
    );
    
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error(error.message);
  }
})();