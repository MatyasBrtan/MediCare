import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Pill, Activity, Hotel } from "lucide-react";
import { TimelineView } from "@/components/timeline/TimelineView";
import { AddRecordDialog } from "@/components/records/AddRecordDialog";

export type RecordType = "operation" | "medication" | "rehabilitation" | "document";

export interface MedicalRecord {
  id: string;
  type: RecordType;
  title: string;
  date: Date;
  description?: string;
  details?: Record<string, any>;
}

const Index = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      type: "operation",
      title: "Operace pravého kolene",
      date: new Date("2024-03-15"),
      description: "Artroskopická operace menisku",
      details: { hospital: "Nemocnice Na Homolce", doctor: "MUDr. Novák" }
    },
    {
      id: "2",
      type: "medication",
      title: "Ibuprofen 400mg",
      date: new Date("2024-03-16"),
      description: "3x denně po jídle",
      details: { duration: "14 dní", prescribedBy: "MUDr. Novák" }
    },
    {
      id: "3",
      type: "rehabilitation",
      title: "Rehabilitace kolene",
      date: new Date("2024-04-01"),
      description: "10 sezení - posilování a mobilizace",
      details: { facility: "FyzioKlinika Praha", sessions: 10 }
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<RecordType | null>(null);

  const handleAddRecord = (record: Omit<MedicalRecord, "id">) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: Math.random().toString(36).substring(7)
    };
    setRecords([...records, newRecord].sort((a, b) => b.date.getTime() - a.date.getTime()));
    setIsAddDialogOpen(false);
    setSelectedType(null);
  };

  const openAddDialog = (type: RecordType) => {
    setSelectedType(type);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Moje Zdravotní Historie</h1>
              <p className="text-muted-foreground mt-1">Přehled vaší léčby na jednom místě</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => openAddDialog("operation")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-medical-light hover:border-primary transition-all"
          >
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-semibold">Přidat operaci</span>
          </Button>
          
          <Button
            onClick={() => openAddDialog("medication")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-medical-light hover:border-primary transition-all"
          >
            <Pill className="h-6 w-6 text-primary" />
            <span className="font-semibold">Přidat lék</span>
          </Button>
          
          <Button
            onClick={() => openAddDialog("rehabilitation")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-medical-light hover:border-primary transition-all"
          >
            <Hotel className="h-6 w-6 text-primary" />
            <span className="font-semibold">Přidat rehabilitaci</span>
          </Button>
          
          <Button
            onClick={() => openAddDialog("document")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-medical-light hover:border-primary transition-all"
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-semibold">Přidat dokument</span>
          </Button>
        </div>

        {/* Timeline */}
        <TimelineView records={records} />
      </div>

      {/* Add Record Dialog */}
      <AddRecordDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        selectedType={selectedType}
        onAdd={handleAddRecord}
      />
    </div>
  );
};

export default Index;
