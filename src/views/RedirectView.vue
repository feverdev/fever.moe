<script setup lang="ts">
import { onMounted } from "vue";

const DISCORD_SERVER = "https://discord.gg/gRVtzeF4AV"

const REDIRECTS: Record<string, string> = {
    discord: DISCORD_SERVER,
    invite: DISCORD_SERVER,
    buy: DISCORD_SERVER,
};

onMounted(() => {
    const path = window.location.pathname
        .replace(/^\/+|\/+$/g, "")
        .toLowerCase();

    const redirectUrl = REDIRECTS[path];

    console.log(path)
    console.log("url:", redirectUrl);
    if (redirectUrl) {
        window.location.replace(redirectUrl);
    }
});

if (typeof window !== "undefined") {
    const path = window.location.pathname
        .replace(/^\/+|\/+$/g, "")
        .toLowerCase();

    const redirectUrl = REDIRECTS[path];

    console.log(path)
    console.log("url:", redirectUrl);
    if (redirectUrl) {
        window.location.replace(redirectUrl);
    }
}
</script>

<template>
    <div class="header">
        <h1>redirecting</h1>
        <p>sit tight...</p>
    </div>
</template>

<style scoped>
.header {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    font-family: sans-serif;
}

h1 {
    font-size: 2.5rem;
}
</style>
