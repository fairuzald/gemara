// Local Storage Load Data
function loadData(key: string) {
  if (typeof window !== 'undefined') {
    const dataString = localStorage.getItem(key);

    if (dataString === null || dataString === undefined) {
      return null;
    }

    try {
      const data = JSON.parse(dataString);
      return data;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  } else {
    return null;
  }
}

// Local Storage Save Data
function saveData(key: string, data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`${key}`, JSON.stringify(data));
  }
}

// Local Storage Delete Data
function deleteData(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

export { loadData, saveData, deleteData };
