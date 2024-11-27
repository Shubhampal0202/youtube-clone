


export const SEARCH_SUGGESTION_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const value_converter = (value) => {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
