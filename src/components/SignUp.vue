<template>
  <div class="sign-up">
    <h1>ユーザー作成</h1>
      <section class="is-light is-fullheight">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <ValidationObserver ref="observer" tag="form" @submit.prevent="submit">
                <div class="field">
                  <div class="control">
                    <ValidationProvider rules="email|required" v-slot="{ errors }">
                      <input class="input is-large" 
                            type="email" 
                            placeholder="Eメール" 
                            v-model="user.email" 
                            name="email" />
                      <div v-show="submitClicked">
                        <span class="md-error">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <ValidationProvider rules="min:6|required" vid="password" v-slot="{ errors }">
                      <input class="input is-large"
                              type="password" 
                              v-model="user.password"
                              minlength="6"
                              maxlength="15"
                              placeholder="パスワード" />
                      <div v-show="submitClicked">
                        <span class="md-error">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <ValidationProvider rules="confirmed:password|required" v-slot="{ errors }">
                      <input class="input is-large"
                              type="password" 
                              v-model="user.confirmation"
                              maxlength="15"
                              placeholder="パスワード(確認)" >
                      <div v-show="submitClicked">
                        <span class="md-error">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </ValidationObserver>
            </div>             
          <button class="button is-block is-info is-large is-fullwidth" 
                  v-on:click="submit">ユーザー作成</button>
        </div>
      </div>
    </section>
    <button class="button is-block is-info is-large is-fullwidth" v-on:click="transitionLoginPage">ログイン画面に戻る</button>
  </div>
</template>

<script>

export default {
  name: 'SignUp',
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmation: ''
      },
      submitClicked: false
    }
  },
  props: {
  },
  methods: {
    submit: async function() {
      this.submitClicked = true;
      const isValid = await this.$refs.observer.validate();
      if (!isValid) return;
      const isSuccess = await this.signUp();
      if (!isSuccess) {
        alert('すでに登録済みのアドレスである\nまたは通信に失敗しました');
        return
      }
      console.log('signUp');
      this.$router.push('/login');
    },
    signUp: async function() {
      let formData = this.createFormData();
      let isSuccess;
      await this.$store.dispatch('http/post', { url: '/auth', data: formData, error: '' })
          .then(res => {
              isSuccess = res.status == '200';
            })
          .catch(err =>{
            console.log(err);
            isSuccess = false;
          });
      return isSuccess;
    },
    transitionLoginPage: function() {
      this.$router.push('/login');
    },
    createFormData: function() {
      let rtnData = new FormData();
      rtnData.append('email', this.user.email);
      rtnData.append('password', this.user.password);
      return rtnData;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
