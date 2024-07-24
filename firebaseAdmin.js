import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to read service account from file
const readServiceAccountFile = () => {
  try {
    const serviceAccountPath = resolve(
      __dirname,
      "./public/serviceAccount.json"
    );
    return JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  } catch (error) {
    console.error("Error reading service account file:", error);
    return null;
  }
};

// Initialize Firebase Admin
let firebaseApp;
const initFirebaseAdmin = () => {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : readServiceAccountFile();

    if (!serviceAccount) {
      throw new Error(
        "Firebase service account is not available. Please check your configuration."
      );
    }

    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    process.exit(1); // Exit process on critical error
  }
};

// Initialize Firebase Admin on startup
initFirebaseAdmin();

// Export Firebase Auth instance
const auth = getAuth(firebaseApp);
export { auth };
