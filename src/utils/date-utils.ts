function transformDatetimeInTimestamp(datetime: Date) {
  const data = new Date(datetime);

  const timestamp = data.getTime();
  const timestampInSeconds = timestamp / 1000;

  const timestampWithoutMiliseconds = Math.floor(timestampInSeconds);

  return timestampWithoutMiliseconds;
}

function getAtualTimestamp() {
  const data = new Date();

  const timestamp = data.getTime() / 1000;

  const timestampWithoutMiliseconds = Math.floor(timestamp);

  return timestampWithoutMiliseconds;
}

const dateFunctions = {
  transformDatetimeInTimestamp,
  getAtualTimestamp,
};
export { dateFunctions };
