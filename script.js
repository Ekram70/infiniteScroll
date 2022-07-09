const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totlaImages = 0;
let photosArray = [];
let initialLoad = true;

// unsplash api
let count = 5;
const APIKey = 'hGWcCr9uDw7TnKItIPbkTUl6qljm_VpP-CkFogABTr0';
let APIURL = `https://api.unsplash.com/photos/random/?client_id=${APIKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totlaImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
    APIURL = `https://api.unsplash.com/photos/random/?client_id=${APIKey}&count=${count}`;
  }
}

// helper function to set Attribute on Dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, add to dom
function displayPhotos() {
  totlaImages = photosArray.length;
  imagesLoaded = 0;
  // run function for each object in photos array
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event listerne, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(APIURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', (e) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// on load
getPhotos();
