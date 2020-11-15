const localStoreUtil = {
  store_data: async (key, data) => {
    await localStorage.setItem(key, JSON.stringify(data));
    return true;
  },

  get_data: async key => {
    const item = await localStorage.getItem(key);
    if (!item) return;

    return JSON.parse(item);
  },

  remove_data: async key => {
    await localStorage.removeItem(key);
    return true;
  },

  remove_all: async () => {
    await localStorage.clear();
    return true;
  }
};

export default localStoreUtil;
