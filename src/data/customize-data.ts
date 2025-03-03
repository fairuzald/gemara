import { SafeParseError, z } from 'zod';

// Options for small beads
const smallBeadOptions = [
  {
    value: '1',
    id: '1',
    label: '1',
    image: {
      src: '/images/beads/small/bead-small-1.png',
      alt: 'beads-1',
      width: 45,
      height: 50,
    },
  },
  {
    value: '2',
    id: '2',
    label: '2',
    image: {
      src: '/images/beads/small/bead-small-2.png',
      alt: 'beads-2',
      width: 44,
      height: 44,
    },
  },
  {
    value: '3',
    id: '3',
    label: '3',
    image: {
      src: '/images/beads/small/bead-small-3.png',
      alt: 'beads-3',
      width: 43,
      height: 40,
    },
  },
  {
    value: '4',
    id: '4',
    label: '4',
    image: {
      src: '/images/beads/small/bead-small-4.png',
      alt: 'beads-4',
      width: 45,
      height: 45,
    },
  },
  {
    value: '5',
    id: '5',
    label: '5',
    image: {
      src: '/images/beads/small/bead-small-5.png',
      alt: 'beads-5',
      width: 50,
      height: 45,
    },
  },
  {
    value: '6',
    id: '6',
    label: '6',
    image: {
      src: '/images/beads/small/bead-small-6.png',
      alt: 'beads-6',
      width: 44,
      height: 44,
    },
  },
  {
    value: '7',
    id: '7',
    label: '7',
    image: {
      src: '/images/beads/small/bead-small-7.png',
      alt: 'beads-7',
      width: 50,
      height: 50,
    },
  },
  {
    value: '8',
    id: '8',
    label: '8',
    image: {
      src: '/images/beads/small/bead-small-8.png',
      alt: 'beads-8',
      width: 38,
      height: 38,
    },
  },
];

// Options for big beads
const bigBeadOptions = [
  {
    value: '1',
    id: '1',
    label: '1',
    image: {
      src: '/images/beads/big/bead-big-1.png',
      alt: 'beads-1',
      width: 70,
      height: 70,
    },
  },
  {
    value: '2',
    id: '2',
    label: '2',
    image: {
      src: '/images/beads/big/bead-big-2.png',
      alt: 'beads-2',
      width: 70,
      height: 70,
    },
  },
  {
    value: '3',
    id: '3',
    label: '3',
    image: {
      src: '/images/beads/big/bead-big-3.png',
      alt: 'beads-3',
      width: 70,
      height: 70,
    },
  },
  {
    value: '4',
    id: '4',
    label: '4',
    image: {
      src: '/images/beads/big/bead-big-4.png',
      alt: 'beads-4',
      width: 80,
      height: 50,
    },
  },
  {
    value: '5',
    id: '5',
    label: '5',
    image: {
      src: '/images/beads/big/bead-big-5.png',
      alt: 'beads-5',
      width: 80,
      height: 50,
    },
  },
];

// Options for bracelet
const braceletOptions = [
  {
    value: 'black',
    id: 'black',
    label: 'black',
    image: {
      src: '/images/gelang/black.png',
      alt: 'gelang-black',
      width: 280,
      height: 110,
    },
  },

  {
    value: 'blue',
    id: 'blue',
    label: 'blue',
    image: {
      src: '/images/gelang/blue.png',
      alt: 'gelang-blue',
      width: 280,
      height: 90,
    },
  },
  {
    value: 'brown',
    id: 'brown',
    label: 'brown',
    image: {
      src: '/images/gelang/brown.png',
      alt: 'gelang-brown',
      width: 280,
      height: 90,
    },
  },
  {
    value: 'cream',
    id: 'cream',
    label: 'cream',
    image: {
      src: '/images/gelang/cream.png',
      alt: 'gelang-cream',
      width: 280,
      height: 90,
    },
  },
  {
    value: 'red',
    id: 'red',
    label: 'red',
    image: {
      src: '/images/gelang/red.png',
      alt: 'gelang-red',
      width: 280,
      height: 90,
    },
  },
];

interface beadOptionType {
  type: 'small' | 'big' | 'bracelet';
  options: {
    value: string;
    id: string;
    label: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  }[];
}
// Keys for big beads
const bigBeadKeys: beadOptionType = {
  type: 'big',
  options: bigBeadOptions,
};

// Keys for small beads
const smallBeadKeys: beadOptionType = {
  type: 'small',
  options: smallBeadOptions,
};

const braceletKeys: beadOptionType = {
  type: 'bracelet',
  options: braceletOptions,
};

