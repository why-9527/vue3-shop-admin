import {useCookies} from '@vueuse/integrations/useCookies'

const token_key = 'admin_token'
const cookies = useCookies()

export const getCookies = (key) => cookies.get(key || token_key)

export const setCookies = (key, value) => cookies.set(key, value)

export const removeCookies = (key) => cookies.remove(key || token_key)
