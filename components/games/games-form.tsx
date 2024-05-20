"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { GameSchema } from "@/schemas";
import {useForm} from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function GamesForm() {
  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
        name: "",
        image: "",
        typeId: 1,
        providerId: 1,
        releaseDate: new Date(),
        createDate: new Date(),
        updateDate: new Date()
    }
  })  


  const onSubmit = (values: z.infer<typeof GameSchema>) => {
    console.log("test")
    console.log(values)
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>

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

                    <FormField 
                        control={form.control}
                        name="image"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="picture">Image</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        id="picture"
                                        type="file"
                                        accept=".jpg,.png,.jpeg"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="typeId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
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
