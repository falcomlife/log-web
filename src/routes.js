import NodeTable from './components/NodeTable.vue';
import PodTable from './components/PodTable.vue';
import WarningTable from './components/WarningTable.vue';

const routes = [
    { path: '/warning', component: WarningTable },
    { path: '/node', component: NodeTable },
    { path: '/pod', component: PodTable },
];

export default routes;
