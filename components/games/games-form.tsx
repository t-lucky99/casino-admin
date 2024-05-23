"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameSchema } from "@/schemas";
import {useForm} from "react-hook-form";
import {  useEffect, useState, useRef } from "react";
import { useImgStore } from "@/store/zustand";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/image-upload";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/custom/date-picker";

import { validateProviderId, validateReleaseDate, validateTypeId } from "./games-utils";

export function GamesForm() {
  const [open, setOpen] = useState(false) 

  const [typeId, setTypeId] = useState('');
  const [error, setError] = useState('');

  const [providerId, setProviderId] = useState('');
  const [errorProvider, setErrorProvider] = useState(''); 

  const [releaseDate, setReleaseDate] = useState<Date | null>();
  const [errorRelDate, setErrorRelDate] = useState('');
 
  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
        name: "",
        image: "",
        typeId: "1",
        providerId: "1",
        releaseDate: new Date(),
        createDate: new Date(),
        updateDate: new Date()
    }
  })  

  const onSubmit = (values: z.infer<typeof GameSchema>) => {
    console.log("test")
    console.log("form vals:::",values)

    const validTypeMsg = validateTypeId(typeId);
    setError(validTypeMsg);

    const validProviderMsg = validateProviderId(providerId);
    setErrorProvider(validProviderMsg);

    const validDateMsg = validateReleaseDate(releaseDate as Date);
    setErrorRelDate(validDateMsg);
  }

  const handleChangeProviderId = (value: string) => {
    setProviderId(value);
    const validProviderMsg = validateProviderId(value);
    setErrorProvider(validProviderMsg)
  };

  const handleChangeTypeId = (value: string) => {
    setTypeId(value);
    const validTypeMsg = validateTypeId(value);
    setError(validTypeMsg);
  };

  const handleDateChange = (releaseDate: Date) => {
    setReleaseDate(releaseDate);
  };


    useEffect(() => {
        console.log("open:::", open)
        if(open === false) {
            setProviderId('');
            setReleaseDate(null);
            setTypeId('');
            setError('');
            setErrorProvider('');
            setErrorRelDate('');
            form.setValue('name', '');
        }

    }, [open, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>

        <Form {...form}>
            {/* <ImageUpload /> */}
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        placeholder="Game Name"
                                    />
                                </FormControl>
                                <FormMessage />                                    
                            </FormItem>
                        )}
                    />
                   
                    <div className="grid grid-cols-2 gap-4">
                        <FormField 
                            control={form.control}
                            name="typeId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select value={typeId} onValueChange={handleChangeTypeId}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select game type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="1">Slot</SelectItem>
                                                <SelectItem value="2">Poker</SelectItem>
                                                <SelectItem value="3">Roulette</SelectItem>
                                                <SelectItem value="4">Blackjack</SelectItem>
                                                <SelectItem value="5">Baccarat</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField 
                            control={form.control}
                            name="providerId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Provider</FormLabel>
                                    <FormControl>
                                        <Select value={providerId} onValueChange={handleChangeProviderId}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select provider" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="1">Pragmatic Play</SelectItem>
                                                <SelectItem value="2">Evo Play</SelectItem>
                                                <SelectItem value="3">Play N Go</SelectItem>
                                                <SelectItem value="4">Golden Hero</SelectItem>
                                                <SelectItem value="5">Playson</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    {errorProvider && <p style={{ color: 'red' }}>{errorProvider}</p>}
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField 
                        control={form.control}
                        name="releaseDate"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Date of Release</FormLabel>
                                <FormControl>
					                <DatePicker handleDateChange={handleDateChange} />
                                </FormControl>
                                {errorRelDate && <p style={{ color: 'red' }}>{errorRelDate}</p>}                                    
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
