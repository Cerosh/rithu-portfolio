export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-paper-raised px-6 py-10 text-center">
      <p className="text-body text-ink-faint">{message}</p>
    </div>
  );
}
