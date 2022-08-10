export const getRoot = (_, res) => {
  return res.send(`
    <h1>
      <a href="https://github.com/dcs-holdum" target="_blank">
        Welcome DCS Holdum
      </a>
    </h1>
    <ul>
      <li>
        <a href="https://github.com/dcs-holdum/api-server" target="_blank">
          API SERVER
        </a>
      </li>

      <li>
        <a href="https://github.com/dcs-holdum/discord-bot" target="_blank">
          DISCORD BOT
        </a>
      </li>
    </ul>
  `);
};
