<template>
    <v-dialog
        v-model="attachmentDialog"
        max-width="290">
        <v-card>
            <v-card-title class="headline">Téléchargement de la pièce jointe</v-card-title>
            <v-card-text>
                Ici : mise en place du sytème de téléchargement ou d'affichage de la pièce jointe :
            </v-card-text>
            <v-card-text>
                <strong>{{ currentAttachment }}</strong>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="green darken-1"
                    text
                    @click="closeAttachmentDialog">
                    Afficher
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="closeAttachmentDialog">
                    Télécharger
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'attachmentDialog',
        computed: {
            ...mapState({
                currentAttachment: state => state.currentAttachment
            }),
            attachmentDialog: {
                get() {
                    return this.$store.state.attachmentDialog
                },
                set(newValue) {
                    this.$store.state.attachmentDialog = newValue;
                }
            }
        },
        methods: {
            closeAttachmentDialog() {
                this.$store.dispatch('closeAttachmentDialog');
            }
        }
    }
</script>