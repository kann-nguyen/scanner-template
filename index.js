import Fastify from 'fastify';
import axios from 'axios';
import "dotenv/config";
import { spawn, spawnSync } from "child_process";
import { randomUUID } from "crypto";
import { mkdir, readFile, unlink } from "fs/promises";


// Define Artifact class
class Artifact {
  constructor(name, version, projectId, type) {
    this.name = name;
    this.version = version;
    this.projectId = projectId;
    this.type = type;
  }
}

// Create Fastify instance with custom query parser
const fastify = Fastify({
  logger: true
});
const port = process.env.PORT || 3000;
// Custom query parser to handle JSON strings
fastify.addHook('preValidation', async (request, reply) => {
  if (request.query.artifact) {
    try {
      request.query.artifact = JSON.parse(decodeURIComponent(request.query.artifact));
    } catch (error) {
      reply.code(400).send({ error: "Invalid artifact format" });
    }
  }
});
<code_placeholder>



fastify.get("/", (request, reply) => {
  return reply.send({ message: "Hello World" });
});

fastify.get("/scan", async (request, reply) => {
  const { artifact } = request.query;
  if (!artifact) {
    return reply.code(400).send({ error: "Missing artifact" });
  }

  const artifactScan = new Artifact(
    artifact.name,
    artifact.version,
    artifact.projectId,
    artifact.type
  );
  reply.code(200).send({ message: `Scanning artifact ${artifact.name}` });
  try {
    await processImageScan(artifactScan);
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
