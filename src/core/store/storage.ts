import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * We can use redux-persist storage on server side render so we need to create or own storage
 * Check this answer on github to know more about it
 * {@link https://github.com/vercel/next.js/discussions/15687 | createWebStorage}
 * @returns
 */
const createNoopStorage = () => {
  return {
    // eslint-disable-next-line no-unused-vars
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line no-unused-vars
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
