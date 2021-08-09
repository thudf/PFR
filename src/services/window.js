global.window = {
  ...global.window,
  location: {
    protocol: 'https:',
  },
  WebSocket,
};
