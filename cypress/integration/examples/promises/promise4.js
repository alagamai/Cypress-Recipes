const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo"); // Yay! Everything went well!
  }, 250);
});

function msg() {
	console.log("sdfdsfdsf");
}
myPromise.then((msg)) 

