import { createLogger, format, transports } from 'winston'
import SlackHook from 'winston-slack-webhook-transport'
import { config } from '../infrastructure/env'

const logLevels = {
   fatal: 0,
   error: 1,
   warn: 2,
   info: 3,
   debug: 4,
   trace: 5,
}

export const Log = createLogger({
   levels: logLevels,
   format: format.combine(format.timestamp(), format.json()),
   transports: [new transports.Console()],
})

export const notifySlack = createLogger({
   levels: logLevels,
   format: format.combine(format.timestamp(), format.json()),
   transports: [
      new SlackHook({
         webhookUrl: config.slackWebHookUrl,
      }),
   ],
})
