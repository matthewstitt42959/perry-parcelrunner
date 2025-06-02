import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Define the path to the user.json file
        const filePath = path.join(process.cwd(), 'src', 'lib', 'user.json');

        // Read the existing data from the user.json file
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        res.status(200).json(jsonData);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}