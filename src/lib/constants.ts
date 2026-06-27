export const CURRENCIES = {
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺', region: 'europe' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧', region: 'europe' },
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸', region: 'americas' },
  NGN: { symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', region: 'africa' },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', region: 'africa' },
  GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭', region: 'africa' },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling', flag: '🇹🇿', region: 'africa' },
  UGX: { symbol: 'USh', name: 'Ugandan Shilling', flag: '🇺🇬', region: 'africa' },
  ZAR: { symbol: 'R', name: 'South African Rand', flag: '🇿🇦', region: 'africa' },
  XOF: { symbol: 'CFA', name: 'West African CFA Franc', flag: '🌍', region: 'africa' },
  XAF: { symbol: 'FCFA', name: 'Central African CFA Franc', flag: '🌍', region: 'africa' },
  MAD: { symbol: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦', region: 'africa' },
  ETB: { symbol: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹', region: 'africa' },
  ZMW: { symbol: 'ZK', name: 'Zambian Kwacha', flag: '🇿🇲', region: 'africa' },
} as const

export type CurrencyCode = keyof typeof CURRENCIES

export const COUNTRIES = {
  GB: { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', region: 'europe' },
  EU: { name: 'European Union', flag: '🇪🇺', currency: 'EUR', region: 'europe' },
  DE: { name: 'Germany', flag: '🇩🇪', currency: 'EUR', region: 'europe' },
  FR: { name: 'France', flag: '🇫🇷', currency: 'EUR', region: 'europe' },
  BE: { name: 'Belgium', flag: '🇧🇪', currency: 'EUR', region: 'europe' },
  NL: { name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', region: 'europe' },
  ES: { name: 'Spain', flag: '🇪🇸', currency: 'EUR', region: 'europe' },
  IT: { name: 'Italy', flag: '🇮🇹', currency: 'EUR', region: 'europe' },
  US: { name: 'United States', flag: '🇺🇸', currency: 'USD', region: 'americas' },
  NG: { name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', region: 'africa' },
  KE: { name: 'Kenya', flag: '🇰🇪', currency: 'KES', region: 'africa' },
  GH: { name: 'Ghana', flag: '🇬🇭', currency: 'GHS', region: 'africa' },
  TZ: { name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', region: 'africa' },
  UG: { name: 'Uganda', flag: '🇺🇬', currency: 'UGX', region: 'africa' },
  ZA: { name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', region: 'africa' },
  SN: { name: 'Senegal', flag: '🇸🇳', currency: 'XOF', region: 'africa' },
  CI: { name: 'Côte d\'Ivoire', flag: '🇨🇮', currency: 'XOF', region: 'africa' },
  CM: { name: 'Cameroon', flag: '🇨🇲', currency: 'XAF', region: 'africa' },
  MA: { name: 'Morocco', flag: '🇲🇦', currency: 'MAD', region: 'africa' },
  ET: { name: 'Ethiopia', flag: '🇪🇹', currency: 'ETB', region: 'africa' },
  ZM: { name: 'Zambia', flag: '🇿🇲', currency: 'ZMW', region: 'africa' },
} as const

export type CountryCode = keyof typeof COUNTRIES

export const MOBILE_PROVIDERS: Record<string, { name: string; logo: string; countries: string[] }> = {
  mtn: { name: 'MTN Mobile Money', logo: '🟡', countries: ['NG', 'GH', 'CM', 'UG', 'ZA', 'ZM', 'CI', 'SN'] },
  mpesa: { name: 'M-Pesa', logo: '🟢', countries: ['KE', 'TZ', 'GH'] },
  airtel: { name: 'Airtel Money', logo: '🔴', countries: ['NG', 'KE', 'GH', 'UG', 'ZM', 'TZ', 'CM'] },
  orange: { name: 'Orange Money', logo: '🟠', countries: ['SN', 'CI', 'CM', 'MA'] },
  wave: { name: 'Wave', logo: '🔵', countries: ['SN', 'CI'] },
  vodafone: { name: 'Vodafone Cash', logo: '🔴', countries: ['GH'] },
  tigo: { name: 'Tigo Cash', logo: '🔵', countries: ['TZ', 'GH'] },
}

export const PAYMENT_METHODS = {
  card: { name: 'Debit/Credit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
  bank_transfer: { name: 'Bank Transfer', icon: '🏦', description: 'SEPA, SWIFT, Faster Payments' },
  bancontact: { name: 'Bancontact', icon: '🇧🇪', description: 'Belgian bank payment' },
  ideal: { name: 'iDEAL', icon: '🇳🇱', description: 'Dutch bank payment' },
  sepa: { name: 'SEPA Direct Debit', icon: '🇪🇺', description: 'EU bank debit' },
} as const

export const DELIVERY_METHODS = {
  bank: { name: 'Bank Deposit', icon: '🏦', description: 'Direct to bank account' },
  mobile_money: { name: 'Mobile Money', icon: '📱', description: 'MTN, M-Pesa, Airtel & more' },
  cash: { name: 'Cash Pickup', icon: '💵', description: 'Collect at agent location' },
} as const

export const KYC_LIMITS = {
  0: { daily: 0, monthly: 0, label: 'Unverified' },
  1: { daily: 500, monthly: 2000, label: 'Basic Verified' },
  2: { daily: 5000, monthly: 25000, label: 'ID Verified' },
  3: { daily: 50000, monthly: 500000, label: 'Full KYC' },
} as const

export const TRANSACTION_STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50' },
  processing: { label: 'Processing', color: 'text-blue-700', bg: 'bg-blue-50' },
  completed: { label: 'Completed', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  failed: { label: 'Failed', color: 'text-red-700', bg: 'bg-red-50' },
  cancelled: { label: 'Cancelled', color: 'text-gray-700', bg: 'bg-gray-100' },
}
