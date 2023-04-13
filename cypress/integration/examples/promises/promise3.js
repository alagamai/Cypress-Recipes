const myFirstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

myFirstPromise.then((successMessage) => {
  console.log(`Yay! ${successMessage}`);
});
