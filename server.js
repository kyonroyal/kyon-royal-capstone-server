const express = require('express');
const fs = require ('fs');
const app = express();
const PORT = 1234;
const cors = require('cors');


app.use(express.json());
app.use(cors());


app.get('/api/data', (req, res) => {
    fs.readFile('data/users.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});


app.post('/api/data', (req, res) => {
    fs.readFile('data/users.json', 'utf-8', (readErr, currentData) => {
        if (readErr) {
            console.error(readErr);
            res.status(500).send('Internal Server Error');
        } else {
            const newData = req.body;
            const mergedData = { ...JSON.parse(currentData), ...newData };

            fs.writeFile('data/users.json', JSON.stringify(mergedData, null, 2), 'utf-8', (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(mergedData);
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
