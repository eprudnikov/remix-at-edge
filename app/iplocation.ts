import { networkInterfaces } from "os";

export async function getServerIPs() {
  const nets = networkInterfaces();
  let result = "";

  Object.values(nets).forEach((iface) => {
    iface?.forEach((info) => {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof info?.family === "string" ? "IPv4" : 4;
      if (info?.family === familyV4Value && !info?.internal) {
        result += info?.address + "\t";
      }
    });
  });
  return result;
}
