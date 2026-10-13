<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const card = ref<HTMLElement | null>(null)
const currentTime = ref("")

const socials = [
  {
    name: "discord",
    url: "https://discord.com/user/994116541559865416/",
    icon: "M19.73 4.36a19.8 19.8 0 0 0-4.88-1.51.07.07 0 0 0-.07.04c-.21.37-.44.86-.6 1.25a18.3 18.3 0 0 0-5.36 0c-.16-.4-.4-.88-.61-1.25a.07.07 0 0 0-.07-.04 19.7 19.7 0 0 0-4.88 1.51.06.06 0 0 0-.03.03C.14 8.93-.71 13.36-.27 17.74a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.98 3.02.07.07 0 0 0 .08-.03c.46-.63.87-1.29 1.22-1.99a.07.07 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.89.07.07 0 0 1-.01-.12c.13-.1.25-.2.37-.3a.07.07 0 0 1 .07-.01c3.92 1.79 8.17 1.79 12.04 0a.07.07 0 0 1 .07.01c.12.1.24.2.37.3a.07.07 0 0 1-.01.12c-.6.35-1.22.65-1.87.89a.07.07 0 0 0-.04.1c.36.7.76 1.36 1.22 1.99a.07.07 0 0 0 .08.03 19.8 19.8 0 0 0 5.99-3.02.07.07 0 0 0 .03-.06c.52-5.06-.87-9.45-3.71-13.35a.06.06 0 0 0-.03-.03ZM8.02 14.76c-1.18 0-2.15-1.08-2.15-2.41s.95-2.41 2.15-2.41 2.17 1.09 2.15 2.41c0 1.33-.95 2.41-2.15 2.41Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.41s.95-2.41 2.15-2.41 2.17 1.09 2.15 2.41c0 1.33-.95 2.41-2.15 2.41Z",
  },
  {
    name: "github",
    url: "https://github.com/fasttt33/",
    icon: "M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z",
  },
  {
    name: "youtube",
    url: "https://youtube.com/@fasttt33/",
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
  {
    name: "website",
    url: "https://fever.moe/",
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-3a15.6 15.6 0 0 0-1.4-3.6A8.1 8.1 0 0 1 18.9 8ZM12 4c.8 1.1 1.5 2.5 1.8 4h-3.6c.3-1.5 1-2.9 1.8-4ZM4.3 14a8 8 0 0 1 0-4h3.4a16.7 16.7 0 0 0 0 4H4.3Zm.8 2h3a15.6 15.6 0 0 0 1.4 3.6A8.1 8.1 0 0 1 5.1 16Zm3-8h-3a8.1 8.1 0 0 1 4.4-3.6A15.6 15.6 0 0 0 8.1 8ZM12 20c-.8-1.1-1.5-2.5-1.8-4h3.6c-.3 1.5-1 2.9-1.8 4Zm2.1-6H9.9a14.6 14.6 0 0 1 0-4h4.2a14.6 14.6 0 0 1 0 4Zm.4 5.6a15.6 15.6 0 0 0 1.4-3.6h3a8.1 8.1 0 0 1-4.4 3.6ZM16.3 14a16.7 16.7 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4Z",
  },
]

function updateTime() {
  currentTime.value = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())
}

function handleMouseMove(event: MouseEvent) {
  if (!card.value) return

  const rect = card.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  const rotateY = (x - 0.5) * 8
  const rotateX = (0.5 - y) * 8

  card.value.style.setProperty("--rotate-x", `${rotateX}deg`)
  card.value.style.setProperty("--rotate-y", `${rotateY}deg`)
  card.value.style.setProperty("--mouse-x", `${x * 100}%`)
  card.value.style.setProperty("--mouse-y", `${y * 100}%`)

  card.value.querySelectorAll<HTMLElement>("[data-depth]").forEach((element) => {
    const depth = Number(element.dataset.depth || 1)
    const moveX = (x - 0.5) * 16 * depth
    const moveY = (y - 0.5) * 16 * depth

    element.style.setProperty("--move-x", `${moveX}px`)
    element.style.setProperty("--move-y", `${moveY}px`)
  })
}

