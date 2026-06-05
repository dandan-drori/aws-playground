async function addUser(name, email) {
    const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    const data = await response.json();
    if (!response.ok) {
        console.log(`Error adding user: ${data.error || 'Failed to add user'}`);
        return;
    }
    console.log('User added!');
    return data;
}

async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} (${user.email})`;
        usersList.appendChild(listItem);
    });
}

document.getElementById('add-user-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    addUser(name, email).then(() => fetchUsers());
});
