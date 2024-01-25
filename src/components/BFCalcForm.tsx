"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { wrap } from "module"
import '../app/form.css'

export function BFCalcForm() {

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
  
const [isDialogOpen, setIsDialogOpen] = useState(false);

 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
  
  // Open the dialog after form submission
  setIsDialogOpen(true);
}

  return (
    <div className="entire-wrap flex justify-center align-middle">
    <div className="form-wrap flex flex-col justify-center align-middle">
      <p className="mb-4 mx-auto text-lg card-head">Calculate Body Fat %</p>
      <Select>
  <SelectTrigger className="max-w-64 mb-2 selectTrigger">
    <SelectValue placeholder="Gender" />
  </SelectTrigger>
  <SelectContent className="selectContent">
    <SelectItem value="light">Male</SelectItem>
    <SelectItem value="dark">Female</SelectItem>
  </SelectContent>
</Select>
      <p className="font-bold text-sm text-center">Enter Height In Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Height In Inches" {...field} className="max-w-64 selectContent"/>
              </FormControl>
           
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p className="font-bold text-sm text-center">Enter Weight In Pounds lbs</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Weight In lbs" {...field} className="max-w-64 selectContent"/>
              </FormControl>
              
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p className="font-bold text-sm text-center">Enter Neck Circumference Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Neck In Inches" {...field} className="max-w-64 mb-4 selectContent"/>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p className="font-bold text-sm text-center">Enter Waist Circumference Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Waist In Inches" {...field} className="max-w-64 mb-4 selectContent"/>
              </FormControl>
             
            </FormItem>
          )}
        />
      </form>
    </Form>
    <Dialog>
          <DialogTrigger
          className=" calcBtn mx-auto font-extrabold text-lg"
            onClick={() => setIsDialogOpen(true)}>
            Calculate
            </DialogTrigger>
          <DialogContent className=" dialog-cont max-w-64">
              <div className="dialog-wrap">
              <h3 className="dialog-h3">Body Fat: 20% </h3>
              </div>
            <DialogClose
              onClick={() => setIsDialogOpen(false)} // Close the dialog when clicked
            >
            </DialogClose>
          </DialogContent>
        </Dialog>
    </div>
  </div>
  )
}
