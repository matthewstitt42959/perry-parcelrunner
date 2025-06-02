import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { headers } = req.body;

        // Define the path to the user.json file
        const filePath = path.join(process.cwd(), 'src', 'lib', 'user.json');

        // Read the existing data from the user.json file
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        // Update the headers in the JSON data
        jsonData.headers = headers;

        // Write the updated data back to the user.json file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        res.status(200).json({ message: 'Headers saved successfully!' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}