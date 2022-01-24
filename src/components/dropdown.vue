<template>
    <a-dropdown 
        class="button-dropdown" 
        :disabled="isDisabled"
    >
        <template #overlay>
        <a-menu>
            <a-menu-item key="1">1nd item</a-menu-item>
            <a-menu-item key="2">2nd item</a-menu-item>
            <a-menu-item key="3">3rd item</a-menu-item>
        </a-menu>
        </template>
        <a-button>
        {{title}}
        <DownOutlined />
        </a-button>
    </a-dropdown>
</template>

<script>
import {DownOutlined} from '@ant-design/icons-vue';
export default {
    data(){
        return{
            isDisabled: false,
        }
    },
    props:{
        title:{}
    },
    components:{
        DownOutlined
    },
    mounted(){
        if(this.title == 'Todas las campañas' || this.title == 'Todas las bases'){
            this.isDisabled = true
        }else{
            this.isDisabled = false
        }
    }
}
</script>

<style lang="scss">
    .button-dropdown{
        width: auto;
        height: 32px;
        border: 1px solid #D9D9D9;
        box-sizing: border-box;
        border-radius: 2px;
    }
    .button-dropdown-drawer{
        width: 440px;
        height: 32px;
        border-radius: 2px;
        border: 1px solid #D9D9D9;
        .dropdown-vacio{
            height: 59px;
        }
    }
</style>