function handleFulfilledA() {
	console.log("handleFulfilledA");
}
function handleRejectedA() {
        console.log("handleRejectedA");
}
function handleFulfilledB() {
        console.log("handleFulfilledB");
}
function handleRejectedB() {
        console.log("handleRejectedB");
}

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
})

myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB) 


~          
