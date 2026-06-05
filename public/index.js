function log(message) {
    console.log('Adding user to MongoDB:');
    addUser();
}

function addUser() {
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' })
    })
    .then(response => response.json())
    .then(data => console.log(`User added with ID: ${data.insertedId}`))
    .catch(error => console.log(`Error adding user: ${error.message}`));
}