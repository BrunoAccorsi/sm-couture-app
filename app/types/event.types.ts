import { z } from 'zod';

export const EventsSchema = z.object({
  collection: z.array(
    z.object({
      name: z.string(),
      description_html: z.string(),
      scheduling_url: z.string(),
      duration: z.number(),
      locations: z
        .array(
          z.object({
            kind: z.string(),
            location: z.string(),
          })
        )
        .nullable(),
    })
  ),
});

export type EventType = z.infer<typeof EventsSchema>['collection'][number];
