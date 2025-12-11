import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, className, delay = 0 }: StatCardProps) {
  return (
    <div 
      className={cn("stat-card animate-slide-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-display font-bold mt-2 text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs semana passada
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl pointer-events-none" />
    </div>
  );
}
