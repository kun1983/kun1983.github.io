(() => {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const liveRegion = document.getElementById("liveRegion");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  /* ---------- Theme ---------- */

  const themeLabel = (theme) => (theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
  const themeText = (theme) => (theme === "dark" ? "LIGHT" : "NIGHT");
  const themeColor = (theme) => (theme === "dark" ? "#11100e" : "#f2efe9");

  function syncThemeUI(theme) {
    if (metaThemeColor) metaThemeColor.setAttribute("content", themeColor(theme));
    if (!themeToggle) return;

    const text = themeToggle.querySelector(".theme-text");
    if (text) text.textContent = themeText(theme);
    themeToggle.setAttribute("aria-label", themeLabel(theme));
    themeToggle.setAttribute("title", themeLabel(theme));
  }

  syncThemeUI(root.dataset.theme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      syncThemeUI(next);

      try {
        localStorage.setItem("ks-theme", next);
      } catch (error) {
        /* Storage can be unavailable in private contexts; the theme still works. */
      }
    });
  }

  /* ---------- Copy account IDs ---------- */

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        /* Fall through to the selection-based fallback. */
      }
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "-9999px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    field.remove();
    return copied;
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy || "";
      const label = button.querySelector("span");
      const original = label ? label.textContent : "COPY";
      const success = await copyText(value);

      button.classList.toggle("is-copied", success);
      if (label) label.textContent = success ? "COPIED" : "FAILED";

      if (!success) {
        const code = button.closest(".channel-id")?.querySelector("code");
        if (code) {
          const range = document.createRange();
          range.selectNodeContents(code);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }

      if (liveRegion) {
        liveRegion.textContent = success
          ? `已复制账号 ID：${value}`
          : "复制失败，账号 ID 已选中，请手动复制。";
      }

      window.clearTimeout(button._copyReset);
      button._copyReset = window.setTimeout(() => {
        button.classList.remove("is-copied");
        if (label) label.textContent = original;
      }, 1800);
    });
  });

  /* ---------- QR image state ---------- */

  document.querySelectorAll("[data-qr-image]").forEach((image) => {
    const frame = image.closest(".qr-frame");
    if (!frame) return;

    const note = frame.parentElement?.querySelector("[data-qr-note]");
    const sync = () => {
      const loaded = image.complete && image.naturalWidth > 0;
      frame.classList.toggle("has-qr", loaded);
      if (note) note.textContent = loaded ? "扫码关注 / SCAN" : "二维码待补充";
    };

    image.addEventListener("load", sync);
    image.addEventListener("error", sync);
    sync();

    if (typeof image.decode === "function") {
      image.decode().then(sync).catch(() => {});
    }
  });

  /* ---------- Scroll reveal ---------- */

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /* ---------- Footer year ---------- */

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
