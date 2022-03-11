type LogLevel = 'info' | 'query' | 'warn' | 'error'
type LogDefinition = {
  emit: 'stdout' | 'event'
  level: LogLevel
}

export const prismaConfig: { log: (LogLevel | LogDefinition)[] } = {
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ]
}