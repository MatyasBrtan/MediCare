import { MedicalRecord } from "@/pages/Index";
import { TimelineItem } from "./TimelineItem";

interface TimelineViewProps {
  records: MedicalRecord[];
}

export const TimelineView = ({ records }: TimelineViewProps) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          Zatím nemáte žádné záznamy. Začněte přidáním své první události.
        </p>
      </div>
    );
  }

  // Group records by year and month
  const groupedRecords = records.reduce((acc, record) => {
    const year = record.date.getFullYear();
    const month = record.date.getMonth();
    const key = `${year}-${month}`;
    
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        records: []
      };
    }
    
    acc[key].records.push(record);
    return acc;
  }, {} as Record<string, { year: number; month: number; records: MedicalRecord[] }>);

  const sortedGroups = Object.values(groupedRecords).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const monthNames = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
    "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Časová osa</h2>
      
      {sortedGroups.map((group) => (
        <div key={`${group.year}-${group.month}`} className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground sticky top-0 bg-background py-2 z-10">
            {monthNames[group.month]} {group.year}
          </h3>
          
          <div className="relative pl-8 border-l-2 border-border space-y-6">
            {group.records.map((record, index) => (
              <TimelineItem key={record.id} record={record} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
