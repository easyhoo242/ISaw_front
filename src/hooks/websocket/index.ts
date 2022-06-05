import { WS_ADDRESS } from './config'

export function useWebsocket() {
  const ws = new WebSocket(WS_ADDRESS)

  const init = () => {
    bindEvent()
  }

  const bindEvent = () => {
    // if (ws.readyState === 0) {
    //   console.log('连接未建立')
    // }
    if (ws.readyState === 1) {
      console.log('连接正常使用')
    }
    if (ws.readyState === 2) {
      console.log('连接正在关闭')
    }
    if (ws.readyState === 3) {
      console.log('链接已关闭')
    }

    // ws.addEventListener('open', handleOpen, false)

    // ws.addEventListener('close', handleClose, false)
    // ws.addEventListener('error', handleError, false)
    // ws.addEventListener('message', handleMessage, false)
  }

  // function handleOpen(e: any) {
  //   // console.log('Websocket open', e)
  // }
  // function handleClose(e: any) {
  //   // console.log('Websocket close', e)
  // }
  // function handleError(e: any) {
  //   // console.log('Websocket error', e)
  // }
  // function handleMessage(e: any) {
  //   console.log('Websocket measge', e)
  // }

  init()

  return ws
}
