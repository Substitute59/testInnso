<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                Test Innso
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <router-link class="link" to="/">Mon test</router-link>
            <router-link class="link" to="/About">Mes infos</router-link>
        </v-app-bar>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<style scoped>
    .v-card {
        margin: 20px;
    }
    .link {
        color: black;
        margin-left: 20px;
    }
</style>