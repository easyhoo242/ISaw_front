let BASE_URL = 'localhost:8000'

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://120.48.82.2:8005'
} else {
  BASE_URL = 'http://120.48.82.2:8005'
}


export const WS_ADDRESS = `ws://${BASE_URL}/socket`
