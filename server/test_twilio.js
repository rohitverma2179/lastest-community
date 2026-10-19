import twilio from "twilio";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

console.log("-----------------------------------------");
console.log("Checking Twilio Credentials from .env:");
console.log("Account SID:", accountSid);
console.log("Verify Service SID:", verifySid);
console.log("-----------------------------------------");

const client = twilio(accountSid, authToken);

async function testTwilio() {
  try {
    // 1. Fetch Account Details
    console.log("\n[1/2] Authenticating Account SID & Auth Token...");
    const account = await client.api.v2010.accounts(accountSid).fetch();
    console.log(">>>  Twilio Account Valid & Authenticated!");
    console.log("    Name:", account.friendlyName);
    console.log("    Status:", account.status);
    console.log("    Type:", account.type);

    // 2. Fetch Verify Service
    console.log("\n[2/2] Checking Verify Service SID...");
    const service = await client.verify.v2.services(verifySid).fetch();
    console.log(">>>  Twilio Verify Service Valid & Active!");
    console.log("    Service Name:", service.friendlyName);
    console.log("    Service SID:", service.sid);
    console.log("    Code Length:", service.codeLength);
    console.log("\nRESULT: All 3 credentials in .env are 100% CORRECT and ACTIVE! 🎉");
  } catch (error) {
    console.error("\n>>>  Twilio Verification Failed:");
    console.error("    HTTP Status:", error.status);
    console.error("    Error Code:", error.code);
    console.error("    Message:", error.message);
    console.error("    More Info:", error.moreInfo);
  }
}

testTwilio();