interface ValueDataType {
  value:
    | 'bracelet'
    | 'bead1'
    | 'bead2'
    | 'bead3'
    | 'bead4'
    | 'bead5'
    | 'bead6'
    | 'bead7'
    | 'bead8'
    | 'bead9'
    | 'bead10'
    | 'bead11'
    | 'bead12'
    | 'bead13'
    | 'bead14'
    | 'bead15'
    | 'bead16';
}

interface dataPresetType {
  value:
    | 'bracelet'
    | 'bead1'
    | 'bead2'
    | 'bead3'
    | 'bead4'
    | 'bead5'
    | 'bead6'
    | 'bead7'
    | 'bead8'
    | 'bead9'
    | 'bead10'
    | 'bead11'
    | 'bead12'
    | 'bead13'
    | 'bead14'
    | 'bead15'
    | 'bead16';
  title: string;
  description: string;
  type: 'small' | 'big' | 'bracelet';
  x?: number;
  y?: number;
  rotate?: number;
  options: typeof smallBeadOptions | typeof bigBeadOptions;
}

// Customize Data Tab for preset 1
const dataPreset1: dataPresetType[] = [
  {
    value: 'bracelet',
    title: 'Gelang',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...braceletKeys,
    x: 110,
    y: -20 + 360,
    rotate: 0,
  },
  {
    value: 'bead1',
    title: 'Bead 1',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 64,
    y: -20 + 386,
    rotate: -120,
  },
  {
    value: 'bead2',
    title: 'Bead 2',
    description:
      "Make changes to your second bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 44,
    y: -20 + 357,
    rotate: -110,
  },
  {
    value: 'bead3',
    title: 'Bead 3',
    description:
      "Make changes to your third bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 26,
    y: -20 + 322,
    rotate: -95,
  },
  {
    value: 'bead4',
    title: 'Bead 4',
    description:
      "Make changes to your fourth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 23,
    y: -20 + 283,
    rotate: -80,
  },
  {
    value: 'bead5',
    title: 'Bead 5',
    description:
      "Make changes to your fifth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 28,
    y: -20 + 245,
    rotate: -65,
  },
  {
    value: 'bead6',
    title: 'Bead 6',
    description:
      "Make changes to your sixth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 45,
    y: -20 + 205,
    rotate: -40,
  },
  {
    value: 'bead7',
    title: 'Bead 7',
    description:
      "Make changes to your seventh bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 74,
    y: -20 + 177,
    rotate: -20,
  },
  {
    value: 'bead8',
    title: 'Bead 8',
    description:
      "Make changes to your eighth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 110,
    y: -20 + 160,
    rotate: 0,
  },
  {
    value: 'bead9',
    title: 'Bead 9',
    description:
      "Make changes to your nineth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 144,
    y: -20 + 157,
    rotate: 10,
  },
  {
    value: 'bead10',
    title: 'Bead 10',
    description:
      "Make changes to your tenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 183,
    y: -20 + 163,
    rotate: 30,
  },
  {
    value: 'bead11',
    title: 'Bead 11',
    description:
      "Make changes to your eleventh bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 217,
    y: -20 + 183,
    rotate: 50,
  },
  {
    value: 'bead12',
    title: 'Bead 12',
    description:
      "Make changes to your twelfth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 246,
    y: -20 + 215,
    rotate: 75,
  },
  {
    value: 'bead13',
    title: 'Bead 13',
    description:
      "Make changes to your thirteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 260,
    y: -20 + 252,
    rotate: 90,
  },
  {
    value: 'bead14',
    title: 'Bead 14',
    description:
      "Make changes to your fourteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 265,
    y: -20 + 293,
    rotate: 110,
  },
  {
    value: 'bead15',
    title: 'Bead 15',
    description:
      "Make changes to your fifteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 255,
    y: -20 + 326,
    rotate: 120,
  },
  {
    value: 'bead16',
    title: 'Bead 16',
    description:
      "Make changes to your sixteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 240,
    y: -20 + 355,
    rotate: 125,
  },
];

