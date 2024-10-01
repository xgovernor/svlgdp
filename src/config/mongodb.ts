import { MongoClient, ServerApiVersion } from "mongodb";

// const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://abut1081:QRTMItdsp7owbCW7@cluster0.aemeq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=false`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const dbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
