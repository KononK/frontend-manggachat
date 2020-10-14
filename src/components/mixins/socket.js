import io from 'socket.io-client'
export default {
  data () {
    return {
      socket: io('http://localhost:4000')
    }
  }
}
