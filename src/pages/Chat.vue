<template>
  <q-card  style="margin: 50px auto;width: 60%; padding: 20px">
    <div>
      <div style="height: 500px;overflow-y: auto; display: flex;
  justify-content: flex-end;
  flex-direction: column;">
        <div  v-for="message in messages"
        :key="message.id" >
          <div v-if="message.username == userName" style="float: right">
              <p class="bg-purple-6 q-pa-sm text-white" style="border-radius: 5px;display: inline-block">{{ message.text }}</p>
          </div>
          <div v-else>
            <p style="font-size: 11px; color: darkgray; margin-bottom: 0">{{message.username}}</p>
              <p class="bg-cyan-8 q-pa-sm text-white" style="border-radius: 5px;display: inline-block">{{ message.text }}</p>
          </div>
        </div>
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
        username: this.userName
      }
      fire
        .database()
        .ref('room/' + this.$route.params.roomid)
        .push(message)
      this.showMessage = ''
    }
  },
  mounted () {
    this.userName = this.$route.params.name
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
