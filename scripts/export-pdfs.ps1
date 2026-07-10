param([string]$BaseUrl = "http://localhost:3000")

$jobs = @(
  @{ Route = "brand-guidelines"; Output = "public/assets/exports/brand-guidelines/precision-brand-guidelines-preview.pdf" },
  @{ Route = "owner-acquisition"; Output = "public/assets/exports/owner-acquisition/owner-acquisition-one-sheet.pdf" },
  @{ Route = "resident-communication"; Output = "public/assets/exports/resident-communication/resident-maintenance-notice.pdf" },
  @{ Route = "print-collateral"; Output = "public/assets/exports/print-collateral/print-collateral-preview.pdf" },
  @{ Route = "website-ui"; Output = "public/assets/exports/website-ui/website-ui-concept.pdf" }
)

foreach ($job in $jobs) {
  npx --yes --package @playwright/cli playwright-cli open "$BaseUrl/print/$($job.Route)"
  npx --yes --package @playwright/cli playwright-cli run-code "async page => { await page.pdf({ path: '$($job.Output)', printBackground: true, preferCSSPageSize: true }); }"
}
