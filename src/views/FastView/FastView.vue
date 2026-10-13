
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const card = ref<HTMLElement | null>(null)
const mouseX = ref(50)
const mouseY = ref(50)

const socials = [
  { name: "discord", url: "https://discord.com", icon: "discord" },
  { name: "github", url: "https://github.com", icon: "github" },
  { name: "spotify", url: "https://open.spotify.com", icon: "spotify" },
  { name: "website", url: "https://example.com", icon: "globe" }
]

function handleMouseMove(event: MouseEvent) {
  const element = card.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const rotateY = (x / rect.width - 0.5) * 10
  const rotateX = (0.5 - y / rect.height) * 10

  mouseX.value = (x / rect.width) * 100
  mouseY.value = (y / rect.height) * 100

  element.style.setProperty("--rotate-x", `${rotateX}deg`)
  element.style.setProperty("--rotate-y", `${rotateY}deg`)
  element.style.setProperty("--glow-x", `${mouseX.value}%`)
  element.style.setProperty("--glow-y", `${mouseY.value}%`)
}

function resetCard() {
  const element = card.value
  if (!element) return

  element.style.setProperty("--rotate-x", "0deg")
  element.style.setProperty("--rotate-y", "0deg")
  element.style.setProperty("--glow-x", "50%")
  element.style.setProperty("--glow-y", "0%")
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove)
})
</script>

<template>
  <main class="page">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>

    <div class="particles" aria-hidden="true">
      <span
        v-for="n in 22"
        :key="n"
        :style="{
          '--i': n,
          '--x': `${(n * 47.7) % 100}%`,
          '--y': `${(n * 31.3) % 100}%`
        }"
      ></span>
    </div>

    <section
      ref="card"
      class="profile-card"
      @mousemove="handleMouseMove"
      @mouseleave="resetCard"
    >
      <div class="card-content">
        <div class="avatar-container">
          <img
            class="avatar"
            src="https://api.dicebear.com/9.x/shapes/svg?seed=fast&backgroundColor=080808&shape1Color=eeeeee&shape2Color=777777"
            alt="avatar"
          />
          <span class="online-indicator"></span>
        </div>

        <div class="identity">
          <div class="name-row">
            <h1>fast</h1>
            <svg class="verified" viewBox="0 0 24 24" aria-label="verified">
              <path
                d="M12 2.5l2.7 1.6 3.1-.1.9 3 2.3 2.1-1.1 2.9.6 3-2.6 1.8-1.3 2.8-3.1-.4-2.7 1.5-2.3-2.1-3-.7-.3-3.1-1.9-2.5 1.6-2.7.2-3.1 3-.8L12 2.5Z"
                fill="currentColor"
              />
              <path
                d="m8.5 12.1 2.2 2.2 4.8-4.8"
                fill="none"
                stroke="#080808"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p class="username">@fasttt33</p>
          <p class="bio">making things on the internet.</p>
        </div>

        <div class="status">
          <span class="status-dot"></span>
          <span>probably listening to music</span>
        </div>

        <div class="socials">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            :title="social.name"
            target="_blank"
            rel="noopener noreferrer"
            class="social"
          >
            <svg
              v-if="social.icon === 'discord'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M19.73 5.05a19.2 19.2 0 0 0-4.74-1.47.07.07 0 0 0-.08.04c-.2.35-.42.8-.58 1.16a17.7 17.7 0 0 0-5.3 0c-.16-.37-.39-.81-.59-1.16a.08.08 0 0 0-.08-.04 19.1 19.1 0 0 0-4.74 1.47.07.07 0 0 0-.03.03C.57 9.52-.25 13.85.16 18.12c0 .02.01.04.03.05a19.3 19.3 0 0 0 5.8 2.93.08.08 0 0 0 .08-.03c.45-.61.86-1.26 1.2-1.94a.08.08 0 0 0-.04-.11 12.7 12.7 0 0 1-1.81-.86.08.08 0 0 1-.01-.13l.36-.28a.07.07 0 0 1 .08-.01c3.8 1.73 7.91 1.73 11.66 0a.07.07 0 0 1 .08.01l.36.28a.08.08 0 0 1-.01.13c-.58.34-1.18.63-1.81.86a.08.08 0 0 0-.04.11c.35.68.75 1.33 1.2 1.94a.08.08 0 0 0 .08.03 19.2 19.2 0 0 0 5.8-2.93.08.08 0 0 0 .03-.05c.49-4.94-.82-9.23-3.45-13.04a.06.06 0 0 0-.03-.03ZM8.02 14.83c-1.14 0-2.08-1.05-2.08-2.34s.92-2.35 2.08-2.35c1.17 0 2.1 1.07 2.08 2.35 0 1.29-.92 2.34-2.08 2.34Zm7.69 0c-1.14 0-2.08-1.05-2.08-2.34s.91-2.35 2.08-2.35c1.16 0 2.09 1.07 2.08 2.35 0 1.29-.92 2.34-2.08 2.34Z"
              />
            </svg>

            <svg
              v-else-if="social.icon === 'github'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.72.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
              />
            </svg>

            <svg
              v-else-if="social.icon === 'spotify'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 1.5A10.5 10.5 0 1 0 12 22.5 10.5 10.5 0 0 0 12 1.5Zm4.82 15.14a.65.65 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.02a.65.65 0 1 1-.29-1.26c4-.92 7.44-.52 10.21 1.16.31.19.41.59.22.9Zm1.28-2.84a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.48-1.23a.82.82 0 1 1-.48-1.57c3.82-1.16 8.57-.6 11.82 1.4.38.23.5.74.27 1.13Zm.11-2.96c-3.39-2.01-8.98-2.2-12.21-1.22a.98.98 0 1 1-.57-1.87c3.71-1.13 9.88-.91 13.78 1.41a.98.98 0 0 1-1 1.68Z"
              />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
          </a>
        </div>

        <div class="music">
          <div class="album">
            <span>f.</span>
          </div>

          <div class="track">
            <span class="track-title">fever</span>
            <span class="track-artist">buckshot, fakemink</span>
          </div>

          <div class="equalizer" aria-label="music">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

