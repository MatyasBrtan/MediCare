import { MedicalRecord } from "@/pages/Index";
import { Activity, Pill, Hotel, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineItemProps {
  record: MedicalRecord;
}

const typeConfig = {
  operation: {
    icon: Activity,
    label: "Operace",
    color: "bg-primary",
    badgeVariant: "default" as const
  },
  medication: {
    icon: Pill,
    label: "Lék",
    color: "bg-accent",
    badgeVariant: "secondary" as const
  },
  rehabilitation: {
    icon: Hotel,
    label: "Rehabilitace",
    color: "bg-medical-success",
    badgeVariant: "outline" as const
  },
  document: {
    icon: FileText,
    label: "Dokument",
    color: "bg-muted-foreground",
    badgeVariant: "outline" as const
  }
};

export const TimelineItem = ({ record }: TimelineItemProps) => {
  const config = typeConfig[record.type];
  const Icon = config.icon;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className={`absolute -left-[2.15rem] top-6 w-6 h-6 rounded-full ${config.color} flex items-center justify-center shadow-md`}>
        <Icon className="h-3 w-3 text-white" />
      </div>

      {/* Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={config.badgeVariant}>{config.label}</Badge>
              </div>
              <CardTitle className="text-lg">{record.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{formatDate(record.date)}</p>
            </div>
          </div>
        </CardHeader>
        
        {(record.description || record.details) && (
          <CardContent className="pt-0">
            {record.description && (
              <p className="text-sm text-muted-foreground mb-3">{record.description}</p>
            )}
            
            {record.details && (
              <div className="space-y-1">
                {Object.entries(record.details).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium">{key}: </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};
