<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">Start GET VISA</h1>
      <form @submit.prevent="sendData">
        <div class="field">
          <label class="label" for="name">Your name</label>
          <div class="control">
            <input type="text" class="input" id="name" v-model="form.name" />
          </div>
        </div>
        <div class="field">
          <label class="label" for="country_from">Where are you from?</label>
          <div class="control">
            <div class="select">
              <select id="country_from" v-model="form.country_from">
                <option 
                  v-for="(country, index) in countries" 
                  :key="index" 
                  :value="country.short_code"
                  v-html="country.name"
                />
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="resident_of">Your residency?</label>
          <div class="control">
            <div class="select">
              <select id="resident_of" v-model="form.resident_of">
                <option 
                  v-for="(country, index) in countries" 
                  :key="index" 
                  :value="country.short_code"
                  v-html="country.name"
                />
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="country_to">Where are you from?</label>
          <div class="control">
            <div class="select">
              <select id="country_to" v-model="form.country_to">
                <option 
                  v-for="(country, index) in countries" 
                  :key="index" 
                  :value="country.short_code"
                  v-html="country.name"
                />
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="visa_type">Visa Type</label>
          <div class="control">
            <div class="select">
              <select id="visa_type" v-model="form.visa_type">
                <option 
                  v-for="visa_type in visatypes" 
                  :key="visa_type.id" 
                  :value="visa_type.id"
                  v-html="visa_type.title"
                />
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-primary">Start</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    let country_code = this.$store.state.countries[0].short_code;
    let visa_type = this.$store.state.visatypes[0].id;
    return {
      form: {
        country_from: country_code,
        country_to: country_code,
        name: '',
        resident_of: country_code,
        visa_type: visa_type
      }
    }
  },
  computed: {
    ...mapState(['countries','visatypes'])
  },
  methods: {
    ...mapActions(['getUserId']),

    async sendData() {
      try {
        await this.getUserId(this.form);
        this.$emit('user-id-received');
      } catch(err) {
        console.error(err);
      }
    }
  }
}
</script>