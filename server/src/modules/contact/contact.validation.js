const { z } = require('zod');

const contactBodySchema = z
  .object({
    type: z.enum(['message', 'appointment']).optional().default('message'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    message: z.string().min(1, 'Message is required'),
    duration: z.number().int().positive().optional(),
    appointmentDate: z.string().optional(),
    appointmentTime: z.string().optional(),
    timezone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type !== 'appointment') return;
    if (!data.duration) {
      ctx.addIssue({ code: 'custom', message: 'Duration is required', path: ['duration'] });
    }
    if (!data.appointmentDate?.trim()) {
      ctx.addIssue({ code: 'custom', message: 'Date is required', path: ['appointmentDate'] });
    }
    if (!data.appointmentTime?.trim()) {
      ctx.addIssue({ code: 'custom', message: 'Time is required', path: ['appointmentTime'] });
    }
  });

const createContactSchema = z.object({
  body: contactBodySchema,
  params: z.object({}),
  query: z.object({}),
});

module.exports = { createContactSchema };
