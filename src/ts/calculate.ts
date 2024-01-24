type BodyFatInputs = {
    height: number; // in centimeters
    weight: number; // in kilograms
    waistCircumference: number; // in centimeters
    neckCircumference: number; // in centimeters
    hipCircumference?: number; // in centimeters, female measurement
    gender: 'male' | 'female';
};

function calculateBodyFatPercentage(inputs: BodyFatInputs): number {
    const { height, neckCircumference, waistCircumference, hipCircumference, gender } = inputs;

    if (gender === 'male') {
        return 495 / (1.0324 - 0.19077 * Math.log10(waistCircumference - neckCircumference) + 0.15456 * Math.log10(height)) - 450;
    } else {
        if (!hipCircumference) {
            throw new Error('Hip circumference is required for female body fat percentage calculation.');
        }
        return 495 / (1.29579 - 0.35004 * Math.log10(waistCircumference + hipCircumference - neckCircumference) + 0.22100 * Math.log10(height)) - 450;
    }
}

// Example usage:
const maleInputs: BodyFatInputs = {
    height: 180,
    weight: 75,
    waistCircumference: 90,
    neckCircumference: 40,
    gender: 'male'
};

const femaleInputs: BodyFatInputs = {
    height: 165,
    weight: 65,
    waistCircumference: 70,
    neckCircumference: 30,
    hipCircumference: 100,
    gender: 'female'
};

console.log(calculateBodyFatPercentage(maleInputs)); // Output: Body fat percentage for male
console.log(calculateBodyFatPercentage(femaleInputs)); // Output: Body fat percentage for female
