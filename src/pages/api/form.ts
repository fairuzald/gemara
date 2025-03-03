import { uploadImage } from '@/lib/cloudinary';
import { APIRoute } from 'astro';
import { v4 as uuidv4 } from 'uuid';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Validate required fields
    const requiredFields = [
      'name',
      'whatsappNumber',
      'address',
      'productCustom',
      'preset',
    ];
    for (const field of requiredFields) {
      if (!formData.has(field)) {
        return new Response(
          JSON.stringify({
            message: `Missing required field: ${field}`,
          }),
          {
            status: 400,
            statusText: 'error',
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
    }

    // Access form data directly
    const name = formData.get('name');
    const whatsappNumber = formData.get('whatsappNumber');
    const address = formData.get('address');
    const productCustom = formData.get('productCustom');
    const preset = formData.get('preset');
    const fileFromFormData = formData.get('file') as File;

    // Additional validation if needed

    // Create a unique ID
    const id = uuidv4().substring(0, 13);
    // Handle file upload

    // Change the file name to the generated ID
    const file = new File([fileFromFormData], id, {
      type: fileFromFormData.type,
    });

    // Handle file upload
    const imageUrl = await uploadImage(id, file as Blob);

    // Parse productCustom if it's a JSON string
    let product;
    try {
      product = JSON.parse(productCustom as string);
    } catch (e) {
      return new Response(
        JSON.stringify({
          message: 'Error parsing productCustom JSON',
        }),
        {
          status: 400,
          statusText: 'error',
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Prepare data for Google Sheets
    const data = {
      id,
      name,
      whatsappNumber,
      address,
      productCustom: product,
      preset,
      imageUrl,
    };

    // Send data to Google Sheets
    const response = await fetch(import.meta.env.SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resBody = await response.json();

    // Check if response is not valid
    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create form, ${resBody.message}`);
    }

    // Log success
    console.log('POST_FORM: successfully sent to form');
    return new Response(JSON.stringify({ id }), {
      status: 200,
      statusText: 'success',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    // Log and handle errors
    if (e instanceof Error) {
      return new Response(JSON.stringify({ message: `Error: ${e.message}` }), {
        status: 500,
        statusText: 'error',
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Add a generic error response here
  return new Response(
    JSON.stringify({ message: 'An unknown error occurred' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } },
  );
};
