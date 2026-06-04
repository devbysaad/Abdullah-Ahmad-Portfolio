const { z } = require('zod');

const experienceBody = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  location: z.string().optional().default(''),
  description: z.string().optional().default(''),
  order: z.number().optional().default(0),
});

const createExperienceSchema = z.object({
  body: experienceBody,
  params: z.object({}),
  query: z.object({}),
});

const updateExperienceSchema = z.object({
  body: experienceBody.partial(),
  params: z.object({ id: z.string().min(1) }),
  query: z.object({}),
});

module.exports = { createExperienceSchema, updateExperienceSchema };
