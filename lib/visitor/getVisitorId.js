import { load as fingerprint } from '@fingerprintjs/fingerprintjs'

export const getVisitorId = async () => {
  const value = await fingerprint()
  const { visitorId } = await value.get()
  return visitorId
}