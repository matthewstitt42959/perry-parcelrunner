// index.js

import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my simple API!' });
});

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ];
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Create a new user (POST)
app.post('/users', (req, res) => {
    const newUser = req.body;
    // Add code to save the new user
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Update an existing user (PUT)
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    // Add code to update the user with the given id
    res.json({ message: 'User updated successfully', user: updatedUser });
});

// Delete a user (DELETE)
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Add code to delete the user with the given id
    res.json({ message: `User with id ${userId} deleted successfully` });
});
