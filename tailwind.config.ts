import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        maxHeight: {
            "7/8": "87.5%",
            "9/10": "90%",
        },
        width: {
            "9/10": "90%",
        },
        height: {
            "7/8": "87.5%",
            "9/10": "90%",
        },
    },
    plugins: [require("daisyui")],
};
export default config;
