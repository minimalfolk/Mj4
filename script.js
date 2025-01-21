// Select DOM elements
const form = document.getElementById('memory-form');
const memoryTitle = document.getElementById('memory-title');
const memoryCategory = document.getElementById('memory-category');
const memoryDescription = document.getElementById('memory-description');
const memoryList = document.getElementById('memories');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search');
const searchIcon = document.getElementById('search-icon');

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

// Display all memories
function displayMemories(filteredMemories = getMemories()) {
  memoryList.innerHTML = '';
  filteredMemories.forEach((memory) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
      <h3>${memory.title}</h3>
      <p><strong>Category:</strong> ${memory.category}</p>
      <p>${memory.description}</p>
    `;
    memoryList.appendChild(card);
  });
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const memory = {
    title: memoryTitle.value,
    category: memoryCategory.value,
    description: memoryDescription.value,
  };
  saveMemory(memory);
  form.reset();
  displayMemories();
});

// Search icon toggle
searchIcon.addEventListener('click', () => {
  searchOverlay.style.display = 'flex';
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const memories = getMemories();
  const filteredMemories = memories.filter((memory) =>
    memory.title.toLowerCase().includes(query)
  );
  displayMemories(filteredMemories);
});

// Close search on overlay click
searchOverlay.addEventListener('click', () => {
  searchOverlay.style.display = 'none';
  searchInput.value = '';
  displayMemories();
});

// Initial display
displayMemories();
