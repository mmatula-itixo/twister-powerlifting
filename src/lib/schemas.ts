import { z } from 'zod';

export const registrationSchema = z.object({
    fullName: z.string().min(5, 'Jméno musí být dlouhé alespoň 5 znaků'),
    age: z.number().int().min(15, 'Věk musí být alespoň 15').max(90, 'Věk musí být 90 nebo méně'),
    email: z.email('Neplatná e-mailová adresa'),
    gender: z.enum(['male', 'female']),
});

export type RegistrationDataInput = z.input<typeof registrationSchema>
export type RegistrationDataOutput = z.output<typeof registrationSchema>
