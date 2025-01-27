const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

app.get('/api/public-key', (req, res) => {
  res.json({ publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }) });
});

let clientPublicKey;

app.post('/api/receive-public-key', (req, res) => {
  clientPublicKey = req.body.publicKey;
  console.log('Received public key from frontend:', clientPublicKey);
  res.json({ message: 'Public key received successfully' });
});

// MongoDB connection
const uri = "mongodb+srv://wboulton:4c0ADjLhnpFZ1o5F@cluster0.uy5zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db('your_database_name');
    const collection = db.collection('your_collection_name');

    app.post('/api/newuser', async (req, res) => {
      const encryptedData = req.body.encryptedData;
      const buffer = Buffer.from(encryptedData, 'base64');
      console.log("received encrypted request", encryptedData)
      const decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer
      );
      const { username, password, firstname, lastname } = JSON.parse(decryptedData.toString('utf8'));
      const userData = { username, password, firstname, lastname };
      console.log("decrypted request", userData)

      try {
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
          console.log('User already exists');
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const result = await collection.insertOne(userData);
        console.log('User data inserted into MongoDB:', result.insertedId);
        res.json({ message: 'User created successfully' });
      } catch (err) {
        console.error('Error interacting with MongoDB:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  app.post('/api/print', (req, res) => {
    console.log("request was sent");
    console.log("sending response...");
    res.json({ message: "response" });
    console.log("response sent!");
  });
});