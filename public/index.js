function log(message) {
    alert(message);
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
    .then(data => log(`User added with ID: ${data.insertedId}`))
    .catch(error => log(`Error adding user: ${error.message}`));
}