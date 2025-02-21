 // Menangani pengiriman form
 document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Simpan pesan ke Firestore
    db.collection("messages").add({
        name: name,
        message: message
    })
    .then(() => {
        console.log("Pesan berhasil disimpan!");
        displayMessages(); // Tampilkan pesan setelah disimpan
    })
    .catch((error) => {
        console.error("Error menambahkan pesan: ", error);
    });

    // Kosongkan form
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
});

// Menampilkan pesan dari Firestore
function displayMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = ''; // Kosongkan daftar pesan

    db.collection("messages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<strong>${doc.data().name}</strong>: ${doc.data().message}`;
            messagesList.appendChild(messageElement);
        });
    });
}

// Tampilkan pesan saat halaman dimuat
window.onload = displayMessages;


// // Menampilkan pesan yang sudah ada di localStorage
// function displayMessages() {
//     const messagesList = document.getElementById('messagesList');
//     messagesList.innerHTML = ''; // Kosongkan daftar pesan

//     const messages = JSON.parse(localStorage.getItem('messages')) || [];
//     messages.forEach(msg => {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');
//         messageElement.innerHTML = `<strong>${msg.name}</strong>: ${msg.message}`;
//         messagesList.appendChild(messageElement);
//     });
// }

// // Menangani pengiriman form
// document.getElementById('messageForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const message = document.getElementById('message').value;

//     // Simpan pesan ke localStorage
//     const messages = JSON.parse(localStorage.getItem('messages')) || [];
//     messages.push({ name, message });
//     localStorage.setItem('messages', JSON.stringify(messages));

//     // Tampilkan pesan
//     displayMessages();

//     // Kosongkan form
//     document.getElementById('name').value = '';
//     document.getElementById('message').value = '';
// });

// // Tampilkan pesan saat halaman dimuat
// window.onload = displayMessages;
