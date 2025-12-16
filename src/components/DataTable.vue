<template>
    <div>
        <v-text-field
            class="search"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details></v-text-field>

        <v-data-table 
            :headers="headers"
            :items="sortedMockDataList"
            :search="search"
            :key="id"
            :footer-props="{
                itemsPerPageOptions: rowsPerPageItems
            }"
            hide-default-header
            no-data-text="Aucun résultat"
            item-key="last_name">
        
            <template v-slot:header="{ props: { headers } }">
                <thead>
                    <tr v-sortable="{ onEnd: updateHeaderOrder }">
                        <template v-for="header in headers">
                            <th v-if="header.value === 'gender'" :key="header.text" scope="col">
                                {{ header.text }}
                            </th>
                            <th v-else :key="header.text" @click="sort(header.value)" scope="col">
                                {{ header.text }}
                                <v-icon small v-if="currentSort === header.value && currentSortDir === 'asc'">mdi-arrow-down</v-icon>
                                <v-icon small v-else-if="currentSort === header.value && currentSortDir === 'desc'">mdi-arrow-up</v-icon>
                                <v-icon small class="light" v-else>mdi-arrow-up</v-icon>
                            </th>
                        </template>
                    </tr>
                </thead>
            </template>
            
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <template v-for="header in headers">
                            <td v-if="header.value === 'read'" :key="header.text">
                                <v-icon small v-if="item[header.value] === 'yes'" @click="markAsRead(item.id)">mdi-email-open</v-icon>
                                <v-icon small v-else @click="markAsRead(item.id)">mdi-email</v-icon>
                            </td>
                            <td v-else-if="header.value === 'attachments'" :key="header.text">
                                <v-icon small @click="openAttachmentDialog(item[header.value])">mdi-paperclip</v-icon>
                            </td>
                            <td v-else-if="header.value === 'gender'" :key="header.text">
                                <v-icon small v-if="item[header.value] === 'Male'">mdi-gender-male</v-icon>
                                <v-icon small v-else>mdi-gender-female</v-icon>
                            </td>
                            <td class="status" v-else-if="header.value === 'status'" :key="header.text">
                                <v-icon small v-if="item[header.value] === 'reserved'">mdi-lock</v-icon>
                                <v-icon small v-else-if="item[header.value] === 'waiting'">mdi-clock-outline</v-icon>
                                <v-icon small v-else-if="item[header.value] === 'inProgress'">mdi-settings</v-icon>
                                <v-icon small v-else-if="item[header.value] === 'toTreat'">mdi-alert</v-icon>
                                <v-icon small v-else>mdi-check</v-icon>
                                {{ item[header.value] }}
                            </td>
                            <td v-else-if="header.value === 'last_comment'" :key="header.text">
                                {{ `${item[header.value].substring(0, 50)}...` }}
                            </td>
                            <td v-else-if="header.value === 'country_code'" :key="header.text">
                                <flag :iso="item[header.value]" />
                            </td>
                            <td v-else-if="header.value === 'id'" :key="header.text">
                                <v-icon small @click="openDataDialog(item)">mdi-eye</v-icon>
                            </td>
                            <td v-else :key="header.text">{{ item[header.value] }}</td>
                        </template>
                    </tr>
                </tbody>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Sortable from "sortablejs";

    export default {
        name: 'dataTable',
        computed: {
            ...mapState({
                mockDataList: state => state.mockDataList,
                filteredStatus: state => state.filteredStatus,
                filteredRead: state => state.filteredRead,
                status: state => state.status,
                read: state => state.read,
                attachmentDialog: state => state.attachmentDialog,
                currentAttachment: state => state.currentAttachment
            }),
            sortedMockDataList() {
                const that = this;
                let list = that.mockDataList.length ? that.mockDataList.sort((a,b) => {
                let modifier = 1;
                let newCurrentSort = that.currentSort;
                if (that.currentSortDir === 'desc') {
                    modifier = -1;
                }
                if (that.currentSort.indexOf('customer_') >= 0) {
                    newCurrentSort = newCurrentSort.replace('customer_', '');
                    a = a.customer;
                    b = b.customer;
                }
                if (a[newCurrentSort] < b[newCurrentSort]) {
                    return -modifier;
                }
                if (a[newCurrentSort] > b[newCurrentSort]) {
                    return modifier;
                }
                return 0;
                }) : [];

                if (this.filteredStatus && this.filteredStatus !== '') {
                    list = list.filter(item => item.status === this.filteredStatus);
                }

                if (this.filteredRead && this.filteredRead !== '') {
                    list = list.filter(item => {
                        return item.read === this.filteredRead;
                    });
                }

                return list;
            }
        },
        data() {
            return {
                id: 1,
                search: '',
                headers: [
                    { text: 'Lu', value: 'read' },
                    { text: 'PJ', value: 'attachments'},
                    { text: '', value: 'gender' },
                    { text: 'Nom', value: 'last_name' },
                    { text: 'Prénom', value: 'first_name' },
                    { text: 'Email', value: 'email' },
                    { text: 'Téléphone', value: 'phone' },
                    { text: 'Statut', value: 'status' },
                    { text: 'Création', value: 'interaction_creation_date' },
                    { text: 'Echéance', value: 'due_date' },
                    { text: 'Origine', value: 'contact_channel' },
                    { text: 'Assigné', value: 'assignedTO' },
                    { text: 'Dernier commentaire', value: 'last_comment' },
                    { text: 'Pays', value: 'country_code' },
                    { text: 'Show', value: 'id' }
                ],
                currentSort:'last_name',
                currentSortDir:'asc',
                rowsPerPageItems: [20, 50, 100, 500, -1],
                pagination: {
                    rowsPerPage: 20
                }
            };
        },
        directives: {
            'sortable': {
                inserted(el, binding) {
                    new Sortable(el, binding.value || {});
                }
            }
        },
        methods:{
            updateHeaderOrder(evt) {
                let headers = this.headers;
                let old_index = evt.oldIndex;
                let new_index = evt.newIndex;

                if (new_index >= headers.length) {
                    var k = new_index - headers.length + 1;
                    while (k--) {
                        headers.push(undefined);
                    }
                }
                headers.splice(new_index, 0, headers.splice(old_index, 1)[0]);
                this.headers = headers;
                
                this.id ++;
            },
            sort(sort) {
                if (sort === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = sort;
            },
            openAttachmentDialog(attachment) {
                this.$store.dispatch('openAttachmentDialog', attachment);
            },
            openDataDialog(data) {
                this.$store.dispatch('openDataDialog', data);
            },
            markAsRead(id) {
                this.sortedMockDataList.map(item => {
                    if (item.id === id) {
                        item.read = item.read === 'yes' ? 'no' : 'yes';
                    }
                    return item;
                });
            }
        },
        mounted() {
            this.$store.dispatch('init');
        }
    }
</script>

<style scoped>
    .v-input {
        padding: 10px;
    }
    .search {
        margin-top: -10px;
    }
    th,
    .status {
        white-space: nowrap;
    }
    .light {
        opacity: .5;
    }
</style>