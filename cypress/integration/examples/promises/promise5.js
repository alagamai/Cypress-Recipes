const someConditionIsTrue = true

function callback1() {
  console.log("callback 1 is triggered ...");
  return "return value"
}
const myPromise = new Promise((resolve, reject) => {
      if (someConditionIsTrue) {
	resolve("Operation successful!");
       //resolve({ userId: 1, userName: "John Doe" });
      	//resolve(callback1()),then(msg => {
//	    console.log(msg);
    //  	})
  } else {
    	//reject(new Error("Operation failed!"));
	//reject("Operation failed!");
	//reject(callback1());
      	reject({ userId: 1, userName: "John Doe" });

  }
});

myPromise
  .then((result) => {
    console.log(result); // Output: Operation successful!
  })
  .catch((error) => {
    console.error(error); // Handle any errors that occurred
  });
