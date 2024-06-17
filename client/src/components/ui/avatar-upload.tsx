'use client';
import { Icon } from '../icons';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Input } from './input';

const AvatarUploader = (props: any) => {
  return (
    <>
      <label htmlFor='picture__input'>
        <div
          className={`flex items-center justify-center h-32 w-32  bg-slate-200 rounded-full m-1 ${
            !props.value && 'border-dashed border-slate-500 border-2'
          }`}>
          <Avatar className='cursor-pointer h-full w-full'>
            <AvatarImage
              src={
                props.value?.toString().includes('http') ? props.value : props.value && URL.createObjectURL(props.value)
              }
              alt='@shadcn'
            />
            <AvatarFallback>
              <Icon name='fileUpload' style={{ color: 'gray', fontSize: '2rem' }} />
            </AvatarFallback>
          </Avatar>
        </div>
      </label>
      <Input id='picture__input' type='file' accept='image/*' className='hidden' onChange={props.handleAvatarChange} />
    </>
  );
};

export default AvatarUploader;
