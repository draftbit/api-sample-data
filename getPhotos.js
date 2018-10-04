const fetch = require("node-fetch");
const fs = require("fs");

const OPTIONS = {
  numItems: 100,
  width: 300,
  height: 300,
  collectionId: 311028
};

const BASE_URL = `https://source.unsplash.com/collection`;

async function getUnsplashItImage(options, i) {
  return `https://unsplash.it/${options.width}/${
    options.height
  }/?random&__id=album${i}`;
}

async function getUnsplashImage(options) {
  const randomNum = Math.floor(Math.random() * options.numItems);
  const res = await fetch(
    `${BASE_URL}/${options.collectionId}/${options.width}x${
      options.height
    }/?sig=${randomNum}`
  );

  return res.url;
}

(async function generatePhotos(OPTIONS) {
  const photos = [];
  for (let i = 0; i < OPTIONS.numItems; i++) {
    const url = await getUnsplashItImage(OPTIONS, i);

    photos.push({
      id: i,
      url
    });
  }

  const data = {
    photos
  };

  fs.writeFileSync("photos.json", JSON.stringify(photos, null, 2));
  console.log("done");

  return photos;
})(OPTIONS);
