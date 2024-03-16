export default function base64ToFile(base64String, filename) {
  // Remove the data URL prefix
  const base64WithoutPrefix = base64String.replace(/^data:.+;base64,/, '');

  // Convert the base64 string to a Blob
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/octet-stream' });

  // Create a file from the Blob
  const file = new File([blob], filename, { type: 'application/octet-stream' });

  return file;
}
