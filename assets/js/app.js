// Function to open a category and show notes
function openCategory(category) {
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML = ''; // Clear the notes container

  // Check if the notes exist in localStorage
  const storedNotes = localStorage.getItem(category);
  
  if (storedNotes) {
    // If notes are found, display them
    const notes = JSON.parse(storedNotes);
    notes.forEach(note => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <p>${note.content}</p>
        <small>Saved on: ${note.date}</small>
      `;
      notesContainer.appendChild(noteDiv);
    });
  } else {
    // If no notes exist, show a placeholder text
    notesContainer.innerHTML = `<p>No notes available for ${category} yet. Add some notes! ✨</p>`;
  }
}

// Function to save notes in localStorage
function saveNoteToLocalStorage(category, noteContent) {
  // Get the existing notes for the category from localStorage
  const storedNotes = localStorage.getItem(category);
  let notes = storedNotes ? JSON.parse(storedNotes) : [];

  // Create a new note with content and current date
  const newNote = {
    content: noteContent,
    date: new Date().toLocaleString(),
  };

  // Add the new note to the category's notes array
  notes.push(newNote);

  // Save the updated notes array back to localStorage
  localStorage.setItem(category, JSON.stringify(notes));
}

// Function to clear notes from localStorage
function clearNotesFromLocalStorage(category) {
  localStorage.removeItem(category);
  openCategory(category); // Refresh the category to reflect the change
}

// Function to save Tech notes
function saveTechNote() {
  const noteContent = document.getElementById('techNoteInput').value;
  const category = document.getElementById('categorySelect').value;
  if (category && noteContent) {
    saveNoteToLocalStorage(category, noteContent);
    alert('Tech note saved! ✅');
    document.getElementById('techNoteInput').value = ''; // Clear input after saving
  } else {
    alert('Please select a category and write a note before saving.');
  }
}

// Function to save JavaScript notes
function saveJsNote() {
  const noteContent = document.getElementById('jsNoteInput').value;
  const category = document.getElementById('categorySelect').value;
  if (category && noteContent) {
    saveNoteToLocalStorage(category, noteContent);
    alert('JavaScript note saved! ✅');
    document.getElementById('jsNoteInput').value = ''; // Clear input after saving
  } else {
    alert('Please select a category and write a note before saving.');
  }
}

// Function to save CSS notes
function saveCssNote() {
  const noteContent = document.getElementById('cssNoteInput').value;
  const category = document.getElementById('categorySelect').value;
  if (category && noteContent) {
    saveNoteToLocalStorage(category, noteContent);
    alert('CSS note saved! ✅');
    document.getElementById('cssNoteInput').value = ''; // Clear input after saving
  } else {
    alert('Please select a category and write a note before saving.');
  }
}

// Function to add a new category dynamically as a card
function addCategory() {
  const categoryName = document.getElementById('newCategoryName').value;
  const categoryEmoji = document.getElementById('newCategoryEmoji').value;

  if (categoryName && categoryEmoji) {
    // Add the new category card dynamically
    const categoriesContainer = document.querySelector('.categories'); // Reference the container of the category cards
    const newCategoryCard = document.createElement('div');
    newCategoryCard.classList.add('category');
    newCategoryCard.id = categoryName.toLowerCase();
    
    newCategoryCard.innerHTML = `
      <span class="emoji">${categoryEmoji}</span>
      <h3>${categoryName}</h3>
    `;

    // Add the onclick event to open the new category
    newCategoryCard.onclick = function() {
      openCategory(categoryName.toLowerCase());
      document.getElementById('categorySelect').value = categoryName.toLowerCase(); // Update the select dropdown to the new category
    };

    categoriesContainer.appendChild(newCategoryCard); // Append the new category card to the categories container

    // Add the new category to the select dropdown
    const categorySelect = document.getElementById('categorySelect');
    const newOption = document.createElement('option');
    newOption.value = categoryName.toLowerCase();
    newOption.text = `${categoryEmoji} ${categoryName}`;
    categorySelect.appendChild(newOption);

    // Create an empty array for the new category in localStorage
    localStorage.setItem(categoryName.toLowerCase(), JSON.stringify([]));

    // Clear the input fields
    document.getElementById('newCategoryName').value = '';
    document.getElementById('newCategoryEmoji').value = '';
  } else {
    alert('Please provide both category name and emoji.');
  }
}
