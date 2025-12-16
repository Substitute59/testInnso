<template>
    <v-dialog
        v-model="dataDialog"
        max-width="500">
        <v-card>
            <v-card-title class="headline">
                <v-icon class="gender" v-if="currentData && currentData.gender === 'Male'">mdi-gender-male</v-icon>
                <v-icon class="gender" v-else-if="currentData && currentData.gender === 'Female'">mdi-gender-female</v-icon>
                {{ currentData ? `${currentData.first_name} ${currentData.last_name}`: '' }}
            </v-card-title>
            <v-card-text>
                <p class="line"><strong>Email</strong> : {{ currentData ? currentData.email : '' }}</p>
                <p class="line"><strong>Téléphone</strong> : {{ currentData ? currentData.phone : '' }}</p>
                <p class="line"><strong>Date de naissance</strong> : {{ currentData ? currentData.birthday : '' }}</p>
            </v-card-text>
            <v-card-text>
                <p class="line"><strong>Création</strong> : {{ currentData ? currentData.interaction_creation_date : '' }}</p>
                <p class="line"><strong>Echéance</strong> : {{ currentData ? currentData.due_date : '' }}</p>
                <p class="line"><strong>Origine</strong> : {{ currentData ? currentData.contact_channel : '' }}</p>
                <p class="line"><strong>Assigné</strong> : {{ currentData ? currentData.assignedTO : '' }}</p>
                <p class="line"><strong>Dernier commentaire</strong> :<br />
                {{ currentData ? currentData.last_comment : '' }}</p>
            </v-card-text>
            <v-card-text>
                <v-select
                    @change="changeStatus($event, currentData ? currentData.id : null)"
                    v-model="currentStatus"
                    :items="status">
                </v-select>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="green darken-1"
                    text
                    @click="closeDataDialog(currentData ? currentData.id : null)">
                    Fermer
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'dataDialog',
        computed: {
            ...mapState({
                status: state => state.status,
                currentData: state => state.currentData
            }),
            currentStatus: {
                get() {
                    return this.$store.state.currentStatus
                },
                set(newValue) {
                    this.$store.state.currentStatus = newValue;
                }
            },
            dataDialog: {
                get() {
                    return this.$store.state.dataDialog
                },
                set(newValue) {
                    this.$store.state.dataDialog = newValue;
                }
            }
        },
        methods: {
            changeStatus(newStatus, id) {
                this.$store.dispatch('changeStatus', {
                    newStatus,
                    id
                });
            },
            closeDataDialog(id) {
                this.$store.dispatch('closeDataDialog', id);
            }
        }
    }
</script>

<style scoped>
    .line {
        margin: 0;
    }
    .gender {
        margin-right: 10px;
    }
</style>