// Customize Data Tab for preset 2
const dataPreset2: dataPresetType[] = [
  {
    value: 'bracelet',
    title: 'Gelang',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...braceletKeys,
    x: 110,
    y: -20 + 360,
    rotate: 0,
  },
  {
    value: 'bead1',
    title: 'Bead 1',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 64,
    y: -20 + 386,
    rotate: -120,
  },
  {
    value: 'bead2',
    title: 'Bead 2',
    description:
      "Make changes to your second bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 44,
    y: -20 + 357,
    rotate: -110,
  },
  {
    value: 'bead3',
    title: 'Bead 3',
    description:
      "Make changes to your third bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 26,
    y: -20 + 322,
    rotate: -95,
  },
  {
    value: 'bead4',
    title: 'Bead 4',
    description:
      "Make changes to your fourth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 20,
    y: -20 + 273,
    rotate: -60,
  },
  {
    value: 'bead5',
    title: 'Bead 5',
    description:
      "Make changes to your fifth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 35,
    y: -20 + 240,
    rotate: -50,
  },
  {
    value: 'bead6',
    title: 'Bead 6',
    description:
      "Make changes to your sixth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 70,
    y: -20 + 198,
    rotate: -10,
  },
  {
    value: 'bead7',
    title: 'Bead 7',
    description:
      "Make changes to your seventh bead here. Click save when you're done.",
    ...bigBeadKeys,
    x: 110 + 105,
    y: -20 + 175,
    rotate: 0,
  },

  {
    value: 'bead8',
    title: 'Bead 8',
    description:
      "Make changes to your eleventh bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 170,
    y: -20 + 188,
    rotate: 20,
  },
  {
    value: 'bead9',
    title: 'Bead 9',
    description:
      "Make changes to your twelfth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 210,
    y: -20 + 205,
    rotate: 45,
  },
  {
    value: 'bead10',
    title: 'Bead 10',
    description:
      "Make changes to your thirteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 242,
    y: -20 + 235,
    rotate: 70,
  },
  {
    value: 'bead11',
    title: 'Bead 11',
    description:
      "Make changes to your fourteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 265,
    y: -20 + 288,
    rotate: 110,
  },
  {
    value: 'bead12',
    title: 'Bead 12',
    description:
      "Make changes to your fifteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 255,
    y: -20 + 326,
    rotate: 120,
  },
  {
    value: 'bead13',
    title: 'Bead 13',
    description:
      "Make changes to your sixteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 240,
    y: -20 + 355,
    rotate: 125,
  },
];

// Customize Data Tab for preset 3
const dataPreset3: dataPresetType[] = [
  {
    value: 'bracelet',
    title: 'Gelang',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...braceletKeys,
    x: 110,
    y: -20 + 360,
    rotate: 0,
  },
  {
    value: 'bead1',
    title: 'Bead 1',
    description:
      "Make changes to your first bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 64,
    y: -20 + 386,
    rotate: -120,
  },
  {
    value: 'bead2',
    title: 'Bead 2',
    description:
      "Make changes to your second bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 44,
    y: -20 + 357,
    rotate: -110,
  },
  {
    value: 'bead3',
    title: 'Bead 3',
    description:
      "Make changes to your third bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 26,
    y: -20 + 322,
    rotate: -95,
  },
  {
    value: 'bead4',
    title: 'Bead 4',
    description:
      "Make changes to your fourth bead here. Click save when you're done.",
    ...bigBeadKeys,
    x: 110 + 5,
    y: -20 + 265,
    rotate: -60,
  },
  {
    value: 'bead5',
    title: 'Bead 5',
    description:
      "Make changes to your fifth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 35,
    y: -20 + 218,
    rotate: -50,
  },
  {
    value: 'bead6',
    title: 'Bead 6',
    description:
      "Make changes to your sixth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 65,
    y: -20 + 180,
    rotate: -20,
  },
  {
    value: 'bead7',
    title: 'Bead 7',
    description:
      "Make changes to your seventh bead here. Click save when you're done.",
    ...bigBeadKeys,
    x: 110 + 105,
    y: -20 + 155,
    rotate: 0,
  },

  {
    value: 'bead8',
    title: 'Bead 8',
    description:
      "Make changes to your eleventh bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 168,
    y: -20 + 165,
    rotate: 20,
  },
  {
    value: 'bead9',
    title: 'Bead 9',
    description:
      "Make changes to your twelfth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 210,
    y: -20 + 185,
    rotate: 45,
  },
  {
    value: 'bead10',
    title: 'Bead 10',
    description:
      "Make changes to your thirteenth bead here. Click save when you're done.",
    ...bigBeadKeys,
    x: 110 + 250,
    y: -20 + 215,
    rotate: 70,
  },
  {
    value: 'bead11',
    title: 'Bead 11',
    description:
      "Make changes to your fourteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 265,
    y: -20 + 288,
    rotate: 110,
  },
  {
    value: 'bead12',
    title: 'Bead 12',
    description:
      "Make changes to your fifteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 255,
    y: -20 + 326,
    rotate: 120,
  },
  {
    value: 'bead13',
    title: 'Bead 13',
    description:
      "Make changes to your sixteenth bead here. Click save when you're done.",
    ...smallBeadKeys,
    x: 110 + 240,
    y: -20 + 355,
    rotate: 125,
  },
];

