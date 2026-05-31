export const metadata = {
  title: 'CI Failure Analyst',
  description: 'GitHub App for AI-powered CI/CD failure analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
Refinement 58: Refining variable names for clarity
Refinement 72: Improving code documentation
