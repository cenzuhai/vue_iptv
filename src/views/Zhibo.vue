<template>
  <div class='Zhibo'>
    <h1>This is an about page</h1>
    <p>Ask a yes/no question:<input v-model='question'></p>
    <p>{{ answer }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion)
      this.answer = 'Waiting for you to stop typing...'
    }
  },
  created: function () {

  },
  methods: {

  }
}
</script>
