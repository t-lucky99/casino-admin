"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameSchema } from "@/schemas";
import {useForm} from "react-hook-form";
import {  useEffect, useState, useTransition } from "react";
import { useImgStore } from "@/store/zustand";
import { createGame } from "@/actions/game";

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
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export function GamesForm() {
    // form state
    const [open, setOpen] = useState(false) 
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    // data fields state  
    const [typeId, setTypeId] = useState("");
    const [errorType, setErrorType] = useState("");
    const [providerId, setProviderId] = useState("");
    const [errorProvider, setErrorProvider] = useState(""); 
    const [releaseDate, setReleaseDate] = useState<Date | null>();
    const [errorRelDate, setErrorRelDate] = useState("");
 
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
        setError("");
        setSuccess("");

        //console.log("form vals:::",values)

        const validTypeMsg = validateTypeId(typeId);
        setErrorType(validTypeMsg);

        const validProviderMsg = validateProviderId(providerId);
        setErrorProvider(validProviderMsg);

        const validDateMsg = validateReleaseDate(releaseDate as Date);
        setErrorRelDate(validDateMsg);

        if(validTypeMsg || validProviderMsg || validDateMsg) {
            console.log("do not submit")
        } else {
            console.log("proceed to submit")
            startTransition(() => {
                createGame(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
            });
        }
    }

    const handleChangeProviderId = (value: string) => {
        setProviderId(value);
        form.setValue('providerId', value);
        const validProviderMsg = validateProviderId(value);
        setErrorProvider(validProviderMsg)
    };

    const handleChangeTypeId = (value: string) => {
        setTypeId(value);
        form.setValue('typeId', value);
        const validTypeMsg = validateTypeId(value);
        setErrorType(validTypeMsg);
    };

    const handleDateChange = (releaseDate: Date) => {
        setReleaseDate(releaseDate);
        form.setValue('releaseDate', releaseDate);
    };

    useEffect(() => {
        if(open === false) {
            setProviderId("");
            setReleaseDate(null);
            setTypeId("");
            setError("");
            setErrorProvider("");
            setErrorRelDate("");
            form.reset();
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
                                        <Select onValueChange={handleChangeTypeId}>
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
                                    {errorType && <p style={{ color: 'red' }}>{errorType}</p>}
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
                                        <Select onValueChange={handleChangeProviderId}>
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
                <FormError message={error} />
                <FormSuccess message={success} />

                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
