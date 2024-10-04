import * as Papa from "papaparse";

const getData = (url) => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        console.log("incv", data);
        resolve(data);
      },
    });
  });
};

export const test_data = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vScpdf3I6ofSf41VbuHAOE6XRyoxe8g2O6JQpS1FBRiHSl7MUEThbinU55pQNMC_-C3UwCHAsn4nGYr/pub?gid=0&single=true&output=csv"
);
