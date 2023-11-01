const channelValidationRules = {
  required: 'Please enter a channel',
  min: {
    value: 0,
    message: 'Please use a channel in 1 to 9999 range',
  },
  max: {
    value: 9999,
    message: 'Please use a channel in 1 to 9999 range',
  },
}

export default channelValidationRules
