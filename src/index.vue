<template>
  <div>
    <toolbar></toolbar>
    <sideBar></sideBar>
    <div class="table-general">
      <div class="menu-table"> 
        <a-button class="button-search">
          <template #icon><SearchOutlined /></template>
          Buscar
        </a-button>
        <a-select placeholder="Todas las empresas">
          <a-select-option  v-model:value="companies">
            <p v-for="(data, index) in dataSource" :key="index" @click="open()">
              {{data.entity_name}}
            </p>
          </a-select-option>
        </a-select>
        <dropdown :title="'Todas las campañas'" />
        <dropdown :title="'Todas las bases'" />
        <dropdown :title="'Gestionados y sin gestionar'" />
        <a-button class="button-filter">
          <template #icon>
            Filtros por gestión
            <FilterOutlined />
          </template>
        </a-button>
        <a-button class="button-download">
          <template #icon>
            Descargar
            <DownloadOutlined />
          </template>
        </a-button>
      </div>
      <a-table 
        :rowKey="(record,index)=>{return index}" 
        size="middle" 
        :scroll="{ x: 10, y: 458}"  
        class="table" 
        :pagination="{ pageSize: 20 }"  
        :dataSource="dataSource" 
        :columns="columns"
        :bordered="true"
      >
        <template #full_name="{ text: full_name}"> 
          <span class="full_name-style" @click="showDrawer()">{{full_name}}</span>
          <a-drawer
            title="Detalle del contacto"
            :width="730"
            :visible="visible"
            @close="onClose()"
          >
            <div class="general">
              <div class="details">
                <img class="avatar" src="./assets/profile.svg" alt="">
                <div class="contact-details">
                  <span class="name">{{full_name}}</span>
                  <div class="cod-contact">
                    <span class="codigo">Código de contacto: "codigo"</span>
                    <span class="last-contact">Último contacto por:  92394848 (WhatsApp)</span>
                  </div>
                </div>
                <div class="canales">
                  <span class="title">Canales interactuados</span>
                  <div class="icon-canales"> 
                    <img src="./assets/whatsapp.svg" alt="">
                    <img src="./assets/messenger.svg" alt="">
                  </div>
                </div>
              </div>
              <div class="tabs-style">
                <a-tabs v-model:activeKey="activeKey">
                  <a-tab-pane key="1" tab="Datos personales">Datos personales</a-tab-pane>
                  <a-tab-pane key="2" tab="Teléfonos">
                    <a-table  :columns="columnsCellphone" size="middle" :scroll="{ x: 10, y: 458}" />
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="Direcciones">Direcciones</a-tab-pane>
                </a-tabs>
              </div>
            </div>
            <div
              :style="{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }"
            >
            <a-button style="margin-right: 8px" @click="onClose">Limpiar</a-button>
            <a-button type="primary" @click="onClose">Aplicar</a-button>
          </div>
        </a-drawer>
        </template>
        <template #campaign>
          <span>campañas</span>
        </template>
        <template #phones="{ text: phones}">
          <a-popover title="Telefonos">
            <template #content>
              <ul>
                <li style="margin: 0 20px" v-for="phone in phones" :key="phone">{{phone}}</li>
              </ul>
            </template>
            <a>{{phones.length}} teléfonos</a>
          </a-popover>
        </template>
        <template #emails="{ text: emails}">
          <a-popover title="correos">
            <template #content>
              <ul>
                <li style="margin: 0 20px" v-for="email in emails" :key="email">{{email}}</li>
              </ul>
            </template>
            <a>{{emails.length}} correos</a>
          </a-popover>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>

import toolbar from "./components/toolbar.vue"
import sideBar from "./components/sideBar.vue"
import api from "./api/api.js";
import dropdown from "./components/dropdown.vue"
import { SearchOutlined, DownloadOutlined, FilterOutlined} from '@ant-design/icons-vue';

