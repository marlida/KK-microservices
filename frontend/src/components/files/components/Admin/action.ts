'use server'

import { AdminServices } from "@/services/adminServices";

export async function submitForm(prevState: any, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const tel = formData.get('tel') as string;

    const response = await AdminServices.updateAdmin(id, { name, tel });

    console.log("Response from updateAdmin:", response.message);

    return {
      success: true,
      message: response.message
    };
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}