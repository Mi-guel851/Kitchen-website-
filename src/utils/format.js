/**
 * Format currency in Nigerian Naira (₦)
 * Example: formatPrice(4800) -> "₦4,800"
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number') return '₦0';
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Format phone number
 */
export function formatPhone(phone) {
  return phone;
}
