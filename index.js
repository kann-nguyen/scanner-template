import Fastify from 'fastify';
import axios from 'axios';
import "dotenv/config";
import { spawn } from "child_process";
import { randomUUID } from "crypto";
import { mkdir, readFile, unlink } from "fs/promises";

const fastify = Fastify({ logger: true });

// Define Artifact class
class Artifact {
  constructor(name, version, projectId, type) {
    this.name = name;
    this.version = version;
    this.projectId = projectId;
    this.type = type;
  }
}

fastify.register((instance) => {
  instance.setQuerystringParser(str => JSON.parse(decodeURIComponent(str)));
});
const port = process.env.PORT || 3000;

<code_placeholder>



fastify.get("/", (request, reply) => {
  return reply.send({ message: "Hello World" });
});

fastify.get("/scan", async (request, reply) => {
  const { artifact } = request.query;
  if (!artifact) {
    return reply.code(400).send({ error: "Missing artifact" });
  }
  reply.code(200).send({ message: `Scanning artifact ${artifact.name}` });
  try {
    await processImageScan(artifact);
  } catch (err) {
    fastify.log.error(err);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: Number(port), host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