function resetCard() {
  if (!card.value) return

  card.value.style.setProperty("--rotate-x", "0deg")
  card.value.style.setProperty("--rotate-y", "0deg")
  card.value.style.setProperty("--mouse-x", "50%")
  card.value.style.setProperty("--mouse-y", "50%")

  card.value.querySelectorAll<HTMLElement>("[data-depth]").forEach((element) => {
    element.style.setProperty("--move-x", "0px")
    element.style.setProperty("--move-y", "0px")
  })
}

let clockInterval: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  clockInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(clockInterval)
})
</script>

<template>
  <main class="page">
    <section
      ref="card"
      class="profile-card"
      @mousemove="handleMouseMove"
      @mouseleave="resetCard"
    >
      <div class="card-glow"></div>
      <div class="card-noise"></div>

      <div class="card-content">
        <header class="topbar" data-depth="0.4">

          <span class="time">{{ currentTime }}</span>
        </header>

        <div class="profile" data-depth="1">
          <div class="avatar-wrap">
            <img
              class="avatar"
              src="https://avatars.githubusercontent.com/u/151259803?v=4"
              alt="fast's avatar"
            />
            <span class="status-dot"></span>
          </div>

          <h1>fast<span class="name-dot">.</span></h1>
          <p class="username">@fasttt33</p>
          <p class="bio">making things on the internet.</p>
        </div>

        <div class="divider"></div>

        <nav class="socials" aria-label="social links" data-depth="0.6">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path :d="social.icon" />
            </svg>
          </a>
        </nav>

        <a
          class="music-card"
          href="https://soundcloud.com/buckshottt/buckshot-fakemink-fever"
          target="_blank"
          rel="noopener noreferrer"
          data-depth="0.9"
        >
          <div class="music-art">
            <img
              src="https://i.scdn.co/image/ab67616d0000b273dcd9e96e7e5a890a6572ed13"
              alt="fever album artwork"
            />
          </div>

          <div class="music-info">
            <span class="music-label">currently into</span>
            <span class="music-title">fever</span>
            <span class="music-artist">buckshot, fakemink</span>
          </div>

          <svg class="music-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </section>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap");

:root {
  color-scheme: dark;
  font-family: "Inter", sans-serif;
  background: #080808;
  color: #f4f4f4;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px 18px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 45%, #171717 0%, #0c0c0c 38%, #080808 75%);
}

.profile-card {
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --mouse-x: 50%;
  --mouse-y: 50%;

  position: relative;
  width: min(100%, 390px);
  padding: 1px;
  border: 1px solid #303030;
  border-radius: 25px;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(145deg, #292929, #111111 45%, #242424);
  box-shadow:
    0 30px 90px #00000080,
    0 2px 8px #00000060,
    inset 0 1px #ffffff0a;
  transform:
    perspective(1000px)
    rotateX(var(--rotate-x))
    rotateY(var(--rotate-y));
  transform-style: preserve-3d;
  transition:
    transform 180ms ease-out,
    box-shadow 300ms ease,
    border-color 300ms ease;
  will-change: transform;
}

.profile-card:hover {
  border-color: #484848;
  box-shadow:
    0 35px 100px #000000a0,
    0 0 0 1px #ffffff05,
    inset 0 1px #ffffff0c;
}

.card-glow {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    380px circle at var(--mouse-x) var(--mouse-y),
    #ffffff0b,
    transparent 70%
  );
}

.card-noise {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.12;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E");
}

