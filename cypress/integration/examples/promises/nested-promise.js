let fetchData_resolve = true;

const fetchData = () => {
	return new Promise((resolve, reject) => {
		if (fetchData_resolve)
		resolve({user_name: "Tom", email: "tom@yopmail.com"})
		else 
		reject({user_name: "Unknown", email: "undefined"})
 	})	
}


const fetchUserProfile = () => {
	return fetchData().then((data) => {
		console.log(data)
		return 'Fetched profile successfully'

	})
}

fetchUserProfile().then((msg) => {
   console.log(msg)
}).catch(err => {
  console.log(err)
})	
