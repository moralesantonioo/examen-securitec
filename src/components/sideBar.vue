<template>
  <div class="sideBar">
      <img class="logo" src="../assets/logo.svg" alt="">
      <img class="icon-menu" src="../assets/icon-menu.svg" alt="">
  </div>
</template>

<script>
export default {
    name: "sideBar"
}
</script>

<style lang="scss">
@media (min-width: 768px) {
    .sideBar{
        position: fixed;
        width: 60px;
        height: 100vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 0px 10px 0px 0px;
        .logo{
            margin-top: 15px;
        }
        .icon-menu{
            margin-top: 30px;
        }
    }
}
</style>