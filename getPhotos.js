const fetch = require("node-fetch");
const fs = require("fs");

const OPTIONS = {
  numItems: 100,
  width: 600,
  height: 600,
  collectionId: 311028
};

const BASE_URL = `https://source.unsplash.com/collection`;

async function getUnsplashImage(options) {
  const res = await fetch(
    `${BASE_URL}/${options.collectionId}/${options.width}x${options.height}`
  );

  return res.url;
}

(async function generatePhotos(OPTIONS) {
  const photos = [];
  for (let i = 0; i < OPTIONS.numItems; i++) {
    const url = await getUnsplashImage(OPTIONS);
    photos.push({
      id: i,
      url
    });
  }

  const data = {
    photos
  };

  fs.writeFileSync("photos.json", JSON.stringify(photos, null, 2));

  return images;
})(OPTIONS);
