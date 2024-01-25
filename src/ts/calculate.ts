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
