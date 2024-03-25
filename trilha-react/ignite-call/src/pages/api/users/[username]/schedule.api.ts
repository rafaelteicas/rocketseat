/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import dayjs from 'dayjs'
import { z } from 'zod'
import { google } from 'googleapis'
import { getGoogleOAuthToken } from '../../../../lib/google'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const { name, date, email, observations } = z
    .object({
      name: z.string(),
      email: z.string(),
      observations: z.string(),
      date: z.string().datetime(),
    })
    .parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date cannot be in the past.' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      userId: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({ message: 'Date already taken.' })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      date: schedulingDate.toDate(),
      email,
      observations,
      userId: user.id,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.toISOString(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [
        {
          email,
          displayName: name,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  })

  return res.status(201).end()
}
