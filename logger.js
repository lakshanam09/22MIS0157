// logging_middleware/logger.js

const axios = require("axios");

// Paste the access token you received from the /auth API
const ACCESS_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaGFuYS5tMjAyMkB2aXRzdHVkZW50LmFjLmluIiwiZXhwIjoxNzc4OTM0NTAzLCJpYXQiOjE3Nzg5MzM2MDMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhMzNlYzllZS1iYjliLTQ3NTMtOTQ5Ni01MTFkMjlmZmMxNDIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtLmxha3NoYW5hIiwic3ViIjoiNGM1MmUyNWEtOGY1MS00ZWExLTk3NzktMDk0MTJhODM0MDc5In0sImVtYWlsIjoibGFrc2hhbmEubTIwMjJAdml0c3R1ZGVudC5hYy5pbiIsIm5hbWUiOiJtLmxha3NoYW5hIiwicm9sbE5vIjoiMjJtaXMwMTU3IiwiYWNjZXNzQ29kZSI6IlNmRnVXZyIsImNsaWVudElEIjoiNGM1MmUyNWEtOGY1MS00ZWExLTk3NzktMDk0MTJhODM0MDc5IiwiY2xpZW50U2VjcmV0IjoiZEtXeGFzZ0ZyRVZUZ2NOYiJ9.buhFE2RpKvwAzM-KpMZ6C8sEolhVMBfgYKO1rLRjTyI";
/**
 * Reusable logging function
 * @param {string} stack    - "backend" or "frontend"
 * @param {string} level    - "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg      - allowed package name (e.g. "service", "route")
 * @param {string} message  - descriptive log message
 */
async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Do not use console.log(); return the error instead
    return {
      error: true,
      status: error.response?.status,
      message:
        error.response?.data?.message || error.message || "Logging failed",
    };
  }
}

module.exports = Log;