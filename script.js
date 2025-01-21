// Select DOM elements
const form = document.getElementById('memory-form');
const memoryTitle = document.getElementById('memory-title');
const memoryDate = document.getElementById('memory-date');
const memoryCategory = document.getElementById('memory-category');
const memoryDescription = document.getElementById('memory-description');
const memoryList = document.getElementById('memories');
const searchInput = document.getElementById('search');

// Get memories from localStorage
function getMemories() {
  return JSON.parse(localStorage.getItem('memories')) || [];
}

// Save memory to localStorage
function saveMemory(memory) {
  const memories = getMemories();
  memories.push(memory);
  localStorage.setItem('memories', JSON.stringify(memories));
}

// Delete memory from localStorage
function deleteMemory(index) {
  const memories = getMemories();
  memories.splice(index, 1);
  localStorage.setItem('memories', JSON.stringify(memories));
  displayMemories();
}

// Display all memories
function displayMemories() {
  memoryList.innerHTML = '';
  const memories = getMemories();
  memories.forEach((memory, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
      <h3>${memory.title}</h3>
      <p><strong>Date:</strong> ${memory.date}</p>
      <p><strong>Category:</strong> ${memory.category}</p>
      <p>${memory.description}</p>
      <span class="delete" onclick="deleteMemory(${index})">Delete</span>
    `;
    memoryList.appendChild(card);
  });
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const memory = {
    title: memoryTitle.value,
    date: memoryDate.value,
    category: memoryCategory.value,
    description: memoryDescription.value,
  };
  saveMemory(memory);
  form.reset();
  displayMemories();
});

// Search handler
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const memories = getMemories();
  const filteredMemories = memories.filter((memory) =>
    memory.title.toLowerCase().includes(query)
  );
  memoryList.innerHTML = '';
  filteredMemories.forEach((memory, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
      <h3>${memory.title}</h3>
      <p><strong>Date:</strong> ${memory.date}</p>
      <p><strong>Category:</strong> ${memory.category}</p>
      <p>${memory.description}</p>
      <span class="delete" onclick="deleteMemory(${index})">Delete</span>
    `;
    memoryList.appendChild(card);
  });
});

// Initial display
displayMemories();
