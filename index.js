import Fastify from 'fastify';
import axios from 'axios';
import "dotenv/config";
import { spawnSync } from "child_process";
const fastify = Fastify({ logger: true });
const port = process.env.PORT || 3000
function replaceUnicodeEscapeSequences(text) {
  let decodedText = text.replace(/\\u[0-9a-z]{4}/, (match, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  );
  return decodedText;
}

<code_placeholder>

fastify.get("/", (request, reply) => {
  return reply.send({ message: "Hello World" });
});

fastify.get("/scan", async (request, reply) => {
  const { name } = request.query;
  if (!name) {
    return reply.code(400).send({ error: "Missing image name" });
  }
  reply.code(200).send({ message: `Scanning image ${name}` });
  try {
    await processImageScan(name);
  } catch (err) {
    fastify.log.error(err);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();