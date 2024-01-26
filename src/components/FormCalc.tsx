import { useState, useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from 'react-hook-form';
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
  FormProvider
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { wrap } from "module"
import '../app/form.css'

const FormCalc = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(null);

  const heightForm = useForm({
    defaultValues: {
      height: "", // Initialize with an empty string
    },
  });

  const weightForm = useForm({
    defaultValues: {
      weight: "", // Initialize with an empty string
    },
  });

  const neckCircumferenceForm = useForm({
    defaultValues: {
      neck: "", // Initialize with an empty string
    },
  });

  const waistCircumferenceForm = useForm({
    defaultValues: {
      waist: "", // Initialize with an empty string
    },
  });

  const onSubmit = (values, form) => {
    // You need to handle the form submission here
    // Calculate body fat percentage and update state accordingly
    const bodyFat = calculateBodyFatPercentage(values);
    setBodyFatPercentage(bodyFat);
    setIsDialogOpen(true);
  };
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
        <FormProvider {...heightForm}>
          <form onSubmit={heightForm.handleSubmit((values) => onSubmit(values, heightForm))} className="mb-4">
            <Controller
              control={heightForm.control}
              name="height"
              render={({ field }) => (
                <Input
                  placeholder="Enter Height In Inches"
                  {...field}
                  onChange={(e) => {
                    console.log("Height: ", e.target.value); // Log the value
                    field.onChange(e); // Pass the event to the original onChange handler
                  }}
                  className="max-w-64 selectContent"
                />
              )}
            />
          </form>
        </FormProvider>
  
        <p className="font-bold text-sm text-center">Enter Weight In Pounds lbs</p>
        <FormProvider {...weightForm}>
          <form onSubmit={weightForm.handleSubmit((values) => onSubmit(values, weightForm))} className="mb-4">
            <Controller
              control={weightForm.control}
              name="weight"
              render={({ field }) => (
                <Input
                  placeholder="Enter Weight In lbs"
                  {...field}
                  onChange={(e) => {
                    console.log("Weight: ", e.target.value); // Log the value
                    field.onChange(e); // Pass the event to the original onChange handler
                  }}
                  className="max-w-64 selectContent"
                />
              )}
            />
          </form>
        </FormProvider>
  
        <p className="font-bold text-sm text-center">Enter Neck Circumference Inches</p>
        <FormProvider {...neckCircumferenceForm}>
          <form onSubmit={neckCircumferenceForm.handleSubmit((values) => onSubmit(values, neckCircumferenceForm))} className="mb-4">
            <Controller
              control={neckCircumferenceForm.control}
              name="neck"
              render={({ field }) => (
                <Input
                  placeholder="Enter Neck Circumference Inches"
                  {...field}
                  onChange={(e) => {
                    console.log("Neck Circumference: ", e.target.value); // Log the value
                    field.onChange(e); // Pass the event to the original onChange handler
                  }}
                  className="max-w-64 selectContent"
                />
              )}
            />
          </form>
        </FormProvider>
  
        <p className="font-bold text-sm text-center">Enter Waist Circumference Inches</p>
        <FormProvider {...waistCircumferenceForm}>
          <form onSubmit={waistCircumferenceForm.handleSubmit((values) => onSubmit(values, waistCircumferenceForm))} className="mb-4">
            <Controller
              control={waistCircumferenceForm.control}
              name="waist"
              render={({ field }) => (
                <Input
                  placeholder="Enter Waist Circumference Inches"
                  {...field}
                  onChange={(e) => {
                    console.log("Waist Circumference: ", e.target.value); // Log the value
                    field.onChange(e); // Pass the event to the original onChange handler
                  }}
                  className="max-w-64 selectContent"
                />
              )}
            />
          </form>
        </FormProvider>
  
        <Dialog>
          <DialogTrigger className="calcBtn mx-auto font-extrabold text-lg" onClick={() => setIsDialogOpen(true)}>
            Calculate
          </DialogTrigger>
          <DialogContent className="dialog-cont max-w-64">
            <div className="dialog-wrap">
              <h3 className="dialog-h3">Body Fat: {bodyFatPercentage !== null ? bodyFatPercentage.toFixed(2) + '%' : ''}</h3>
            </div>
            <DialogClose onClick={() => setIsDialogOpen(false)}>Close</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
  
};

export default FormCalc;