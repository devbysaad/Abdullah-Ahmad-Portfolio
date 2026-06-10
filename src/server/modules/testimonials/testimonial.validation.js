const { z } = require('zod');

const testimonialBody = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional().default(''),
  text: z.string().min(1),
  avatar: z.string().optional().default(''),
  order: z.number().optional().default(0),
});

const createTestimonialSchema = z.object({
  body: testimonialBody,
  params: z.object({}),
  query: z.object({}),
});

const updateTestimonialSchema = z.object({
  body: testimonialBody.partial(),
  params: z.object({ id: z.string().min(1) }),
  query: z.object({}),
});

module.exports = { createTestimonialSchema, updateTestimonialSchema };
