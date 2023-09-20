export const updateWatchList = (id) => {
  let watchlist = JSON.parse(localStorage.getItem("cryptoWatchList") || "[]");
  let message = ""
  if (watchlist.indexOf(id) === -1) {
    watchlist.push(id);
    message = `${id} added to watchlist`
  } else {
    watchlist = [].concat(watchlist.filter((coin) => coin !== id));
    console.log("watchlist", watchlist)
    message = `${id} removed from watchlist`
  }
  localStorage.setItem("cryptoWatchList", JSON.stringify(watchlist));
  return message
};
