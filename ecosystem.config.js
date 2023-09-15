module.exports = {
  apps: [
    {
      name: "frontend-pqhaz",
      script: "npm",
      args: "run start",
      autorestart: true,
      watch: false,
      max_memory_restart: "2G",
      env: {
        PORT: 7777,
      },
    },
  ],
};
