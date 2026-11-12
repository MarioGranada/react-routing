function isValidText(value, maxLength = 2000) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isValidDate(value) {
  return typeof value === 'string' && value.length <= 30 && !Number.isNaN(new Date(value).getTime());
}

function isValidImageUrl(value) {
  return typeof value === 'string' && value.length <= 2000 && /^https?:\/\//.test(value);
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
