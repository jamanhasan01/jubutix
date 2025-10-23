import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { optionsSectionDialogProps } from '@/types/options.sectoin.dialog.type'

import { useState } from 'react'

export function OptionsSectionDialog({
  level,
  items,
  title,
  desc,
  getValue,
}: optionsSectionDialogProps) {
  const [showDialog, setshowDialog] = useState(false)
  const [valueOfSelect, setvalueOfSelect] = useState('user')

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getValue(valueOfSelect)
    setshowDialog(false)
  }

  return (
    <Dialog open={showDialog} onOpenChange={setshowDialog}>
      <DialogTrigger asChild>
        <button className='text-sm px-2 pointer'>Change Role</button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px] '>
        <form onSubmit={handleLocalSubmit} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          <div>
            <Select
              value={valueOfSelect}
              onValueChange={setvalueOfSelect}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{level}</SelectLabel>
                  {items.map((v, i) => (
                    <SelectItem key={i} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>

            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}