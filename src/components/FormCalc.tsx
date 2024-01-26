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

  type BodyFatInputsUS = {
    height: number; // in inches
    weight: number; // in pounds
    waistCircumference: number; // in inches
    neckCircumference: number; // in inches
    hipCircumference?: number; // in inches, female measurement
    gender: 'male' | 'female';
};

function calculateBodyFatPercentageUS(inputs: BodyFatInputsUS): number {
    const { height, neckCircumference, waistCircumference, hipCircumference, gender } = inputs;

    // Conversion factors
    const heightCm = height * 2.54;
    const waistCircumferenceCm = waistCircumference * 2.54;
    const neckCircumferenceCm = neckCircumference * 2.54;
    const hipCircumferenceCm = hipCircumference ? hipCircumference * 2.54 : undefined;

    if (gender === 'male') {
        return 495 / (1.0324 - 0.19077 * Math.log10(waistCircumferenceCm - neckCircumferenceCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
        if (!hipCircumferenceCm) {
            throw new Error('Hip circumference is required for female body fat percentage calculation.');
        }
        return 495 / (1.29579 - 0.35004 * Math.log10(waistCircumferenceCm + hipCircumferenceCm - neckCircumferenceCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
}

// Example usage:
const maleInputsUS: BodyFatInputsUS = {
    height: 70.86, // 180 cm in inches
    weight: 165.35, // 75 kg in pounds
    waistCircumference: 35.43, // 90 cm in inches
    neckCircumference: 15.75, // 40 cm in inches
    gender: 'male'
};

const femaleInputsUS: BodyFatInputsUS = {
    height: 64.96, // 165 cm in inches
    weight: 143.3, // 65 kg in pounds
    waistCircumference: 27.56, // 70 cm in inches
    neckCircumference: 11.81, // 30 cm in inches
    hipCircumference: 39.37, // 100 cm in inches
    gender: 'female'
};

console.log(calculateBodyFatPercentageUS(maleInputsUS).toFixed(2)); // Output: Body fat percentage for male
console.log(calculateBodyFatPercentageUS(femaleInputsUS).toFixed(2)); // Output: Body fat percentage for female


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
