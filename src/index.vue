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
          <a-select-option  v-model:value="data">
            <p v-for="(data, index) in dataSource" :key="index">
              {{data.entity_name}}
            </p>
          </a-select-option>
        </a-select>
        <dropdown :title="'Todas las campañas'" />
        <dropdown :title="'Todas las bases'" />
        <dropdown :title="'Gestionados y sin gestionar'" />
        <a-button class="button-filter" @click="showDrawerFilter()">
          <template #icon >
            Filtros por gestión
            <FilterOutlined />
            <a-drawer
              title="Selecciona tus filtros por gestión"
              placement="right"
              :width="480"
              v-model:visible="visibleFilter"
            >
              <span class="first-text">Filtra tus contactos en base a sus gestiones realizadas.  Puedes complementalo seleccionando una empresa, campaña o base.</span>
              <div class="secondary-text">
                <span>Tipificaciones:</span>
              </div>
              <div class="dropdown-style">
                <p class="title">Tipo</p>
                <a-select
                  v-model:value="value1"
                  :size="size"
                  style="width: 100%"
                  :options="optionsTipos"
                ></a-select>
              </div>
              <div class="dropdown-style">
                <p class="title">Grupos</p>
                <a-select
                  v-model:value="value"
                  mode="multiple"
                  style="width: 100%"
                  :showArrow="true"
                  option-label-prop="label"
                  :options="optionsGrupos"
                >
                  <template #option="{ value: val, label, icon }">
                    <span role="img" :aria-label="val">{{ icon }}</span>
                    {{ label }}
                  </template>
                </a-select>
              </div>
              <div class="dropdown-style">
                <p class="title">Resultado</p>
                <a-select
                  v-model:value="value"
                  mode="multiple"
                  style="width: 100%;"
                  :showArrow="true"
                  option-label-prop="label"
                  :options="optionsResults"
                >
                  <template #option="{ value: val, label, icon }">
                    <span role="img" :aria-label="val">{{ icon }}</span>
                    {{ label }}
                  </template>
                </a-select>
              </div>
              <div class="ultima-gestion">
                <span class="title">Última vez gestionado por:</span>
                <div>
                  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox
                      v-model:checked="checkAll"
                      :indeterminate="indeterminate"
                      @change="onCheckAllChange"
                    >
                      Check all
                    </a-checkbox>
                  </div>
                  <br />
                  <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
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
                <a-button style="margin-right: 8px">Limpiar</a-button>
                <a-button type="primary">Aplicar</a-button>
              </div>
            </a-drawer>
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
          <a class="full_name-style" @click="showDrawer()">{{full_name}}</a>
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
       <a-drawer
        title="Detalles del contacto"
        :width="711"
        placement="right"
        :visible="visibleContactDetails"
        @close="onClose()"
      >
        <div class="datos-primarios">
          <div class="avatar">
            <img src="./assets/profile.svg" alt="">
          </div>
          <div class="datos-contact">
            <span class="name">{{fullNameDetails}}</span>
            <div class="cod-contact">
              <span class="number">Código de contacto: {{codUser}}</span>
              <span class="last_interaction">Último contacto por:  {{last_interaction}} ({{channel}}) </span>
            </div>
          </div>
          <div class="interacted-channels">
            <span class="title">Canales interactuados</span>
            <div class="channels">
              <img src="./assets/messenger.svg" alt="">
              <img style="margin-left: 5px;" src="./assets/whatsapp.svg" alt="">
            </div>
          </div>
        </div>
        <div v-if="this.activeKey == '2'" class="add-cellPhone">
          <span class="add-edit">Puedes agregar o editar teléfonos.</span>
          <div>
            <span class="add" @click="showDrawerPhone()">Agregar nuevo teléfono</span>
            <a-drawer
              title="Agregar teléfono"
              placement="right"
              v-model:visible="visiblePhone"
              :width="402"
              @close="onClosePhone()"
            >
              <a-form class="form-addPhone">
                <div class="input-basic">
                  <p class="title">Número</p>
                  <a-input class="input-style" v-model:value="value" placeholder="Escribe aquí" />
                </div>
                <div class="input-basic">
                  <p class="title">Tipo de teléfono</p>
                  <a-input class="input-style" v-model:value="value" placeholder="Escribe aquí" />
                </div>
                <div class="input-basic">
                  <p class="title">Origen</p>
                  <a-input class="input-style" v-model:value="value" placeholder="Escribe aquí" />
                </div>
                <div class="input-basic">
                  <p class="title">Operador telefónico</p>
                  <a-input class="input-style" v-model:value="value" placeholder="Escribe aquí" />
                </div>
                <div class="input-basic">
                  <p class="title">prioridad</p>
                  <a-input class="input-style" v-model:value="value" placeholder="Escribe aquí" />
                </div>
                <div class="input-basic">
                  <p class="title">Observación</p>
                  <a-textarea class="input-style" v-model:value="value2" placeholder="Observaciones" allow-clear />
                </div>
              </a-form>
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
                <a-button style="margin-right: 8px">Cancelar</a-button>
                <a-button type="primary">Agregar teléfono</a-button>
              </div>
            </a-drawer>
          </div>
        </div>
        <div class="datos-secundarios">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Datos personales">
              <a-table 
                :rowKey="(record,index)=>{return index}" 
                :scroll="{ x: 10, y: 150}" 
                :pagination="false" 
                size="middle"  
                :dataSource="datoPersonales" 
                :columns="columsnDatoPersonales"
              >
                <template #contact_type>
                  <span>Contacto directo</span>
                </template>
                <template #date_time>
                  <span>2022-01-12 22:54:28</span>
                </template>
              </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Teléfonos">
              <a-table 
                :rowKey="(record,index)=>{return index}" 
                :scroll="{ x: 10, y: 150}" 
                :pagination="false" 
                size="middle"  
                :dataSource="detailsContactData" 
                :columns="columnsDetailsContact"
              >
                <template #phone="{ text: phone}">
                  <a @click="callContact()">{{phone}}</a>
                </template>
                <template #contact_type>
                  <span>Contacto directo</span>
                </template>
                <template #date_time>
                  <span>2022-01-12 22:54:28</span>
                </template>
              </a-table>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Direcciones">
              <a-table 
                :rowKey="(record,index)=>{return index}" 
                :scroll="{ x: 10, y: 150}" 
                :pagination="false" 
                size="middle"  
                :dataSource="addresses" 
                :columns="columnsAddresses"
              >
                <template #contact_type>
                  <span>Contacto directo</span>
                </template>
                <template #date_time>
                  <span>2022-01-12 22:54:28</span>
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
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
          <span style="position: absolute; left: 20px; top: 15px; color: #F5222D; cursor: pointer;" @click="deleteContact()">Eliminar contacto</span>
          <a-button style="margin-right: 8px">Ver anterior contacto</a-button>
          <a-button type="primary">Ver siguiente contacto</a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>

