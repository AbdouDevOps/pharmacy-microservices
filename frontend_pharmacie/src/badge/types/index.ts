export interface BadgeProps {
  userPhoto?: string;
  rfid?: string;
  fullName?: string;
  position?: string;
  highResolution?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  companyLogo?: string;
}

export interface DownloadButtonProps {
  onClick: () => void;
  label: string;
  primary?: boolean;
  disabled?: boolean;
}

export interface BadgeTheme {
  primary: string;
  secondary: string;
}