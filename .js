const form = document.getElementById('password-form');
const tableBody = document.getElementById('table-body');

// Load data on start
document.addEventListener('DOMContentLoaded', displayPasswords);

// Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const entry = { id: Date.now(), site, username, password };
    
    saveToLocal(entry);
    displayPasswords();
    form.reset();
});

function saveToLocal(entry) {
    let passwords = localStorage.getItem('passwords') ? JSON.parse(localStorage.getItem('passwords')) : [];
    passwords.push(entry);
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function displayPasswords() {
    tableBody.innerHTML = "";
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    passwords.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.site}</td>
            <td>${item.username}</td>
            <td>••••••</td> 
            <td><button class="delete-btn" onclick="deletePass(${item.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deletePass(id) {
    let passwords = JSON.parse(localStorage.getItem('passwords'));
    passwords = passwords.filter(p => p.id !== id);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    displayPasswords();
}
