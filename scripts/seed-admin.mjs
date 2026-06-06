import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function privateKey() {
  return requiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: requiredEnv("FIREBASE_PROJECT_ID"),
      clientEmail: requiredEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: privateKey(),
    }),
  });
}

const auth = getAuth();
const db = getFirestore();

let user;
try {
  user = await auth.getUserByEmail(ADMIN_EMAIL);
  const update = {
    emailVerified: true,
    displayName: "관리자",
    disabled: false,
  };
  if (ADMIN_PASSWORD.length >= 6) update.password = ADMIN_PASSWORD;
  await auth.updateUser(user.uid, update);
} catch {
  const create = {
    email: ADMIN_EMAIL,
    emailVerified: true,
    displayName: "관리자",
    disabled: false,
  };
  if (ADMIN_PASSWORD.length >= 6) create.password = ADMIN_PASSWORD;
  user = await auth.createUser(create);
}

await auth.setCustomUserClaims(user.uid, { admin: true });
await db.collection("users").doc(user.uid).set(
  {
    uid: user.uid,
    email: ADMIN_EMAIL,
    name: "관리자",
    role: "admin",
    status: "active",
    updatedAt: new Date().toISOString(),
  },
  { merge: true }
);

console.log(`Admin user ready: ${ADMIN_EMAIL}`);
if (ADMIN_PASSWORD.length < 6) {
  console.log(
    "Firebase email/password sign-in requires at least 6 characters. The app handles admin/admin via /api/auth/admin-login custom token flow."
  );
}
