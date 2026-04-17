function generateSlots(start, end, duration) {
  const slots = [];
  let current = start;

  while (current < end) {
    slots.push(current);
    current += duration;
  }

  return slots;
}

module.exports = generateSlots;