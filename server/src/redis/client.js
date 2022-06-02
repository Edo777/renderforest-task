
const redis = require("redis");
const { REDIS_HOST, REDIS_PORT } = process.env;

const client = redis.createClient({
  host: REDIS_HOST || "127.0.0.1",
  port: REDIS_PORT || 6379,
});

let instance = null;

exports.getInstance = function() {
  if(instance) {
    return Promise.resolve(instance);
  }

  return new Promise((resolve, reject) => {
    client.connect().then(() => {
        instance = client;

        resolve(instance);
      })
  });
}
