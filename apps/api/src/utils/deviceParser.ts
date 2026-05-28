import UAParser from 'ua-parser-js'

export function parseDevice(userAgent: string): string {
  const parser = new UAParser(userAgent)
  const device = parser.getDevice()

  if (device.type === 'mobile') return 'Mobile'
  if (device.type === 'tablet') return 'Tablet'
  return 'Desktop'
}
