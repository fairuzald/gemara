import {
  CustomImage,
  handleCreateImage,
  handleExport,
  stageRef,
} from '@/components/Canvass';
import ToastClient from '@/components/ToastClient';
import { callLoading } from '@/components/ToastManual';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  dataPreset1,
  dataPreset2,
  dataPreset3,
  dataPresetType,
  formSchema1,
  formSchema2,
  formSchema3,
  getZodParseErrorPaths,
} from '@/data/customize-data';
import useMobile from '@/hooks/useMobile';
import { deleteData, loadData, saveData } from '@/utils/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Layer, Stage } from 'react-konva';
import * as z from 'zod';
interface DataPresetMappingType {
  formSchema: typeof formSchema1 | typeof formSchema2 | typeof formSchema3;
  customizeData: dataPresetType[];
}

export default function Customize({ preset }: { preset: string }) {
  // Get data preset based on the preset value
  const dataPreset: Record<string, DataPresetMappingType> = {
    'preset-1': { formSchema: formSchema1, customizeData: dataPreset1 },
    'preset-2': { formSchema: formSchema2, customizeData: dataPreset2 },
    'preset-3': { formSchema: formSchema3, customizeData: dataPreset3 },
  };

  // Toast
  const { toast: toastRadix } = useToast();

  // State Dialog and Alert
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { width: widthDevice, height: heightDevice } = useMobile();
  // Create Form Hook
  const { formSchema, customizeData } = dataPreset[preset] || {};
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      whatsappNumber: '',
      productCustom: customizeData.reduce((acc, keys) => {
        return {
          ...acc,
          [keys.value]: keys.options[0].value,
        };
      }, {}),
    },
  });

  // Declare form state
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    setError,
    getValues,
    watch,
    register,
  } = form;

  // function to load data from local storage
  useEffect(() => {
    const fetchData = async () => {
      const initialData = await loadData(`customization-${preset}`);

      form.reset(initialData);
    };

    fetchData();
  }, [preset, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const loadingToastId = callLoading('Data pemesanan sedang diproses...');

    try {
      const createdBlob = await handleCreateImage();

      if (createdBlob) {
        const file = new File([createdBlob], 'fileName', { type: 'image/png' });

        const formData = new FormData();
        formData.append('preset', preset);
        formData.append('file', file);

        Object.keys(data).forEach((key) => {
          const keysafe = key as keyof typeof data;
          if (key === 'productCustom') {
            const json = JSON.stringify(data[keysafe]);
            formData.append(key, json);
          } else {
            formData.append(key, data[keysafe] as string);
          }
        });

        const res = await fetch('/api/form', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          // Handle the case where the response is not OK
          const bodyResponse = await res.json();
          toastRadix({
            title: 'Error',
            duration: 3000,
            variant: 'destructive',
            description: bodyResponse.message,
          });
        } else {
          // Handle the success case
          const resData = await res.json();
          const { id } = resData;

          // Simpan pesan toast ke dalam sessionStorage
          sessionStorage.setItem(
            'toastMessage',
            JSON.stringify({
              id,
            }),
          );

          // If the response is OK (200), reset the form and delete the data from local storage
          form.reset();
          deleteData(`customization-${preset}`);

          window.location.href = '/customize';
        }
      } else {
        console.error('Failed to create Blob');
      }
    } catch (err) {
      // Handle any other errors that may occur
      toastRadix({
        title: 'Error',
        duration: 3000,
        variant: 'destructive',
        description: 'Terjadi kesalahan saat mengirim data pemesanan.',
      });
    } finally {
      setAlertDialogOpen(false);
      setDialogOpen(false);
      toast.dismiss(loadingToastId); // Dismiss toast loading ketika proses pengiriman formulir selesai
    }
  };

  const productCustom = watch('productCustom');

  return (
    <main className='text-primary-text text-base font-helvetica w-full p-8 md:p-16 xl:p-20 flex flex-col lg:flex-row gap-4 md:gap-8 xl:gap-14 2xl:gap-20 justify-center'>
      <ToastClient />
      {/* Title */}
      <h1 className='font-helvetica text-3xl lg:text-4xl lg:hidden text-black font-bold pb-2 border-b-2 border-b-slate-300 capitalize'>
        Customize {preset.split('-').join(' ')}
      </h1>

      {/* Image */}
      <section className='flex flex-col gap-7 items-center justify-center m-auto w-[2/5] lg:w-[1/2] h-fit'>
        <div className='shadow-sm shadow-black rounded-md p-2 bg-white flex-1 h-auto w-full sm:w-[470px] lg:w-[600px] aspect-square'>
          <div className='flex flex-col items-center justify-center gap-2 w-full'>
            <Stage
              width={widthDevice <= 550 ? widthDevice - 70 : 500}
              height={widthDevice <= 550 ? widthDevice - 70 : 500}
              ref={stageRef}
            >
              <Layer>
                {/* Render multiple CustomImage components with random positions */}
                {Object.keys(productCustom).map((key, index) => {
                  const val = productCustom[key as keyof typeof productCustom];
                  const { options, x, y, rotate } = customizeData[index];
                  const selectedImg = options.find(
                    (item) => item.value === val,
                  );
                  const { src, width, height } = selectedImg?.image || {
                    src: '/assets/images/beads/beads-1.webp',
                  };

                  const factor = (widthDevice - 70) / 500;
                  return (
                    <CustomImage
                      key={key}
                      x={
                        widthDevice <= 550
                          ? x !== undefined
                            ? x * factor
                            : 0
                          : x || 0
                      }
                      y={
                        widthDevice <= 550
                          ? y !== undefined
                            ? y * factor
                            : 0
                          : y || 0
                      }
                      width={
                        widthDevice <= 550
                          ? width !== undefined
                            ? width * factor
                            : 0
                          : width || 0
                      }
                      height={
                        widthDevice <= 550
                          ? height !== undefined
                            ? height * factor
                            : 0
                          : height || 0
                      }
                      rotate={rotate || 0}
                      url={src || '/assets/images/beads/beads-1.webp'}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </div>
        <Button onClick={handleExport}>Click here to download the image</Button>

        {/* Disclaimer Image */}
        <p className='text-black text-base lg:text-xl font-bold font-helvetica w-full lg:max-w-[500px]'>
          Disclaimer: The color accuration may look different on different
          devices
        </p>
      </section>

      {/* Customization */}
      <section className='flex-1'>
        {/* Title */}
        <h2 className='hidden lg:flex text-3xl lg:text-4xl text-black font-tango-sans font-bold pb-2 border-b-2 border-b-slate-300 capitalize'>
          Customize {preset.split('-').join(' ')}
        </h2>

        {/* Form */}
        <div className='flex flex-col pt-4'>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Tabs */}
              <Tabs
                defaultValue={customizeData[0].value}
                className={clsx(
                  'w-full flex flex-col sm:flex-row items-stretch gap-5',
                )}
              >
                <TabsList>
                  {customizeData.map((item) => (
                    <TabsTrigger key={item.value} value={item.value}>
                      <p className='font-semibold'>{item.title}</p>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {customizeData.map((item) => (
                  <FormField
                    control={control}
                    name={`productCustom.${item.value}`}
                    key={item.value}
                    render={({ field }) => (
                      // Tab Bead
                      <TabsContent value={item.value}>
                        <FormItem className='flex flex-col h-full justify-between'>
                          <div>
                            <FormLabel
                              className={clsx(
                                'text-lg lg:text-2xl font-semibold font-helvetica leading-none tracking-tight',
                              )}
                            >
                              <h3>{item.title}</h3>
                            </FormLabel>
                            <p className='text-sm lg:text-base text-slate-500'>
                              {item.description}
                            </p>
                            <FormControl>
                              <RadioGroup
                                className={clsx(
                                  'flex flex-wrap gap-10 items-center justify-center mx-10 md:mx-0 2xl:mx-28 mt-10',
                                )}
                                onValueChange={(e) => {
                                  field.onChange(e);
                                  register(`productCustom.${item.value}`);
                                  saveData(
                                    `customization-${preset}`,
                                    getValues(),
                                  );
                                }}
                                defaultValue={field.value}
                              >
                                {item.options.map((option) => (
                                  <div
                                    className='flex items-center space-x-2'
                                    key={option.id}
                                  >
                                    <FormItem className='flex items-center space-x-2 lg:space-x-3 space-y-0'>
                                      <FormControl>
                                        <RadioGroupItem
                                          id={option.id}
                                          value={option.value}
                                          aria-label={option.value}
                                        />
                                      </FormControl>
                                      <FormLabel className='font-normal text-base lg:text-lg cursor-pointer'>
                                        <Label
                                          htmlFor={option.id}
                                          className='flex flex-col items-center justify-center'
                                        >
                                          <img
                                            src={option.image.src}
                                            width={option.image.width}
                                            height={option.image.height}
                                            alt={option.image.alt}
                                            className='object-contain object-center w-[50px] lg:w-[60px] aspect-square rounded-full'
                                            sizes={
                                              '(max-width: 640px) 50px, 70px'
                                            }
                                            decoding={'async'}
                                            loading={'eager'}
                                          />
                                          <p>{option.label}</p>
                                        </Label>
                                      </FormLabel>
                                    </FormItem>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </FormItem>
                      </TabsContent>
                    )}
                  />
                ))}
              </Tabs>

              {/* Dialog */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className='mt-7 flex-1 text-lg w-full'
                    type='button'
                    disabled={isSubmitting}
                  >
                    Buy Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Form Pemesanan</DialogTitle>
                    <DialogDescription>
                      Make changes to your submission. Click buy when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <FormField
                      control={control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black '>
                            <Label htmlFor='name' className='text-left'>
                              Nama
                            </Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              required
                              type='text'
                              id='name'
                              className='col-span-3'
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e);
                                saveData(`customization-${preset}`, {
                                  ...getValues(),
                                  [field.name]: e.target.value,
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black '>
                            <Label htmlFor='address' className='text-left'>
                              Alamat
                            </Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              required
                              id='address'
                              className='col-span-3'
                              type='text'
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e);
                                saveData(`customization-${preset}`, {
                                  ...getValues(),
                                  [field.name]: e.target.value,
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage className='text-red-500' />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='whatsappNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-black '>
                            <Label
                              htmlFor='whatsappNumber'
                              className='text-left'
                            >
                              Nomor Whatsapp
                            </Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              required
                              id='whatsappNumber'
                              className='col-span-3'
                              type='text'
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e);
                                saveData(`customization-${preset}`, {
                                  ...getValues(),
                                  [field.name]: e.target.value,
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage className='text-red-500' />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <AlertDialog open={alertDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='outline'
                          disabled={isSubmitting}
                          onClick={() => {
                            const zodParsed = formSchema.safeParse(
                              form.getValues(),
                            );
                            if (!zodParsed.success) {
                              const err = getZodParseErrorPaths(zodParsed);
                              if (err) {
                                err.forEach((error) => {
                                  setError(
                                    error.path as keyof z.infer<
                                      typeof formSchema
                                    >,
                                    { message: error.description },
                                    { shouldFocus: true },
                                  );
                                });
                              }
                              return setAlertDialogOpen(false);
                            }
                            setAlertDialogOpen(true);
                          }}
                        >
                          Buy
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Pemesanan yang sudah dibuat tidak dapat diubah.
                            Apakah Anda yakin ingin melanjutkan?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setAlertDialogOpen(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction asChild type='submit'>
                            <Button
                              type='submit'
                              disabled={isSubmitting}
                              onClick={handleSubmit(onSubmit)}
                            >
                              Buy
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
