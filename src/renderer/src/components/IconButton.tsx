import { cx } from "@/utils";
import type { IconProps } from "./Icon";

export function IconButton({ icon, size = 48, className, ...props }: IconProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx('w-16 h-16 rounded-full flex justify-center items-center bg-purple-secondary/60', className)}{...props}>
        <img 
            src={icon} 
            alt="" 
            height={size} 
            width={size} 
        />
    </button>
  )
}