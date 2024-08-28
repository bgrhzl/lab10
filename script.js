let contacts = [
    { name: "Maxwell Wright", phone: "019171916495", email: "contact1@cctb.com" },
    { name: "Raja Villarreal", phone: "0863982895", email: "contact2@cctb.com" },
    { name: "Helen Richards", phone: "080031111", email: "contact3@cctb.edu" }
];

const displayContacts = (callback) => {
    setTimeout(() => {
        const list = document.getElementById('contacts-list');
        list.innerHTML = '';
        contacts.forEach(contact => callback(contact, list));
    }, 500);
};

const renderContact = (contact, list) => {
    const contactElement = document.createElement('p');
    contactElement.textContent = `${contact.name} - ${contact.phone} - ${contact.email}`;
    list.appendChild(contactElement);
};

const searchContactByName = (contacts, name) => {
    if (contacts.length === 0) return null;
    const [first, ...rest] = contacts;
    return first.name.toLowerCase() === name.toLowerCase()
        ? first
        : searchContactByName(rest, name);
};

const addContact = () => {
    do {
        let name = prompt("Enter contact name:");
        let phone = prompt("Enter contact phone:");
        let email = prompt("Enter contact email:");
        contacts.push({ name, phone, email });
    } while (confirm("Add another contact?"));
    displayContacts(renderContact);
};

const findContact = () => {
    const name = prompt("Enter the name of the contact to find:");
    const result = searchContactByName(contacts, name);
    if (result) {
        prompt(`Contact found: ${result.name} - ${result.phone} - ${result.email}`, "OK");
    } else {
        prompt("Contact not found.", "OK");
    }
};

const updateContact = () => {
    const name = prompt("Enter the name of the contact to update:");
    const contact = searchContactByName(contacts, name);
    if (contact) {
        contact.phone = prompt("Enter new phone number:", contact.phone);
        contact.email = prompt("Enter new email address:", contact.email);

        // 3 saniye sonra listeyi yenile ve sırala
        setTimeout(() => {
            contacts.sort((a, b) => a.name.localeCompare(b.name));
            displayContacts(renderContact);
            // Güncelleme mesajı prompt ile gösterilsin
            prompt("Contact updated successfully!", "OK");
        }, 3000);
    } else {
        prompt("Contact not found.", "OK");
    }
};

setInterval(() => {
    console.log(`Total contacts: ${contacts.length}`);
}, 5000);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const changeBackgroundColor = () => {
    setInterval(() => {
        document.body.style.backgroundColor = getRandomColor();
    }, 5000);
};

changeBackgroundColor();
displayContacts(renderContact);
