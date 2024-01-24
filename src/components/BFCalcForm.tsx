"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function BFCalcForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="entire-wrap flex justify-center align-middle">
    <div className="form-wrap flex flex-col justify-center align-middle">
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Gender" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Male</SelectItem>
    <SelectItem value="dark">Female</SelectItem>
  </SelectContent>
</Select>
      <p>Enter Height In Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Height" {...field} className="max-w-28"/>
              </FormControl>
              <Button type="submit" className="bg-rose-600 ml-2">Submit</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p>Enter Weight In Pounds lbs</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Weight" {...field} className="max-w-28"/>
              </FormControl>
              <Button type="submit" className="bg-rose-600 ml-2">Submit</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p>Enter Neck Circumference Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Neck" {...field} className="max-w-28"/>
              </FormControl>
              <Button type="submit" className="bg-rose-600 ml-2">Submit</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
    <p>Enter Waist Circumference Inches</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex">
              {/* <FormLabel className="mr-2 pt-3">Height</FormLabel> */}
              <FormControl>
                <Input placeholder="Enter Waist" {...field} className="max-w-28"/>
              </FormControl>
              <Button type="submit" className="bg-rose-600 ml-2">Submit</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
    </div>
  )
}
