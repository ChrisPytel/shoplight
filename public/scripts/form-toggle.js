// Message Seller toggle button on product index
function toggleForm() {
  var form = document.getElementById("myForm");
  if (form.style.display === "block") {
    form.style.display = "none"; // If form is visible, hide it
  } else {
    form.style.display = "block"; // If form is hidden, show it
  }
}

// Function to change SEND button to SENT
function submitMyForm() {
  var form = document.getElementById("myForm");
  var submitButton = document.getElementById("sendMessageButton");
  var sendMessage = document.getElementById("sendMessage");
  submitButton.innerText = "Sent!";
  sendMessage.style.display = "none";
}
