// Functions to fetch the CSV data for different reducers

// for Data Reducer
async function getData(csvAddress) {
  const values = [];
  const netflix = [];
  const prime = [];
  const disney = [];
  // Fetching data
  const response = await fetch(csvAddress);
  const data = await response.text();
  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  const length = table.length - 1;
  for (let i = 0; i < length; i++) {
    const column = table[i].split(",");
    values.push(column[0]);
    netflix.push(Number(column[1]));
    prime.push(Number(column[2]));
    disney.push(Number(column[3]));
  }

  const data_info = {
    information: values,
    netflix_data: netflix,
    prime_data: prime,
    disney_data: disney,
  };
  return data_info;
}

// for All Text Data
export async function getData3(csvAddress) {
  const values = [];
  const netflix = [];
  const prime = [];
  const disney = [];
  // Fetching data
  const response = await fetch(csvAddress);
  const data = await response.text();
  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  const length = table.length - 1;
  for (let i = 0; i < length; i++) {
    const column = table[i].split(",");
    values.push(column[0]);
    netflix.push(column[1]);
    prime.push(column[2]);
    disney.push(column[3].replace("\r", ""));
  }

  const data_info = {
    information: values,
    netflix_data: netflix,
    prime_data: prime,
    disney_data: disney,
  };
  return data_info;
}

// for OTT Reducers
export async function getData2(csvAddress) {
  const values = [];
  const ott = [];
  // Fetching data
  const response = await fetch(csvAddress);
  const data = await response.text();
  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  const length = table.length - 1;
  for (let i = 0; i < length; i++) {
    const column = table[i].split(",");
    values.push(column[1]);
    ott.push(Number(column[2]));
  }

  const data_info = {
    information: values,
    ott_data: ott,
  };
  return data_info;
}

// for Map Data
export async function getData4(csvAddress) {
  const code = [];
  const subs = [];
  // Fetching data
  const response = await fetch(csvAddress);
  const data = await response.text();
  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  const length = table.length - 1;
  for (let i = 0; i < length; i++) {
    const column = table[i].split(",");
    code.push(column[0]);
    subs.push(Number(column[1]));
  }

  const data_info = {
    code: code,
    subs: subs,
  };
  return data_info;
}

export default getData;
