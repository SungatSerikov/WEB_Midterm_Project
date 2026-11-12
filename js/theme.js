const THEME_KEY = "cinemaplus_theme";

function getSavedTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === "dark" || saved === "light") {
            return saved;
        }
        return "light";
    } catch (error) {
        return "light";
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
    }
}

function updateThemeButtonText(button, theme) {
    if (!button) {
        return;
    }
    if (theme === "dark") {
        button.textContent = "Light Mode";
    } else {
        button.textContent = "Dark Mode";
    }
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
    const toggleBtn = document.getElementById("theme-toggle");
    updateThemeButtonText(toggleBtn, theme);
}

function setupHeaderControls() {
    const unavailableTickets = document.querySelector(".nav-links .unavailable");
    if (unavailableTickets && unavailableTickets.textContent.trim() === "My Tickets") {
        const link = document.createElement("a");
        link.href = "my-tickets.html";
        link.textContent = "My Tickets";
        unavailableTickets.replaceWith(link);
    }

    const headerLayout = document.querySelector(".header-layout");
    if (!headerLayout) {
        return;
    }

    let toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) {
        const signInBtn = headerLayout.querySelector(".sign-in-button");
        const actionsGroup = document.createElement("div");
        actionsGroup.className = "header-actions";

        toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.id = "theme-toggle";
        toggleBtn.className = "btn btn-cinema-outline theme-toggle-btn";

        actionsGroup.appendChild(toggleBtn);
        if (signInBtn) {
            headerLayout.insertBefore(actionsGroup, signInBtn);
            actionsGroup.appendChild(signInBtn);
        } else {
            headerLayout.appendChild(actionsGroup);
        }
    }

    updateThemeButtonText(toggleBtn, getSavedTheme());

    toggleBtn.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-theme");
        const nextTheme = isDark ? "light" : "dark";
        saveTheme(nextTheme);
        applyTheme(nextTheme);
    });
}

applyTheme(getSavedTheme());
setupHeaderControls();