export default {
  name: 'Index',
  data(){
    return{
      title: '',
      visible: null,
      dataSource: [],
        columns: [
          {
            title: 'Cod Contacto',
            dataIndex: 'code',
            key: 'code',
            width: 130,
            align: 'center',
          },
          {
            title: 'Nombres y apellidos',
            dataIndex: 'full_name',
            key: 'full_name',
            width: 170,
            align: 'center',
            slots: {
              customRender: 'full_name',
            },
          },
          {
            title: 'Empresa',
            dataIndex: 'entity_name',
            key: 'entity_name',
            width: 100,
            align: 'center',
          },
          {
            title: 'Campaña',
            dataIndex: 'campaign',
            key: 'campaign',
            width: 100,
            align: 'center',
            slots: {
              customRender: 'campaign',
            },
          },  
          {
            title: 'Bases',
            dataIndex: 'base_name',
            key: 'base_name',
            width: 150,
            align: 'center',
          }, 
          {
            title: 'Telefono',
            dataIndex: 'phones',
            key: 'phones',
            width: 150,
            align: 'center',
            slots: {
              customRender: 'phones',
            },
          },   
          {
            title: 'Correo',
            dataIndex: 'emails',
            key: 'emails',
            width: 250,
            align: 'center',
            slots: {
              customRender: 'emails',
            },
          },  
          {
            title: 'Número de Documentos',
            dataIndex: 'document_number',
            key: 'document_number',
            width: 200,
            align: 'center',
          },  
          {
            title: 'Canales',
            dataIndex: 'canales',
            key: 'canales',
            width: 100,
            align: 'center',
          },  
          {
            title: 'Colas',
            dataIndex: 'colas',
            key: 'colas',
            width: 80,
            align: 'center',
          },  
          {
            title: 'Fecha de última gestión',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 200,
            align: 'center',
          },  
          {
            title: 'Fecha de última interacción',
            dataIndex: 'ultimaInteraccion',
            key: 'ultimaInteraccion',
            width: 220,
            align: 'center',
          }, 
          {
            title: 'Mejor grupo del mes',
            dataIndex: 'best_management_group_month',
            key: 'best_management_group_month',
            width: 200,
            align: 'center',
          },   
          {
            title: 'Mejor resultado del mes',
            dataIndex: 'best_management_result_month',
            key: 'best_management_result_month',
            width: 200,
            align: 'center',
          },  
          {
            title: 'Mejor motivo del mes',
            dataIndex: 'best_management_motive_month',
            key: 'best_management_motive_month',
            width: 180,
            align: 'center',
          },  
          {
            title: 'Mejor submotivo del mes',
            dataIndex: 'submotivoMes',
            key: 'submotivoMes',
            width: 200,
            align: 'center',
          },  
          {
            title: 'Último grupo',
            dataIndex: 'ultimoG',
            key: 'ultimoG',
            width: 150,
            align: 'center',
          },  
          {
            title: 'Último resultado',
            dataIndex: 'ultimoR',
            key: 'ultimoR',
            width: 150,
            align: 'center',
          },  
          {
            title: 'Último motivo',
            dataIndex: 'ultimoM',
            key: 'ultimoM',
            width: 150,
            align: 'center',
          },  
          {
            title: 'Último submotivo',
            dataIndex: 'ultimoSubm',
            key: 'ultimoSubm',
            width: 150,
            align: 'center',
          },  
          {
            title: 'Última vez gestion por:',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 200,
            align: 'center',
          },  
        ],
        dataCellphone: [],
        columnsCellphone:[
          {
            title: 'Numero',
            dataIndex: 'number',
            key: 'number',
            width: 150,
            align: 'center',
          },
          {
            title: 'Tipo de contacto',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Fecha y hora',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Tipo de telefono',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Origen',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Operador telefónico',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Prioridad',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Observación',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          },
          {
            title: 'Acciones',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 150,
            align: 'center',
          }
        ]
    }
  },
  components: {
    toolbar,
    sideBar,
    dropdown,
    SearchOutlined,
    DownloadOutlined,
    FilterOutlined
  },
  mounted(){
    this.dataContacts();
    this.dataDetailsContact();
  },
  methods:{
    dataContacts(){
      api.getDataContacts().then(response => {
        this.dataSource = response.data.results
      })
      .catch(error => {
        console.log(error)
      })
    },
    dataDetailsContact(){
      api.getDetailsContact().then(response => {
        console.log(response)
        //this.dataCellphone = response.data
        //console.log(response.data, 'data detalles contacto')
      })
    },
    showDrawer(){
      this.visible = true;
    },
    onClose(){
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
 *{
   margin: 0;
   padding: 0;
 }
 @media (min-width: 768px) {
   .table-general{
      width: 93%;
      position: absolute;  
      margin: 70px 0px 0 80px;
      text-align: center;
      .table{
        background-color: #f6f5f5;
      }
      .menu-table{
        padding: 10px 0;
        color: #595959;
        display: flex;
        justify-content: space-between;
        .button-search{
          width: 180px;
          height: 32px;
          border-radius: 2px;
          text-align: start;  
        }
        .button-dropdown{
          width: auto;
          height: 32px;
          border: 1px solid #D9D9D9;
          box-sizing: border-box;
          border-radius: 2px;
        }
        .button-filter{
          width: 170px;
          height: 32px;
          border-radius: 2px;
        }
        .button-download{
          width: 120px;
          height: 32px;
          border-radius: 2px;
        }
      }
      .full_name-style{
        color: #1890ff;
        cursor: pointer;
      }
    }
 }


</style>
