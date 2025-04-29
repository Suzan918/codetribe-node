const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, 'mediaData.json');

const initialData = {
  movies: [
    { id: 1, title: "The Notebook", director: "Nick Cassavetes", year: 2004 },
    { id: 2, title: "Pride & Prejudice", director: "Joe Wright", year: 2005 },
    { id: 3, title: "La La Land", director: "Damien Chazelle", year: 2016 }
  ],
  series: [
    { id: 1, title: "Bridgerton", seasons: 3, creator: "Chris Van Dusen" },
    { id: 2, title: "Outlander", seasons: 7, creator: "Ronald D. Moore" }
  ],
  songs: [
    { id: 1, title: "Perfect", artist: "Ed Sheeran", year: 2017 },
    { id: 2, title: "All of Me", artist: "John Legend", year: 2013 }
  ]
};

async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function getItems(type) {
  const data = await readData();
  return data[type] || null;
}

async function addItem(type, item) {
  const data = await readData();
  if (!data[type]) return null;
  
  const newId = data[type].length > 0 
    ? Math.max(...data[type].map(item => item.id)) + 1 
    : 1;
  
  item.id = newId;
  data[type].push(item);
  await writeData(data);
  return data[type];
}

async function updateItem(type, id, updatedItem) {
  const data = await readData();
  if (!data[type]) return null;

  data[type] = data[type].map(item => 
    item.id === id ? { ...item, ...updatedItem } : item
  );
  
  await writeData(data);
  return data[type];
}

async function deleteItem(type, id) {
  const data = await readData();
  if (!data[type]) return null;

  data[type] = data[type].filter(item => item.id !== id);
  await writeData(data);
  return data[type];
}

module.exports = {
  initializeDataFile,
  getItems,
  addItem,
  updateItem,
  deleteItem
}; 