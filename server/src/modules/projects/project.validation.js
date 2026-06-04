const { z } = require('zod');

const projectBody = z.object({
  name: z.string().min(1),
  summary: z.string().optional().default(''),
  description: z.string().min(1),
  techStack: z.array(z.string()).optional().default([]),
  imageUrl: z.string().optional().default(''),
  liveUrl: z.string().optional().default(''),
  badge: z.string().optional().default(''),
  badgeSub: z.string().optional().default(''),
  order: z.number().optional().default(0),
});

const createProjectSchema = z.object({
  body: projectBody,
  params: z.object({}),
  query: z.object({}),
});

const updateProjectSchema = z.object({
  body: projectBody.partial(),
  params: z.object({ id: z.string().min(1) }),
  query: z.object({}),
});

module.exports = { createProjectSchema, updateProjectSchema };
