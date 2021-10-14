<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="font-owsald">Hey Phan. Ready for your next big opportunity?</h3>
        <ul class="register-ul">
          <li><q-icon class="icon" name="fas fa-user"/>Build a profile to show the world what you can do</li>
          <li><q-icon class="icon" name="fas fa-envelope-open-text"/>Apply for open roles or list services for clients to buy</li>
          <li><q-icon class="icon" name="fas fa-user-shield"/>Get paid safely and know we’re there to help</li>
        </ul>
      </div>
      <div class="col flex flex-center">
        <div class="q-mx-xl ">
          <img src="~assets/images/register-freelancer.png" style="width: 100%; height: auto">
        </div>
      </div>
    </div>
    <q-card class="q-mt-xl text-yellow-9" style="margin-bottom: 100px; padding-bottom: 30px">
      <q-card-section>
        <h4 class="font-owsald" style="margin-top: 20px; margin-bottom: 50px;text-align: center">Let’s get started. How would you like to tell us about yourself?</h4>
        <q-form
          @submit="onSubmit"
        >
          <div class="q-gutter-md">
            <q-input
              color="yellow-9"
              outlined
              v-model="title"
              label="Tittle *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                color="yellow-9"
                outlined
                v-model="name"
                label="Your name *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
            <div class="col">
              <q-input
                color="yellow-9"
                outlined
                v-model="address"
                label="Your Address *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
          </div>
          <div class="q-gutter-md row">
            <div class="col">
              <q-input
                color="yellow-9"
                outlined
                v-model="phone"
                label="Your Phone Number *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
            <div class="col">
              <q-select  color="yellow-9" outlined v-model="gender" :options="genderOptions" label="Gender *" />
            </div>
          </div>
          <div class="q-gutter-md">
            <q-input
              color="yellow-9"
              label="Your Experience *"
              v-model="experience"
              outlined
              type="textarea"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="q-gutter-md">
            <q-input
              color="yellow-9"
              label="Your Description *"
              v-model="description"
              outlined
              type="textarea"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="q-gutter-md">
            <q-input
              color="yellow-9"
              label="Your AVG Earning *"
              v-model="money"
              outlined
              prefix="$"
              type="number"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </div>
          <div class="q-gutter-md">
            <q-select
              outlined
              color="yellow-9"
              v-model="skill"
              use-input
              input-debounce="0"
              label="Skill"
              :options="skillOptions"
              @filter="filterFn"
              use-chips
              multiple
              stack-label
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="text-center">
            <q-btn label="Register" rounded type="submit" size="20px" color="yellow-9"
                   class="q-px-xl q-mt-xl"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const stringOptions = [
  'Java', 'PHP', 'NodeJs', 'Laravel', 'VueJs', 'React', 'Ruby', 'C#', 'HTML', 'CSS'
]
export default {
  name: 'RegisterFreelancer',
  data () {
    return {
      skill: [],
      genderOptions: ['Male', 'Female', 'Other'],
      skillOptions: []
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.skillOptions = []
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.skillOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style scoped>
.register-ul {
  padding: 0;
  list-style-type: none;
}

.register-ul li {
  border-bottom: solid 1px darkgray;
  color: #5c4e37;
  font-size: 18px;
  padding: 20px 0;
}
.icon{
  margin-right: 20px;
}
</style>
