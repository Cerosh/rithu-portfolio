import { Container } from "@/components/common/Container";

// Deliberately minimal: a minor's site shouldn't surface an address, phone
// number, school name, or last name in the footer. See content/contact.json
// for the one sanctioned, parent-monitored way to get in touch.
export function Footer({ firstName }: { firstName: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-2 text-center text-small text-ink-faint">
        <p>
          {firstName}&rsquo;s portfolio &middot; {year}
        </p>
        <p>Still growing. Come back and see what&rsquo;s new.</p>
      </Container>
    </footer>
  );
}
