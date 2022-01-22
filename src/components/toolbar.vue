<template>
  <div class="general">
    <header>
        <div class="toolbar">
          <div class="toolbar-contact">
            <span class="title">Contactos</span>
            <img class="icon-toolbar" src="../assets/icon-toolbar.svg" alt="">
          </div>
          <div class="toolbar-profile">
            <img class="icon-question" src="../assets/icon-question.svg" alt="">
            <div class="user-notification">
              <img class="notification" src="../assets/icon-notification.svg" alt="">
              <img class="number" src="../assets/number.svg" alt="">
            </div>
            <div class="user-profile"> 
              <img class="icon-profile" src="../assets/profile.svg" alt="">
              <span class="name">Antonio Morales</span>
              <img class="icon-flecha" src="../assets/icon-flecha.svg" alt="">
            </div>
          </div>
        </div>
    </header>
  </div>
</template>

<script>
export default {
    name: 'Toolbar'    
}
</script>

<style lang="scss">
@media (min-width: 768px){
  .general{
    margin: 0 20px 0 80px;
    position: relative;
    .toolbar{
      position: absolute;
      width: 100%;
      height: 52px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .toolbar-contact{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        .title{
          font-family: 'SF Pro Display';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 28px;
          color: #262626;
        }
        .icon-toolbar{
          margin: 2px 0 0 8px;
        }
      }
      .toolbar-profile{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        .icon-question{
          margin-right: 20px;
        }
        .user-notification{
          position: relative;
          margin-right: 20px;
          .notification{
            position: absolute
          }
          .number{
            position: relative;
            top: -10px;
            left: 5px;
          }
        }
        .user-profile{
          display: flex;
          justify-content: center;
          align-items: center;
          .name{
            font-family: SF Pro Display;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
            margin-left: 6px;
            color: #262626;
          }
          .icon-flecha{
            margin-left: 6px; 
          }
        }
      }
    }
  }
}
</style>