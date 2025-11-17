import { format as dateFnsFormat, parseISO } from 'date-fns';

export function formatCurrency(amount) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(num);
}

export function formatNumber(num) {
  const value = typeof num === 'string' ? parseFloat(num) : num;
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatDate(date, formatStr = 'dd MMM yyyy') {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsFormat(dateObj, formatStr);
}

export function formatDateTime(date) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsFormat(dateObj, 'dd MMM yyyy, hh:mm a');
}

export function getToday() {
  return dateFnsFormat(new Date(), 'yyyy-MM-dd');
}
