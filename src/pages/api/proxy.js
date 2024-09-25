
const { exec } = require('child_process');

//const apiUrl = 'https://api.printful.com'
//const hostURL = 'https://jsonplaceholder.typicode.com/posts';


export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { url } = req.query;
 

  if (!url) {
  
    return res.status(400).json({ error: 'No URL provided' });
  }

  //Construct the curl command. The -k flag tells curl to bypass SSL verification
  //Modify the command as necessary

  const curlCommand = `curl -s -k ${url}`;

  // Execute
  exec(curlCommand, (error, stdout, stderr) => {

    if (error) {
      console.error(`Error executing curl: ${error.message}`);
      return res.status(500).json({ error: `Error executing curl: ${error.message}` });
    }
    if (stderr) {
      console.error(`Curl stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(`Curl stdout (response): ${stdout}`);
      const curlResponse = res.json(stdout);
       
      return res.status(200).send(curlResponse); 

    } else {
      return res.status(500).json({ error: 'No content returned from the curl command' });
    }

  })

};

