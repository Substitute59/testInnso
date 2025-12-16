<template>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-select
            class="select"
            label="Statut"
            @change="filterByStatus"
            v-model="filteredStatus"
            :items="status">
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            class="select"
            label="Lu ?"
            @change="filterByRead"
            v-model="filteredRead"
            :items="read">
          </v-select>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'filters',
        computed: {
            ...mapState({
                status: state => state.status,
                read: state => state.read
            }),
            filteredStatus: {
                get() {
                    return this.$store.state.filteredStatus
                },
                set(newStatus) {
                    this.$store.dispatch('filterByStatus', newStatus);
                }
            },
            filteredRead: {
                get() {
                    return this.$store.state.filteredRead
                },
                set(newRead) {
                    this.$store.dispatch('filterByRead', newRead);
                }
            }
        },
        methods: {
            filterByStatus(newStatus) {
                this.$store.dispatch('filterByStatus', newStatus);
            },
            filterByRead(newRead) {
                this.$store.dispatch('filterByRead', newRead);
            }
        }
    }
</script>

<style scoped>
    .select {
        padding: 0;
        margin: 0;
    }
    .container--fluid {
        padding-bottom: 0;
    }
</style>