// Convert options to zod array
const smallEnum = smallBeadOptions.map((item) => item.value as string) as [
  string,
  ...string[],
];
const bigEnum = bigBeadOptions.map((item) => item.value as string) as [
  string,
  ...string[],
];
const braceletEnum = braceletOptions.map((item) => item.value as string) as [
  string,
  ...string[],
];

// Create zod enum
const zodEnumSmall = z.enum(smallEnum);
const zodEnumBig = z.enum(bigEnum);
const zodEnumBracelet = z.enum(braceletEnum);

// Create zod object for form schema preset 1
const formSchema1 = z.object({
  name: z.string().min(1, { message: 'First Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  whatsappNumber: z
    .string()
    .min(1, { message: 'Whatsapp Number is required' })
    .refine((val) => val.startsWith('628'), {
      message: 'Whatsapp Number should start with 628',
    })
    .refine((val) => /^[0-9]+$/.test(val), {
      message: 'Whatsapp Number should only contain numbers',
    }),

  productCustom: z.object({
    bracelet: zodEnumBracelet,
    bead1: zodEnumSmall,
    bead2: zodEnumSmall,
    bead3: zodEnumSmall,
    bead4: zodEnumSmall,
    bead5: zodEnumSmall,
    bead6: zodEnumSmall,
    bead7: zodEnumSmall,
    bead8: zodEnumSmall,
    bead9: zodEnumSmall,
    bead10: zodEnumSmall,
    bead11: zodEnumSmall,
    bead12: zodEnumSmall,
    bead13: zodEnumSmall,
    bead14: zodEnumSmall,
    bead15: zodEnumSmall,
    bead16: zodEnumSmall,
  }),
});

// Create zod object for form schema preset 2
const formSchema2 = z.object({
  name: z.string().min(1, { message: 'First Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  whatsappNumber: z
    .string()
    .min(1, { message: 'Whatsapp Number is required' })
    .refine((val) => val.startsWith('628'), {
      message: 'Whatsapp Number should start with 628',
    })
    .refine((val) => /^[0-9]+$/.test(val), {
      message: 'Whatsapp Number should only contain numbers',
    }),

  productCustom: z.object({
    bracelet: zodEnumBracelet,
    bead1: zodEnumSmall,
    bead2: zodEnumSmall,
    bead3: zodEnumSmall,
    bead4: zodEnumSmall,
    bead5: zodEnumSmall,
    bead6: zodEnumSmall,
    bead7: zodEnumBig,
    bead8: zodEnumSmall,
    bead9: zodEnumSmall,
    bead10: zodEnumSmall,
    bead11: zodEnumSmall,
    bead12: zodEnumSmall,
    bead13: zodEnumSmall,
  }),
});

// Create zod object for form schema preset 3
const formSchema3 = z.object({
  name: z.string().min(1, { message: 'First Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  whatsappNumber: z
    .string()
    .min(1, { message: 'Whatsapp Number is required' })
    .refine((val) => val.startsWith('628'), {
      message: 'Whatsapp Number should start with 628',
    })
    .refine((val) => /^[0-9]+$/.test(val), {
      message: 'Whatsapp Number should only contain numbers',
    }),

  productCustom: z.object({
    bracelet: zodEnumBracelet,
    bead1: zodEnumSmall,
    bead2: zodEnumSmall,
    bead3: zodEnumSmall,
    bead4: zodEnumBig,
    bead5: zodEnumSmall,
    bead6: zodEnumSmall,
    bead7: zodEnumBig,
    bead8: zodEnumSmall,
    bead9: zodEnumSmall,
    bead10: zodEnumBig,
    bead11: zodEnumSmall,
    bead12: zodEnumSmall,
    bead13: zodEnumSmall,
  }),
});

const getZodParseErrorPaths = <T>(zodParseResult: SafeParseError<T>) => {
  // Get each path of error and add them to an array (unique)
  const errors = zodParseResult.error.errors.map((error) => {
    return {
      path: error.path[0] as string,
      description: error.message,
    };
  });

  return errors;
};

const getZodParseErrorDescription = <T>(zodParseResult: SafeParseError<T>) => {
  // Initiate message
  let description = 'An error occured in the following fields: ';

  // Get unique attributes errors
  const errors = new Set(
    zodParseResult.error.errors.map((error) => error.path[0]),
  );

  errors.forEach((error, index) => {
    // Add path to message
    description += `${error}`;

    // Add comma if not last and period if last
    if (index !== errors.size - 1) {
      description += ', ';
    } else {
      description += '.';
    }
  });

  return description;
};

export {
  bigEnum,
  dataPreset1,
  dataPreset2,
  dataPreset3,
  formSchema1,
  formSchema2,
  formSchema3,
  getZodParseErrorDescription,
  getZodParseErrorPaths,
  type ValueDataType,
  type dataPresetType,
};
