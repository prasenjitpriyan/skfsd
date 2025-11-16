import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('card-body', className)} {...props}>
      {children}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBgColor,
  iconHoverBg,
  className,
}) {
  return (
    <div
      className={cn('feature-card card group hover:shadow-indigo', className)}>
      <CardBody>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
            iconBgColor,
            iconHoverBg
          )}>
          <Icon className={cn('w-6 h-6 transition-colors', iconColor)} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardBody>
    </div>
  );
}

export function StatsCard({ value, label, valueColor, className }) {
  return (
    <div
      className={cn(
        'stats-item card card-body text-center bg-white/80 backdrop-blur',
        className
      )}>
      <div className={cn('text-3xl font-bold', valueColor)}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