* {
  box-sizing: border-box;
}

.page {
  position: relative;
  display: grid;
  min-height: 100vh;
  min-height: 100dvh;
  place-items: center;
  overflow: hidden;
  padding: 24px;
  isolation: isolate;
  background: #050505;
  color: #f5f5f5;
  font-family: "Inter", sans-serif;
}

.ambient {
  position: absolute;
  z-index: -1;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
}

.ambient-one {
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.07);
}

.ambient-two {
  right: 10%;
  bottom: -280px;
  background: rgba(255, 255, 255, 0.025);
}

.particles {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particles span {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: white;
  opacity: 0;
  animation: drift calc(5s + var(--i) * 0.3s) ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.5s);
}

@keyframes drift {
  0%, 100% {
    opacity: 0;
    transform: translateY(12px);
  }

  50% {
    opacity: 0.35;
    transform: translateY(-12px);
  }
}

.profile-card {
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --glow-x: 50%;
  --glow-y: 0%;

  position: relative;
  width: min(100%, 360px);
  padding: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(13, 13, 13, 0.82);
  box-shadow:
    0 30px 100px rgba(0, 0, 0, 0.65),
    0 0 50px rgba(255, 255, 255, 0.025),
    inset 0 1px rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(24px);
  transform: perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  transform-style: preserve-3d;
  transition:
    transform 160ms ease-out,
    border-color 250ms ease,
    box-shadow 250ms ease;
  animation: appear 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.profile-card::before {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    280px circle at var(--glow-x) var(--glow-y),
    rgba(255, 255, 255, 0.075),
    transparent 70%
  );
  content: "";
  pointer-events: none;
}

.profile-card::after {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  opacity: 0.12;
  content: "";
  pointer-events: none;
}

.profile-card:hover {
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    0 35px 100px rgba(0, 0, 0, 0.7),
    0 0 60px rgba(255, 255, 255, 0.04),
    inset 0 1px rgba(255, 255, 255, 0.06);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: perspective(1000px) translateY(15px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: perspective(1000px) translateY(0) scale(1);
  }
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  position: relative;
  width: 84px;
  height: 84px;
  margin-bottom: 20px;
}

.avatar {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: #111;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.045);
}

.online-indicator {
  position: absolute;
  right: 2px;
  bottom: 3px;
  width: 14px;
  height: 14px;
  border: 3px solid #0d0d0d;
  border-radius: 50%;
  background: #eaeaea;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.identity {
  text-align: center;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.name-row h1 {
  margin: 0;
  color: #f8f8f8;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -1.3px;
}

.verified {
  width: 15px;
  height: 15px;
  color: white;
}

.username {
  margin: 5px 0 0;
  color: #696969;
  font-size: 12px;
}

.bio {
  margin: 18px 0 0;
  color: #c3c3c3;
  font-size: 12px;
  line-height: 1.7;
}

.status {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  color: #737373;
  font-size: 10px;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ddd;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.socials {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 25px;
}

.social {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.025);
  color: #aaa;
  transition:
    color 180ms ease,
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.social svg {
  width: 17px;
  height: 17px;
}

.social:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.music {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  margin-top: 25px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.075);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.28);
}

.album {
  display: grid;
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 7px;
  background:
    radial-gradient(circle at 65% 25%, #777, transparent 40%),
    linear-gradient(135deg, #282828, #080808 70%);
  color: #f5f5f5;
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
}

.track {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.track-title {
  color: #eaeaea;
  font-size: 11px;
  font-weight: 600;
}

.track-artist {
  color: #6c6c6c;
  font-size: 10px;
}

.equalizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 18px;
}

.equalizer span {
  width: 2px;
  height: 5px;
  border-radius: 2px;
  background: #aaa;
  animation: equalize 800ms ease-in-out infinite alternate;
}

.equalizer span:nth-child(2) {
  animation-delay: -500ms;
}

.equalizer span:nth-child(3) {
  animation-delay: -200ms;
}

.equalizer span:nth-child(4) {
  animation-delay: -650ms;
}

.equalizer span:nth-child(5) {
  animation-delay: -350ms;
}

@keyframes equalize {
  from {
    height: 4px;
    opacity: 0.4;
  }

  to {
    height: 16px;
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px;
  }

  .profile-card {
    padding: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>