"use client"
import { useState, useEffect } from "react"
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
const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);

// Create separate form objects for each input field
const heightForm = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  },
});

const weightForm = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  }
});

const neckCircumferenceForm = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  },
});

const waistCircumferenceForm = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: "",
  },
});

// ... Existing code ...

function onSubmit(values: z.infer<typeof formSchema>, form: any) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);

  const userInputs: BodyFatInputsUS = {
    height: parseFloat(values.height), // Convert height to a number
    weight: parseFloat(values.weight), // Convert weight to a number
    waistCircumference: parseFloat(values.waistCircumference), // Convert waistCircumference to a number
    neckCircumference: parseFloat(values.neckCircumference), // Convert neckCircumference to a number
    gender: values.gender,
  };

  const calculatedBodyFatPercentage = calculateBodyFatPercentageUS(userInputs);

  setBodyFatPercentage(calculatedBodyFatPercentage);

  // Open the dialog after form submission
  setIsDialogOpen(true);

  form.reset();
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
      <Form {...heightForm}>
          <form onSubmit={heightForm.handleSubmit((values) => onSubmit(values, heightForm))} className="mb-4">
            <FormField
              control={heightForm.control}
              name="height"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Input placeholder="Enter Height In Inches" {...field} className="max-w-64 selectContent" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
    <p className="font-bold text-sm text-center">Enter Weight In Pounds lbs</p>
    <Form {...weightForm}>
          <form onSubmit={weightForm.handleSubmit((values) => onSubmit(values, weightForm))} className="mb-4">
            <FormField
              control={weightForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Input placeholder="Enter Weight In lbs" {...field} className="max-w-64 selectContent" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
    <p className="font-bold text-sm text-center">Enter Neck Circumference Inches</p>
    <Form {...neckCircumferenceForm}>
          <form onSubmit={neckCircumferenceForm.handleSubmit((values) => onSubmit(values, weightForm))} className="mb-4">
            <FormField
              control={neckCircumferenceForm.control}
              name="neck form"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Input placeholder="Enter Neck Circumference Inches" {...field} className="max-w-64 selectContent" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
    <p className="font-bold text-sm text-center">Enter Waist Circumference Inches</p>
    <Form {...waistCircumferenceForm}>
          <form onSubmit={waistCircumferenceForm.handleSubmit((values) => onSubmit(values, weightForm))} className="mb-4">
            <FormField
              control={waistCircumferenceForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Input placeholder="Enter Waist Circumference Inches" {...field} className="max-w-64 selectContent" />
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
              <h3 className="dialog-h3">
                Body Fat: {bodyFatPercentage !== null ? bodyFatPercentage.toFixed(2) + '%' : ''}
              </h3>
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
