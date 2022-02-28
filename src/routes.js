import NodeTable from './components/NodeTable.vue';
import PodTable from './components/PodTable.vue';
import WarningTable from './components/WarningTable.vue';
import PodInfo from './components/PodInfo.vue';
import Services from './components/Services.vue';
import Chart from './components/Chart.vue';
import ServicesInfo from './components/ServicesInfo.vue';
import Index from './components/Index.vue';


const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'Index'
    }
  },
  {
    path: '/services',
    component: Services,
    meta: {
      title: 'Services'
    }
  },
  {
    path: '/servicesinfo',
    component: ServicesInfo,
    meta: {
      title: 'ServicesInfo'
    }
  }
];

export default routes;
