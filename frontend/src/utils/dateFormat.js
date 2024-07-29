export const dateFormat = (originalTimestamp) => {

  const date = new Date(originalTimestamp);
  
  // Function to pad numbers with leading zeros
  const pad = (num) => {
    return num.toString().padStart(2, '0');
  };
  
  // Define months in textual format
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get components of the date
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  // Construct the final formatted string
  const formattedDate = `${day} ${month}, ${year} at ${pad(formattedHours)}:${pad(minutes)} ${period}`;
  
  return formattedDate;
};

export const dateFormatNoClock = (originalTimestamp) => {

  const date = new Date(originalTimestamp);
  
  // Function to pad numbers with leading zeros
  const pad = (num) => {
    return num.toString().padStart(2, '0');
  };
  
  // Define months in textual format
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get components of the date
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  // Construct the final formatted string
  const formattedDate = `${day} ${month}, ${year}`;
  
  return formattedDate;
};

