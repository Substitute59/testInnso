<template>
    <v-card
        class="mx-auto"
        max-width="400">
        <v-img
            class="white--text"
            height="200px"
            :src="require('../assets/images/me.jpg')">
            <v-card-title class="align-end fill-height">Jonathan DEBAERE</v-card-title>
        </v-img>
        <v-card-text>
            <span>35 ans</span><br>
            <span class="text--primary">
                <strong class="main-job">Développeur Front-end Sénior</strong><br>
                <span class="secondary-job">Développeur Wordpress Freelance</span>
            </span>
        </v-card-text>
        <v-card-text class="icons">
            <v-btn icon href="http://labo-web-france.com/" target="_blank">
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon href="https://github.com/Substitute59" target="_blank">
                <v-icon>mdi-github-circle</v-icon>
            </v-btn>
            <v-btn icon href="https://www.linkedin.com/in/jonathan-debaere-71a77728" target="_blank">
                <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon href="https://twitter.com/substitute59" target="_blank">
                <v-icon>mdi-twitter</v-icon>
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<style scoped>
    .main-job {
        font-size: 22px;
    }
    .secondary-job {
        font-size: 12px;
    }
    .icons {
        text-align: right;
    }
</style>