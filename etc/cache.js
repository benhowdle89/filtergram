const { promisify } = require("util");
const redis = require("redis");
const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient(REDIS_URL);

const getAsync = promisify(client.get).bind(client);

client.on("connect", () => {
  console.log(`connected to redis`);
});
client.on("error", err => {
  console.log(`Error: ${err}`);
});

module.exports = {
  put(key, value, hours) {
    client.setex(key, 60 * 60 * hours, JSON.stringify(value));
  },
  async get(key) {
    const data = await getAsync(key);
    if (data) return JSON.parse(data);
    return null;
  }
};
