module.exports = {
  apps: [
    {
      name: "drawbed",
      script: "./app/index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs", "static", "public"],
      env_dev: {
        PORT: 3001,
        NODE_ENV: "dev",
      },
      env_pro: {
        PORT: 3001,
        NODE_ENV: "pro",
      },
    },
  ],
};
