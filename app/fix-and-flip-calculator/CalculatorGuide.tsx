import Link from 'next/link'

export default function CalculatorGuide() {
  return <section aria-labelledby="calculator-guide" className="mt-14 border-t border-[#d4d0ca] pt-8 text-sm leading-7 text-[#55514d]">
    <h2 id="calculator-guide" className="font-serif text-2xl leading-tight text-[#090909]">How to use this fix-and-flip calculator</h2>
    <p className="mt-4">Start with the purchase price, renovation budget, estimated after-repair value (ARV), and the time you expect to own the property. Add monthly holding costs such as taxes, insurance, utilities, and maintenance. Use a supported resale estimate and a realistic renovation scope rather than the best possible outcome.</p>
    <p className="mt-4">The tool estimates profit, cash needed, and preliminary financing structures. You can preview the project before entering contact details; an email address unlocks the complete estimate. A property address is collected later if you request a conditional project letter.</p>
    <div className="mt-6 space-y-2">
      <details className="rounded-xl border border-[#d4d0ca] bg-white p-4">
        <summary className="cursor-pointer font-semibold text-[#090909]">What costs are included?</summary>
        <p className="mt-3">The model combines purchase and renovation costs, your monthly holding costs, estimated interest, modeled lender fees, estimated appraisal and title charges, and selling costs equal to 3% of the resale value. Selling costs are an assumption, not a quote; actual commissions, concessions, transfer charges, and other expenses may be higher. Income taxes and unexpected costs you have not entered are excluded.</p>
        <p className="mt-3">Interest assumes the full modeled loan is outstanding. Renovation draws can change actual interest. Modeled interest is capped at the loan term; projects that run longer require a separate review of extension costs or replacement financing. Avoid counting modeled loan interest again in your monthly holding-cost entry.</p>
      </details>
      <details className="rounded-xl border border-[#d4d0ca] bg-white p-4">
        <summary className="cursor-pointer font-semibold text-[#090909]">How is projected flip profit calculated?</summary>
        <p className="mt-3">Estimated resale proceeds minus purchase price, renovation, holding costs, financing, and selling costs equals projected profit. Return on contributed cash compares that profit with the estimated cash you invest; it is not an annual return or a guaranteed result.</p>
        <p className="mt-3"><strong className="text-[#090909]">Hypothetical example:</strong> A $450,000 resale minus a $300,000 purchase, $60,000 renovation, $6,000 of non-financing holding costs, and $13,500 of selling costs leaves $70,500 <strong>before financing costs, taxes, and any other unmodeled expenses</strong>. The calculator then accounts for the financing structure it models. This example is not an actual closing or a loan quote.</p>
      </details>
      <details className="rounded-xl border border-[#d4d0ca] bg-white p-4">
        <summary className="cursor-pointer font-semibold text-[#090909]">How much cash will I need?</summary>
        <p className="mt-3">Cash needed depends on the purchase advance, renovation funding, closing fees, reserves, and draw timing. A loan that covers part of a renovation may still require cash to pay contractors before reimbursement. The estimate is a planning starting point; discuss cash reserves and the draw process before committing to a purchase.</p>
      </details>
      <details className="rounded-xl border border-[#d4d0ca] bg-white p-4">
        <summary className="cursor-pointer font-semibold text-[#090909]">Can I use it for a Colorado or Texas investment property?</summary>
        <p className="mt-3">Stevie de Gala is based in Timnath and serves Northern Colorado investors, including Fort Collins, Windsor, Loveland, Greeley, and Severance, with Colorado and Texas mortgage licensing. The calculator is an early planning tool; property location, borrower experience, credit, appraisal, and current lender rules affect actual availability. An estimate or conditional letter is not a loan approval or commitment to lend.</p>
      </details>
    </div>
    <p className="mt-6">Planning a renovation? Explore <Link href="/loans/private-hard-money" className="underline underline-offset-4">hard money and private money financing</Link>. Keeping the property as a rental? Review <Link href="/loans/dscr" className="underline underline-offset-4">DSCR loan options</Link>. For a specific project, <Link href="/contact" className="underline underline-offset-4">request a deal review with Stevie</Link>.</p>
  </section>
}
