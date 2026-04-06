export interface IconProps {
    icon: string;
    size?: number;
}

export function Icon({ icon, size = 32, ...props }: IconProps & React.HTMLAttributes<HTMLImageElement>) {
  return (
    <img src={icon} alt="" height={size} width={size} {...props} />
  )
}
