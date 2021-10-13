<template>
  <q-card  style="margin: 50px auto;width: 60%; padding: 20px">
    <div>
      <div style="height: 500px;overflow-y: auto">
        <p  v-for="message in messages"
            :key="message.id"><span style="font-weight: bold">{{ message.username }}: </span> {{ message.text }}</p>
      </div>
      <div class="row">
        <div class="col-md-9">
          <q-input
            color="yellow-9"
            v-model="showMessage"
            outlined
            class="q-mr-md"
          />
        </div>
        <div class="col-md-3">
          <q-btn color="primary"  @click="sendMessage" label="Send" class="full-width full-height"/>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import fire from 'src/api/firebase'
export default {
  name: 'Chat',
  data () {
    return {
      userName: '',
      room: null,
      name: null,
      showMessage: '',
      messages: []
    }
  },
  methods: {
    sendMessage () {
      const message = {
        text: this.showMessage,
        username: this.$route.params.name
      }
      fire
        .database()
        .ref('room/' + this.$route.params.roomid)
        .push(message)
      this.showMessage = ''
    }
  },
  mounted () {
    const viewMessage = this
    console.log(this.$route.params.roomid)
    const itemsRef = fire.database().ref('room/' + this.$route.params.roomid)
    itemsRef.on('value', snapshot => {
      const data = snapshot.val()
      const messages = []
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        })
      })
      viewMessage.messages = messages
    })
  }
}
</script>

<style scoped>

</style>
