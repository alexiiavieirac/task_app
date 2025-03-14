module.exports = {
    content : [
        "./components/**/*.{js, jsx}",
        "./pages/**/*.{js, jsx}",
        "./App.js",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#4F46E5",
                secondary: "#10B981",
                danger: "#EF4444",
                sucess: "#10B981",
                warning: "#F59E0B",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },

    plugins: [],
};