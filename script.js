// Dummy JSON Data
const chatData = {
  results: [
    {
      room: {
        name: "Product A",
        id: 12456,
        image_url: "https://picsum.photos/id/237/200/300",
        participant: [
          { id: "admin@mail.com", name: "Admin", role: 0 },
          { id: "agent@mail.com", name: "Agent A", role: 1 },
          { id: "customer@mail.com", name: "king customer", role: 2 },
        ],
      },
      comments: [
        {
          id: 885512,
          type: "text",
          message: "Selamat malam",
          sender: "customer@mail.com",
        },
        {
          id: 885513,
          type: "text",
          message: "Malam",
          sender: "agent@mail.com",
        },
        {
          id: 885514,
          type: "text",
          message: "Ada yang bisa saya bantu?",
          sender: "agent@mail.com",
        },
        {
          id: 885515,
          type: "text",
          message:
            "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
          sender: "customer@mail.com",
        },
        {
          id: 885516,
          type: "text",
          message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
          sender: "agent@mail.com",
        },
        {
          id: 885517,
          type: "image",
          url: "https://picsum.photos/id/1018/200/300",
          sender: "customer@mail.com",
        },
        {
          id: 885518,
          type: "video",
          url: "https://www.w3schools.com/html/mov_bbb.mp4",
          sender: "agent@mail.com",
        },
        {
          id: 885519,
          type: "pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          sender: "customer@mail.com",
        },
      ],
    },
  ],
};

// Load Room Info
function loadRoom() {
  const room = chatData.results[0].room;
  document.getElementById("room-name").innerText = room.name;
  document.getElementById("room-image").src = room.image_url;

  let participants = room.participant.map((p) => p.name).join(", ");
  document.getElementById(
    "participants"
  ).innerText = `Participants: ${participants}`;
}

// Load Chat Messages
function loadMessages() {
  const comments = chatData.results[0].comments;
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";

  comments.forEach((comment) => {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (comment.sender === "customer@mail.com") {
      messageDiv.classList.add("customer");
    } else {
      messageDiv.classList.add("agent");
    }

    let senderDiv = document.createElement("div");
    senderDiv.classList.add("sender");
    senderDiv.innerText = comment.sender;

    let textDiv;
    if (comment.type === "text") {
      textDiv = document.createElement("div");
      textDiv.classList.add("text");
      textDiv.innerText = comment.message;
    } else if (comment.type === "image") {
      textDiv = document.createElement("img");
      textDiv.src = comment.url;
      textDiv.classList.add("media");
    } else if (comment.type === "video") {
      textDiv = document.createElement("video");
      textDiv.src = comment.url;
      textDiv.controls = true;
      textDiv.classList.add("media");
    } else if (comment.type === "pdf") {
      textDiv = document.createElement("a");
      textDiv.href = comment.url;
      textDiv.innerText = "Download PDF";
      textDiv.classList.add("media", "pdf");
    }

    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(textDiv);
    chatBox.appendChild(messageDiv);
  });
}

// Handle File Uploads (Images, Videos, PDFs)
document.getElementById("media-upload").addEventListener("change", (event) => {
  const files = event.target.files;
  Array.from(files).forEach((file) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "customer");

    let textDiv;
    if (file.type.startsWith("image/")) {
      textDiv = document.createElement("img");
      textDiv.src = URL.createObjectURL(file);
      textDiv.classList.add("media");
    } else if (file.type.startsWith("video/")) {
      textDiv = document.createElement("video");
      textDiv.src = URL.createObjectURL(file);
      textDiv.controls = true;
      textDiv.classList.add("media");
    } else if (file.type === "application/pdf") {
      textDiv = document.createElement("a");
      textDiv.href = URL.createObjectURL(file);
      textDiv.innerText = "Download PDF";
      textDiv.classList.add("media", "pdf");
    }

    let senderDiv = document.createElement("div");
    senderDiv.classList.add("sender");
    senderDiv.innerText = "customer@mail.com";

    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(textDiv);
    document.getElementById("chat-box").appendChild(messageDiv);
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadRoom();
  loadMessages();
});
