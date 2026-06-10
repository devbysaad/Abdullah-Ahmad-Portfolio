const { z } = require('zod');

const serviceBody = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional().default(0),
});

const createServiceSchema = z.object({
  body: serviceBody,
  params: z.object({}),
  query: z.object({}),
});

const updateServiceSchema = z.object({
  body: serviceBody.partial(),
  params: z.object({ id: z.string().min(1) }),
  query: z.object({}),
});

module.exports = { createServiceSchema, updateServiceSchema };
