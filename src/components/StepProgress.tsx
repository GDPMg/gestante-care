export default function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 flex-1 rounded-full ${index < step ? 'bg-brand-green' : 'bg-brand-border'}`}
        />
      ))}
    </div>
  )
}
