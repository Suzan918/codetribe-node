const express = require('express');
const router = express.Router();
const path = require('path');
const dataManager = require('../data/dataManager');

router.use(express.static(path.join(__dirname, '../public')));

router.get('/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const items = await dataManager.getItems(type);
    
    if (!items) {
      return res.status(404).json({ 
        error: `Invalid media type: ${type}. Valid types are: movies, series, songs` 
      });
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const item = req.body;

    if (!item || Object.keys(item).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    const updatedItems = await dataManager.addItem(type, item);
    
    if (!updatedItems) {
      return res.status(404).json({ 
        error: `Invalid media type: ${type}. Valid types are: movies, series, songs` 
      });
    }
    
    res.status(201).json(updatedItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:type/:id', async (req, res) => {
  try {
    const type = req.params.type;
    const id = parseInt(req.params.id);
    const updatedItem = req.body;

    if (!updatedItem || Object.keys(updatedItem).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    const items = await dataManager.updateItem(type, id, updatedItem);
    
    if (!items) {
      return res.status(404).json({ 
        error: `Invalid media type: ${type}. Valid types are: movies, series, songs` 
      });
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:type/:id', async (req, res) => {
  try {
    const type = req.params.type;
    const id = parseInt(req.params.id);
    
    const items = await dataManager.deleteItem(type, id);
    
    if (!items) {
      return res.status(404).json({ 
        error: `Invalid media type: ${type}. Valid types are: movies, series, songs` 
      });
    }
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
