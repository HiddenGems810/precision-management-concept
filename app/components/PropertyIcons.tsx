// Property Operations Icon System
// Precision Management — Phase 2C
// Monoline, geometric, 24×24 base grid. Stroke-only, no fills.

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
}

const base = { viewBox: "0 0 24 24", fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function IconLeasing({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Leasing"} role="img">
      {title && <title>{title}</title>}
      <path d="M3 9l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <polyline points="9 22 9 12 15 12 15 22" />
      <circle cx="16.5" cy="7.5" r="1.5" />
      <path d="M16.5 7.5 V6 l1.5 1.5" />
    </svg>
  );
}

export function IconMaintenance({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Maintenance"} role="img">
      {title && <title>{title}</title>}
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
    </svg>
  );
}

export function IconResidentPortal({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Resident Portal"} role="img">
      {title && <title>{title}</title>}
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 14a4.5 4.5 0 0 1 9 0" />
    </svg>
  );
}

export function IconPhone({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Phone"} role="img">
      {title && <title>{title}</title>}
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.5 19.79 19.79 0 0 1 .97 2.82 2 2 0 0 1 2.95 .64h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.37a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.37 15.5" transform="translate(1 1)" />
    </svg>
  );
}

export function IconEmail({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Email"} role="img">
      {title && <title>{title}</title>}
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8l10 6 10-6" />
    </svg>
  );
}

export function IconApplication({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Application"} role="img">
      {title && <title>{title}</title>}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function IconMoveIn({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Move-In"} role="img">
      {title && <title>{title}</title>}
      <path d="M13 4h7v16H4v-7" />
      <path d="M10 8H3" />
      <path d="M6 4l-4 4 4 4" />
      <path d="M13 9v6" />
    </svg>
  );
}

export function IconRenewal({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Renewal"} role="img">
      {title && <title>{title}</title>}
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export function IconParking({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Parking"} role="img">
      {title && <title>{title}</title>}
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M8 6h5a3 3 0 0 1 0 6H8z" />
      <path d="M8 12v6" />
    </svg>
  );
}

export function IconLaundry({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Laundry"} role="img">
      {title && <title>{title}</title>}
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth={2} />
      <line x1="9" y1="6" x2="9.01" y2="6" strokeWidth={2} />
      <path d="M9.5 11a2.5 2.5 0 0 1 2.5 2" />
    </svg>
  );
}

export function IconUtilities({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Utilities"} role="img">
      {title && <title>{title}</title>}
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function IconPackageRoom({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Package Room"} role="img">
      {title && <title>{title}</title>}
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

export function IconPetPolicy({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Pet Policy"} role="img">
      {title && <title>{title}</title>}
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2.112-3.5 4 0 .828.336 1.107.5 1.5.288.692.5 1.5.5 2.5a7 7 0 0 0 7 7 7 7 0 0 0 7-7c0-1-.212-1.808-.5-2.5.164-.393.5-.672.5-1.5 0-1.888-1.5-3.664-3.5-4-1.923-.321-3.5.782-3.5 2.172" />
      <path d="M14.5 3C16.423 2.679 18 3.782 18 5.172" />
      <path d="M9 12h6" />
    </svg>
  );
}

export function IconOfficeHours({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Office Hours"} role="img">
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IconEmergencyMaintenance({ size = 24, color = "currentColor", className, title }: IconProps) {
  return (
    <svg width={size} height={size} {...base} stroke={color} strokeWidth={1.5} className={className} aria-label={title ?? "Emergency Maintenance"} role="img">
      {title && <title>{title}</title>}
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.77-2.77a6 6 0 0 1-7.94 7.94l-5.91 5.91a2.12 2.12 0 0 1-3-3l5.91-5.91a6 6 0 0 1 7.94-7.94z" />
      <line x1="21" y1="3" x2="21" y2="3.01" strokeWidth={2.5} />
      <line x1="21" y1="7" x2="21" y2="9" />
    </svg>
  );
}

// All icons as a collection for the icon system preview page
export const ALL_ICONS = [
  { name: "Leasing", Component: IconLeasing },
  { name: "Maintenance", Component: IconMaintenance },
  { name: "Resident Portal", Component: IconResidentPortal },
  { name: "Phone", Component: IconPhone },
  { name: "Email", Component: IconEmail },
  { name: "Application", Component: IconApplication },
  { name: "Move-In", Component: IconMoveIn },
  { name: "Renewal", Component: IconRenewal },
  { name: "Parking", Component: IconParking },
  { name: "Laundry", Component: IconLaundry },
  { name: "Utilities", Component: IconUtilities },
  { name: "Package Room", Component: IconPackageRoom },
  { name: "Pet Policy", Component: IconPetPolicy },
  { name: "Office Hours", Component: IconOfficeHours },
  { name: "Emergency Maintenance", Component: IconEmergencyMaintenance },
] as const;
