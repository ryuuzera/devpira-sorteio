import { IconContext } from 'react-icons';
import { LuImagePlus } from 'react-icons/lu';

const iconMap = {
  fileUpload: <LuImagePlus />,
};

export const Icon = ({ name, style }: { name: string; style: Record<string, any> }) => {
  return <IconContext.Provider value={{ style: style }}>{iconMap[name]}</IconContext.Provider>;
};
