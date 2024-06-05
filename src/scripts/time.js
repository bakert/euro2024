document.addEventListener('DOMContentLoaded', () => {
    dayjs.extend(window.dayjs_plugin_advancedFormat);
    dayjs.extend(window.dayjs_plugin_relativeTime);
    document.querySelectorAll("time").forEach((t) => {
        const datetime = t.getAttribute("datetime");
        const format = t.dataset.format;
        if (!datetime) {
            return;
        }
        if (format === "fromNow") {
            t.textContent = dayjs(datetime).fromNow();
        } else {
            t.textContent = dayjs(datetime).format(format).replace(":00", "");
        }
    });
});
