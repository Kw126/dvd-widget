// The most the images colour can change each bounce.
// Set this and minHueShift to 0 for no colour change
const maxHueShift = 330

// The least the images colour can change each bounce
// Set this and maxHueShift to 0 for no colour change
const minHueShift = 30

// The speed the image moves at
const speed = 10

// A link to the image being used
const image = "https://kw126.github.io/dvd-widget-assets/cone.png"

/*-------------------------------------------------------------------------------------*/

// Load external dependencies
const scripts = ['https://cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js'];
const fetchedStatus = {};
scripts.forEach((script) => (fetchedStatus[script] = false));

function ensureDependencies() {
    return new Promise((resolve, reject) => {
        if (Object.values(fetchedStatus).every((script) => script)) {
            resolve();
        } else {
            Promise.all(scripts.map((script) => getScriptPromise(script)))
                .then(() => {
                    resolve();
                })
                .catch((reason) => {
                    reject(reason);
                });
        }
    });
}

function getScriptPromise(script) {
    return new Promise((resolve, reject) => {
        $.getScript(script)
            .done(() => {
                fetchedStatus[script] = true;
                resolve();
            })
            .fail(() => {
                reject('external javascript error: a script failed to load');
            });
    });
}
//gets the HTML element
const logo = document.getElementById("dvdLogo");

//sets the custom image
logo.src = image;

//sets movement variables
let x = 100;
let y = 100;
let dx = speed;
let dy = speed;

//starting colour change. make 0 for no change
let hue = 0;

/**Moves the image around the screen and changes the images hue by a random amount
 * @param maxShift The most the images colour can change each bounce
 * @param minShift The least the images colour can change each bounce
 */
function animate(maxShift, minShift) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const logoWidth = logo.offsetWidth;
    const logoHeight = logo.offsetHeight;

    x += dx;
    y += dy;

    let hitCorner = false;

    if (x + logoWidth >= screenWidth || x <= 0) {
        dx *= -1;
        hitCorner = true;
    }

    if (y + logoHeight >= screenHeight || y <= 0) {
        dy *= -1;
        hitCorner = true;
    }

    logo.style.left = x + "px";
    logo.style.top = y + "px";

    if (hitCorner) {
        hue = (hue + Math.floor(Math.random() * (maxShift - minShift) + minShift)) % 360;
        logo.style.filter = `hue-rotate(${hue}deg)`;
    }

    requestAnimationFrame(() => animate(maxShift, minShift));

}

animate(maxHueShift, minHueShift);