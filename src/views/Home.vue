<template>
    <v-card>
        <div v-if="mockDataList">
            <Filters/>
            <DataTable/>
            <AttachmentDialog/>
            <DataDialog/>
        </div>
        <p v-else>
            En chargement...
        </p>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';
    import Filters from '../components/Filters';
    import DataTable from '../components/DataTable';
    import AttachmentDialog from '../components/AttachmentDialog';
    import DataDialog from '../components/DataDialog';

    export default {
        name: 'home',
        components: {
            Filters,
            DataTable,
            AttachmentDialog,
            DataDialog
        },
        computed: {
            ...mapState({
                mockDataList: state => state.mockDataList
            })
        }
    }
</script>