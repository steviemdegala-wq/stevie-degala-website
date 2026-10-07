export type RefinanceInput = {
  type: 'cash-out' | 'rate-and-term'
  homeValue: number
  balance: number
  cashOut: number
  currentPayment: number
  yearsKeeping: number
}
export const REFINANCE_RATE = 0.08
export const REFINANCE_MONTHS = 360
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export function validRefinance(value: unknown): value is RefinanceInput {
  if (!value || typeof value !== 'object') return false
  const v = value as RefinanceInput
  return ['cash-out', 'rate-and-term'].includes(v.type) &&
    [v.homeValue, v.balance, v.cashOut, v.currentPayment, v.yearsKeeping].every(n => typeof n === 'number' && Number.isFinite(n)) &&
    v.homeValue > 0 && v.homeValue <= 100000000 && v.balance > 0 && v.balance <= 100000000 &&
    v.cashOut >= 0 && v.cashOut <= 100000000 && (v.type !== 'cash-out' || v.cashOut > 0) &&
    v.currentPayment > 0 && v.currentPayment <= 1000000 && v.yearsKeeping > 0 && v.yearsKeeping <= 30
}

export function calculateRefinance(input: RefinanceInput) {
  const cashOut = input.type === 'cash-out' ? input.cashOut : 0
  // Origination is 2% of the FINAL loan, including financed closing costs.
  const loanAmount = (input.balance + cashOut + 3500) / 0.98
  const origination = loanAmount * 0.02
  const closingCosts = origination + 3500
  const monthlyRate = REFINANCE_RATE / 12
  const payment = loanAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -REFINANCE_MONTHS))
  const monthlySavings = input.currentPayment - payment
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : null
  const ltv = loanAmount / input.homeValue
  const cashAvailableAt75 = Math.max(0, input.homeValue * 0.75 * 0.98 - input.balance - 3500)
  const exceedsGuideline = ltv > 0.75000001
  const title = input.type === 'cash-out'
    ? exceedsGuideline ? 'This cash-out plan needs a closer look.' : 'Does the cash justify the added debt?'
    : monthlySavings <= 0 ? 'Most likely not worth it for payment savings.'
      : breakEvenMonths! > input.yearsKeeping * 12 ? 'Most likely not worth it over your planned timeline.'
      : 'Potentially worth a closer look.'
  const points = [
    monthlySavings > 0 ? `Estimated principal-and-interest payment is ${money(monthlySavings)} lower per month.` : monthlySavings < 0 ? `Estimated principal-and-interest payment is ${money(-monthlySavings)} higher per month.` : 'There is no estimated monthly payment reduction.',
    input.type === 'cash-out' ? `You receive approximately ${money(cashOut)} in cash, while your mortgage debt increases by ${money(loanAmount - input.balance)}, including costs. Cash received is borrowed money, not savings.` : `Estimated closing costs of ${money(closingCosts)} are added to your mortgage balance.`,
    ...(input.type === 'rate-and-term' ? [breakEvenMonths ? `Simple payment break-even is ${breakEvenMonths} months, compared with ${Math.round(input.yearsKeeping * 12)} months you expect to keep this loan.` : 'Closing costs cannot be recovered through monthly payment savings in this example.'] : ['Compare the purpose of the cash, added payment, and alternatives such as a HELOC before deciding.']),
    ...(input.type === 'cash-out' && exceedsGuideline ? ['The total new loan exceeds the 75% planning guideline. Financing may be difficult; this is a review flag, not an automatic denial.'] : []),
    'A new 30-year term can increase total interest and extend repayment. A lower payment is not proof of overall savings.',
  ]
  return { loanAmount, origination, closingCosts, payment, monthlySavings, breakEvenMonths, ltv, cashAvailableAt75, exceedsGuideline, cashOut, title, points }
}
