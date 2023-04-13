fetch('https://jsonplaceholdererr.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('API call completed'));
