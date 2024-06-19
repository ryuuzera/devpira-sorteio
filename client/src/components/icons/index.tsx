import { IconContext } from 'react-icons';
import { LuImagePlus } from 'react-icons/lu';
import { IoCloseOutline } from "react-icons/io5";

const iconMap = {
  fileUpload: <LuImagePlus />,
  close: <IoCloseOutline />
};

export const Icon = ({ name, style }: { name: string; style: Record<string, any> }) => {
  return <IconContext.Provider value={{ style: style }}>{iconMap[name]}</IconContext.Provider>;
};