.card-content {
  position: relative;
  padding: 25px;
  border-radius: 24px;
  background: linear-gradient(155deg, #151515f5, #0d0d0df7 65%, #111111f5);
}

.card-content > * {
  position: relative;
}

[data-depth] {
  transform: translate3d(var(--move-x, 0px), var(--move-y, 0px), 0);
  transition: transform 220ms ease-out;
  will-change: transform;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 43px;
  font-family: "DM Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.02em;
  color: #777777;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #eeeeee;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.brand-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e8e8e8;
  box-shadow: 0 0 10px #ffffff35;
}

.time {
  font-variant-numeric: tabular-nums;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-wrap {
  position: relative;
  width: 92px;
  height: 92px;
  margin-bottom: 19px;
  padding: 4px;
  border: 1px solid #353535;
  border-radius: 29px;
  background: linear-gradient(145deg, #282828, #101010);
  box-shadow: 0 8px 30px #00000070;
  transform: rotate(-4deg);
  transition:
    transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 300ms ease;
}

.profile-card:hover .avatar-wrap {
  transform: rotate(0deg) scale(1.04);
  border-color: #555555;
}

.avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover;
  background: #171717;
}

.status-dot {
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 15px;
  height: 15px;
  border: 3px solid #111111;
  border-radius: 50%;
  background: #d5d5d5;
  box-shadow: 0 0 12px #ffffff20;
}

.profile h1 {
  margin: 0;
  color: #f5f5f5;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.075em;
  line-height: 1.1;
}

.name-dot {
  color: #777777;
}

.username {
  margin: 8px 0 0;
  color: #777777;
  font-family: "DM Mono", monospace;
  font-size: 12px;
}

.bio {
  margin: 17px 0 0;
  color: #b3b3b3;
  font-size: 13px;
  line-height: 1.6;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 24px;
  color: #858585;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: -0.02em;
}

.status-indicator {
  width: 5px;
  height: 5px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #bdbdbd;
  box-shadow: 0 0 9px #ffffff30;
}

.divider {
  height: 1px;
  margin: 25px 0 20px;
  background: linear-gradient(90deg, transparent, #333333 20%, #333333 80%, transparent);
}

.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
}

.social-link {
  display: grid;
  width: 43px;
  height: 43px;
  place-items: center;
  border: 1px solid #292929;
  border-radius: 14px;
  background: #171717;
  color: #9a9a9a;
  transition:
    transform 200ms ease,
    background 200ms ease,
    border-color 200ms ease,
    color 200ms ease;
}

.social-link:hover {
  transform: translateY(-3px);
  border-color: #505050;
  background: #222222;
  color: #ffffff;
}

.social-link svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.music-card {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 77px;
  margin-top: 25px;
  padding: 12px;
  border: 1px solid #292929;
  border-radius: 17px;
  background: linear-gradient(110deg, #1a1a1a, #121212);
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background 200ms ease;
}

.music-card:hover {
  border-color: #454545;
  background: linear-gradient(110deg, #202020, #151515);
}

.music-art {
  width: 49px;
  height: 49px;
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid #383838;
  border-radius: 12px;
  background: #171717;
}

.music-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.music-art span:nth-child(1) {
  height: 12px;
  animation-delay: -0.7s;
}

.music-art span:nth-child(2) {
  height: 23px;
  animation-delay: -0.2s;
}

.music-art span:nth-child(3) {
  height: 16px;
  animation-delay: -0.5s;
}

.music-art span:nth-child(4) {
  height: 27px;
  animation-delay: -0.1s;
}

.music-art span:nth-child(5) {
  height: 10px;
  animation-delay: -0.4s;
}

.music-info {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.music-label {
  color: #707070;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.music-title {
  overflow: hidden;
  color: #ededed;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-artist {
  overflow: hidden;
  color: #858585;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-arrow {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  fill: none;
  stroke: #777777;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    transform 200ms ease,
    stroke 200ms ease;
}

.music-card:hover .music-arrow {
  transform: translate(2px, -2px);
  stroke: #ffffff;
}

@keyframes equalize {
  from {
    transform: scaleY(0.45);
    opacity: 0.55;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

@media (max-width: 420px) {
  .card-content {
    padding: 22px;
  }

  .topbar {
    margin-bottom: 36px;
  }

  .profile-card {
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .profile-card {
    transform: none;
  }
}
</style>