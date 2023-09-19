export const addtoWatchList = (id) => {
  const watchlist = JSON.parse(localStorage.getItem("cryptoWatchList") || "[]");

  if (watchlist.indexOf(id) === -1) {
    watchlist.push(id);
    localStorage.setItem("cryptoWatchList", JSON.stringify(watchlist));
  }
};
