
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const card = ref<HTMLElement | null>(null)
const rotationX = ref(0)
const rotationY = ref(0)
const mouseX = ref(50)
const mouseY = ref(50)
const playing = ref(false)
const elapsed = ref(0)

let animationFrame: number | undefined
let timer: ReturnType<typeof setInterval> | undefined

const socials = [
  { name: "discord", url: "https://discord.com", icon: "discord" },
  { name: "github", url: "https://github.com", icon: "github" },
  { name: "spotify", url: "https://open.spotify.com", icon: "spotify" }
]

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${(i * 37.17) % 100}%`,
  top: `${(i * 61.31) % 100}%`,
  delay: `${(i % 8) * -0.7}s`,
  duration: `${5 + (i % 7)}s`,
  size: `${1 + (i % 3)}px`
}))

function handleMouseMove(event: MouseEvent) {
  const x = event.clientX / window.innerWidth
  const y = event.clientY / window.innerHeight

  mouseX.value = x * 100
  mouseY.value = y * 100

  rotationY.value = (x - 0.5) * 10
  rotationX.value = (0.5 - y) * 8

  if (animationFrame) cancelAnimationFrame(animationFrame)

  animationFrame = requestAnimationFrame(() => {
    if (card.value) {
      card.value.style.setProperty("--rotate-x", `${rotationX.value}deg`)
      card.value.style.setProperty("--rotate-y", `${rotationY.value}deg`)
    }
  })
}

function resetCard() {
  rotationX.value = 0
  rotationY.value = 0

  if (card.value) {
    card.value.style.setProperty("--rotate-x", "0deg")
    card.value.style.setProperty("--rotate-y", "0deg")
  }
}

function toggleMusic() {
  playing.value = !playing.value
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove)

  timer = setInterval(() => {
    if (playing.value) elapsed.value++
    if (elapsed.value >= 213) elapsed.value = 0
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  if (timer) clearInterval(timer)
})
</script>

<template>
  <main
    class="eautopian"
    :style="{
      '--mouse-x': `${mouseX}%`,
      '--mouse-y': `${mouseY}%`
    }"
  >
    <div class="background-glow"></div>
    <div class="grid-overlay"></div>

    <div class="particles" aria-hidden="true">
      <span
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.left,
          top: particle.top,
          animationDelay: particle.delay,
          animationDuration: particle.duration,
          width: particle.size,
          height: particle.size
        }"
      ></span>
    </div>

    <header class="topbar">
      <a href="#" class="brand">
        <span class="brand-mark">e.</span>
        <span>eautopian</span>
      </a>

      <div class="topbar-right">
        <span class="live-dot"></span>
        <span>available online</span>
      </div>
    </header>

    <section class="hero">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        <span>THE INTERNET IS MY HOME</span>
        <span class="eyebrow-line"></span>
      </div>

      <div
        ref="card"
        class="profile-card"
        @mouseleave="resetCard"
      >
        <div class="card-shine"></div>
        <div class="card-noise"></div>

        <div class="card-top">
          <span class="card-label">PERSONAL PROFILE</span>
          <span class="card-index">001 / 001</span>
        </div>

        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <img
            class="avatar"
            src="https://api.dicebear.com/9.x/shapes/svg?seed=eautopian&backgroundColor=111111&shape1Color=ffffff&shape2Color=aaaaaa"
            alt="eautopian avatar"
          />
          <span class="avatar-status"></span>
        </div>

        <div class="identity">
          <div class="username-row">
            <h1>eautopian</h1>
            <span class="verified" title="verified">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>

          <p class="handle">@eautopian <span class="separator">/</span> they don't know me</p>

          <p class="description">
            somewhere between online and offline.
            <br />
            <span>building things that probably shouldn't exist.</span>
          </p>
        </div>

        <div class="divider"></div>

        <div class="profile-details">
          <div class="detail">
            <span class="detail-icon">⌁</span>
            <span>united kingdom</span>
          </div>
          <div class="detail">
            <span class="detail-icon">⌘</span>
            <span>developer</span>
          </div>
          <div class="detail">
            <span class="detail-icon">◷</span>
            <span>probably awake</span>
          </div>
        </div>

        <div class="socials">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-button"
          >
            <svg v-if="social.icon === 'github'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.72.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>
            </svg>
            <svg v-else-if="social.icon === 'discord'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.73 5.05a19.2 19.2 0 0 0-4.74-1.47.07.07 0 0 0-.08.04c-.2.35-.42.8-.58 1.16a17.7 17.7 0 0 0-5.3 0c-.16-.37-.39-.81-.59-1.16a.08.08 0 0 0-.08-.04 19.1 19.1 0 0 0-4.74 1.47.07.07 0 0 0-.03.03C.57 9.52-.25 13.85.16 18.12c0 .02.01.04.03.05a19.3 19.3 0 0 0 5.8 2.93.08.08 0 0 0 .08-.03c.45-.61.86-1.26 1.2-1.94a.08.08 0 0 0-.04-.11 12.7 12.7 0 0 1-1.81-.86.08.08 0 0 1-.01-.13l.36-.28a.07.07 0 0 1 .08-.01c3.8 1.73 7.91 1.73 11.66 0a.07.07 0 0 1 .08.01l.36.28a.08.08 0 0 1-.01.13c-.58.34-1.18.63-1.81.86a.08.08 0 0 0-.04.11c.35.68.75 1.33 1.2 1.94a.08.08 0 0 0 .08.03 19.2 19.2 0 0 0 5.8-2.93.08.08 0 0 0 .03-.05c.49-4.94-.82-9.23-3.45-13.04a.06.06 0 0 0-.03-.03ZM8.02 14.83c-1.14 0-2.08-1.05-2.08-2.34s.92-2.35 2.08-2.35c1.17 0 2.1 1.07 2.08 2.35 0 1.29-.92 2.34-2.08 2.34Zm7.69 0c-1.14 0-2.08-1.05-2.08-2.34s.91-2.35 2.08-2.35c1.16 0 2.09 1.07 2.08 2.35 0 1.29-.92 2.34-2.08 2.34Z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 1.5A10.5 10.5 0 0 0 8.18 21.78c.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.19 0 0 1.01-.32 3.31 1.23a11.45 11.45 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.66.25 2.89.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A10.5 10.5 0 0 0 12 1.5Z"/>
            </svg>
            <span>{{ social.name }}</span>
            <span class="external">↗</span>
          </a>
        </div>

        <div class="music-player">
          <div class="album-art">
            <div class="album-circle"></div>
            <span>f.</span>
          </div>

          <div class="track-info">
            <span class="track-label">CURRENTLY LISTENING TO</span>
            <span class="track-title">fever</span>
            <span class="track-artist">buckshot, fakemink</span>
          </div>

          <div class="music-controls">
            <span class="track-time">{{ formatTime(elapsed) }}</span>
            <button
              class="play-button"
              type="button"
              :aria-label="playing ? 'pause music' : 'play music'"
              @click="toggleMusic"
            >
              <svg v-if="!playing" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l10-6.5-10-6.5Z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5h4v14H7zM14 5h4v14h-4z"/>
              </svg>
            </button>
          </div>

          <div class="progress-track">
            <div class="progress-fill" :style="{ width: `${(elapsed / 213) * 100}%` }"></div>
          </div>
        </div>

        <div class="card-footer">
          <span>made with intention.</span>
          <span class="footer-symbol">✳</span>
          <span>© 2026 eautopian</span>
        </div>
      </div>

      <div class="scroll-indicator">
        <span class="scroll-line"></span>
        <span>SCROLL TO EXPLORE</span>
        <span class="scroll-line"></span>
      </div>
    </section>

    <section class="below">
      <div class="section-heading">
        <span class="section-number">01</span>
        <h2>a little about me.</h2>
      </div>

      <p class="about-text">
        i write code, make things, break things, and occasionally touch grass.
        interested in software, design, music, and whatever catches my attention.
      </p>

      <div class="bottom-grid">
        <div class="mini-card">
          <span class="mini-label">CURRENTLY BUILDING</span>
          <span class="mini-title">fever</span>
          <span class="mini-description">something worth sticking around for.</span>
          <span class="mini-arrow">↗</span>
        </div>

        <div class="mini-card">
          <span class="mini-label">FAVOURITE ACTIVITY</span>
          <span class="mini-title">making stuff</span>
          <span class="mini-description">mostly code. sometimes music.</span>
          <span class="mini-arrow">↗</span>
        </div>

        <div class="mini-card">
          <span class="mini-label">STATUS</span>
          <span class="mini-title">in my own world</span>
          <span class="mini-description"><span class="live-dot"></span> online, probably.</span>
          <span class="mini-arrow">↗</span>
        </div>
      </div>
    </section>

    <footer class="page-footer">
      <a href="#" class="footer-brand">eautopian<span>.</span></a>
      <span>designed to be different.</span>
      <a href="#top" @click.prevent="scrollToTop">BACK TO TOP ↑</a>
    </footer>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap");

* {
  box-sizing: border-box;
}

.eautopian {
  --bg: #050505;
  --surface: rgba(17, 17, 17, 0.8);
  --white: #f5f5f5;
  --muted: #777;
  --line: rgba(255, 255, 255, 0.11);
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  padding: 0 7%;
  color: var(--white);
  background: var(--bg);
  font-family: "Space Grotesk", sans-serif;
}

.eautopian::before {
  position: fixed;
  z-index: -1;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.065),
    transparent 70%
  );
  content: "";
  pointer-events: none;
}

.background-glow {
  position: absolute;
  z-index: -2;
  top: 100px;
  left: 50%;
  width: 700px;
  height: 700px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.045);
  filter: blur(150px);
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  z-index: -1;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
  pointer-events: none;
}

.particles {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: white;
  opacity: 0;
  animation: float-particle 8s ease-in-out infinite;
}

@keyframes float-particle {
  0%, 100% {
    opacity: 0;
    transform: translate3d(0, 15px, 0);
  }
  50% {
    opacity: 0.4;
    transform: translate3d(10px, -15px, 0);
  }
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 86px;
  border-bottom: 1px solid var(--line);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9px;
  background: white;
  color: black;
  font-size: 19px;
  font-weight: 700;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #999;
  font-family: "DM Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #eee;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.55);
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 0 95px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  color: #888;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 2.8px;
  text-align: center;
}

.eyebrow-line {
  width: 30px;
  height: 1px;
  background: #555;
}

.profile-card {
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  position: relative;
  width: min(100%, 450px);
  padding: 23px;
  overflow: hidden;
  transform: perspective(1100px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 19px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.065), transparent 45%),
    rgba(12, 12, 12, 0.9);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.025),
    inset 0 1px rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  transition: transform 180ms ease-out, border-color 250ms ease, box-shadow 250ms ease;
  animation: card-enter 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  transform-style: preserve-3d;
}

.profile-card:hover {
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 45px 110px rgba(0, 0, 0, 0.8),
    0 0 45px rgba(255, 255, 255, 0.035),
    inset 0 1px rgba(255, 255, 255, 0.1);
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: perspective(1100px) translateY(35px) rotateX(4deg) scale(0.97);
  }
  to {
    opacity: 1;
    transform: perspective(1100px) translateY(0) rotateX(0) scale(1);
  }
}

.card-shine {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.09), transparent 70%);
  pointer-events: none;
}

.card-noise {
  position: absolute;
  z-index: 0;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  opacity: 0.12;
  pointer-events: none;
}

.card-top,
.avatar-wrap,
.identity,
.divider,
.profile-details,
.socials,
.music-player,
.card-footer {
  position: relative;
  z-index: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #777;
  font-family: "DM Mono", monospace;
  font-size: 9px;
  letter-spacing: 1.2px;
}

.card-index {
  color: #555;
}

.avatar-wrap {
  position: relative;
  display: grid;
  width: 96px;
  height: 96px;
  margin: 36px auto 19px;
  place-items: center;
}

.avatar-ring {
  position: absolute;
  inset: -7px;
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 50%;
  animation: ring-pulse 5s ease-in-out infinite;
}

@keyframes ring-pulse {
  50% {
    transform: scale(1.07);
    opacity: 0.4;
  }
}

.avatar {
  width: 96px;
  height: 96px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: #171717;
  object-fit: cover;
}

.avatar-status {
  position: absolute;
  right: 2px;
  bottom: 5px;
  width: 15px;
  height: 15px;
  border: 3px solid #0c0c0c;
  border-radius: 50%;
  background: #f5f5f5;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.identity {
  text-align: center;
}

.username-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.username-row h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1.8px;
  line-height: 1.2;
}

.verified {
  display: grid;
  width: 17px;
  height: 17px;
  place-items: center;
  border-radius: 50%;
  background: #f5f5f5;
  color: #080808;
}

.verified svg {
  width: 12px;
  height: 12px;
}

.handle {
  margin: 7px 0 0;
  color: #777;
  font-family: "DM Mono", monospace;
  font-size: 11px;
}

.separator {
  padding: 0 4px;
  color: #444;
}

.description {
  margin: 21px 0 25px;
  color: #e4e4e4;
  font-size: 13px;
  line-height: 1.9;
}

.description span {
  color: #777;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
}

.profile-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 17px;
  padding: 21px 0;
}

.detail {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #999;
  font-size: 10px;
}

.detail-icon {
  color: #eee;
  font-size: 15px;
}

.socials {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 0;
  padding: 12px 7px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.035);
  color: #e7e7e7;
  font-size: 11px;
  text-decoration: none;
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.social-button svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.social-button:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.external {
  color: #666;
  font-size: 10px;
}

.music-player {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.32);
}

.album-art {
  position: relative;
  display: grid;
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  overflow: hidden;
  place-items: center;
  border: 1px solid #383838;
  border-radius: 6px;
  background: radial-gradient(circle at 70% 20%, #777, #222 42%, #080808 80%);
  color: white;
  font-size: 25px;
  font-weight: 700;
  font-style: italic;
}

.album-circle {
  position: absolute;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
}

.album-art span {
  position: relative;
}

.track-info {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.track-label {
  color: #686868;
  font-family: "DM Mono", monospace;
  font-size: 7px;
  letter-spacing: 0.6px;
}

.track-title {
  color: #eee;
  font-size: 12px;
  font-weight: 600;
}

.track-artist {
  color: #777;
  font-size: 10px;
}

.music-controls {
  display: flex;
  align-items: center;
  gap: 9px;
}

.track-time {
  color: #777;
  font-family: "DM Mono", monospace;
  font-size: 9px;
}

.play-button {
  display: grid;
  width: 29px;
  height: 29px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: #f3f3f3;
  color: #080808;
  cursor: pointer;
  transition: transform 180ms ease, background 180ms ease;
}

.play-button:hover {
  transform: scale(1.08);
  background: white;
}

.play-button svg {
  width: 15px;
  height: 15px;
}

.progress-track {
  position: absolute;
  right: 13px;
  bottom: 0;
  left: 13px;
  height: 2px;
  overflow: hidden;
  background: #282828;
}

.progress-fill {
  height: 100%;
  background: #eee;
  transition: width 1s linear;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 19px;
  color: #555;
  font-family: "DM Mono", monospace;
  font-size: 8px;
}

.footer-symbol {
  color: #aaa;
  font-size: 13px;
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 45px;
  color: #555;
  font-family: "DM Mono", monospace;
  font-size: 8px;
  letter-spacing: 2px;
}

.scroll-line {
  width: 28px;
  height: 1px;
  background: #3b3b3b;
}

.below {
  max-width: 950px;
  margin: 0 auto;
  padding: 0 0 110px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.section-number {
  color: #777;
  font-family: "DM Mono", monospace;
  font-size: 11px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 600;
  letter-spacing: -1.2px;
}

.about-text {
  max-width: 560px;
  margin: 0 0 38px 35px;
  color: #888;
  font-size: 14px;
  line-height: 1.9;
}

.bottom-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.mini-card {
  position: relative;
  display: flex;
  min-height: 160px;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), transparent);
  transition: border-color 200ms ease, transform 200ms ease, background 200ms ease;
}

.mini-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.27);
  background: rgba(255, 255, 255, 0.045);
}

.mini-label {
  margin-bottom: 23px;
  color: #686868;
  font-family: "DM Mono", monospace;
  font-size: 8px;
  letter-spacing: 1px;
}

.mini-title {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
}

.mini-description {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #777;
  font-size: 10px;
  line-height: 1.6;
}

.mini-arrow {
  position: absolute;
  top: 19px;
  right: 20px;
  color: #666;
  font-size: 14px;
}

.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  min-height: 90px;
  border-top: 1px solid var(--line);
  color: #555;
  font-family: "DM Mono", monospace;
  font-size: 9px;
}

.footer-brand {
  color: #eee;
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-decoration: none;
}

.footer-brand span {
  color: #777;
}

.page-footer > a:last-child {
  color: #999;
  text-decoration: none;
  transition: color 150ms ease;
}

.page-footer > a:last-child:hover {
  color: white;
}

@media (max-width: 650px) {
  .eautopian {
    padding: 0 5%;
  }

  .topbar {
    min-height: 70px;
  }

  .topbar-right {
    font-size: 8px;
  }

  .hero {
    padding: 45px 0 75px;
  }

  .eyebrow {
    gap: 8px;
    font-size: 8px;
    letter-spacing: 1.7px;
  }

  .eyebrow-line {
    width: 18px;
  }

  .profile-card {
    padding: 19px;
  }

  .username-row h1 {
    font-size: 29px;
  }

  .profile-details {
    gap: 12px;
  }

  .detail {
    font-size: 9px;
  }

  .bottom-grid {
    grid-template-columns: 1fr;
  }

  .mini-card {
    min-height: 135px;
  }

  .mini-label {
    margin-bottom: 15px;
  }

  .about-text {
    margin-left: 0;
  }

  .page-footer {
    flex-wrap: wrap;
    padding: 22px 0;
  }

  .page-footer > span {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
