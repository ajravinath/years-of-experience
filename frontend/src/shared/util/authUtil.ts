import { EVENT_STORATE_UNAUTH } from 'shared/constants'

const onSignedOut = (callback?: () => void) => {
  document.dispatchEvent(new Event(EVENT_STORATE_UNAUTH))
  callback && callback()
}

export { onSignedOut }
