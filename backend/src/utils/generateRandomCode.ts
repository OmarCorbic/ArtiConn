import crypto from "crypto";

export const generateRandomCode = () => {
    // Generate 3 bytes of random data
    const buffer = crypto.randomBytes(3);

    // Convert the buffer to a hexadecimal string
    const hexString = buffer.toString('hex');

    // Extract the first 6 characters as the code
    const code = hexString.substr(0, 6);

    return code;
}
