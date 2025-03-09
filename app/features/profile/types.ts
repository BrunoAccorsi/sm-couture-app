import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.number(),
  userId: z.string(),
  event: z.string(),
  cancel_url: z.string(),
  reschedule_url: z.string(),
  createdAt: z.string(),
  start_time: z.string(),
  status: z.string(),
});

export type Schedule = z.infer<typeof scheduleSchema>;

export const schedulesSchema = z.array(scheduleSchema);
export type Schedules = z.infer<typeof schedulesSchema>;
