document.addEventListener("DOMContentLoaded", () => {
  const channels = [
    {
      freq: "88.4 MHz",
      name: "GITHUB NODE",
      value: "https://github.com/mhillmerh",
      type: "link",
    },
    {
      freq: "101.1 MHz",
      name: "LINKEDIN RELAY",
      value: "https://www.linkedin.com/in/maximilianohillmer/",
      type: "link",
    },
    {
      freq: "66.6 MHz",
      name: "EMAIL CHANNEL",
      value: "m.hillmerh@gmail.com",
      type: "email",
    },
  ];

  const freqList = document.getElementById("socialFreqList");
  const idleText = document.getElementById("socialIdleText");
  const terminalText = document.getElementById("socialTerminalText");
  const terminalActions = document.getElementById("socialTerminalActions");
  const openBtn = document.getElementById("socialOpenBtn");
  const copyBtn = document.getElementById("socialCopyBtn");
  const copiedMsg = document.getElementById("socialCopiedMsg");

  if (!freqList || !idleText || !terminalText || !terminalActions || !openBtn || !copyBtn || !copiedMsg) {
    return;
  }

  let selected = 0;
  let activeChannel = null;
  let typingDone = false;
  let cursorVisible = true;
  let typingInterval = null;
  let copiedTimeout = null;

  const modemAudio = new Audio("assets/sounds/modem.mp3");
  const chatAudio = new Audio("assets/sounds/doom_chat.wav");
  const pickupAudio = new Audio("assets/sounds/doom_pickup.wav");

  modemAudio.loop = true;

  function playSafe(audio) {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function stopSafe(audio) {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  function renderFreqList() {
  freqList.innerHTML = channels
    .map((channel, index) => {
      const activeClass = selected === index ? "active" : "";
      return `
        <div class="freq-item-doom ${activeClass}" data-index="${index}">
          <span class="freq-code-doom">${channel.freq}</span>
          <span class="freq-name-doom">${channel.name}</span>
        </div>
      `;
    })
    .join("");

  freqList.querySelectorAll(".freq-item-doom").forEach((item) => {
    item.addEventListener("click", () => {
      const index = Number(item.dataset.index);
      selected = index;
      renderFreqList();
      activateChannel(index);
    });
  });
}

  function getLines(channel) {
    return [
      "> Establishing encrypted connection...",
      `> Channel Locked: ${channel.name}`,
      "> Authenticating user credentials...",
      "> Access granted....",
      ".................................",
      "> SIGNAL ACQUIRED:",
      channel.value,
      ".................................",
      "> READY TO TRANSMIT.",
      "> PRESS ENTER TO OPEN / C TO COPY."
    ];
  }

  function renderCursorText(text) {
    terminalText.innerHTML = `${text}<span class="cursor-doom">${cursorVisible ? "_" : " "}</span>`;
  }

  function activateChannel(index) {
    activeChannel = index;
    typingDone = false;

    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }

    copiedMsg.classList.add("d-none");
    idleText.classList.add("d-none");
    terminalText.classList.remove("d-none");
    terminalActions.classList.add("d-none");
    terminalText.textContent = "";

    const channel = channels[index];
    const lines = getLines(channel);
    let current = 0;
    let content = "";

    playSafe(modemAudio);

    typingInterval = setInterval(() => {
      if (current < lines.length) {
        content += (current === 0 ? "" : "\n") + lines[current];
        terminalText.textContent = content;
        current++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;
        typingDone = true;
        stopSafe(modemAudio);
        playSafe(chatAudio);
        renderCursorText(content);
        terminalActions.classList.remove("d-none");
      }
    }, 550);
  }

  function openCurrentChannel() {
    if (activeChannel === null) return;

    const channel = channels[activeChannel];

    if (channel.type === "link") {
      window.open(channel.value, "_blank", "noopener,noreferrer");
    } else if (channel.type === "email") {
      window.open(`mailto:${channel.value}`, "_blank");
    }
  }

  async function copyCurrentChannel() {
    if (activeChannel === null) return;

    try {
      await navigator.clipboard.writeText(channels[activeChannel].value);
      playSafe(pickupAudio);
      copiedMsg.classList.remove("d-none");

      if (copiedTimeout) clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => {
        copiedMsg.classList.add("d-none");
      }, 1500);
    } catch {
      copiedMsg.textContent = "> COPY FAILED.";
      copiedMsg.classList.remove("d-none");
    }
  }

  openBtn.addEventListener("click", openCurrentChannel);
  copyBtn.addEventListener("click", copyCurrentChannel);

  setInterval(() => {
    cursorVisible = !cursorVisible;
    if (typingDone && activeChannel !== null && !terminalText.classList.contains("d-none")) {
      const baseText = terminalText.textContent.replace(/_$/, "").trimEnd();
      renderCursorText(baseText);
    }
  }, 450);

  window.addEventListener("keydown", (e) => {
    const socialScreen = document.getElementById("social");
    if (!socialScreen || socialScreen.classList.contains("d-none")) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      selected = selected === 0 ? channels.length - 1 : selected - 1;
      renderFreqList();
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selected = selected === channels.length - 1 ? 0 : selected + 1;
      renderFreqList();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeChannel !== null && typingDone) {
        openCurrentChannel();
      } else {
        activateChannel(selected);
      }
    }

    if (e.key.toLowerCase() === "c" && activeChannel !== null && typingDone) {
      e.preventDefault();
      copyCurrentChannel();
    }
  });

  renderFreqList();
});