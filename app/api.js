export default {
  fetch: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('It sure is!'), 2000);
    });
  },
};
