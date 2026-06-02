const { z } = require('zod');

const aboutBody = z.object({
  bio: z.string().optional(),
  stats: z
    .object({
      years: z.string().optional(),
      clients: z.string().optional(),
      apps: z.string().optional(),
    })
    .optional(),
  videoUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
  contactEmail: z.string().optional(),
  linkedIn: z.string().optional(),
  github: z.string().optional(),
});

const updateAboutSchema = z.object({
  body: aboutBody,
  params: z.object({}),
  query: z.object({}),
});

module.exports = { updateAboutSchema };