import toolbar from "./components/toolbar.vue"
import sideBar from "./components/sideBar.vue"
import api from "./api/api.js";
import dropdown from "./components/dropdown.vue"
import { SearchOutlined, DownloadOutlined, FilterOutlined, QuestionCircleOutlined} from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

export default {
  name: 'Index',
  data(){
    return{
      visibleContactDetails: null,
      visiblePhone: null,
      visibleFilter: null,
      fullNameDetails: '',
      modalVisible: null,
      codUser: '',
      last_interaction: '',
      channel: '',
      activeKey: '1',
      dataSource: [],
        columns: [
          {
            title: 'Cod Contacto',
            dataIndex: 'code',
            key: 'code',
            width: 130,
            slots: {
              customRender: 'code',
            },
          },
          {
            title: 'Nombres y apellidos',
            dataIndex: 'full_name',
            key: 'full_name',
            width: 170,
            slots: {
              customRender: 'full_name',
            },
          },
          {
            title: 'Empresa',
            dataIndex: 'entity_name',
            key: 'entity_name',
            width: 100,
          },
          {
            title: 'Campaña',
            dataIndex: 'campaign',
            key: 'campaign',
            width: 100,
            slots: {
              customRender: 'campaign',
            },
          },  
          {
            title: 'Bases',
            dataIndex: 'base_name',
            key: 'base_name',
            width: 150,
          }, 
          {
            title: 'Telefono',
            dataIndex: 'phones',
            key: 'phones',
            width: 150,
            slots: {
              customRender: 'phones',
            },
          },   
          {
            title: 'Correo',
            dataIndex: 'emails',
            key: 'emails',
            width: 250,
            slots: {
              customRender: 'emails',
            },
          },  
          {
            title: 'Número de Documentos',
            dataIndex: 'document_number',
            key: 'document_number',
            width: 200,
          },  
          {
            title: 'Canales',
            dataIndex: 'canales',
            key: 'canales',
            width: 100,
          },  
          {
            title: 'Colas',
            dataIndex: 'colas',
            key: 'colas',
            width: 80,
          },  
          {
            title: 'Fecha de última gestión',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 200,
          },  
          {
            title: 'Fecha de última interacción',
            dataIndex: 'ultimaInteraccion',
            key: 'ultimaInteraccion',
            width: 220,
          }, 
          {
            title: 'Mejor grupo del mes',
            dataIndex: 'best_management_group_month',
            key: 'best_management_group_month',
            width: 200,
          },   
          {
            title: 'Mejor resultado del mes',
            dataIndex: 'best_management_result_month',
            key: 'best_management_result_month',
            width: 200,
          },  
          {
            title: 'Mejor motivo del mes',
            dataIndex: 'best_management_motive_month',
            key: 'best_management_motive_month',
            width: 180,
          },  
          {
            title: 'Mejor submotivo del mes',
            dataIndex: 'submotivoMes',
            key: 'submotivoMes',
            width: 200,
          },  
          {
            title: 'Último grupo',
            dataIndex: 'ultimoG',
            key: 'ultimoG',
            width: 150,
          },  
          {
            title: 'Último resultado',
            dataIndex: 'ultimoR',
            key: 'ultimoR',
            width: 150,
          },  
          {
            title: 'Último motivo',
            dataIndex: 'ultimoM',
            key: 'ultimoM',
            width: 150,
          },  
          {
            title: 'Último submotivo',
            dataIndex: 'ultimoSubm',
            key: 'ultimoSubm',
            width: 150,
          },  
          {
            title: 'Última vez gestion por:',
            dataIndex: 'ultimaGestion',
            key: 'ultimaGestion',
            width: 200,
          },  
        ],
        detailsContactData: [],
        columnsDetailsContact:[
          {
            title: 'Numero',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
            align: 'center',
            slots: {
              customRender: 'phone',
            },
          },
          {
            title: 'Tipo de contacto',
            dataIndex: 'contact_type',
            key: 'contact_type',
            width: 150,
            align: 'center',
            slots: {
              customRender: 'contact_type',
            },
          },
          {
            title: 'Fecha y hora',
            dataIndex: 'date_time',
            key: 'date_time',
            width: 200,
            align: 'center',
            slots: {
              customRender: 'date_time',
            },
          },
          {
            title: 'Tipo de telefono',
            dataIndex: 'type_phone',
            key: 'type_phone',
            width: 150,
            align: 'center',
          },
          {
            title: 'Origen',
            dataIndex: 'type_origin',
            key: 'type_origin',
            width: 150,
            align: 'center',
          },
          {
            title: 'Operador telefónico',
            dataIndex: 'phone_operator',
            key: 'phone_operator',
            width: 150,
            align: 'center',
          },
          {
            title: 'Prioridad',
            dataIndex: 'priority',
            key: 'priority',
            width: 150,
            align: 'center',
          },
          {
            title: 'Observación',
            dataIndex: 'observation',
            key: 'observation',
            width: 150,
            align: 'center',
          },
          {
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          }
        ],
        addresses: [],
        columnsAddresses: [
          {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            align: 'center',
          },
          {
            title: 'Tipo',
            dataIndex: 'type_address',
            key: 'type_address',
            width: 150,
            align: 'center',
          },
          {
            title: 'Departamento',
            dataIndex: 'department',
            key: 'department',
            width: 150,
            align: 'center',
          },
          {
            title: 'Provincia',
            dataIndex: 'province',
            key: 'province',
            width: 150,
            align: 'center',
          },
          {
            title: 'Distrito',
            dataIndex: 'district',
            key: 'district',
            width: 150,
            align: 'center',
          },
          {
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          }
        ],
        datosPersonales:[],
        columsnDatoPersonales:[
          {
            title: 'Tipo de documento',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Documento',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Fecha de nacimiento',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Edad',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Sexo',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Estado civil',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'País',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Ciudad',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Centro laboral',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Cargo laboral',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Sueldo',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          },
          {
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            align: 'center',
          }
        ],
        optionsTipos: [
          {
            value: 'Última y mejor tipificación',
            label: 'Última y mejor tipificación'
          },
          {
            value: 'Mejor tipificación del mes',
            label: 'Mejor tipificación del mes'
          },
          {
            value: 'Última tipificación',
            label: 'Última tipificación'
          }
        ],
        optionsGrupos: [
          {
            value: 'grupo 1-1',
            label: 'Grupo 1-1',
          },
          {
            value: 'grupo-css',
            label: 'Grupo-css',
          },
          {
            value: 'grupo-ccs',
            label: 'Grupo-ccs',
          }
        ],
        optionsResults: [
          {
            value: 'resultado 1-1',
            label: 'Resultado 1-1',
          },
          {
            value: 'result1-css',
            label: 'Result1-css',
          },
          {
            value: 'result22-ccs',
            label: 'Result22-ccs',
          }
        ],
        plainOptions: ['Apple', 'Pear', 'Orange']
      }
  },
  components: {
    toolbar,
    sideBar,
    dropdown,
    SearchOutlined,
    DownloadOutlined,
    FilterOutlined,
  },
  mounted(){
    this.dataContacts();
    this.dataDetailsContact();
    this.dataCellPhone();
    this.dataAddresses();
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
        this.fullNameDetails = response.data.full_name
        this.codUser = response.data.code
        this.last_interaction = response.data.last_interaction.identifier
        this.channel = response.data.last_interaction.channel.name
      }).catch(error => {
        console.log(error)
      })
    },
    dataCellPhone(){
      api.getDataCellphone().then(response => {
        this.detailsContactData = response.data.results
      })
      .catch(error => {
        console.log(error)
      })
    },
    dataAddresses(){
      api.getDataAddresses().then(response => {
        this.addresses = response.data.results
      })
      .catch(error => {
        console.log(error)
      })
    },
    showDrawer(){
      this.visibleContactDetails = true
      this.visiblePhone = false;
    },
    onClose(){
      this.visibleContactDetails = false;
    },
    showDrawerPhone(){
      this.visiblePhone = true;
    },
    onClosePhone(){
      this.visiblePhone = false;
    },
    showDrawerFilter(){
      this.visibleFilter = true;
    },
    deleteContact(){
      Modal.confirm({
        title: () => `¿Estás seguro de eliminar el contacto ${this.fullNameDetails}?`,
        icon: () => createVNode(QuestionCircleOutlined),
        cancelText: () => 'Cancelar',
        okText:() => 'Eliminar',
        content: () =>
          createVNode(
            'div',
            {
              style: 'color:#595959;',
            },
            'Recuerda que ya no se visualizará este contacto en la tabla. Si deseas volver a visualizarlo, deberás agregarlo desde el módulo de Importaciones. ',
          ),

        onOk() {
          console.log('Eliminar');
        },

        onCancel() {
          console.log('Cancelar');
        }
      })
    },
    callContact(){
      Modal.confirm({
        title: () => `¿Estás seguro de llamar al contacto ${this.fullNameDetails}?`,
        icon: () => createVNode(QuestionCircleOutlined),
        cancelText: () => 'Cancelar',
        okText:() => 'Llamar',
        content: () =>
          createVNode(
            'div',
            {
              style: 'color:#595959;',
            },
            'Recuerda que se creará un nuevo ticket y al finalizar la llamada podrás colocar una tipificación.',
          ),

        onOk() {
          console.log('Llamar');
        },

        onCancel() {
          console.log('Cancelar');
        }
      })
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
    .datos-primarios{
      margin: 0 0 30px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar{
        margin-right: 5px;
      }
      .datos-contact{
        .name{
          font-family: SF Pro Display;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
        }
        .cod-contact{
          .number{
            font-family: SF Pro Display;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
          }
          .last_interaction{
            font-family: SF Pro Display;
            font-style: italic;
            font-weight: normal;
            font-size: 12px;
            line-height: 20px;
            margin-left: 10px;
          }
        }
      }
      .interacted-channels{
        margin-left: 30px;
        .channels{
          text-align: right;
        }
      }
    }
    .add-cellPhone{
      display: flex;
      justify-content: space-between;
      .add-edit{
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #8C8C8C;
      }
      .add{
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #0083F5;
        cursor: pointer;
      }
    }
    .form-addPhone{
      .input-basic{
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        .title{
          margin-top: 18px;
          margin-bottom: 3px;
        }
        .input-style{
          margin-top: 0px;
        }
      }
    }
    .first-text{
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      color: #595959;
    }
    .secondary-text{
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      margin: 11px 0;
    }
    .dropdown-style{
      .title{
        margin-bottom: 2px;
        margin-top: 16px;
      }
    }
    .ultima-gestion{
      margin-top: 12px;
      .title{
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
      }
    }
 }


</style>
