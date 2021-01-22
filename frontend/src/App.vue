<template>
  <div id="app">
    <Header />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/templates/Header";
import Content from "@/components/templates/Content";
import Footer from "@/components/templates/Footer";

export default {
  name: "App",
  components: { Header, Content, Footer },
};
</script>

<style>
    * {
      font-family: monospace;
    }
    
    #app {
      height: 100vh;

      display: grid;

      grid-template-rows: 100px 1fr 50px;
      grid-template-columns: 200px 1fr;

      grid-template-areas:
        "header header"
        "content content"
        "footer footer";
    }
</style>
