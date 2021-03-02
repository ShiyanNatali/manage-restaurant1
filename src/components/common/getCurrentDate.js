export default function getDateTime() {
    const today = new Date();
    return today.toLocaleDateString() + " " + today.toLocaleTimeString();
  }