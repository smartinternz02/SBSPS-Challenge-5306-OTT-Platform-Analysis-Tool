// Function to create a small array of monotonous colors
export const pieColors = (Highcharts, base, n) => {
  let colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(
      Highcharts.color(base)
        .brighten((i - 3) / 7)
        .get()
    );
  }

  return colors;
};

// Function to create a large array of monotonous colors
export const pieColors2 = (Highcharts, base, n) => {
  let colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(
      Highcharts.color(base)
        .brighten((i - 15) / 25)
        .get()
    );
  }

  return colors;
};

// Functions to create different type of structures to be feed in different charts

// For Pie Charts
export const dataSeperator = (arr1, arr2) => {
  const data = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] !== 0) {
      data.push({ name: arr1[i], y: arr2[i] });
    }
  }
  return data;
};

// For Map Charts
export const dataSeperator5 = (arr1, arr2) => {
  const data = [];
  for (let i = 0; i < arr1.length; i++) {
    data.push({ code: arr1[i].toUpperCase(), value: arr2[i] });
  }
  return data;
};

// For Bubble Charts
export const dataSeperator3 = (arr1, arr2) => {
  const data = [];
  for (let i = 0; i < arr1.length; i++) {
    data.push({ name: arr1[i], value: arr2[i] });
  }
  return data;
};

// For Heatmap/Tree Charts
export const dataSeperator4 = (arr1, arr2, limiter) => {
  let data = [];
  let other = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] > limiter) {
      data.push({ name: arr1[i], value: arr2[i], id: `id_${i}` });
    } else {
      other += arr2[i];
      data.push({
        parent: `id_${arr1.length}`,
        name: arr1[i],
        value: arr2[i],
        id: `id_${arr1.length}_${i}`,
      });
    }
  }
  data.push({ name: "Others", value: other, id: `id_${arr1.length}` });
  data = data.sort((a, b) => a.value - b.value);
  data = data.map((el, idx) => {
    el.colorValue = idx;
    return el;
  });
  return data;
};

// For 3D Pie Charts
export const dataSeperator2 = (arr1, arr2) => {
  const data = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] !== 0) {
      data.push([arr1[i], arr2[i]]);
    }
  }
  return data;
};

// Function to introduce delay in a sub routine
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
