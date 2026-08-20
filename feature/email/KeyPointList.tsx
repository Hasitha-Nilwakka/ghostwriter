'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { KeyPointSchema } from '@/store/email/emailConfigurationStore';
import { Dispatch, SetStateAction } from 'react';
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

interface Props {
  keyPointList : KeyPointSchema[]
  remove : (index : number) => void
  setPointInput : Dispatch<SetStateAction<string>>
}

export default function KeyPointList({keyPointList, remove, setPointInput} : Props) {
  const handleEdit = (pointText : string, index : number) => {
    setPointInput(pointText)
    remove(index)
  }
  return (
    <div className='w-full max-w-sm space-y-1 space-x-1 bg-gray-50 pl-2 py-2'>
      {keyPointList.map((item, id) => (
        <div key={id} className='space-y-1'>
          <div className='flex items-center justify-between'>
            <div>
                <h4 className='text-sm italic font-medium text-left'>{item.key_point}</h4>
            </div>
            <div className='flex gap-0.5'>
              <Button
                type='button'
                variant='outline' 
                size='icon'
                onClick={() => handleEdit(item.key_point, id)}
              >
                <RiEdit2Line/>
              </Button>
              <Button
                type='button' 
                variant='outline' 
                size='icon'
                onClick={() => remove(id)}
              >
                <RiDeleteBin6Line/>
              </Button>
            </div>
          </div>
          {id < keyPointList.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}