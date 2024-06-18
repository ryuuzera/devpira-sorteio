export function handleErrorMessage(message: string): string {
  if (/Unique constraint failed on the fields: \((`?(\w+)`?)\)/.test(message)) {
    const regex = /Unique constraint failed on the fields: \((`?(\w+)`?)\)/;
    const match = message.match(regex);

    if (match && match[2]) {
      const fieldName = match[2];
      return `The ${fieldName} is already in use. Please choose a different ${fieldName}.`;
    }
  }

  if (/Foreign key constraint failed on the field: \((`?(\w+)`?)\)/.test(message)) {
    const regex = /Foreign key constraint failed on the field: \((`?(\w+)`?)\)/;
    const match = message.match(regex);

    if (match && match[2]) {
      const fieldName = match[2];
      return `The ${fieldName} does not exist. Please provide a valid ${fieldName}.`;
    }
  }

  return `An unknown error occurred: ${message}`;
}
