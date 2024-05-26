"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameSchema } from "@/schemas";
import {useForm} from "react-hook-form";
import {  useEffect, useState, useTransition } from "react";
import { useImgStore } from "@/store/zustand";
import { createGame, fetchTypes, fetchProviders } from "@/actions/game";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { useToast } from "@/components/ui/use-toast";

import { DatePicker } from "@/components/custom/date-picker";
import { validateProviderId, validateReleaseDate, validateTypeId } from "./games-utils";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Type } from "@prisma/client";
import { cn } from "@/lib/utils";

interface AddGameDialogProps {
    onGameAdded: () => void;
    open: boolean,
    setOpen: (arg0: boolean) => void,
    game: object
  }

export function GamesForm(props: AddGameDialogProps) {
    const { imageFile } = useImgStore();
    const { toast } = useToast();

    // form state
    //const [open, setOpen] = useState(false) 
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    // data fields state  
    const [types, setTypes] = useState<Type[] | null>(null);
    const [typeId, setTypeId] = useState("");
    const [providers, setProviders] = useState<Type[] | null>(null);
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

        if(imageFile) {
            values.image = imageFile
        }
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
                    if(data.success) {
                        props.onGameAdded();
                    }
                    toast({
                        description: (data.success || data.error),
                        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4')
                      })
                      props.setOpen(false)
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
        if(props.open === false) {
            setProviderId("");
            setReleaseDate(null);
            setTypeId("");
            setError("");
            setErrorProvider("");
            setErrorRelDate("");
            form.reset();
        }
    }, [props.open, form]);


    useEffect(() => {
        startTransition(() => {
            fetchTypes()
            .then((data) => {
                setTypes(data)
            })

            fetchProviders()
            .then((data) => {
                setProviders(data)
            })
        });
    },[]);    

    useEffect(() => {
        console.log("test999:::",props.game)
    },[props.game]);  

    

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full md:h-auto md:max-w-[680px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row md:gap-5">
            <div className="w-[230px]">
                <ImageUpload />
            </div>
            <Separator className="hidden md:visible" orientation="vertical" />      
            <div>
                <Form {...form}>
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
                                                            {types?.map((item) => {
                                                                return (
                                                                <SelectItem key={item.id} value={`${item.id}`}>
                                                                    {item.name[0].toUpperCase()+item.name.slice(1)}
                                                                </SelectItem>
                                                                )
                                                            })}                                               
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
                                                            {providers?.map((item) => {
                                                                return (
                                                                <SelectItem key={item.id} value={`${item.id}`}>
                                                                    {item.name[0].toUpperCase()+item.name.slice(1)}
                                                                </SelectItem>
                                                                )
                                                            })} 
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
                        {/* <FormError message={error} />
                        <FormSuccess message={success} /> */}

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </div>



      </DialogContent>
    </Dialog>
  )
}
